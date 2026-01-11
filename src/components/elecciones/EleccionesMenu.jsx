import React from 'react';
import TeamCard from './components/TeamCard';

const StatBox = ({ label, value, subValue, colorClass }) => (
    <div className={`flex flex-col p-2 rounded-lg bg-base-200 border-l-4 ${colorClass} shadow-inner`}>
        <span className="text-[9px] font-bold text-gray-400 uppercase leading-none mb-1">{label}</span>
        <span className={`text-lg font-black leading-none ${colorClass.replace('border-', 'text-')}`}>{value}</span>
        {subValue && <span className="text-[10px] opacity-60 mt-0.5">{subValue}</span>}
    </div>
);

export default function EleccionesMenu({
    elections,
    selectedElectionId,
    onSelectElection,
    currentCandidates,
    candidateTeams,
    onMoveCandidate,
    summary
}) {
    const redTeam = currentCandidates.filter(c => candidateTeams[c] === 'red');
    const blueTeam = currentCandidates.filter(c => candidateTeams[c] === 'blue');
    const neutralTeam = currentCandidates.filter(c => !candidateTeams[c] || candidateTeams[c] === 'neutral');

    const redPercent = summary.totalVotes ? ((summary.redVotes / summary.totalVotes) * 100).toFixed(1) : 0;
    const bluePercent = summary.totalVotes ? ((summary.blueVotes / summary.totalVotes) * 100).toFixed(1) : 0;

    return (
        <div className="w-96 shrink-0 flex flex-col h-full bg-base-100 shadow-2xl border-r border-base-300 z-20">
            {/* National Summary Panel */}
            <div className="p-4 bg-gray-50 border-b border-base-300 space-y-4 shadow-sm">
                <div className="flex items-end justify-between">
                    <div>
                        <h1 className="text-xl font-black tracking-tight text-gray-800 flex items-center gap-2">
                            Mapeo Electoral
                        </h1>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Proyecciones en tiempo real</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <StatBox
                        label="Equipo Rojo"
                        value={`${summary.redRegions} Reg.`}
                        subValue={`${redPercent}% votos`}
                        colorClass="border-red-500"
                    />
                    <StatBox
                        label="Equipo Azul"
                        value={`${summary.blueRegions} Reg.`}
                        subValue={`${bluePercent}% votos`}
                        colorClass="border-blue-500"
                    />
                </div>
            </div>

            {/* Config Panel */}
            <div className="p-5 border-b border-slate-700 bg-slate-800">
                <div className="flex items-center gap-2 mb-2 ml-0.5">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </div>
                    <label className="text-[10px] font-black text-white/80 uppercase tracking-[0.15em]">Fuente de Datos</label>
                </div>
                <div className="relative group">
                    <select
                        className="select select-bordered select-sm w-full h-11 bg-white border-base-300 hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-gray-700 shadow-sm pr-10 appearance-none text-[11px]"
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

            <div className="p-3 bg-base-300 text-center text-[9px] font-bold text-gray-500 border-t border-base-300 uppercase tracking-widest">
                Escala de Gradiente: Victoria Clara (30%+)
            </div>
        </div>
    );
}
