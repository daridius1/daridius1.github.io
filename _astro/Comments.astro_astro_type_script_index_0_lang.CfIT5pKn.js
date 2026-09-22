function e(){let e=document.getElementById(`comment-form`),t=document.getElementById(`comments-list`),n=document.getElementById(`captcha-question`),r=document.getElementById(`comment-message`),i=document.getElementById(`submit-btn`),a=document.getElementById(`comments-count`),o=document.getElementById(`reply-indicator`),s=document.getElementById(`reply-target-name`),c=document.getElementById(`cancel-reply-btn`);if(!e||!t||!n||!r||!i||!a||e.dataset.inited===`true`)return;e.dataset.inited=`true`;let l=e.dataset.slug||window.location.pathname,u=`https://beauchapp.daridius.cl`,d=null,f=Math.floor(Math.random()*8)+2,p=Math.floor(Math.random()*8)+1,m=f+p;n.textContent=`¿Cuánto es ${f} + ${p}?`;function h(){f=Math.floor(Math.random()*8)+2,p=Math.floor(Math.random()*8)+1,m=f+p,n.textContent=`¿Cuánto es ${f} + ${p}?`;let e=document.getElementById(`captcha_answer`);e&&(e.value=``)}function g(t,n){d=t,t&&n&&o&&s?(s.textContent=`@${n}`,o.style.display=`flex`,e.scrollIntoView({behavior:`smooth`,block:`center`})):o&&(o.style.display=`none`,d=null)}c&&c.addEventListener(`click`,()=>g(null,null));async function _(){try{let e=await fetch(`${u}/api/collections/blog_comments/records?filter=(post_slug='${encodeURIComponent(l)}')&sort=created`);if(!e.ok)throw Error(`Error al consultar servidor`);let t=(await e.json()).items||[];a.textContent=`(${t.length})`,v(t)}catch(e){console.error(`Error fetching comments:`,e),t.innerHTML=`<div class="empty-state">No se pudieron cargar los comentarios.</div>`}}function v(e){if(e.length===0){t.innerHTML=`<div class="empty-state">Sin comentarios aún. ¡Sé el primero en opinar!</div>`;return}let n=e.filter(e=>!e.reply_to),r={};e.forEach(e=>{e.reply_to&&(r[e.reply_to]||(r[e.reply_to]=[]),r[e.reply_to].push(e))});let i=new Set(n.map(e=>e.id));e.forEach(e=>{e.reply_to&&!i.has(e.reply_to)&&!r[e.reply_to]&&n.push(e)}),t.innerHTML=n.map(e=>y(e,r[e.id]||[])).join(``),t.querySelectorAll(`.reply-btn`).forEach(e=>{e.addEventListener(`click`,e=>{let t=e.currentTarget,n=t.dataset.commentId,r=t.dataset.authorName;n&&r&&g(n,r)})})}function y(e,t){let n=S(e.author_name||`Anónimo`),r=n.charAt(0).toUpperCase(),i=e.created?x(new Date(e.created)):``,a=S(e.content||``).replace(/\n/g,`<br/>`),o=t.length>0?`<div class="comment-replies">
                    ${t.map(e=>b(e)).join(``)}
                   </div>`:``;return`
                <div class="comment-card-wrapper" id="comment-${e.id}">
                    <div class="comment-card">
                        <div class="comment-header">
                            <div class="author-info">
                                <div class="avatar">${r}</div>
                                <span class="author-name">${n}</span>
                            </div>
                            <span class="comment-date">${i}</span>
                        </div>
                        <div class="comment-body">${a}</div>
                        <div class="comment-footer">
                            <button type="button" class="reply-btn" data-comment-id="${e.id}" data-author-name="${n}">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"></polyline><path d="M20 18v-2a4 4 0 0 0-4-4H4"></path></svg>
                                Responder
                            </button>
                        </div>
                    </div>
                    ${o}
                </div>
            `}function b(e){let t=S(e.author_name||`Anónimo`),n=t.charAt(0).toUpperCase(),r=e.created?x(new Date(e.created)):``,i=S(e.content||``).replace(/\n/g,`<br/>`);return`
                <div class="comment-card reply-card" id="comment-${e.id}">
                    <div class="comment-header">
                        <div class="author-info">
                            <div class="avatar avatar-small">${n}</div>
                            <span class="author-name">${t}</span>
                        </div>
                        <span class="comment-date">${r}</span>
                    </div>
                    <div class="comment-body">${i}</div>
                </div>
            `}function x(e){return e.toLocaleDateString(`es-CL`,{day:`numeric`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`})}function S(e){return e.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/"/g,`&quot;`).replace(/'/g,`&#039;`)}e.addEventListener(`submit`,async e=>{e.preventDefault(),r.textContent=``,r.className=`form-message`;let t=document.getElementById(`author_name`),n=document.getElementById(`content`),a=document.getElementById(`captcha_answer`),o=t.value.trim(),s=n.value.trim(),c=parseInt(a.value.trim(),10);if(!o||!s){r.textContent=`Por favor completa tu nombre y el comentario.`,r.className=`form-message error`;return}if(isNaN(c)||c!==m){r.textContent=`Respuesta del control anti-bot incorrecta. Inténtalo de nuevo.`,r.className=`form-message error`,h();return}i.disabled=!0,i.textContent=`Publicando...`;try{let e={post_slug:l,author_name:o,content:s};if(d&&(e.reply_to=d),!(await fetch(`${u}/api/collections/blog_comments/records`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(e)})).ok)throw Error(`Respuesta inválida del servidor`);n.value=``,a.value=``,g(null,null),h(),r.textContent=`¡Comentario publicado exitosamente!`,r.className=`form-message success`,await _()}catch(e){console.error(`Error submitting comment:`,e),r.textContent=`Ocurrió un error al enviar el comentario. Revisa tu conexión.`,r.className=`form-message error`}finally{i.disabled=!1,i.textContent=`Publicar comentario`}}),_()}document.addEventListener(`DOMContentLoaded`,e),document.addEventListener(`astro:page-load`,e);