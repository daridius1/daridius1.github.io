/**
 * Template para elecciones basadas en Partidos y Pactos.
 * Útil para: Elecciones parlamentarias, regionales o municipales donde los partidos se agrupan.
 */
export const templatePartidosPactos = {
    id: "template-partidos",
    name: "Elección por Partidos y Pactos (Template)",
    // Mapeo de cada partido a su pacto correspondiente. 
    // Esto permite agrupar los votos automáticamente en la interfaz.
    pactoMapping: {
        "PARTIDO 1": "PACTO A",
        "PARTIDO 2": "PACTO A",
        "PARTIDO 3": "PACTO B",
        "INDEPENDIENTE": "SIN PACTO",
        "VOTOS EN BLANCO": "OTROS",
        "VOTOS NULOS": "OTROS"
    },
    // Votos desglosados por región (ID 1 al 16). 
    // Las llaves deben coincidir con los nombres de los partidos definidos arriba.
    votesByRegion: {
        "1": { "PARTIDO 1": 0, "PARTIDO 2": 0, "PARTIDO 3": 0, "INDEPENDIENTE": 0, "VOTOS EN BLANCO": 0, "VOTOS NULOS": 0 },
        "2": { "PARTIDO 1": 0, "PARTIDO 2": 0, "PARTIDO 3": 0, "INDEPENDIENTE": 0, "VOTOS EN BLANCO": 0, "VOTOS NULOS": 0 },
        "3": { "PARTIDO 1": 0, "PARTIDO 2": 0, "PARTIDO 3": 0, "INDEPENDIENTE": 0, "VOTOS EN BLANCO": 0, "VOTOS NULOS": 0 },
        "4": { "PARTIDO 1": 0, "PARTIDO 2": 0, "PARTIDO 3": 0, "INDEPENDIENTE": 0, "VOTOS EN BLANCO": 0, "VOTOS NULOS": 0 },
        "5": { "PARTIDO 1": 0, "PARTIDO 2": 0, "PARTIDO 3": 0, "INDEPENDIENTE": 0, "VOTOS EN BLANCO": 0, "VOTOS NULOS": 0 },
        "6": { "PARTIDO 1": 0, "PARTIDO 2": 0, "PARTIDO 3": 0, "INDEPENDIENTE": 0, "VOTOS EN BLANCO": 0, "VOTOS NULOS": 0 },
        "7": { "PARTIDO 1": 0, "PARTIDO 2": 0, "PARTIDO 3": 0, "INDEPENDIENTE": 0, "VOTOS EN BLANCO": 0, "VOTOS NULOS": 0 },
        "8": { "PARTIDO 1": 0, "PARTIDO 2": 0, "PARTIDO 3": 0, "INDEPENDIENTE": 0, "VOTOS EN BLANCO": 0, "VOTOS NULOS": 0 },
        "9": { "PARTIDO 1": 0, "PARTIDO 2": 0, "PARTIDO 3": 0, "INDEPENDIENTE": 0, "VOTOS EN BLANCO": 0, "VOTOS NULOS": 0 },
        "10": { "PARTIDO 1": 0, "PARTIDO 2": 0, "PARTIDO 3": 0, "INDEPENDIENTE": 0, "VOTOS EN BLANCO": 0, "VOTOS NULOS": 0 },
        "11": { "PARTIDO 1": 0, "PARTIDO 2": 0, "PARTIDO 3": 0, "INDEPENDIENTE": 0, "VOTOS EN BLANCO": 0, "VOTOS NULOS": 0 },
        "12": { "PARTIDO 1": 0, "PARTIDO 2": 0, "PARTIDO 3": 0, "INDEPENDIENTE": 0, "VOTOS EN BLANCO": 0, "VOTOS NULOS": 0 },
        "13": { "PARTIDO 1": 0, "PARTIDO 2": 0, "PARTIDO 3": 0, "INDEPENDIENTE": 0, "VOTOS EN BLANCO": 0, "VOTOS NULOS": 0 },
        "14": { "PARTIDO 1": 0, "PARTIDO 2": 0, "PARTIDO 3": 0, "INDEPENDIENTE": 0, "VOTOS EN BLANCO": 0, "VOTOS NULOS": 0 },
        "15": { "PARTIDO 1": 0, "PARTIDO 2": 0, "PARTIDO 3": 0, "INDEPENDIENTE": 0, "VOTOS EN BLANCO": 0, "VOTOS NULOS": 0 },
        "16": { "PARTIDO 1": 0, "PARTIDO 2": 0, "PARTIDO 3": 0, "INDEPENDIENTE": 0, "VOTOS EN BLANCO": 0, "VOTOS NULOS": 0 }
    }
};
