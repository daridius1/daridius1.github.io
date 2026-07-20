import{j as e}from"./jsx-runtime.D_zvdyIk.js";import{r as c}from"./index.DiEladB3.js";function z(){const[t,u]=c.useState(12e3),[n,i]=c.useState([{id:"1",name:"Pasajero 1",soloQuote:6e3},{id:"2",name:"Pasajero 2",soloQuote:9e3}]),[f,p]=c.useState(!1),x=()=>{const r=n.length+1,a={id:Date.now().toString(),name:`Pasajero ${r}`,soloQuote:6e3};i([...n,a])},b=r=>{n.length<=2||i(n.filter(a=>a.id!==r))},h=(r,a)=>{i(n.map(s=>s.id===r?{...s,name:a}:s))},j=(r,a)=>{i(n.map(s=>s.id===r?{...s,soloQuote:Math.max(0,a||0)}:s))},d=n.reduce((r,a)=>r+(a.soloQuote||0),0),m=n.map(r=>{const a=r.soloQuote||0,s=d>0?a/d:1/n.length,g=t*s,v=a-g;return{person:r,solo:a,ratio:s,pay:Math.round(g),savings:Math.round(v)}}),l=d-t,o=r=>new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLP",maximumFractionDigits:0}).format(r),y=()=>{let r=`🚗 *Desglose Uber Combinado*

`;m.forEach(a=>{r+=`🔹 *${a.person.name}*: ${o(a.pay)} `,r+=`(Cotizó solo: ${o(a.solo)}`,a.savings>0&&(r+=`, Ahorró: ${o(a.savings)}`),r+=`)
`}),r+=`
*Costo Total Uber*: ${o(t)}
`,l>0&&(r+=`🎉 *Ahorro Total del Grupo*: ${o(l)}
`),r+=`
Calculado en daridius.cl/aplicaciones/uber`,navigator.clipboard.writeText(r),p(!0),setTimeout(()=>p(!1),2500)};return e.jsxs("div",{className:"uber-calculator",children:[e.jsxs("div",{className:"calc-card primary-card",children:[e.jsx("div",{className:"card-title-row",children:e.jsx("label",{htmlFor:"total-fare",children:"Costo Total del Viaje Uber"})}),e.jsxs("div",{className:"currency-input lg",children:[e.jsx("span",{className:"currency-symbol",children:"$"}),e.jsx("input",{id:"total-fare",type:"number",className:"input-num",value:t||"",onChange:r=>u(parseInt(r.target.value,10)||0),placeholder:"0",step:"100"})]})]}),e.jsxs("div",{className:"calc-card",children:[e.jsxs("div",{className:"card-header",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"Cotizaciones Individuales"}),e.jsx("p",{className:"card-subtitle",children:"Ingresa cuánto le salía el Uber a cada persona si se fuera sola."})]}),e.jsx("button",{className:"btn-secondary",onClick:x,children:"+ Agregar persona"})]}),e.jsx("div",{className:"passengers-list",children:n.map((r,a)=>e.jsxs("div",{className:"passenger-row",children:[e.jsxs("div",{className:"passenger-info",children:[e.jsxs("span",{className:"passenger-num",children:["#",a+1]}),e.jsx("input",{type:"text",className:"input-text",value:r.name,onChange:s=>h(r.id,s.target.value),placeholder:`Pasajero ${a+1}`})]}),e.jsxs("div",{className:"input-group",children:[e.jsx("label",{children:"Cotizó solo:"}),e.jsxs("div",{className:"currency-input",children:[e.jsx("span",{className:"currency-symbol",children:"$"}),e.jsx("input",{type:"number",className:"input-num",value:r.soloQuote||"",onChange:s=>j(r.id,parseInt(s.target.value,10)),placeholder:"0",step:"100"})]})]}),n.length>2&&e.jsx("button",{className:"btn-icon-danger",onClick:()=>b(r.id),title:"Quitar persona",children:"✕"})]},r.id))})]}),e.jsxs("div",{className:"results-section",children:[e.jsxs("div",{className:"results-header",children:[e.jsx("h2",{children:"Desglose de Pago por Persona"}),e.jsx("button",{className:"btn-primary",onClick:y,children:f?"✓ ¡Copiado al portapapeles!":"📋 Copiar resumen para WhatsApp"})]}),e.jsx("div",{className:"results-grid",children:m.map(r=>e.jsxs("div",{className:"result-card",children:[e.jsxs("div",{className:"result-card-header",children:[e.jsx("span",{className:"person-name",children:r.person.name}),e.jsxs("span",{className:"badge",children:[(r.ratio*100).toFixed(1),"% del total"]})]}),e.jsx("div",{className:"result-amount",children:o(r.pay)}),e.jsxs("div",{className:"result-details",children:[e.jsxs("div",{className:"detail-line",children:[e.jsx("span",{children:"Cotización individual:"}),e.jsx("span",{children:o(r.solo)})]}),r.savings>0?e.jsxs("div",{className:"detail-line savings-positive",children:[e.jsx("span",{children:"Ahorro:"}),e.jsxs("span",{children:[o(r.savings)," 🎉"]})]}):r.savings<0?e.jsxs("div",{className:"detail-line savings-negative",children:[e.jsx("span",{children:"Paga extra:"}),e.jsx("span",{children:o(Math.abs(r.savings))})]}):null]})]},r.person.id))}),e.jsxs("div",{className:"grand-total-card",children:[e.jsxs("div",{className:"total-item",children:[e.jsx("span",{children:"Costo Total del Viaje:"}),e.jsx("strong",{children:o(t)})]}),l>0&&e.jsxs("div",{className:"total-item savings-badge",children:[e.jsx("span",{children:"Ahorro Total del Grupo:"}),e.jsxs("strong",{children:[o(l)," 🎉"]})]})]})]}),e.jsx("style",{children:`
                .uber-calculator {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    width: 100%;
                    color: #fff;
                    margin-top: 1rem;
                }

                .calc-card {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .primary-card {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(255, 255, 255, 0.15);
                }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .card-header h2, .card-title-row label {
                    font-size: 1.2rem;
                    font-weight: 700;
                    color: #fff;
                    margin: 0;
                }

                .card-subtitle {
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.5);
                    margin-top: 0.25rem;
                }

                .currency-input {
                    display: flex;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    border-radius: 8px;
                    padding: 0 0.75rem;
                    color: rgba(255, 255, 255, 0.5);
                    font-weight: 600;
                }

                .currency-input.lg {
                    padding: 0.4rem 1rem;
                }

                .currency-input:focus-within {
                    border-color: #ffffff;
                    color: #ffffff;
                }

                .currency-symbol {
                    font-size: 1.1rem;
                }

                .currency-input.lg .currency-symbol {
                    font-size: 1.4rem;
                }

                .input-num {
                    background: transparent;
                    border: none;
                    color: #fff;
                    padding: 0.5rem 0.3rem;
                    font-size: 1rem;
                    width: 110px;
                    outline: none;
                    font-family: inherit;
                    font-weight: 600;
                }

                .currency-input.lg .input-num {
                    font-size: 1.5rem;
                    width: 100%;
                }

                .btn-secondary {
                    background: rgba(255, 255, 255, 0.08);
                    color: #fff;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.15);
                    border-color: rgba(255, 255, 255, 0.4);
                }

                .passengers-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.85rem;
                }

                .passenger-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 1rem;
                    padding: 0.75rem 1rem;
                    background: rgba(255, 255, 255, 0.03);
                    border-radius: 10px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    flex-wrap: wrap;
                }

                .passenger-info {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex: 1;
                    min-width: 180px;
                }

                .passenger-num {
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: rgba(255, 255, 255, 0.3);
                }

                .input-text {
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #fff;
                    padding: 0.5rem 0.75rem;
                    border-radius: 6px;
                    font-size: 0.95rem;
                    width: 100%;
                    outline: none;
                    transition: border-color 0.2s ease;
                }

                .input-text:focus {
                    border-color: #fff;
                }

                .input-group {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.6);
                }

                .btn-icon-danger {
                    background: transparent;
                    border: none;
                    color: rgba(255, 255, 255, 0.4);
                    cursor: pointer;
                    padding: 0.4rem;
                    font-size: 1rem;
                    border-radius: 4px;
                    transition: all 0.2s ease;
                }

                .btn-icon-danger:hover {
                    color: #ff4d4d;
                    background: rgba(255, 77, 77, 0.15);
                }

                .results-section {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                }

                .results-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .results-header h2 {
                    font-size: 1.35rem;
                    font-weight: 700;
                    margin: 0;
                }

                .btn-primary {
                    background: #ffffff;
                    color: #050505;
                    border: none;
                    padding: 0.65rem 1.25rem;
                    border-radius: 8px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .btn-primary:hover {
                    opacity: 0.9;
                    transform: translateY(-1px);
                }

                .results-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
                    gap: 1rem;
                }

                .result-card {
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 14px;
                    padding: 1.25rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    transition: all 0.2s ease;
                }

                .result-card:hover {
                    border-color: rgba(255, 255, 255, 0.25);
                    background: rgba(255, 255, 255, 0.05);
                }

                .result-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .person-name {
                    font-weight: 700;
                    font-size: 1.1rem;
                    color: #fff;
                }

                .badge {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    background: rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.8);
                    padding: 0.2rem 0.5rem;
                    border-radius: 4px;
                    font-weight: 600;
                }

                .result-amount {
                    font-size: 2.25rem;
                    font-weight: 800;
                    letter-spacing: -0.02em;
                    color: #ffffff;
                }

                .result-details {
                    display: flex;
                    flex-direction: column;
                    gap: 0.3rem;
                    font-size: 0.85rem;
                    color: rgba(255, 255, 255, 0.5);
                    border-top: 1px dashed rgba(255, 255, 255, 0.1);
                    padding-top: 0.65rem;
                }

                .detail-line {
                    display: flex;
                    justify-content: space-between;
                }

                .savings-positive {
                    color: #4ade80;
                    font-weight: 600;
                }

                .savings-negative {
                    color: #f87171;
                    font-weight: 500;
                }

                .grand-total-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 1.25rem 1.5rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .total-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-size: 1rem;
                    color: rgba(255, 255, 255, 0.7);
                }

                .total-item strong {
                    font-size: 1.35rem;
                    color: #fff;
                }

                .savings-badge strong {
                    color: #4ade80;
                }

                @media (max-width: 600px) {
                    .passenger-row {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .passenger-info {
                        min-width: 100%;
                    }
                    .results-header {
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .btn-primary {
                        width: 100%;
                    }
                }
            `})]})}export{z as default};
