import { primariasPresidencial202506 } from './resultado_primarias_2025_06';
import { primariasAlcaldes202406 } from './resultado_alcaldes_2024_06';
import { primariasGore202406 } from './resultado_gore_2024_06';
import { alcaldes202410 } from './resultado_alcaldes_2024_10';
import { concejales202410 } from './resultado_concejales_2024_10';
import { consejerosRegionales202410 } from './resultado_consejeros_regionales_2024_10';
import { gobernadoresRegionales202410 } from './resultado_gobernadores_2024_10';
import { gobernadoresRegionales2V202411 } from './resultado_gobernadores_2v_2024_11';
import { consejoConstitucional202305 } from './resultado_ccg_2023_05';
import { consejosConstituyentesPueblosIndigenas202305 } from './resultado_ccpi_2023_05';
import { plebiscitoConstitucional202312 } from './resultado_plebiscito_2023_12';

export const eleccionesData = [
    primariasPresidencial202506,
    primariasAlcaldes202406,
    primariasGore202406,
    gobernadoresRegionales202410,
    gobernadoresRegionales2V202411,
    alcaldes202410,
    consejerosRegionales202410,
    concejales202410,
    plebiscitoConstitucional202312,
    consejoConstitucional202305,
    consejosConstituyentesPueblosIndigenas202305
];

export const REGION_MAPPING = {
    1: { id: "map_chile_Tarapaca", name: "Región de Tarapacá" },
    2: { id: "map_chile_Antofagasta", name: "Región de Antofagasta" },
    3: { id: "map_chile_Atacama", name: "Región de Atacama" },
    4: { id: "map_chile_Coquimbo", name: "Región de Coquimbo" },
    5: { id: "map_chile_Valparaiso", name: "Región de Valparaíso" },
    6: { id: "map_chile_OHiggins", name: "Región de O'Higgins" },
    7: { id: "map_chile_Maule", name: "Región del Maule" },
    8: { id: "map_chile_Biobio", name: "Región del Biobío" },
    9: { id: "map_chile_Araucania", name: "Región de la Araucanía" },
    10: { id: "map_chile_Los_Lagos", name: "Región de Los Lagos" },
    11: { id: "map_chile_Aysen", name: "Región de Aysén" },
    12: { id: "map_chile_Magallanes", name: "Región de Magallanes" },
    13: { id: "map_chile_Metropolitana", name: "Región Metropolitana" },
    14: { id: "map_chile_Los_Rios", name: "Región de Los Ríos" },
    15: { id: "map_chile_AricaParinacota", name: "Región de Arica y Parinacota" },
    16: { id: "map_chile_Nuble", name: "Región de Ñuble" }
};
