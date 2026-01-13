/**
 * Resultado Primarias Gobernadores Regionales Junio 2024
 * Datos agregados por región y partido desde votación por comuna
 */
export const gOREPrimarias202406 = {
    id: "g-o-r-e-primarias-2024-06",
    name: "Primarias Gobernadores Regionales Junio 2024",
    // Mapeo de cada partido a su pacto correspondiente
    pactoMapping: {
        "INDEPENDIENTE": "CHILE VAMOS",
        "RENOVACION NACIONAL": "CHILE VAMOS",
        "UNION DEMOCRATA INDEPENDIENTE": "CHILE VAMOS",
        "VOTOS EN BLANCO": "VOTOS EN BLANCO",
        "VOTOS NULOS": "VOTOS NULOS"
    },
    // Votos desglosados por región
    votesByRegion: {
        "4": { "INDEPENDIENTE": 8682, "RENOVACION NACIONAL": 6175, "UNION DEMOCRATA INDEPENDIENTE": 5389, "VOTOS EN BLANCO": 1478, "VOTOS NULOS": 2137 },
        "11": { "INDEPENDIENTE": 1022, "RENOVACION NACIONAL": 2875, "UNION DEMOCRATA INDEPENDIENTE": 4360, "VOTOS EN BLANCO": 398, "VOTOS NULOS": 421 }
    }
};
