import React from 'react';

const TeamCard = ({ title, candidates, onMove, colorClass, bgClass, actionButtons }) => (
    <div className={`card shadow-sm border-t-4 ${colorClass} ${bgClass} mb-4 transition-all duration-300`}>
        <div className="card-body p-3">
            <h3 className={`card-title text-[10px] font-bold uppercase ${colorClass.replace('border-', 'text-')}`}>
                {title} <span className="opacity-50 font-normal">({candidates.length})</span>
            </h3>
            <div className="flex flex-col gap-1.5 mt-1">
                {candidates.length === 0 && (
                    <div className="text-[10px] opacity-40 italic text-center py-2">Lista vacía</div>
                )}
                {candidates.map(candidate => (
                    <div key={candidate} className="flex items-center justify-between p-2 bg-base-100/50 rounded shadow-sm text-[11px] group hover:bg-white transition-colors border border-base-200">
                        <span className="font-semibold text-gray-700 truncate flex-1 mr-2" title={candidate}>
                            {candidate}
                        </span>
                        <div className="flex gap-1 shrink-0">
                            {actionButtons(candidate)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

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
            <div className="p-4 border-b border-base-200 bg-base-100">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Seleccionar Fuente</label>
                <select
                    className="select select-bordered select-xs w-full mt-1.5 font-bold h-9 bg-base-200 focus:bg-white transition-all text-xs"
                    value={selectedElectionId}
                    onChange={(e) => onSelectElection(e.target.value)}
                >
                    {elections.map(e => (
                        <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                </select>
            </div>

            {/* Candidates Lists */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
                <TeamCard
                    title="Candidatos Rojo"
                    candidates={redTeam}
                    colorClass="border-red-500"
                    bgClass="bg-red-50/50"
                    onMove={onMoveCandidate}
                    actionButtons={(c) => (
                        <button className="btn btn-[8px] h-6 min-h-6 w-6 btn-ghost hover:bg-white text-red-500 font-bold" onClick={() => onMoveCandidate(c, 'neutral')}>✕</button>
                    )}
                />

                <TeamCard
                    title="Bolsa de Neutrales"
                    candidates={neutralTeam}
                    colorClass="border-gray-400"
                    bgClass="bg-gray-100/50"
                    onMove={onMoveCandidate}
                    actionButtons={(c) => (
                        <div className="flex gap-1">
                            <button className="btn btn-[8px] h-6 min-h-6 w-6 btn-error btn-outline p-0 border-opacity-30" onClick={() => onMoveCandidate(c, 'red')}>R</button>
                            <button className="btn btn-[8px] h-6 min-h-6 w-6 btn-info btn-outline p-0 border-opacity-30" onClick={() => onMoveCandidate(c, 'blue')}>A</button>
                        </div>
                    )}
                />

                <TeamCard
                    title="Candidatos Azul"
                    candidates={blueTeam}
                    colorClass="border-blue-500"
                    bgClass="bg-blue-50/50"
                    onMove={onMoveCandidate}
                    actionButtons={(c) => (
                        <button className="btn btn-[8px] h-6 min-h-6 w-6 btn-ghost hover:bg-white text-blue-500 font-bold" onClick={() => onMoveCandidate(c, 'neutral')}>✕</button>
                    )}
                />
            </div>

            <div className="p-3 bg-base-300 text-center text-[9px] font-bold text-gray-500 border-t border-base-300 uppercase tracking-widest">
                Escala de Gradiente: Victoria Clara (30%+)
            </div>
        </div>
    );
}
