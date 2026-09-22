import{r as e,t}from"./react.ADnQu87e.js";import{t as n}from"./jsx-runtime.Bmd7iEuj.js";var r=e(t(),1),i=n();function a(){let[e,t]=(0,r.useState)(`idle`),[n,a]=(0,r.useState)(null),[s,c]=(0,r.useState)(null),[l,u]=(0,r.useState)(null),[d,f]=(0,r.useState)(2.3),[p,m]=(0,r.useState)(0),[h,g]=(0,r.useState)(0),[_,v]=(0,r.useState)(!1),y=(0,r.useRef)(null),b=(0,r.useRef)({visionModule:null,faceDetector:null,imageSegmenter:null}),x=(0,r.useRef)(null),S=(0,r.useRef)(null),C=(0,r.useRef)(null),w=(0,r.useRef)({zoom:2.3,h:0,v:0});w.current={zoom:d,h:p,v:h};let T=async(e,t)=>{try{let t=await fetch(e);if(t.ok){let e=await t.arrayBuffer();if(e.byteLength>1e3)return new Uint8Array(e)}}catch{}let n=await fetch(t);if(!n.ok)throw Error(`Error descargando modelo`);return new Uint8Array(await n.arrayBuffer())},E=async()=>{if(b.current.faceDetector&&b.current.imageSegmenter)return b.current;let e=e=>Function(`u`,`return import(u)`)(e),t=null;try{t=await e(`${window.location.origin}/mediapipe/vision_bundle.mjs`)}catch{try{t=await e(`https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/vision_bundle.mjs`)}catch{throw Error(`No se pudo cargar el motor de visión.`)}}b.current.visionModule=t;let n=null;try{n=await t.FilesetResolver.forVisionTasks(`/mediapipe/wasm`)}catch{try{n=await t.FilesetResolver.forVisionTasks(`https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm`)}catch(e){throw Error(`Error al inicializar IA: ${e?.message||e}`)}}let[r,i]=await Promise.all([T(`/mediapipe/models/blaze_face_short_range.tflite`,`https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite`),T(`/mediapipe/models/selfie_segmenter.tflite`,`https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/latest/selfie_segmenter.tflite`)]),a=async e=>({faceDetector:await t.FaceDetector.createFromOptions(n,{baseOptions:{modelAssetBuffer:r,delegate:e},runningMode:`IMAGE`,minDetectionConfidence:.45}),imageSegmenter:await t.ImageSegmenter.createFromOptions(n,{baseOptions:{modelAssetBuffer:i,delegate:e},runningMode:`IMAGE`,outputCategoryMask:!0,outputConfidenceMasks:!0})});try{let e=await a(`GPU`);b.current.faceDetector=e.faceDetector,b.current.imageSegmenter=e.imageSegmenter}catch{let e=await a(`CPU`);b.current.faceDetector=e.faceDetector,b.current.imageSegmenter=e.imageSegmenter}return b.current},D=(0,r.useCallback)((e,t,n)=>{let r=x.current,i=S.current;if(!r||!i)return;let a=e??w.current.zoom,o=t??w.current.h,s=n??w.current.v,c=C.current;c||(c=document.createElement(`canvas`),c.width=512,c.height=512,C.current=c);let l=c.getContext(`2d`);l.clearRect(0,0,512,512),l.imageSmoothingEnabled=!0,l.imageSmoothingQuality=`high`;let d=i.baseDim*a,f=i.centerY-d*.42-s*d,p=i.centerX-d*.5+o*d;l.drawImage(r,p,f,d,d,0,0,512,512),u(c.toDataURL(`image/png`))},[]),O=(0,r.useCallback)(async e=>{a(null),t(`processing`);try{let{faceDetector:n,imageSegmenter:r}=await E(),i=e.naturalWidth||e.width,o=e.naturalHeight||e.height,s=1024;(i>s||o>s)&&(i>o?(o=Math.round(o*s/i),i=s):(i=Math.round(i*s/o),o=s));let c=document.createElement(`canvas`);c.width=i,c.height=o,c.getContext(`2d`,{willReadFrequently:!0}).drawImage(e,0,0,i,o);let l=n.detect(c).detections||[];if(l.length===0){t(`error`),a(`No se detectó un rostro. Intenta con otra imagen.`);return}let u=-1,d=l[0].boundingBox;for(let e of l){let t=e.boundingBox,n=(t?.width||0)*(t?.height||0);n>u&&(u=n,d=t)}let f={centerX:(d.originX||0)+(d.width||0)/2,centerY:(d.originY||0)+(d.height||0)/2,baseDim:Math.max(d.width||100,d.height||100)};S.current=f;let p=r.segment(c).confidenceMasks?.[0];if(!p)throw Error(`Error en segmentación.`);let m=p.width,h=p.height,g=p.getAsFloat32Array(),_=document.createElement(`canvas`);_.width=m,_.height=h;let v=_.getContext(`2d`,{willReadFrequently:!0}),y=v.createImageData(m,h);for(let e=0;e<m*h;e++){let t=g[e],n=0;t>.4&&(n=Math.round(Math.min(1,(t-.4)/.6)*255));let r=e*4;y.data[r]=255,y.data[r+1]=255,y.data[r+2]=255,y.data[r+3]=n}v.putImageData(y,0,0);let b=document.createElement(`canvas`);b.width=i,b.height=o;let C=b.getContext(`2d`);C.imageSmoothingEnabled=!0,C.imageSmoothingQuality=`high`,C.filter=`blur(2px)`,C.drawImage(_,0,0,i,o);let T=document.createElement(`canvas`);T.width=i,T.height=o;let O=T.getContext(`2d`,{willReadFrequently:!0});O.drawImage(c,0,0),O.globalCompositeOperation=`destination-in`,O.drawImage(b,0,0),x.current=T;let k=w.current;D(k.zoom,k.h,k.v),t(`done`)}catch(e){console.error(`Processing error:`,e),t(`error`),a(e.message||`Error procesando la imagen.`)}},[D]),k=e=>{if(!e.type.startsWith(`image/`)){a(`Selecciona un archivo de imagen (JPG, PNG, WebP).`);return}x.current=null,S.current=null,u(null),f(2.3),m(0),g(0),w.current={zoom:2.3,h:0,v:0};let t=new FileReader;t.onload=e=>{let t=e.target?.result;c(t);let n=new Image;n.crossOrigin=`anonymous`,n.onload=()=>{O(n)},n.src=t},t.readAsDataURL(e)},A=e=>{e.preventDefault(),v(!0)},j=()=>v(!1),M=e=>{e.preventDefault(),v(!1),e.dataTransfer.files?.[0]&&k(e.dataTransfer.files[0])};(0,r.useEffect)(()=>{let e=e=>{let t=e.clipboardData?.items;if(t){for(let e=0;e<t.length;e++)if(t[e].type.startsWith(`image/`)){let n=t[e].getAsFile();n&&k(n);break}}};return window.addEventListener(`paste`,e),()=>window.removeEventListener(`paste`,e)},[]);let N=(e,t,n)=>{f(e),m(t),g(n),w.current={zoom:e,h:t,v:n},x.current&&S.current&&D(e,t,n)},P=()=>{if(!l)return;let e=document.createElement(`a`);e.href=l,e.download=`avatar_${Date.now()}.png`,e.click()},F=()=>{x.current=null,S.current=null,t(`idle`),c(null),u(null),a(null),f(2.3),m(0),g(0),w.current={zoom:2.3,h:0,v:0}};return!s||e===`idle`?(0,i.jsxs)(`div`,{className:`fcs-root`,children:[(0,i.jsx)(`style`,{children:o}),n&&(0,i.jsxs)(`div`,{className:`fcs-error`,children:[(0,i.jsxs)(`span`,{children:[`⚠️ `,n]}),(0,i.jsx)(`button`,{onClick:()=>a(null),children:`✕`})]}),(0,i.jsxs)(`div`,{className:`fcs-dropzone ${_?`dragging`:``}`,onDragOver:A,onDragLeave:j,onDrop:M,onClick:()=>y.current?.click(),children:[(0,i.jsx)(`input`,{ref:y,type:`file`,accept:`image/jpeg,image/png,image/webp`,style:{display:`none`},onChange:e=>{e.target.files?.[0]&&k(e.target.files[0])}}),(0,i.jsx)(`div`,{className:`fcs-dropzone-icon`,children:`📷`}),(0,i.jsx)(`p`,{className:`fcs-dropzone-title`,children:`Arrastra tu foto aquí`}),(0,i.jsx)(`p`,{className:`fcs-dropzone-sub`,children:`o haz clic para seleccionar · JPG, PNG, WebP`}),(0,i.jsx)(`p`,{className:`fcs-dropzone-hint`,children:`También puedes pegar (Ctrl+V)`})]})]}):e===`processing`?(0,i.jsxs)(`div`,{className:`fcs-root`,children:[(0,i.jsx)(`style`,{children:o}),(0,i.jsxs)(`div`,{className:`fcs-loading-screen`,children:[(0,i.jsx)(`div`,{className:`fcs-loading-icon-wrap`,children:(0,i.jsx)(`div`,{className:`fcs-spinner-large`})}),(0,i.jsx)(`h3`,{className:`fcs-loading-title`,children:`Cargando...`}),(0,i.jsx)(`div`,{className:`fcs-progress-bar-wrap`,children:(0,i.jsx)(`div`,{className:`fcs-progress-bar-fill`})})]})]}):e===`error`?(0,i.jsxs)(`div`,{className:`fcs-root`,children:[(0,i.jsx)(`style`,{children:o}),(0,i.jsxs)(`div`,{className:`fcs-error-screen`,children:[(0,i.jsx)(`div`,{className:`fcs-error-icon`,children:`⚠️`}),(0,i.jsx)(`p`,{children:n}),(0,i.jsx)(`button`,{className:`fcs-btn fcs-btn-primary`,onClick:F,children:`Intentar con otra foto`})]})]}):(0,i.jsxs)(`div`,{className:`fcs-root`,children:[(0,i.jsx)(`style`,{children:o}),(0,i.jsxs)(`div`,{className:`fcs-result-layout`,children:[(0,i.jsxs)(`div`,{className:`fcs-previews`,children:[(0,i.jsxs)(`div`,{className:`fcs-preview-col`,children:[(0,i.jsx)(`p`,{className:`fcs-preview-label`,children:`Referencia`}),(0,i.jsx)(`div`,{className:`fcs-circle-frame`,children:(0,i.jsx)(`img`,{src:`/mediapipe/reference_haaland.jpg`,alt:`Referencia`,className:`fcs-circle-img`})})]}),(0,i.jsxs)(`div`,{className:`fcs-preview-col`,children:[(0,i.jsx)(`p`,{className:`fcs-preview-label`,children:`Tu resultado`}),(0,i.jsx)(`div`,{className:`fcs-circle-frame fcs-result-frame`,children:l?(0,i.jsx)(`img`,{src:l,alt:`Resultado`,className:`fcs-circle-img`}):(0,i.jsx)(`div`,{className:`fcs-circle-placeholder`,children:(0,i.jsx)(`span`,{children:`👤`})})})]})]}),(0,i.jsxs)(`div`,{className:`fcs-controls`,children:[(0,i.jsxs)(`div`,{className:`fcs-control-row`,children:[(0,i.jsx)(`label`,{children:`🔍 Zoom`}),(0,i.jsx)(`input`,{type:`range`,min:`1.2`,max:`4.5`,step:`0.05`,value:d,onChange:e=>N(parseFloat(e.target.value),p,h)}),(0,i.jsxs)(`span`,{className:`fcs-control-value`,children:[d.toFixed(1),`×`]})]}),(0,i.jsxs)(`div`,{className:`fcs-control-row`,children:[(0,i.jsx)(`label`,{children:`↔️ Horizontal`}),(0,i.jsx)(`input`,{type:`range`,min:`-0.3`,max:`0.3`,step:`0.01`,value:p,onChange:e=>N(d,parseFloat(e.target.value),h)}),(0,i.jsxs)(`span`,{className:`fcs-control-value`,children:[p>0?`+`:``,(p*100).toFixed(0),`%`]})]}),(0,i.jsxs)(`div`,{className:`fcs-control-row`,children:[(0,i.jsx)(`label`,{children:`↕️ Vertical`}),(0,i.jsx)(`input`,{type:`range`,min:`-0.3`,max:`0.3`,step:`0.01`,value:h,onChange:e=>N(d,p,parseFloat(e.target.value))}),(0,i.jsxs)(`span`,{className:`fcs-control-value`,children:[h>0?`+`:``,(h*100).toFixed(0),`%`]})]})]}),(0,i.jsxs)(`div`,{className:`fcs-actions`,children:[(0,i.jsx)(`button`,{className:`fcs-btn fcs-btn-primary`,onClick:P,disabled:!l,children:`📥 Descargar PNG`}),(0,i.jsx)(`button`,{className:`fcs-btn fcs-btn-ghost`,onClick:F,children:`🔄 Otra foto`})]})]})]})}var o=`
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
`;export{a as default};