export type Cancion = {
    title: string;
    artist: string;
    blogUrl: string;
    blogTitle: string;
    date: string;
    verse?: string;
};

export const canciones: Cancion[] = [
    {
        title: "Un siglo sin ti",
        artist: "Chayanne",
        blogUrl: "/blog/2026/01/15/vuelve-la-tne-a-mi-vida",
        blogTitle: "Vuelve la TNE a mi vida",
        date: "2026-01-15",
        verse: "Y ahora que no estás aquí, me doy cuenta cuánta falta me haces",
    },
    {
        title: "Call Me Maybe",
        artist: "Carly Rae Jepsen",
        blogUrl: "/blog/2026/01/20/el-baile-del-apareamiento",
        blogTitle: "El baile del apareamiento",
        date: "2026-01-20",
        verse: "Pennies and dimes for a kiss",
    },
];

export const getSortedCanciones = () => {
    return [...canciones].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
};
