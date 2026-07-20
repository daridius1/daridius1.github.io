import { useState } from "react";

interface Person {
    id: string;
    name: string;
    soloQuote: number;
}

export default function UberCalculator() {
    // Total combined ride cost
    const [totalFare, setTotalFare] = useState<number>(12000);

    // List of passengers (default 2)
    const [people, setPeople] = useState<Person[]>([
        { id: "1", name: "Pasajero 1", soloQuote: 6000 },
        { id: "2", name: "Pasajero 2", soloQuote: 9000 },
    ]);

    const [copied, setCopied] = useState<boolean>(false);

    // Handlers for passengers
    const addPerson = () => {
        const nextNum = people.length + 1;
        const newPerson: Person = {
            id: Date.now().toString(),
            name: `Pasajero ${nextNum}`,
            soloQuote: 6000,
        };
        setPeople([...people, newPerson]);
    };

    const removePerson = (id: string) => {
        if (people.length <= 2) return; // Keep minimum 2 people
        setPeople(people.filter((p) => p.id !== id));
    };

    const updatePersonName = (id: string, name: string) => {
        setPeople(people.map((p) => (p.id === id ? { ...p, name } : p)));
    };

    const updateSoloQuote = (id: string, val: number) => {
        setPeople(
            people.map((p) =>
                p.id === id ? { ...p, soloQuote: Math.max(0, val || 0) } : p,
            ),
        );
    };

    // Calculation based on proportional share:
    // Pago_i = ( Cotizacion_i / Suma_Cotizaciones ) * Tarifa_Total
    const sumSoloQuotes = people.reduce((acc, p) => acc + (p.soloQuote || 0), 0);

    const results = people.map((person) => {
        const solo = person.soloQuote || 0;
        const ratio = sumSoloQuotes > 0 ? solo / sumSoloQuotes : 1 / people.length;
        const pay = totalFare * ratio;
        const savings = solo - pay;

        return {
            person,
            solo,
            ratio,
            pay: Math.round(pay),
            savings: Math.round(savings),
        };
    });

    const totalSavings = sumSoloQuotes - totalFare;

    const formatCLP = (amount: number) => {
        return new Intl.NumberFormat("es-CL", {
            style: "currency",
            currency: "CLP",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Copy breakdown to WhatsApp
    const copySummary = () => {
        let text = `🚗 *Desglose Uber Combinado*\n\n`;

        results.forEach((r) => {
            text += `🔹 *${r.person.name}*: ${formatCLP(r.pay)} `;
            text += `(Cotizó solo: ${formatCLP(r.solo)}`;
            if (r.savings > 0) text += `, Ahorró: ${formatCLP(r.savings)}`;
            text += `)\n`;
        });

        text += `\n*Costo Total Uber*: ${formatCLP(totalFare)}\n`;
        if (totalSavings > 0) {
            text += `🎉 *Ahorro Total del Grupo*: ${formatCLP(totalSavings)}\n`;
        }

        text += `\nCalculado en daridius.cl/aplicaciones/uber`;

        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    return (
        <div className="uber-calculator">
            {/* Total Fare Card */}
            <div className="calc-card primary-card">
                <div className="card-title-row">
                    <label htmlFor="total-fare">Costo Total del Viaje Uber</label>
                </div>
                <div className="currency-input lg">
                    <span className="currency-symbol">$</span>
                    <input
                        id="total-fare"
                        type="number"
                        className="input-num"
                        value={totalFare || ""}
                        onChange={(e) => setTotalFare(parseInt(e.target.value, 10) || 0)}
                        placeholder="0"
                        step="100"
                    />
                </div>
            </div>

            {/* Passengers Input Card */}
            <div className="calc-card">
                <div className="card-header">
                    <div>
                        <h2>Cotizaciones Individuales</h2>
                        <p className="card-subtitle">
                            Ingresa cuánto le salía el Uber a cada persona si se fuera sola.
                        </p>
                    </div>
                    <button className="btn-secondary" onClick={addPerson}>
                        + Agregar persona
                    </button>
                </div>

                <div className="passengers-list">
                    {people.map((p, idx) => (
                        <div key={p.id} className="passenger-row">
                            <div className="passenger-info">
                                <span className="passenger-num">#{idx + 1}</span>
                                <input
                                    type="text"
                                    className="input-text"
                                    value={p.name}
                                    onChange={(e) => updatePersonName(p.id, e.target.value)}
                                    placeholder={`Pasajero ${idx + 1}`}
                                />
                            </div>

                            <div className="input-group">
                                <label>Cotizó solo:</label>
                                <div className="currency-input">
                                    <span className="currency-symbol">$</span>
                                    <input
                                        type="number"
                                        className="input-num"
                                        value={p.soloQuote || ""}
                                        onChange={(e) =>
                                            updateSoloQuote(p.id, parseInt(e.target.value, 10))
                                        }
                                        placeholder="0"
                                        step="100"
                                    />
                                </div>
                            </div>

                            {people.length > 2 && (
                                <button
                                    className="btn-icon-danger"
                                    onClick={() => removePerson(p.id)}
                                    title="Quitar persona"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Results Section */}
            <div className="results-section">
                <div className="results-header">
                    <h2>Desglose de Pago por Persona</h2>
                    <button className="btn-primary" onClick={copySummary}>
                        {copied ? "✓ ¡Copiado al portapapeles!" : "📋 Copiar resumen para WhatsApp"}
                    </button>
                </div>

                <div className="results-grid">
                    {results.map((res) => (
                        <div key={res.person.id} className="result-card">
                            <div className="result-card-header">
                                <span className="person-name">{res.person.name}</span>
                                <span className="badge">
                                    {(res.ratio * 100).toFixed(1)}% del total
                                </span>
                            </div>

                            <div className="result-amount">{formatCLP(res.pay)}</div>

                            <div className="result-details">
                                <div className="detail-line">
                                    <span>Cotización individual:</span>
                                    <span>{formatCLP(res.solo)}</span>
                                </div>
                                {res.savings > 0 ? (
                                    <div className="detail-line savings-positive">
                                        <span>Ahorro:</span>
                                        <span>{formatCLP(res.savings)} 🎉</span>
                                    </div>
                                ) : res.savings < 0 ? (
                                    <div className="detail-line savings-negative">
                                        <span>Paga extra:</span>
                                        <span>{formatCLP(Math.abs(res.savings))}</span>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Grand Total Summary */}
                <div className="grand-total-card">
                    <div className="total-item">
                        <span>Costo Total del Viaje:</span>
                        <strong>{formatCLP(totalFare)}</strong>
                    </div>
                    {totalSavings > 0 && (
                        <div className="total-item savings-badge">
                            <span>Ahorro Total del Grupo:</span>
                            <strong>{formatCLP(totalSavings)} 🎉</strong>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
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
            `}</style>
        </div>
    );
}
