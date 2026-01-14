import React, { useEffect, useState, useMemo } from 'react';
import { eleccionesData, REGION_MAPPING } from '../../data/elecciones/index.js';
import EleccionesMenu from './EleccionesMenu';
import EleccionesMap from './EleccionesMap';
import EleccionesStats from './components/EleccionesStats';

export default function EleccionesApp({ mapSrc, bgSrc }) {
    const [selectedElectionId, setSelectedElectionId] = useState(eleccionesData[0].id);
    const [candidateTeams, setCandidateTeams] = useState({});
    const [groupingMode, setGroupingMode] = useState('pacto'); // 'pacto' or 'partido'

    const currentElection = useMemo(() =>
        eleccionesData.find(e => e.id === selectedElectionId) || eleccionesData[0],
        [selectedElectionId]);

    // Available items for the list based on grouping mode
    const menuItems = useMemo(() => {
        if (!currentElection) return [];
        if (!currentElection.pactoMapping) return currentElection.candidates;

        if (groupingMode === 'pacto') {
            return [...new Set(Object.values(currentElection.pactoMapping))];
        }
        return Object.keys(currentElection.pactoMapping);
    }, [currentElection, groupingMode]);

    // Initialize Teams or preserve them
    useEffect(() => {
        setCandidateTeams(prev => {
            const next = { ...prev };
            menuItems.forEach(item => {
                if (!(item in next)) next[item] = 'neutral';
            });
            return next;
        });
    }, [menuItems]);

    const moveCandidate = (candidate, team) => {
        setCandidateTeams(prev => ({ ...prev, [candidate]: team }));
    };

    // Calculate aggregated results and national summary
    const { aggregatedResults, nationalSummary } = useMemo(() => {
        const results = {};
        const summary = {
            redVotes: 0,
            blueVotes: 0,
            totalVotes: 0,
            redRegions: 0,
            blueRegions: 0,
            neutralRegions: 0,
            missingRegions: 0
        };

        if (!currentElection) return { aggregatedResults: results, nationalSummary: summary };

        // We iterate over all possible regions (1-16) to detect missing ones correctly
        Object.keys(REGION_MAPPING).forEach((regionId) => {
            const votes = currentElection.votesByRegion[regionId];

            if (!votes) {
                summary.missingRegions++;
                return;
            }

            let rV = 0;
            let bV = 0;
            const tV = Object.values(votes).reduce((sum, v) => sum + v, 0);

            Object.entries(votes).forEach(([entity, count]) => {
                let team = 'neutral';
                if (currentElection.pactoMapping) {
                    // Voting by Partido or Pacto
                    if (groupingMode === 'pacto') {
                        const pacto = currentElection.pactoMapping[entity];
                        team = candidateTeams[pacto];
                    } else {
                        team = candidateTeams[entity];
                    }
                } else {
                    // Classic mode
                    team = candidateTeams[entity];
                }

                if (team === 'red') rV += count;
                if (team === 'blue') bV += count;
            });

            results[String(regionId)] = { redVotes: rV, blueVotes: bV, total: tV };

            // Global stats
            summary.redVotes += rV;
            summary.blueVotes += bV;
            summary.totalVotes += tV;

            if (rV > bV) summary.redRegions++;
            else if (bV > rV) summary.blueRegions++;
            else summary.neutralRegions++;
        });

        return { aggregatedResults: results, nationalSummary: summary };
    }, [currentElection, candidateTeams, groupingMode]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex w-full h-dvh bg-base-200 overflow-hidden font-sans relative">
            {/* Background Image with Blur */}
            {bgSrc && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={bgSrc}
                        alt="Background"
                        className="w-full h-full object-cover blur-[2px] scale-105"
                    />
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]"></div>
                </div>
            )}

            <EleccionesMenu
                elections={eleccionesData}
                selectedElectionId={selectedElectionId}
                onSelectElection={setSelectedElectionId}
                groupingMode={groupingMode}
                onSelectGrouping={setGroupingMode}
                currentCandidates={menuItems}
                candidateTeams={candidateTeams}
                onMoveCandidate={moveCandidate}
                isOpen={isMenuOpen}
                setIsOpen={setIsMenuOpen}
            />
            <div className="flex-1 flex flex-row items-center justify-center p-2 md:p-4 relative overflow-hidden z-10">
                <div className="flex flex-row items-center justify-center gap-2 md:gap-12 max-h-full w-full max-w-6xl">
                    <EleccionesMap
                        mapSrc={mapSrc}
                        results={aggregatedResults}
                    />
                    <EleccionesStats summary={nationalSummary} />
                </div>
            </div>
        </div>
    );
}
