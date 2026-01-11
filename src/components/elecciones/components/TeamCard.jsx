import React from 'react';

const TeamCard = ({ title, candidates, actionButtons, bgClass }) => (
    <div className={`card shadow-lg border-none ${bgClass} mb-4 transition-all duration-300 overflow-hidden`}>
        <div className="card-body p-4">
            <h3 className="card-title text-[11px] font-black uppercase text-white/90 tracking-wider flex justify-between items-center">
                <span>{title}</span>
                <span className="bg-black/20 px-2 py-0.5 rounded-full text-[9px] font-bold">
                    {candidates.length}
                </span>
            </h3>
            <div className="flex flex-col gap-2 mt-2">
                {candidates.length === 0 && (
                    <div className="text-[10px] text-white/40 italic text-center py-3 bg-black/10 rounded-lg">
                        Lista vacía
                    </div>
                )}
                {candidates.map(candidate => (
                    <div key={candidate} className="flex items-center justify-between p-2.5 bg-white/15 backdrop-blur-sm rounded-lg text-[11px] group hover:bg-white/25 transition-all border border-white/10">
                        <span className="font-bold text-white truncate flex-1 mr-2 drop-shadow-sm" title={candidate}>
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

export default TeamCard;
