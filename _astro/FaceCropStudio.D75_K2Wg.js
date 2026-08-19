import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as c}from"./index.DiEladB3.js";function he(){const[Q,y]=c.useState("idle"),[j,k]=c.useState(!1),[A,h]=c.useState(null),[ne,K]=c.useState(null),[g,O]=c.useState(null),[z,P]=c.useState(2.3),[b,B]=c.useState(0),[x,L]=c.useState(0),[oe,G]=c.useState(!1),Z=c.useRef(null),f=c.useRef({visionModule:null,faceDetector:null,imageSegmenter:null}),C=c.useRef(null),N=c.useRef(null),ee=c.useRef(null),m=c.useRef({zoom:2.3,h:0,v:0});m.current={zoom:z,h:b,v:x};const re=async(r,s)=>{try{const a=await fetch(r);if(a.ok){const t=await a.arrayBuffer();if(t.byteLength>1e3)return new Uint8Array(t)}}catch{}const n=await fetch(s);if(!n.ok)throw new Error("Error descargando modelo");return new Uint8Array(await n.arrayBuffer())},ce=async()=>{if(f.current.faceDetector&&f.current.imageSegmenter)return f.current;const r=o=>new Function("u","return import(u)")(o);let s=null;try{s=await r(`${window.location.origin}/mediapipe/vision_bundle.mjs`)}catch{try{s=await r("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/vision_bundle.mjs")}catch{throw new Error("No se pudo cargar el motor de visión.")}}f.current.visionModule=s;let n=null;try{n=await s.FilesetResolver.forVisionTasks("/mediapipe/wasm")}catch{try{n=await s.FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm")}catch(o){throw new Error(`Error al inicializar IA: ${o?.message||o}`)}}const[a,t]=await Promise.all([re("/mediapipe/models/blaze_face_short_range.tflite","https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite"),re("/mediapipe/models/selfie_segmenter.tflite","https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite")]),l=async o=>({faceDetector:await s.FaceDetector.createFromOptions(n,{baseOptions:{modelAssetBuffer:a,delegate:o},runningMode:"IMAGE",minDetectionConfidence:.45}),imageSegmenter:await s.ImageSegmenter.createFromOptions(n,{baseOptions:{modelAssetBuffer:t,delegate:o},runningMode:"IMAGE",outputCategoryMask:!0,outputConfidenceMasks:!0})});try{const o=await l("GPU");f.current.faceDetector=o.faceDetector,f.current.imageSegmenter=o.imageSegmenter}catch{const o=await l("CPU");f.current.faceDetector=o.faceDetector,f.current.imageSegmenter=o.imageSegmenter}return f.current},T=c.useCallback((r,s,n)=>{const a=C.current,t=N.current;if(!a||!t)return;const l=r??m.current.zoom,o=s??m.current.h,Y=n??m.current.v,p=512;let d=ee.current;d||(d=document.createElement("canvas"),d.width=p,d.height=p,ee.current=d);const u=d.getContext("2d");u.clearRect(0,0,p,p),u.imageSmoothingEnabled=!0,u.imageSmoothingQuality="high";const i=t.baseDim*l,$=t.centerY-i*.42-Y*i,ae=t.centerX-i*.5+o*i;u.drawImage(a,ae,$,i,i,0,0,p,p),O(d.toDataURL("image/png"))},[]),ie=c.useCallback(async r=>{h(null),k(!0),y("processing");try{const{faceDetector:s,imageSegmenter:n}=await ce();let a=r.naturalWidth||r.width,t=r.naturalHeight||r.height;const l=1024;(a>l||t>l)&&(a>t?(t=Math.round(t*l/a),a=l):(a=Math.round(a*l/t),t=l));const o=document.createElement("canvas");o.width=a,o.height=t,o.getContext("2d",{willReadFrequently:!0}).drawImage(r,0,0,a,t);const d=s.detect(o).detections||[];if(d.length===0){k(!1),y("error"),h("No se detectó un rostro. Intenta con otra imagen.");return}let u=-1,i=d[0].boundingBox;for(const w of d){const v=w.boundingBox,S=(v?.width||0)*(v?.height||0);S>u&&(u=S,i=v)}const $={centerX:(i.originX||0)+(i.width||0)/2,centerY:(i.originY||0)+(i.height||0)/2,baseDim:Math.max(i.width||100,i.height||100)};N.current=$;const R=n.segment(o).confidenceMasks?.[0];if(!R)throw new Error("Error en segmentación.");const q=R.width,X=R.height,ge=R.getAsFloat32Array(),E=document.createElement("canvas");E.width=q,E.height=X;const se=E.getContext("2d",{willReadFrequently:!0}),D=se.createImageData(q,X);for(let w=0;w<q*X;w++){const v=ge[w];let S=0;v>.4&&(S=Math.round(Math.min(1,(v-.4)/.6)*255));const _=w*4;D.data[_]=255,D.data[_+1]=255,D.data[_+2]=255,D.data[_+3]=S}se.putImageData(D,0,0);const I=document.createElement("canvas");I.width=a,I.height=t;const F=I.getContext("2d");F.imageSmoothingEnabled=!0,F.imageSmoothingQuality="high",F.filter="blur(2px)",F.drawImage(E,0,0,a,t);const M=document.createElement("canvas");M.width=a,M.height=t;const V=M.getContext("2d",{willReadFrequently:!0});V.drawImage(o,0,0),V.globalCompositeOperation="destination-in",V.drawImage(I,0,0),C.current=M;const H=m.current;T(H.zoom,H.h,H.v),k(!1),y("done")}catch(s){console.error("Processing error:",s),k(!1),y("error"),h(s.message||"Error procesando la imagen.")}},[T]),U=r=>{if(!r.type.startsWith("image/")){h("Selecciona un archivo de imagen (JPG, PNG, WebP).");return}C.current=null,N.current=null,O(null),P(2.3),B(0),L(0),m.current={zoom:2.3,h:0,v:0};const s=new FileReader;s.onload=n=>{const a=n.target?.result;K(a);const t=new Image;t.crossOrigin="anonymous",t.onload=()=>{ie(t)},t.src=a},s.readAsDataURL(r)},le=r=>{r.preventDefault(),G(!0)},de=()=>G(!1),fe=r=>{r.preventDefault(),G(!1),r.dataTransfer.files?.[0]&&U(r.dataTransfer.files[0])};c.useEffect(()=>{const r=s=>{const n=s.clipboardData?.items;if(n){for(let a=0;a<n.length;a++)if(n[a].type.startsWith("image/")){const t=n[a].getAsFile();t&&U(t);break}}};return window.addEventListener("paste",r),()=>window.removeEventListener("paste",r)},[]);const W=(r,s,n)=>{P(r),B(s),L(n),m.current={zoom:r,h:s,v:n},C.current&&N.current&&T(r,s,n)},me=()=>{if(!g)return;const r=document.createElement("a");r.href=g,r.download=`avatar_${Date.now()}.png`,r.click()},te=()=>{C.current=null,N.current=null,y("idle"),k(!1),K(null),O(null),h(null),P(2.3),B(0),L(0),m.current={zoom:2.3,h:0,v:0}};return!ne||Q==="idle"?e.jsxs("div",{className:"fcs-root",children:[e.jsx("style",{children:J}),A&&e.jsxs("div",{className:"fcs-error",children:[e.jsxs("span",{children:["⚠️ ",A]}),e.jsx("button",{onClick:()=>h(null),children:"✕"})]}),e.jsxs("div",{className:`fcs-dropzone ${oe?"dragging":""}`,onDragOver:le,onDragLeave:de,onDrop:fe,onClick:()=>Z.current?.click(),children:[e.jsx("input",{ref:Z,type:"file",accept:"image/jpeg,image/png,image/webp",style:{display:"none"},onChange:r=>{r.target.files?.[0]&&U(r.target.files[0])}}),e.jsx("div",{className:"fcs-dropzone-icon",children:"📷"}),e.jsx("p",{className:"fcs-dropzone-title",children:"Arrastra tu foto aquí"}),e.jsx("p",{className:"fcs-dropzone-sub",children:"o haz clic para seleccionar · JPG, PNG, WebP"}),e.jsx("p",{className:"fcs-dropzone-hint",children:"También puedes pegar (Ctrl+V)"})]})]}):Q==="error"&&!j&&!g?e.jsxs("div",{className:"fcs-root",children:[e.jsx("style",{children:J}),e.jsxs("div",{className:"fcs-error-screen",children:[e.jsx("div",{className:"fcs-error-icon",children:"⚠️"}),e.jsx("p",{children:A}),e.jsx("button",{className:"fcs-btn fcs-btn-primary",onClick:te,children:"Intentar con otra foto"})]})]}):e.jsxs("div",{className:"fcs-root",children:[e.jsx("style",{children:J}),e.jsxs("div",{className:"fcs-result-layout",children:[e.jsxs("div",{className:"fcs-previews",children:[e.jsxs("div",{className:"fcs-preview-col",children:[e.jsx("p",{className:"fcs-preview-label",children:"Referencia"}),e.jsx("div",{className:"fcs-circle-frame",children:e.jsx("img",{src:"/mediapipe/reference_haaland.jpg",alt:"Referencia",className:"fcs-circle-img"})})]}),e.jsxs("div",{className:"fcs-preview-col",children:[e.jsx("p",{className:"fcs-preview-label",children:"Tu resultado"}),e.jsxs("div",{className:"fcs-circle-frame fcs-result-frame",children:[g&&e.jsx("img",{src:g,alt:"Resultado",className:`fcs-circle-img ${j?"fcs-dimmed":""}`}),j&&e.jsxs("div",{className:"fcs-circle-loading-overlay",children:[e.jsx("div",{className:"fcs-spinner"}),e.jsx("span",{className:"fcs-loading-text",children:"Cargando..."})]}),!g&&!j&&e.jsx("div",{className:"fcs-circle-placeholder",children:e.jsx("span",{children:"👤"})})]})]})]}),e.jsxs("div",{className:"fcs-controls",children:[e.jsxs("div",{className:"fcs-control-row",children:[e.jsx("label",{children:"🔍 Zoom"}),e.jsx("input",{type:"range",min:"1.2",max:"4.5",step:"0.05",value:z,onChange:r=>W(parseFloat(r.target.value),b,x)}),e.jsxs("span",{className:"fcs-control-value",children:[z.toFixed(1),"×"]})]}),e.jsxs("div",{className:"fcs-control-row",children:[e.jsx("label",{children:"↔️ Horizontal"}),e.jsx("input",{type:"range",min:"-0.3",max:"0.3",step:"0.01",value:b,onChange:r=>W(z,parseFloat(r.target.value),x)}),e.jsxs("span",{className:"fcs-control-value",children:[b>0?"+":"",(b*100).toFixed(0),"%"]})]}),e.jsxs("div",{className:"fcs-control-row",children:[e.jsx("label",{children:"↕️ Vertical"}),e.jsx("input",{type:"range",min:"-0.3",max:"0.3",step:"0.01",value:x,onChange:r=>W(z,b,parseFloat(r.target.value))}),e.jsxs("span",{className:"fcs-control-value",children:[x>0?"+":"",(x*100).toFixed(0),"%"]})]})]}),e.jsxs("div",{className:"fcs-actions",children:[e.jsx("button",{className:"fcs-btn fcs-btn-primary",onClick:me,disabled:j||!g,children:"📥 Descargar PNG"}),e.jsx("button",{className:"fcs-btn fcs-btn-ghost",onClick:te,children:"🔄 Otra foto"})]})]})]})}const J=`
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
`;export{he as default};
