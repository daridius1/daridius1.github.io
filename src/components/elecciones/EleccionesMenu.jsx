import React from 'react';
import TeamCard from './components/TeamCard';

export default function EleccionesMenu({
    elections,
    selectedElectionId,
    onSelectElection,
    groupingMode,
    onSelectGrouping,
    currentCandidates,
    candidateTeams,
    onMoveCandidate,
    isOpen,
    setIsOpen
}) {
    const currentElection = elections.find(e => e.id === selectedElectionId);
    const hasPactos = currentElection?.pactoMapping;

    const redTeam = currentCandidates.filter(c => candidateTeams[c] === 'red');
    const blueTeam = currentCandidates.filter(c => candidateTeams[c] === 'blue');
    const neutralTeam = currentCandidates.filter(c => !candidateTeams[c] || candidateTeams[c] === 'neutral');

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={`
                fixed lg:relative inset-y-0 left-0 w-80 md:w-96 shrink-0 flex flex-col h-full bg-base-100 shadow-2xl border-r border-base-300 z-50 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Toggle Handle for Mobile */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden absolute top-1/2 -right-8 w-8 h-12 bg-slate-900 border-y border-r border-slate-700 rounded-r-lg flex items-center justify-center text-white shadow-xl -translate-y-1/2 transition-all hover:bg-slate-800 active:scale-95 z-50"
                >
                    <div className="opacity-80">
                        {isOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                        )}
                    </div>
                </button>
                {/* National Title Section (Simplified) */}
                <div className="p-6 bg-slate-900 border-b border-slate-700">
                    <h1 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                        Calculadora Electoral
                    </h1>
                </div>

                {/* Config Panel */}
                <div className="p-5 border-b border-slate-700 bg-slate-800 space-y-4">
                    {/* Election Selector */}
                    <div>
                        <div className="flex items-center gap-2 mb-2 ml-0.5">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </div>
                            <label className="text-[10px] font-black text-white/80 uppercase tracking-[0.15em]">Elección</label>
                        </div>
                        <div className="relative group">
                            <select
                                className="select select-bordered select-sm w-full h-11 bg-white border-base-300 hover:border-blue-400 focus:outline-none focus:border-blue-500 transition-all font-bold text-gray-700 shadow-sm pr-10 appearance-none text-[11px]"
                                value={selectedElectionId}
                                onChange={(e) => onSelectElection(e.target.value)}
                            >
                                {elections.map(e => (
                                    <option key={e.id} value={e.id}>{e.name}</option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-hover:text-blue-500 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Grouping Selector - Only shown if election has pactos */}
                    {hasPactos && (
                        <div className="pt-2 border-t border-slate-700/50">
                            <div className="flex items-center gap-2 mb-2 ml-0.5">
                                <label className="text-[10px] font-black text-white/60 uppercase tracking-[0.15em]">Agrupar por</label>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => onSelectGrouping('pacto')}
                                    className={`h-8 rounded text-[10px] font-black uppercase transition-all ${groupingMode === 'pacto' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700 text-white/40 hover:bg-slate-600'}`}
                                >
                                    Pacto
                                </button>
                                <button
                                    onClick={() => onSelectGrouping('partido')}
                                    className={`h-8 rounded text-[10px] font-black uppercase transition-all ${groupingMode === 'partido' ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700 text-white/40 hover:bg-slate-600'}`}
                                >
                                    Partido
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Candidates Lists */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
                    <TeamCard
                        title="Candidatos Rojo"
                        candidates={redTeam}
                        bgClass="bg-red-600"
                        actionButtons={(c) => (
                            <button
                                className="btn btn-xs btn-square btn-ghost text-white hover:bg-white/20 border-white/20"
                                onClick={() => onMoveCandidate(c, 'neutral')}
                            >
                                ✕
                            </button>
                        )}
                    />

                    <TeamCard
                        title="Bolsa de Neutrales"
                        candidates={neutralTeam}
                        bgClass="bg-slate-600"
                        actionButtons={(c) => (
                            <div className="flex gap-1">
                                <button
                                    className="w-6 h-6 rounded flex items-center justify-center bg-red-500 hover:bg-red-400 text-white shadow-sm transition-colors"
                                    onClick={() => onMoveCandidate(c, 'red')}
                                    title="Mover a Rojo"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 15l7-7 7 7" /></svg>
                                </button>
                                <button
                                    className="w-6 h-6 rounded flex items-center justify-center bg-blue-500 hover:bg-blue-400 text-white shadow-sm transition-colors"
                                    onClick={() => onMoveCandidate(c, 'blue')}
                                    title="Mover a Azul"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                                </button>
                            </div>
                        )}
                    />

                    <TeamCard
                        title="Candidatos Azul"
                        candidates={blueTeam}
                        bgClass="bg-blue-600"
                        actionButtons={(c) => (
                            <button
                                className="btn btn-xs btn-square btn-ghost text-white hover:bg-white/20 border-white/20"
                                onClick={() => onMoveCandidate(c, 'neutral')}
                            >
                                ✕
                            </button>
                        )}
                    />
                </div>
            </div>
        </>
    );
}
