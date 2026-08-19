import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DiEladB3.js";function pe(){const[_,v]=i.useState("idle"),[A,u]=i.useState(null),[ae,J]=i.useState(null),[y,O]=i.useState(null),[j,P]=i.useState(2.3),[h,B]=i.useState(0),[b,L]=i.useState(0),[se,G]=i.useState(!1),Q=i.useRef(null),f=i.useRef({visionModule:null,faceDetector:null,imageSegmenter:null}),k=i.useRef(null),z=i.useRef(null),K=i.useRef(null),m=i.useRef({zoom:2.3,h:0,v:0});m.current={zoom:j,h,v:b};const Z=async(r,s)=>{try{const a=await fetch(r);if(a.ok){const t=await a.arrayBuffer();if(t.byteLength>1e3)return new Uint8Array(t)}}catch{}const n=await fetch(s);if(!n.ok)throw new Error("Error descargando modelo");return new Uint8Array(await n.arrayBuffer())},ne=async()=>{if(f.current.faceDetector&&f.current.imageSegmenter)return f.current;const r=o=>new Function("u","return import(u)")(o);let s=null;try{s=await r(`${window.location.origin}/mediapipe/vision_bundle.mjs`)}catch{try{s=await r("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/vision_bundle.mjs")}catch{throw new Error("No se pudo cargar el motor de visión.")}}f.current.visionModule=s;let n=null;try{n=await s.FilesetResolver.forVisionTasks("/mediapipe/wasm")}catch{try{n=await s.FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm")}catch(o){throw new Error(`Error al inicializar IA: ${o?.message||o}`)}}const[a,t]=await Promise.all([Z("/mediapipe/models/blaze_face_short_range.tflite","https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite"),Z("/mediapipe/models/selfie_segmenter.tflite","https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite")]),l=async o=>({faceDetector:await s.FaceDetector.createFromOptions(n,{baseOptions:{modelAssetBuffer:a,delegate:o},runningMode:"IMAGE",minDetectionConfidence:.45}),imageSegmenter:await s.ImageSegmenter.createFromOptions(n,{baseOptions:{modelAssetBuffer:t,delegate:o},runningMode:"IMAGE",outputCategoryMask:!0,outputConfidenceMasks:!0})});try{const o=await l("GPU");f.current.faceDetector=o.faceDetector,f.current.imageSegmenter=o.imageSegmenter}catch{const o=await l("CPU");f.current.faceDetector=o.faceDetector,f.current.imageSegmenter=o.imageSegmenter}return f.current},T=i.useCallback((r,s,n)=>{const a=k.current,t=z.current;if(!a||!t)return;const l=r??m.current.zoom,o=s??m.current.h,Y=n??m.current.v,g=512;let d=K.current;d||(d=document.createElement("canvas"),d.width=g,d.height=g,K.current=d);const p=d.getContext("2d");p.clearRect(0,0,g,g),p.imageSmoothingEnabled=!0,p.imageSmoothingQuality="high";const c=t.baseDim*l,q=t.centerY-c*.42-Y*c,re=t.centerX-c*.5+o*c;p.drawImage(a,re,q,c,c,0,0,g,g),O(d.toDataURL("image/png"))},[]),oe=i.useCallback(async r=>{u(null),v("processing");try{const{faceDetector:s,imageSegmenter:n}=await ne();let a=r.naturalWidth||r.width,t=r.naturalHeight||r.height;const l=1024;(a>l||t>l)&&(a>t?(t=Math.round(t*l/a),a=l):(a=Math.round(a*l/t),t=l));const o=document.createElement("canvas");o.width=a,o.height=t,o.getContext("2d",{willReadFrequently:!0}).drawImage(r,0,0,a,t);const d=s.detect(o).detections||[];if(d.length===0){v("error"),u("No se detectó un rostro. Intenta con otra imagen.");return}let p=-1,c=d[0].boundingBox;for(const x of d){const w=x.boundingBox,C=(w?.width||0)*(w?.height||0);C>p&&(p=C,c=w)}const q={centerX:(c.originX||0)+(c.width||0)/2,centerY:(c.originY||0)+(c.height||0)/2,baseDim:Math.max(c.width||100,c.height||100)};z.current=q;const D=n.segment(o).confidenceMasks?.[0];if(!D)throw new Error("Error en segmentación.");const X=D.width,$=D.height,fe=D.getAsFloat32Array(),S=document.createElement("canvas");S.width=X,S.height=$;const te=S.getContext("2d",{willReadFrequently:!0}),N=te.createImageData(X,$);for(let x=0;x<X*$;x++){const w=fe[x];let C=0;w>.4&&(C=Math.round(Math.min(1,(w-.4)/.6)*255));const F=x*4;N.data[F]=255,N.data[F+1]=255,N.data[F+2]=255,N.data[F+3]=C}te.putImageData(N,0,0);const R=document.createElement("canvas");R.width=a,R.height=t;const E=R.getContext("2d");E.imageSmoothingEnabled=!0,E.imageSmoothingQuality="high",E.filter="blur(2px)",E.drawImage(S,0,0,a,t);const I=document.createElement("canvas");I.width=a,I.height=t;const V=I.getContext("2d",{willReadFrequently:!0});V.drawImage(o,0,0),V.globalCompositeOperation="destination-in",V.drawImage(R,0,0),k.current=I;const H=m.current;T(H.zoom,H.h,H.v),v("done")}catch(s){console.error("Processing error:",s),v("error"),u(s.message||"Error procesando la imagen.")}},[T]),U=r=>{if(!r.type.startsWith("image/")){u("Selecciona un archivo de imagen (JPG, PNG, WebP).");return}k.current=null,z.current=null,O(null),P(2.3),B(0),L(0),m.current={zoom:2.3,h:0,v:0};const s=new FileReader;s.onload=n=>{const a=n.target?.result;J(a);const t=new Image;t.crossOrigin="anonymous",t.onload=()=>{oe(t)},t.src=a},s.readAsDataURL(r)},ie=r=>{r.preventDefault(),G(!0)},ce=()=>G(!1),le=r=>{r.preventDefault(),G(!1),r.dataTransfer.files?.[0]&&U(r.dataTransfer.files[0])};i.useEffect(()=>{const r=s=>{const n=s.clipboardData?.items;if(n){for(let a=0;a<n.length;a++)if(n[a].type.startsWith("image/")){const t=n[a].getAsFile();t&&U(t);break}}};return window.addEventListener("paste",r),()=>window.removeEventListener("paste",r)},[]);const W=(r,s,n)=>{P(r),B(s),L(n),m.current={zoom:r,h:s,v:n},k.current&&z.current&&T(r,s,n)},de=()=>{if(!y)return;const r=document.createElement("a");r.href=y,r.download=`avatar_${Date.now()}.png`,r.click()},ee=()=>{k.current=null,z.current=null,v("idle"),J(null),O(null),u(null),P(2.3),B(0),L(0),m.current={zoom:2.3,h:0,v:0}};return!ae||_==="idle"?e.jsxs("div",{className:"fcs-root",children:[e.jsx("style",{children:M}),A&&e.jsxs("div",{className:"fcs-error",children:[e.jsxs("span",{children:["⚠️ ",A]}),e.jsx("button",{onClick:()=>u(null),children:"✕"})]}),e.jsxs("div",{className:`fcs-dropzone ${se?"dragging":""}`,onDragOver:ie,onDragLeave:ce,onDrop:le,onClick:()=>Q.current?.click(),children:[e.jsx("input",{ref:Q,type:"file",accept:"image/jpeg,image/png,image/webp",style:{display:"none"},onChange:r=>{r.target.files?.[0]&&U(r.target.files[0])}}),e.jsx("div",{className:"fcs-dropzone-icon",children:"📷"}),e.jsx("p",{className:"fcs-dropzone-title",children:"Arrastra tu foto aquí"}),e.jsx("p",{className:"fcs-dropzone-sub",children:"o haz clic para seleccionar · JPG, PNG, WebP"}),e.jsx("p",{className:"fcs-dropzone-hint",children:"También puedes pegar (Ctrl+V)"})]})]}):_==="processing"?e.jsxs("div",{className:"fcs-root",children:[e.jsx("style",{children:M}),e.jsxs("div",{className:"fcs-loading-screen",children:[e.jsx("div",{className:"fcs-loading-icon-wrap",children:e.jsx("div",{className:"fcs-spinner-large"})}),e.jsx("h3",{className:"fcs-loading-title",children:"Cargando..."}),e.jsx("div",{className:"fcs-progress-bar-wrap",children:e.jsx("div",{className:"fcs-progress-bar-fill"})})]})]}):_==="error"?e.jsxs("div",{className:"fcs-root",children:[e.jsx("style",{children:M}),e.jsxs("div",{className:"fcs-error-screen",children:[e.jsx("div",{className:"fcs-error-icon",children:"⚠️"}),e.jsx("p",{children:A}),e.jsx("button",{className:"fcs-btn fcs-btn-primary",onClick:ee,children:"Intentar con otra foto"})]})]}):e.jsxs("div",{className:"fcs-root",children:[e.jsx("style",{children:M}),e.jsxs("div",{className:"fcs-result-layout",children:[e.jsxs("div",{className:"fcs-previews",children:[e.jsxs("div",{className:"fcs-preview-col",children:[e.jsx("p",{className:"fcs-preview-label",children:"Referencia"}),e.jsx("div",{className:"fcs-circle-frame",children:e.jsx("img",{src:"/mediapipe/reference_haaland.jpg",alt:"Referencia",className:"fcs-circle-img"})})]}),e.jsxs("div",{className:"fcs-preview-col",children:[e.jsx("p",{className:"fcs-preview-label",children:"Tu resultado"}),e.jsx("div",{className:"fcs-circle-frame fcs-result-frame",children:y?e.jsx("img",{src:y,alt:"Resultado",className:"fcs-circle-img"}):e.jsx("div",{className:"fcs-circle-placeholder",children:e.jsx("span",{children:"👤"})})})]})]}),e.jsxs("div",{className:"fcs-controls",children:[e.jsxs("div",{className:"fcs-control-row",children:[e.jsx("label",{children:"🔍 Zoom"}),e.jsx("input",{type:"range",min:"1.2",max:"4.5",step:"0.05",value:j,onChange:r=>W(parseFloat(r.target.value),h,b)}),e.jsxs("span",{className:"fcs-control-value",children:[j.toFixed(1),"×"]})]}),e.jsxs("div",{className:"fcs-control-row",children:[e.jsx("label",{children:"↔️ Horizontal"}),e.jsx("input",{type:"range",min:"-0.3",max:"0.3",step:"0.01",value:h,onChange:r=>W(j,parseFloat(r.target.value),b)}),e.jsxs("span",{className:"fcs-control-value",children:[h>0?"+":"",(h*100).toFixed(0),"%"]})]}),e.jsxs("div",{className:"fcs-control-row",children:[e.jsx("label",{children:"↕️ Vertical"}),e.jsx("input",{type:"range",min:"-0.3",max:"0.3",step:"0.01",value:b,onChange:r=>W(j,h,parseFloat(r.target.value))}),e.jsxs("span",{className:"fcs-control-value",children:[b>0?"+":"",(b*100).toFixed(0),"%"]})]})]}),e.jsxs("div",{className:"fcs-actions",children:[e.jsx("button",{className:"fcs-btn fcs-btn-primary",onClick:de,disabled:!y,children:"📥 Descargar PNG"}),e.jsx("button",{className:"fcs-btn fcs-btn-ghost",onClick:ee,children:"🔄 Otra foto"})]})]})]})}const M=`
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

/* Dedicated Loading Screen */
.fcs-loading-screen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 1.5rem;
    text-align: center;
    background: rgba(30, 41, 59, 0.4);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(148, 163, 184, 0.1);
    border-radius: 16px;
    gap: 1.5rem;
}
.fcs-loading-icon-wrap {
    position: relative;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.fcs-spinner-large {
    width: 54px;
    height: 54px;
    border: 3px solid rgba(96, 165, 250, 0.15);
    border-top-color: #60a5fa;
    border-right-color: #818cf8;
    border-radius: 50%;
    animation: fcs-spin 0.85s cubic-bezier(0.55, 0.15, 0.45, 0.85) infinite;
}
.fcs-loading-title {
    font-size: 1.15rem;
    font-weight: 600;
    color: #f1f5f9;
    margin: 0;
    letter-spacing: 0.01em;
}
.fcs-progress-bar-wrap {
    width: 100%;
    max-width: 260px;
    height: 5px;
    background: rgba(148, 163, 184, 0.15);
    border-radius: 999px;
    overflow: hidden;
    position: relative;
}
.fcs-progress-bar-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 40%;
    background: linear-gradient(90deg, #3b82f6, #818cf8, #3b82f6);
    background-size: 200% 100%;
    border-radius: 999px;
    animation: fcs-progress-indeterminate 1.4s ease-in-out infinite;
}
@keyframes fcs-progress-indeterminate {
    0% {
        left: -40%;
        width: 40%;
    }
    50% {
        left: 30%;
        width: 60%;
    }
    100% {
        left: 100%;
        width: 40%;
    }
}

@keyframes fcs-spin {
    to { transform: rotate(360deg); }
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
`;export{pe as default};
