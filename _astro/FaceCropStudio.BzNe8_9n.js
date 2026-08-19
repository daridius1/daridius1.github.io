import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as i}from"./index.DiEladB3.js";function je(){const[N,u]=i.useState("idle"),[te,f]=i.useState(""),[O,h]=i.useState(null),[Y,H]=i.useState(null),[ae,J]=i.useState(null),[z,Q]=i.useState(null),[b,_]=i.useState(2.3),[m,A]=i.useState(0),[g,P]=i.useState(0),[se,B]=i.useState(!1),X=i.useRef(null),l=i.useRef({visionModule:null,faceDetector:null,imageSegmenter:null}),ne=i.useRef(null),Z=async(r,t)=>{try{const s=await fetch(r);if(s.ok){const n=await s.arrayBuffer();if(n.byteLength>1e3)return new Uint8Array(n)}}catch(s){console.warn(`Local fetch failed for ${r}`,s)}const a=await fetch(t);if(!a.ok)throw new Error(`Cannot download model from ${t}`);return new Uint8Array(await a.arrayBuffer())},oe=async()=>{if(l.current.faceDetector&&l.current.imageSegmenter)return l.current;u("loading-models"),f("Cargando modelos de IA...");const r=o=>new Function("u","return import(u)")(o);let t=null;try{t=await r(`${window.location.origin}/mediapipe/vision_bundle.mjs`)}catch{try{t=await r("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/vision_bundle.mjs")}catch{throw new Error("No se pudo cargar el motor de visión.")}}l.current.visionModule=t;let a=null;try{a=await t.FilesetResolver.forVisionTasks("/mediapipe/wasm")}catch{try{a=await t.FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm")}catch(o){throw new Error(`Error WASM: ${o?.message||o}`)}}f("Descargando modelos neuronales...");const[s,n]=await Promise.all([Z("/mediapipe/models/blaze_face_short_range.tflite","https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite"),Z("/mediapipe/models/selfie_segmenter.tflite","https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite")]),C=async o=>({faceDetector:await t.FaceDetector.createFromOptions(a,{baseOptions:{modelAssetBuffer:s,delegate:o},runningMode:"IMAGE",minDetectionConfidence:.45}),imageSegmenter:await t.ImageSegmenter.createFromOptions(a,{baseOptions:{modelAssetBuffer:n,delegate:o},runningMode:"IMAGE",outputCategoryMask:!0,outputConfidenceMasks:!0})});try{f("Inicializando GPU...");const o=await C("GPU");l.current.faceDetector=o.faceDetector,l.current.imageSegmenter=o.imageSegmenter}catch{f("Inicializando CPU...");const o=await C("CPU");l.current.faceDetector=o.faceDetector,l.current.imageSegmenter=o.imageSegmenter}return l.current},L=i.useCallback(async(r,t,a,s)=>{const n=t??b,C=a??m,o=s??g,c=512;h(null);try{const{faceDetector:D,imageSegmenter:fe}=await oe();u("processing"),f("Detectando rostro...");const T=D.detect(r).detections||[];if(T.length===0){u("error"),h("No se detectó un rostro. Intenta con otra imagen.");return}let ee=-1,p=T[0].boundingBox;for(const d of T){const w=d.boundingBox,k=(w?.width||0)*(w?.height||0);k>ee&&(ee=k,p=w)}const me=(p.originX||0)+(p.width||0)/2,ge=(p.originY||0)+(p.height||0)/2,x=Math.max(p.width||100,p.height||100)*n,pe=ge-x*.42-o*x,ue=me-x*.5+C*x;f("Recortando y segmentando...");const v=document.createElement("canvas");v.width=c,v.height=c;const W=v.getContext("2d",{willReadFrequently:!0});W.imageSmoothingEnabled=!0,W.imageSmoothingQuality="high",W.drawImage(r,ue,pe,x,x,0,0,c,c);const S=fe.segment(v).confidenceMasks?.[0];if(!S)throw new Error("Error en segmentación.");const $=S.width,q=S.height,he=S.getAsFloat32Array(),R=document.createElement("canvas");R.width=$,R.height=q;const re=R.getContext("2d",{willReadFrequently:!0}),y=re.createImageData($,q);for(let d=0;d<$*q;d++){const w=he[d];let k=0;w>.4&&(k=Math.round(Math.min(1,(w-.4)/.6)*255));const F=d*4;y.data[F]=255,y.data[F+1]=255,y.data[F+2]=255,y.data[F+3]=k}re.putImageData(y,0,0);const E=document.createElement("canvas");E.width=c,E.height=c;const I=E.getContext("2d");I.imageSmoothingEnabled=!0,I.imageSmoothingQuality="high",I.filter="blur(2px)",I.drawImage(R,0,0,c,c);const j=document.createElement("canvas");j.width=c,j.height=c;const V=j.getContext("2d",{willReadFrequently:!0});V.drawImage(v,0,0),V.globalCompositeOperation="destination-in",V.drawImage(E,0,0),ne.current=j,j.toBlob(d=>{d&&Q(URL.createObjectURL(d))},"image/png",1),u("done"),f("¡Listo!")}catch(D){console.error("Processing error:",D),u("error"),h(D.message||"Error procesando la imagen.")}},[b,m,g]),G=r=>{if(!r.type.startsWith("image/")){h("Selecciona un archivo de imagen (JPG, PNG, WebP).");return}const t=new FileReader;t.onload=a=>{const s=a.target?.result;J(s);const n=new Image;n.crossOrigin="anonymous",n.onload=()=>{H(n),_(2.3),A(0),P(0),L(n,2.3,0,0)},n.src=s},t.readAsDataURL(r)},ie=r=>{r.preventDefault(),B(!0)},ce=()=>B(!1),le=r=>{r.preventDefault(),B(!1),r.dataTransfer.files?.[0]&&G(r.dataTransfer.files[0])};i.useEffect(()=>{const r=t=>{const a=t.clipboardData?.items;if(a){for(let s=0;s<a.length;s++)if(a[s].type.startsWith("image/")){const n=a[s].getAsFile();n&&G(n);break}}};return window.addEventListener("paste",r),()=>window.removeEventListener("paste",r)},[L]);const U=(r,t,a)=>{_(r),A(t),P(a),Y&&L(Y,r,t,a)},de=()=>{if(!z)return;const r=document.createElement("a");r.href=z,r.download=`avatar_${Date.now()}.png`,r.click()},K=()=>{u("idle"),H(null),J(null),Q(null),h(null),_(2.3),A(0),P(0)};return!ae||N==="idle"?e.jsxs("div",{className:"fcs-root",children:[e.jsx("style",{children:M}),O&&e.jsxs("div",{className:"fcs-error",children:[e.jsxs("span",{children:["⚠️ ",O]}),e.jsx("button",{onClick:()=>h(null),children:"✕"})]}),e.jsxs("div",{className:`fcs-dropzone ${se?"dragging":""}`,onDragOver:ie,onDragLeave:ce,onDrop:le,onClick:()=>X.current?.click(),children:[e.jsx("input",{ref:X,type:"file",accept:"image/jpeg,image/png,image/webp",style:{display:"none"},onChange:r=>{r.target.files?.[0]&&G(r.target.files[0])}}),e.jsx("div",{className:"fcs-dropzone-icon",children:"📷"}),e.jsx("p",{className:"fcs-dropzone-title",children:"Arrastra tu foto aquí"}),e.jsx("p",{className:"fcs-dropzone-sub",children:"o haz clic para seleccionar · JPG, PNG, WebP"}),e.jsx("p",{className:"fcs-dropzone-hint",children:"También puedes pegar (Ctrl+V)"})]})]}):N==="loading-models"||N==="processing"?e.jsxs("div",{className:"fcs-root",children:[e.jsx("style",{children:M}),e.jsxs("div",{className:"fcs-loading",children:[e.jsx("div",{className:"fcs-spinner"}),e.jsx("p",{children:te})]})]}):N==="error"?e.jsxs("div",{className:"fcs-root",children:[e.jsx("style",{children:M}),e.jsxs("div",{className:"fcs-error-screen",children:[e.jsx("div",{className:"fcs-error-icon",children:"⚠️"}),e.jsx("p",{children:O}),e.jsx("button",{className:"fcs-btn",onClick:K,children:"Intentar con otra foto"})]})]}):e.jsxs("div",{className:"fcs-root",children:[e.jsx("style",{children:M}),e.jsxs("div",{className:"fcs-result-layout",children:[e.jsxs("div",{className:"fcs-previews",children:[e.jsxs("div",{className:"fcs-preview-col",children:[e.jsx("p",{className:"fcs-preview-label",children:"Referencia"}),e.jsx("div",{className:"fcs-circle-frame",children:e.jsx("img",{src:"/mediapipe/reference_haaland.jpg",alt:"Referencia",className:"fcs-circle-img"})})]}),e.jsxs("div",{className:"fcs-preview-col",children:[e.jsx("p",{className:"fcs-preview-label",children:"Tu resultado"}),e.jsx("div",{className:"fcs-circle-frame",children:z?e.jsx("img",{src:z,alt:"Resultado",className:"fcs-circle-img"}):e.jsx("div",{className:"fcs-circle-placeholder",children:"..."})})]})]}),e.jsxs("div",{className:"fcs-controls",children:[e.jsxs("div",{className:"fcs-control-row",children:[e.jsx("label",{children:"🔍 Zoom"}),e.jsx("input",{type:"range",min:"1.2",max:"4.5",step:"0.05",value:b,onChange:r=>U(parseFloat(r.target.value),m,g)}),e.jsxs("span",{className:"fcs-control-value",children:[b.toFixed(1),"×"]})]}),e.jsxs("div",{className:"fcs-control-row",children:[e.jsx("label",{children:"↔️ Horizontal"}),e.jsx("input",{type:"range",min:"-0.3",max:"0.3",step:"0.01",value:m,onChange:r=>U(b,parseFloat(r.target.value),g)}),e.jsxs("span",{className:"fcs-control-value",children:[m>0?"+":"",(m*100).toFixed(0),"%"]})]}),e.jsxs("div",{className:"fcs-control-row",children:[e.jsx("label",{children:"↕️ Vertical"}),e.jsx("input",{type:"range",min:"-0.3",max:"0.3",step:"0.01",value:g,onChange:r=>U(b,m,parseFloat(r.target.value))}),e.jsxs("span",{className:"fcs-control-value",children:[g>0?"+":"",(g*100).toFixed(0),"%"]})]})]}),e.jsxs("div",{className:"fcs-actions",children:[e.jsx("button",{className:"fcs-btn fcs-btn-primary",onClick:de,children:"📥 Descargar PNG"}),e.jsx("button",{className:"fcs-btn fcs-btn-ghost",onClick:K,children:"🔄 Otra foto"})]})]})]})}const M=`
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

/* Loading */
.fcs-loading {
    text-align: center;
    padding: 4rem 1rem;
}
.fcs-loading p {
    margin-top: 1.5rem;
    font-size: 0.95rem;
    color: rgba(148, 163, 184, 0.9);
}
.fcs-spinner {
    width: 44px;
    height: 44px;
    border: 3px solid rgba(96, 165, 250, 0.2);
    border-top-color: #60a5fa;
    border-radius: 50%;
    margin: 0 auto;
    animation: fcs-spin 0.8s linear infinite;
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
    color: rgba(148, 163, 184, 0.4);
    font-size: 1.5rem;
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
}
.fcs-control-row input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    background: #60a5fa;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 8px rgba(96, 165, 250, 0.4);
    transition: transform 0.15s ease;
}
.fcs-control-row input[type="range"]::-webkit-slider-thumb:hover {
    transform: scale(1.2);
}
.fcs-control-row input[type="range"]::-moz-range-thumb {
    width: 18px;
    height: 18px;
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
.fcs-btn-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
    color: #fff;
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25);
}
.fcs-btn-primary:hover {
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
`;export{je as default};
