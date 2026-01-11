import React, { useEffect, useState, useMemo } from 'react';
import { eleccionesData } from '../../data/elecciones.js';
import EleccionesMenu from './EleccionesMenu';
import EleccionesMap from './EleccionesMap';

export default function EleccionesApp({ mapSrc }) {
    const [selectedElectionId, setSelectedElectionId] = useState(eleccionesData[0].id);
    const [candidateTeams, setCandidateTeams] = useState({});

    const currentElection = useMemo(() =>
        eleccionesData.find(e => e.id === selectedElectionId) || eleccionesData[0],
        [selectedElectionId]);

    // Initialize Teams
    useEffect(() => {
        const initialTeams = {};
        currentElection.candidates.forEach(c => initialTeams[c] = 'neutral');
        setCandidateTeams(initialTeams);
    }, [currentElection]);

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
            neutralRegions: 0
        };

        if (!currentElection) return { aggregatedResults: results, nationalSummary: summary };

        Object.entries(currentElection.votesByRegion).forEach(([regionId, votes]) => {
            let rV = 0;
            let bV = 0;
            const tV = Object.values(votes).reduce((sum, v) => sum + v, 0);

            Object.entries(votes).forEach(([candidate, count]) => {
                const team = candidateTeams[candidate];
                if (team === 'red') rV += count;
                if (team === 'blue') bV += count;
            });

            results[regionId] = { redVotes: rV, blueVotes: bV, total: tV };

            // Global stats
            summary.redVotes += rV;
            summary.blueVotes += bV;
            summary.totalVotes += tV;

            if (rV > bV) summary.redRegions++;
            else if (bV > rV) summary.blueRegions++;
            else summary.neutralRegions++;
        });

        return { aggregatedResults: results, nationalSummary: summary };
    }, [currentElection, candidateTeams]);

    return (
        <div className="flex w-full h-screen bg-base-200 overflow-hidden font-sans">
            <EleccionesMenu
                elections={eleccionesData}
                selectedElectionId={selectedElectionId}
                onSelectElection={setSelectedElectionId}
                currentCandidates={currentElection.candidates}
                candidateTeams={candidateTeams}
                onMoveCandidate={moveCandidate}
                summary={nationalSummary}
            />
            <EleccionesMap
                mapSrc={mapSrc}
                results={aggregatedResults}
            />
        </div>
    );
}
