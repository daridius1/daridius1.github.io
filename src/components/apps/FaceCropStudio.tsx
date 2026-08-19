import React, { useState, useEffect, useRef, useCallback } from "react";

type ProcessingStep = "idle" | "processing" | "done" | "error";

interface FaceData {
    centerX: number;
    centerY: number;
    baseDim: number;
}

export default function FaceCropStudio() {
    const [step, setStep] = useState<ProcessingStep>("idle");
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Image state
    const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);
    const [resultDataUrl, setResultDataUrl] = useState<string | null>(null);

    // Controls — zoom, horizontal and vertical offset
    const [zoom, setZoom] = useState(2.3);
    const [horizontalOffset, setHorizontalOffset] = useState(0.0);
    const [verticalOffset, setVerticalOffset] = useState(0.0);

    // Drag & drop
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // AI & Canvas refs
    const visionRefs = useRef<{
        visionModule: any;
        faceDetector: any;
        imageSegmenter: any;
    }>({ visionModule: null, faceDetector: null, imageSegmenter: null });

    // Cache pre-segmented canvas & face coordinates for 60 FPS instant slider rendering
    const preSegmentedCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const faceDataRef = useRef<FaceData | null>(null);
    const resultCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const latestControlsRef = useRef({ zoom: 2.3, h: 0.0, v: 0.0 });

    // Keep latest controls in sync
    latestControlsRef.current = { zoom, h: horizontalOffset, v: verticalOffset };

    // ──────────── Model Loading ────────────

    const fetchModelBuffer = async (localUrl: string, cdnUrl: string): Promise<Uint8Array> => {
        try {
            const res = await fetch(localUrl);
            if (res.ok) {
                const buf = await res.arrayBuffer();
                if (buf.byteLength > 1000) return new Uint8Array(buf);
            }
        } catch {
            // silent fallback
        }
        const cdnRes = await fetch(cdnUrl);
        if (!cdnRes.ok) throw new Error(`Error descargando modelo`);
        return new Uint8Array(await cdnRes.arrayBuffer());
    };

    const loadModels = async () => {
        if (visionRefs.current.faceDetector && visionRefs.current.imageSegmenter) {
            return visionRefs.current;
        }

        const dynamicImport = (url: string) => {
            const fn = new Function("u", "return import(u)");
            return fn(url);
        };

        let vision: any = null;
        try {
            vision = await dynamicImport(`${window.location.origin}/mediapipe/vision_bundle.mjs`);
        } catch {
            try {
                vision = await dynamicImport(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/vision_bundle.mjs",
                );
            } catch {
                throw new Error("No se pudo cargar el motor de visión.");
            }
        }
        visionRefs.current.visionModule = vision;

        let fileset: any = null;
        try {
            fileset = await vision.FilesetResolver.forVisionTasks("/mediapipe/wasm");
        } catch {
            try {
                fileset = await vision.FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm",
                );
            } catch (e: any) {
                throw new Error(`Error al inicializar IA: ${e?.message || e}`);
            }
        }

        const [faceBuf, segBuf] = await Promise.all([
            fetchModelBuffer(
                "/mediapipe/models/blaze_face_short_range.tflite",
                "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite",
            ),
            fetchModelBuffer(
                "/mediapipe/models/selfie_segmenter.tflite",
                "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite",
            ),
        ]);

        const initTasks = async (delegate: "GPU" | "CPU") => ({
            faceDetector: await vision.FaceDetector.createFromOptions(fileset, {
                baseOptions: { modelAssetBuffer: faceBuf, delegate },
                runningMode: "IMAGE",
                minDetectionConfidence: 0.45,
            }),
            imageSegmenter: await vision.ImageSegmenter.createFromOptions(fileset, {
                baseOptions: { modelAssetBuffer: segBuf, delegate },
                runningMode: "IMAGE",
                outputCategoryMask: true,
                outputConfidenceMasks: true,
            }),
        });

        try {
            const inst = await initTasks("GPU");
            visionRefs.current.faceDetector = inst.faceDetector;
            visionRefs.current.imageSegmenter = inst.imageSegmenter;
        } catch {
            const inst = await initTasks("CPU");
            visionRefs.current.faceDetector = inst.faceDetector;
            visionRefs.current.imageSegmenter = inst.imageSegmenter;
        }

        return visionRefs.current;
    };

    // ──────────── Instant 60 FPS Crop Renderer ────────────

    const renderCropInstant = useCallback(
        (zVal?: number, hVal?: number, vVal?: number) => {
            const segCanvas = preSegmentedCanvasRef.current;
            const face = faceDataRef.current;
            if (!segCanvas || !face) return;

            const z = zVal ?? latestControlsRef.current.zoom;
            const h = hVal ?? latestControlsRef.current.h;
            const v = vVal ?? latestControlsRef.current.v;
            const res = 512;

            let finalCanvas = resultCanvasRef.current;
            if (!finalCanvas) {
                finalCanvas = document.createElement("canvas");
                finalCanvas.width = res;
                finalCanvas.height = res;
                resultCanvasRef.current = finalCanvas;
            }

            const ctx = finalCanvas.getContext("2d")!;
            ctx.clearRect(0, 0, res, res);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            const cropSize = face.baseDim * z;
            const cropTop = face.centerY - cropSize * 0.42 - (v * cropSize);
            const cropLeft = face.centerX - cropSize * 0.5 + (h * cropSize);

            ctx.drawImage(
                segCanvas,
                cropLeft,
                cropTop,
                cropSize,
                cropSize,
                0,
                0,
                res,
                res,
            );

            // Fast DataURL update
            setResultDataUrl(finalCanvas.toDataURL("image/png"));
        },
        [],
    );

    // ──────────── One-Time Image Processing Pipeline ────────────

    const processNewImage = useCallback(
        async (img: HTMLImageElement) => {
            setErrorMessage(null);
            setIsProcessing(true);
            setStep("processing");

            try {
                const { faceDetector, imageSegmenter } = await loadModels();

                // Prepare normalized work canvas (max dimension 1024 for sharp detail & fast AI inference)
                let w = img.naturalWidth || img.width;
                let h = img.naturalHeight || img.height;
                const MAX_DIM = 1024;
                if (w > MAX_DIM || h > MAX_DIM) {
                    if (w > h) {
                        h = Math.round((h * MAX_DIM) / w);
                        w = MAX_DIM;
                    } else {
                        w = Math.round((w * MAX_DIM) / h);
                        h = MAX_DIM;
                    }
                }

                const workCanvas = document.createElement("canvas");
                workCanvas.width = w;
                workCanvas.height = h;
                const workCtx = workCanvas.getContext("2d", { willReadFrequently: true })!;
                workCtx.drawImage(img, 0, 0, w, h);

                // 1. Detect Face
                const result = faceDetector.detect(workCanvas);
                const detections = result.detections || [];

                if (detections.length === 0) {
                    setIsProcessing(false);
                    setStep("error");
                    setErrorMessage("No se detectó un rostro. Intenta con otra imagen.");
                    return;
                }

                let maxArea = -1;
                let bestFace: any = detections[0].boundingBox;
                for (const det of detections) {
                    const box = det.boundingBox;
                    const area = (box?.width || 0) * (box?.height || 0);
                    if (area > maxArea) {
                        maxArea = area;
                        bestFace = box;
                    }
                }

                const faceData: FaceData = {
                    centerX: (bestFace.originX || 0) + (bestFace.width || 0) / 2,
                    centerY: (bestFace.originY || 0) + (bestFace.height || 0) / 2,
                    baseDim: Math.max(bestFace.width || 100, bestFace.height || 100),
                };
                faceDataRef.current = faceData;

                // 2. Selfie Segmentation on the full work image
                const segResult = imageSegmenter.segment(workCanvas);
                const mask = segResult.confidenceMasks?.[0];
                if (!mask) throw new Error("Error en segmentación.");

                const maskW = mask.width;
                const maskH = mask.height;
                const floats = mask.getAsFloat32Array();

                // Create mask canvas
                const maskCanvas = document.createElement("canvas");
                maskCanvas.width = maskW;
                maskCanvas.height = maskH;
                const maskCtx = maskCanvas.getContext("2d", { willReadFrequently: true })!;
                const maskData = maskCtx.createImageData(maskW, maskH);

                for (let i = 0; i < maskW * maskH; i++) {
                    const score = floats[i];
                    let alpha = 0;
                    if (score > 0.4) {
                        alpha = Math.round(Math.min(1.0, (score - 0.4) / 0.6) * 255);
                    }
                    const p = i * 4;
                    maskData.data[p] = 255;
                    maskData.data[p + 1] = 255;
                    maskData.data[p + 2] = 255;
                    maskData.data[p + 3] = alpha;
                }
                maskCtx.putImageData(maskData, 0, 0);

                // Smooth feather mask
                const smoothCanvas = document.createElement("canvas");
                smoothCanvas.width = w;
                smoothCanvas.height = h;
                const sCtx = smoothCanvas.getContext("2d")!;
                sCtx.imageSmoothingEnabled = true;
                sCtx.imageSmoothingQuality = "high";
                sCtx.filter = "blur(2px)";
                sCtx.drawImage(maskCanvas, 0, 0, w, h);

                // Generate full pre-segmented transparent canvas
                const preSegCanvas = document.createElement("canvas");
                preSegCanvas.width = w;
                preSegCanvas.height = h;
                const preCtx = preSegCanvas.getContext("2d", { willReadFrequently: true })!;
                preCtx.drawImage(workCanvas, 0, 0);
                preCtx.globalCompositeOperation = "destination-in";
                preCtx.drawImage(smoothCanvas, 0, 0);

                // Cache for fast slider manipulations
                preSegmentedCanvasRef.current = preSegCanvas;

                // Render first crop with latest slider values
                const current = latestControlsRef.current;
                renderCropInstant(current.zoom, current.h, current.v);

                setIsProcessing(false);
                setStep("done");
            } catch (err: any) {
                console.error("Processing error:", err);
                setIsProcessing(false);
                setStep("error");
                setErrorMessage(err.message || "Error procesando la imagen.");
            }
        },
        [renderCropInstant],
    );

    // ──────────── Handlers ────────────

    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            setErrorMessage("Selecciona un archivo de imagen (JPG, PNG, WebP).");
            return;
        }

        // Reset previous render state
        preSegmentedCanvasRef.current = null;
        faceDataRef.current = null;
        setResultDataUrl(null);
        setZoom(2.3);
        setHorizontalOffset(0.0);
        setVerticalOffset(0.0);
        latestControlsRef.current = { zoom: 2.3, h: 0.0, v: 0.0 };

        const reader = new FileReader();
        reader.onload = (e) => {
            const src = e.target?.result as string;
            setOriginalImageSrc(src);
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                processNewImage(img);
            };
            img.src = src;
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = () => setIsDragging(false);
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
    };

    // Clipboard paste
    useEffect(() => {
        const onPaste = (e: ClipboardEvent) => {
            const items = e.clipboardData?.items;
            if (items) {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].type.startsWith("image/")) {
                        const blob = items[i].getAsFile();
                        if (blob) handleFile(blob);
                        break;
                    }
                }
            }
        };
        window.addEventListener("paste", onPaste);
        return () => window.removeEventListener("paste", onPaste);
    }, []);

    // Instant 60 FPS slider change handler
    const handleSliderChange = (newZoom: number, newH: number, newV: number) => {
        setZoom(newZoom);
        setHorizontalOffset(newH);
        setVerticalOffset(newV);
        latestControlsRef.current = { zoom: newZoom, h: newH, v: newV };

        // Realtime instant redraw
        if (preSegmentedCanvasRef.current && faceDataRef.current) {
            renderCropInstant(newZoom, newH, newV);
        }
    };

    const handleDownload = () => {
        if (!resultDataUrl) return;
        const a = document.createElement("a");
        a.href = resultDataUrl;
        a.download = `avatar_${Date.now()}.png`;
        a.click();
    };

    const handleReset = () => {
        preSegmentedCanvasRef.current = null;
        faceDataRef.current = null;
        setStep("idle");
        setIsProcessing(false);
        setOriginalImageSrc(null);
        setResultDataUrl(null);
        setErrorMessage(null);
        setZoom(2.3);
        setHorizontalOffset(0.0);
        setVerticalOffset(0.0);
        latestControlsRef.current = { zoom: 2.3, h: 0.0, v: 0.0 };
    };

    // ──────────── RENDER ────────────

    // Upload screen
    if (!originalImageSrc || step === "idle") {
        return (
            <div className="fcs-root">
                <style>{styles}</style>

                {errorMessage && (
                    <div className="fcs-error">
                        <span>⚠️ {errorMessage}</span>
                        <button onClick={() => setErrorMessage(null)}>✕</button>
                    </div>
                )}

                <div
                    className={`fcs-dropzone ${isDragging ? "dragging" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        style={{ display: "none" }}
                        onChange={(e) => {
                            if (e.target.files?.[0]) handleFile(e.target.files[0]);
                        }}
                    />
                    <div className="fcs-dropzone-icon">📷</div>
                    <p className="fcs-dropzone-title">Arrastra tu foto aquí</p>
                    <p className="fcs-dropzone-sub">
                        o haz clic para seleccionar · JPG, PNG, WebP
                    </p>
                    <p className="fcs-dropzone-hint">También puedes pegar (Ctrl+V)</p>
                </div>
            </div>
        );
    }

    // Error Screen
    if (step === "error" && !isProcessing && !resultDataUrl) {
        return (
            <div className="fcs-root">
                <style>{styles}</style>
                <div className="fcs-error-screen">
                    <div className="fcs-error-icon">⚠️</div>
                    <p>{errorMessage}</p>
                    <button className="fcs-btn fcs-btn-primary" onClick={handleReset}>
                        Intentar con otra foto
                    </button>
                </div>
            </div>
        );
    }

    // Main Interactive Workspace (Always responsive sliders & live circular preview)
    return (
        <div className="fcs-root">
            <style>{styles}</style>

            <div className="fcs-result-layout">
                {/* Reference + Result side by side */}
                <div className="fcs-previews">
                    <div className="fcs-preview-col">
                        <p className="fcs-preview-label">Referencia</p>
                        <div className="fcs-circle-frame">
                            <img
                                src="/mediapipe/reference_haaland.jpg"
                                alt="Referencia"
                                className="fcs-circle-img"
                            />
                        </div>
                    </div>

                    <div className="fcs-preview-col">
                        <p className="fcs-preview-label">Tu resultado</p>
                        <div className="fcs-circle-frame fcs-result-frame">
                            {/* Result Image */}
                            {resultDataUrl && (
                                <img
                                    src={resultDataUrl}
                                    alt="Resultado"
                                    className={`fcs-circle-img ${isProcessing ? "fcs-dimmed" : ""}`}
                                />
                            )}

                            {/* Loading State Overlay */}
                            {isProcessing && (
                                <div className="fcs-circle-loading-overlay">
                                    <div className="fcs-spinner" />
                                    <span className="fcs-loading-text">Cargando...</span>
                                </div>
                            )}

                            {/* Empty placeholder */}
                            {!resultDataUrl && !isProcessing && (
                                <div className="fcs-circle-placeholder">
                                    <span>👤</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Controls — Always interactive, 60fps instant redraw */}
                <div className="fcs-controls">
                    <div className="fcs-control-row">
                        <label>🔍 Zoom</label>
                        <input
                            type="range"
                            min="1.2"
                            max="4.5"
                            step="0.05"
                            value={zoom}
                            onChange={(e) =>
                                handleSliderChange(
                                    parseFloat(e.target.value),
                                    horizontalOffset,
                                    verticalOffset,
                                )
                            }
                        />
                        <span className="fcs-control-value">{zoom.toFixed(1)}×</span>
                    </div>

                    <div className="fcs-control-row">
                        <label>↔️ Horizontal</label>
                        <input
                            type="range"
                            min="-0.3"
                            max="0.3"
                            step="0.01"
                            value={horizontalOffset}
                            onChange={(e) =>
                                handleSliderChange(
                                    zoom,
                                    parseFloat(e.target.value),
                                    verticalOffset,
                                )
                            }
                        />
                        <span className="fcs-control-value">
                            {horizontalOffset > 0 ? "+" : ""}
                            {(horizontalOffset * 100).toFixed(0)}%
                        </span>
                    </div>

                    <div className="fcs-control-row">
                        <label>↕️ Vertical</label>
                        <input
                            type="range"
                            min="-0.3"
                            max="0.3"
                            step="0.01"
                            value={verticalOffset}
                            onChange={(e) =>
                                handleSliderChange(
                                    zoom,
                                    horizontalOffset,
                                    parseFloat(e.target.value),
                                )
                            }
                        />
                        <span className="fcs-control-value">
                            {verticalOffset > 0 ? "+" : ""}
                            {(verticalOffset * 100).toFixed(0)}%
                        </span>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="fcs-actions">
                    <button
                        className="fcs-btn fcs-btn-primary"
                        onClick={handleDownload}
                        disabled={isProcessing || !resultDataUrl}
                    >
                        📥 Descargar PNG
                    </button>
                    <button className="fcs-btn fcs-btn-ghost" onClick={handleReset}>
                        🔄 Otra foto
                    </button>
                </div>
            </div>
        </div>
    );
}

// ──────────── Styles ────────────

const styles = `
.fcs-root {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 1.5rem 1rem;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #e2e8f0;
}

/* Error banner */
.fcs-error {
    background: rgba(220, 38, 38, 0.15);
    border: 1px solid rgba(220, 38, 38, 0.4);
    border-radius: 10px;
    padding: 0.75rem 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9rem;
}
.fcs-error button {
    background: none;
    border: none;
    color: #f87171;
    cursor: pointer;
    font-size: 1.1rem;
    padding: 0 0.3rem;
}

/* Dropzone */
.fcs-dropzone {
    border: 2px dashed rgba(148, 163, 184, 0.3);
    border-radius: 16px;
    padding: 3rem 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.25s ease;
    background: rgba(30, 41, 59, 0.4);
    backdrop-filter: blur(8px);
}
.fcs-dropzone:hover,
.fcs-dropzone.dragging {
    border-color: rgba(96, 165, 250, 0.6);
    background: rgba(30, 41, 59, 0.65);
    transform: translateY(-2px);
}
.fcs-dropzone-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.8;
}
.fcs-dropzone-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0 0 0.4rem;
    color: #f1f5f9;
}
.fcs-dropzone-sub {
    font-size: 0.9rem;
    color: rgba(148, 163, 184, 0.8);
    margin: 0 0 0.8rem;
}
.fcs-dropzone-hint {
    font-size: 0.78rem;
    color: rgba(148, 163, 184, 0.5);
    margin: 0;
}

/* Error screen */
.fcs-error-screen {
    text-align: center;
    padding: 3rem 1rem;
}
.fcs-error-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}
.fcs-error-screen p {
    color: #f87171;
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
}

/* Result layout */
.fcs-result-layout {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
}

/* Circular previews */
.fcs-previews {
    display: flex;
    gap: 2.5rem;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
.fcs-preview-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
}
.fcs-preview-label {
    font-size: 0.8rem;
    font-weight: 500;
    color: rgba(148, 163, 184, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 0;
}
.fcs-circle-frame {
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    border: 3px solid rgba(96, 165, 250, 0.25);
    background: repeating-conic-gradient(
        rgba(50, 50, 60, 0.6) 0% 25%,
        rgba(40, 40, 50, 0.6) 0% 50%
    ) 0 0 / 20px 20px;
    box-shadow: 0 0 30px rgba(96, 165, 250, 0.08);
    transition: border-color 0.3s ease;
}
.fcs-circle-frame:hover {
    border-color: rgba(96, 165, 250, 0.5);
}
.fcs-circle-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: opacity 0.2s ease;
}
.fcs-circle-img.fcs-dimmed {
    opacity: 0.3;
}

/* Loading overlay inside circle */
.fcs-circle-loading-overlay {
    position: absolute;
    inset: 0;
    background: rgba(15, 23, 42, 0.75);
    backdrop-filter: blur(4px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
}
.fcs-loading-text {
    font-size: 0.85rem;
    font-weight: 500;
    color: #93c5fd;
    letter-spacing: 0.02em;
}
.fcs-spinner {
    width: 36px;
    height: 36px;
    border: 3px solid rgba(96, 165, 250, 0.2);
    border-top-color: #60a5fa;
    border-radius: 50%;
    animation: fcs-spin 0.8s linear infinite;
}
@keyframes fcs-spin {
    to { transform: rotate(360deg); }
}

.fcs-circle-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(148, 163, 184, 0.3);
    font-size: 3rem;
}

/* Controls */
.fcs-controls {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(148, 163, 184, 0.1);
    border-radius: 14px;
    padding: 1.2rem 1.5rem;
}
.fcs-control-row {
    display: flex;
    align-items: center;
    gap: 0.8rem;
}
.fcs-control-row label {
    font-size: 0.85rem;
    color: rgba(226, 232, 240, 0.85);
    white-space: nowrap;
    min-width: 90px;
}
.fcs-control-row input[type="range"] {
    flex: 1;
    -webkit-appearance: none;
    appearance: none;
    height: 6px;
    background: rgba(96, 165, 250, 0.15);
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    touch-action: none;
}
.fcs-control-row input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px;
    height: 22px;
    background: #60a5fa;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 8px rgba(96, 165, 250, 0.4);
    transition: transform 0.15s ease;
}
.fcs-control-row input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.15);
}
.fcs-control-row input[type="range"]::-moz-range-thumb {
    width: 22px;
    height: 22px;
    background: #60a5fa;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 8px rgba(96, 165, 250, 0.4);
}
.fcs-control-value {
    font-size: 0.8rem;
    color: rgba(148, 163, 184, 0.7);
    min-width: 48px;
    text-align: right;
    font-variant-numeric: tabular-nums;
}

/* Buttons */
.fcs-actions {
    display: flex;
    gap: 0.8rem;
    flex-wrap: wrap;
    justify-content: center;
}
.fcs-btn {
    padding: 0.7rem 1.5rem;
    border-radius: 10px;
    border: none;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
}
.fcs-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none !important;
}
.fcs-btn-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
    color: #fff;
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25);
}
.fcs-btn-primary:not(:disabled):hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(59, 130, 246, 0.35);
}
.fcs-btn-ghost {
    background: rgba(148, 163, 184, 0.1);
    color: #94a3b8;
    border: 1px solid rgba(148, 163, 184, 0.2);
}
.fcs-btn-ghost:hover {
    background: rgba(148, 163, 184, 0.2);
    color: #e2e8f0;
}

@media (max-width: 500px) {
    .fcs-previews {
        gap: 1.5rem;
    }
    .fcs-circle-frame {
        width: 150px;
        height: 150px;
    }
}
`;
