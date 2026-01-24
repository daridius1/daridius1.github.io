export const formatDate = (
    date: Date | string | undefined | null,
    options: {
        month?: "long" | "short" | "numeric",
        day?: "numeric" | "2-digit",
        year?: "numeric" | "2-digit"
    } = { month: "long", day: "numeric", year: "numeric" }
) => {
    if (!date) return "";

    const d = typeof date === "string" ? new Date(date) : date;

    // Use UTC to prevent timezone shifts for YYYY-MM-DD dates
    return d.toLocaleDateString("es-ES", {
        ...options,
        timeZone: "UTC",
    });
};
