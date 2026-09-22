import{r as e,t}from"./react.ADnQu87e.js";import{t as n}from"./jsx-runtime.Bmd7iEuj.js";var r=e(t(),1),i=n();function a(){let[e,t]=(0,r.useState)(12e3),[n,a]=(0,r.useState)([{id:`1`,name:`Pasajero 1`,soloQuote:6e3},{id:`2`,name:`Pasajero 2`,soloQuote:9e3}]),[o,s]=(0,r.useState)(!1),c=()=>{let e=n.length+1,t={id:Date.now().toString(),name:`Pasajero ${e}`,soloQuote:6e3};a([...n,t])},l=e=>{n.length<=2||a(n.filter(t=>t.id!==e))},u=(e,t)=>{a(n.map(n=>n.id===e?{...n,name:t}:n))},d=(e,t)=>{a(n.map(n=>n.id===e?{...n,soloQuote:Math.max(0,t||0)}:n))},f=n.reduce((e,t)=>e+(t.soloQuote||0),0),p=n.map(t=>{let r=t.soloQuote||0,i=f>0?r/f:1/n.length,a=e*i,o=r-a;return{person:t,solo:r,ratio:i,pay:Math.round(a),savings:Math.round(o)}}),m=f-e,h=e=>new Intl.NumberFormat(`es-CL`,{style:`currency`,currency:`CLP`,maximumFractionDigits:0}).format(e);return(0,i.jsxs)(`div`,{className:`uber-calculator`,children:[(0,i.jsxs)(`div`,{className:`calc-card primary-card`,children:[(0,i.jsx)(`div`,{className:`card-title-row`,children:(0,i.jsx)(`label`,{htmlFor:`total-fare`,children:`Costo Total del Viaje Uber`})}),(0,i.jsxs)(`div`,{className:`currency-input lg`,children:[(0,i.jsx)(`span`,{className:`currency-symbol`,children:`$`}),(0,i.jsx)(`input`,{id:`total-fare`,type:`number`,className:`input-num`,value:e||``,onChange:e=>t(parseInt(e.target.value,10)||0),placeholder:`0`,step:`100`})]})]}),(0,i.jsxs)(`div`,{className:`calc-card`,children:[(0,i.jsxs)(`div`,{className:`card-header`,children:[(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`h2`,{children:`Cotizaciones Individuales`}),(0,i.jsx)(`p`,{className:`card-subtitle`,children:`Ingresa cuánto le salía el Uber a cada persona si se fuera sola.`})]}),(0,i.jsx)(`button`,{className:`btn-secondary`,onClick:c,children:`+ Agregar persona`})]}),(0,i.jsx)(`div`,{className:`passengers-list`,children:n.map((e,t)=>(0,i.jsxs)(`div`,{className:`passenger-row`,children:[(0,i.jsxs)(`div`,{className:`passenger-info`,children:[(0,i.jsxs)(`span`,{className:`passenger-num`,children:[`#`,t+1]}),(0,i.jsx)(`input`,{type:`text`,className:`input-text`,value:e.name,onChange:t=>u(e.id,t.target.value),placeholder:`Pasajero ${t+1}`})]}),(0,i.jsxs)(`div`,{className:`input-group`,children:[(0,i.jsx)(`label`,{children:`Cotizó solo:`}),(0,i.jsxs)(`div`,{className:`currency-input`,children:[(0,i.jsx)(`span`,{className:`currency-symbol`,children:`$`}),(0,i.jsx)(`input`,{type:`number`,className:`input-num`,value:e.soloQuote||``,onChange:t=>d(e.id,parseInt(t.target.value,10)),placeholder:`0`,step:`100`})]})]}),n.length>2&&(0,i.jsx)(`button`,{className:`btn-icon-danger`,onClick:()=>l(e.id),title:`Quitar persona`,children:`✕`})]},e.id))})]}),(0,i.jsxs)(`div`,{className:`results-section`,children:[(0,i.jsxs)(`div`,{className:`results-header`,children:[(0,i.jsx)(`h2`,{children:`Desglose de Pago por Persona`}),(0,i.jsx)(`button`,{className:`btn-primary`,onClick:()=>{let t=`🚗 *Desglose Uber Combinado*

`;p.forEach(e=>{t+=`🔹 *${e.person.name}*: ${h(e.pay)} `,t+=`(Cotizó solo: ${h(e.solo)}`,e.savings>0&&(t+=`, Ahorró: ${h(e.savings)}`),t+=`)
`}),t+=`\n*Costo Total Uber*: ${h(e)}\n`,m>0&&(t+=`🎉 *Ahorro Total del Grupo*: ${h(m)}\n`),t+=`
Calculado en daridius.cl/aplicaciones/uber`,navigator.clipboard.writeText(t),s(!0),setTimeout(()=>s(!1),2500)},children:o?`✓ ¡Copiado al portapapeles!`:`📋 Copiar resumen para WhatsApp`})]}),(0,i.jsx)(`div`,{className:`results-grid`,children:p.map(e=>(0,i.jsxs)(`div`,{className:`result-card`,children:[(0,i.jsxs)(`div`,{className:`result-card-header`,children:[(0,i.jsx)(`span`,{className:`person-name`,children:e.person.name}),(0,i.jsxs)(`span`,{className:`badge`,children:[(e.ratio*100).toFixed(1),`% del total`]})]}),(0,i.jsx)(`div`,{className:`result-amount`,children:h(e.pay)}),(0,i.jsxs)(`div`,{className:`result-details`,children:[(0,i.jsxs)(`div`,{className:`detail-line`,children:[(0,i.jsx)(`span`,{children:`Cotización individual:`}),(0,i.jsx)(`span`,{children:h(e.solo)})]}),e.savings>0?(0,i.jsxs)(`div`,{className:`detail-line savings-positive`,children:[(0,i.jsx)(`span`,{children:`Ahorro:`}),(0,i.jsxs)(`span`,{children:[h(e.savings),` 🎉`]})]}):e.savings<0?(0,i.jsxs)(`div`,{className:`detail-line savings-negative`,children:[(0,i.jsx)(`span`,{children:`Paga extra:`}),(0,i.jsx)(`span`,{children:h(Math.abs(e.savings))})]}):null]})]},e.person.id))}),(0,i.jsxs)(`div`,{className:`grand-total-card`,children:[(0,i.jsxs)(`div`,{className:`total-item`,children:[(0,i.jsx)(`span`,{children:`Costo Total del Viaje:`}),(0,i.jsx)(`strong`,{children:h(e)})]}),m>0&&(0,i.jsxs)(`div`,{className:`total-item savings-badge`,children:[(0,i.jsx)(`span`,{children:`Ahorro Total del Grupo:`}),(0,i.jsxs)(`strong`,{children:[h(m),` 🎉`]})]})]})]}),(0,i.jsx)(`style`,{children:`
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
            `})]})}export{a as default};