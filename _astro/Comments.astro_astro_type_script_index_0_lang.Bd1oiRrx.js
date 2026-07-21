function M(){const l=document.getElementById("comment-form"),d=document.getElementById("comments-list"),y=document.getElementById("captcha-question"),a=document.getElementById("comment-message"),m=document.getElementById("submit-btn"),C=document.getElementById("comments-count"),h=document.getElementById("reply-indicator"),E=document.getElementById("reply-target-name"),I=document.getElementById("cancel-reply-btn");if(!l||!d||!y||!a||!m||!C||l.dataset.inited==="true")return;l.dataset.inited="true";const w=l.dataset.slug||window.location.pathname,$="https://beauchap.daridius.cl";let v=null,u=Math.floor(Math.random()*8)+2,p=Math.floor(Math.random()*8)+1,B=u+p;y.textContent=`¿Cuánto es ${u} + ${p}?`;function _(){u=Math.floor(Math.random()*8)+2,p=Math.floor(Math.random()*8)+1,B=u+p,y.textContent=`¿Cuánto es ${u} + ${p}?`;const t=document.getElementById("captcha_answer");t&&(t.value="")}function g(t,o){v=t,t&&o&&h&&E?(E.textContent=`@${o}`,h.style.display="flex",l.scrollIntoView({behavior:"smooth",block:"center"})):h&&(h.style.display="none",v=null)}I&&I.addEventListener("click",()=>g(null,null));async function x(){try{const t=await fetch(`${$}/api/collections/blog_comments/records?filter=(post_slug='${encodeURIComponent(w)}')&sort=created`);if(!t.ok)throw new Error("Error al consultar servidor");const n=(await t.json()).items||[];C.textContent=`(${n.length})`,N(n)}catch(t){console.error("Error fetching comments:",t),d.innerHTML='<div class="empty-state">No se pudieron cargar los comentarios.</div>'}}function N(t){if(t.length===0){d.innerHTML='<div class="empty-state">Sin comentarios aún. ¡Sé el primero en opinar!</div>';return}const o=t.filter(e=>!e.reply_to),n={};t.forEach(e=>{e.reply_to&&(n[e.reply_to]||(n[e.reply_to]=[]),n[e.reply_to].push(e))});const s=new Set(o.map(e=>e.id));t.forEach(e=>{e.reply_to&&!s.has(e.reply_to)&&!n[e.reply_to]&&o.push(e)}),d.innerHTML=o.map(e=>S(e,n[e.id]||[])).join(""),d.querySelectorAll(".reply-btn").forEach(e=>{e.addEventListener("click",i=>{const c=i.currentTarget,r=c.dataset.commentId,b=c.dataset.authorName;r&&b&&g(r,b)})})}function S(t,o){const n=f(t.author_name||"Anónimo"),s=n.charAt(0).toUpperCase(),e=t.created?L(new Date(t.created)):"",i=f(t.content||"").replace(/\n/g,"<br/>"),c=o.length>0?`<div class="comment-replies">
                    ${o.map(r=>T(r)).join("")}
                   </div>`:"";return`
                <div class="comment-card-wrapper" id="comment-${t.id}">
                    <div class="comment-card">
                        <div class="comment-header">
                            <div class="author-info">
                                <div class="avatar">${s}</div>
                                <span class="author-name">${n}</span>
                            </div>
                            <span class="comment-date">${e}</span>
                        </div>
                        <div class="comment-body">${i}</div>
                        <div class="comment-footer">
                            <button type="button" class="reply-btn" data-comment-id="${t.id}" data-author-name="${n}">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path></svg>
                                Responder
                            </button>
                        </div>
                    </div>
                    ${c}
                </div>
            `}function T(t){const o=f(t.author_name||"Anónimo"),n=o.charAt(0).toUpperCase(),s=t.created?L(new Date(t.created)):"",e=f(t.content||"").replace(/\n/g,"<br/>");return`
                <div class="comment-card reply-card" id="comment-${t.id}">
                    <div class="comment-header">
                        <div class="author-info">
                            <div class="avatar avatar-small">${n}</div>
                            <span class="author-name">${o}</span>
                        </div>
                        <span class="comment-date">${s}</span>
                    </div>
                    <div class="comment-body">${e}</div>
                </div>
            `}function L(t){return t.toLocaleDateString("es-CL",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"})}function f(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}l.addEventListener("submit",async t=>{t.preventDefault(),a.textContent="",a.className="form-message";const o=document.getElementById("author_name"),n=document.getElementById("content"),s=document.getElementById("captcha_answer"),e=o.value.trim(),i=n.value.trim(),c=parseInt(s.value.trim(),10);if(!e||!i){a.textContent="Por favor completa tu nombre y el comentario.",a.className="form-message error";return}if(isNaN(c)||c!==B){a.textContent="Respuesta del control anti-bot incorrecta. Inténtalo de nuevo.",a.className="form-message error",_();return}m.disabled=!0,m.textContent="Publicando...";try{const r={post_slug:w,author_name:e,content:i};if(v&&(r.reply_to=v),!(await fetch(`${$}/api/collections/blog_comments/records`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})).ok)throw new Error("Respuesta inválida del servidor");n.value="",s.value="",g(null,null),_(),a.textContent="¡Comentario publicado exitosamente!",a.className="form-message success",await x()}catch(r){console.error("Error submitting comment:",r),a.textContent="Ocurrió un error al enviar el comentario. Revisa tu conexión.",a.className="form-message error"}finally{m.disabled=!1,m.textContent="Publicar comentario"}}),x()}document.addEventListener("DOMContentLoaded",M);document.addEventListener("astro:page-load",M);
