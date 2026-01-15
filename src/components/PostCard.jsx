/**
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.date
 * @param {string} props.slug
 * @param {string[]} [props.tags]
 */
export default function PostCard({ title, description, date, slug, tags = [] }) {
    return (
        <div className="card bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl transition-all hover:scale-[1.02] group overflow-hidden flex flex-col h-full">
            <div className="card-body p-6 flex flex-col h-full">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                        {date}
                    </span>
                </div>

                <h3 className="card-title text-xl font-black tracking-tighter text-white">
                    {title}
                </h3>

                <p className="text-sm text-white/60 my-4 leading-relaxed font-medium">
                    {description}
                </p>

                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="card-actions justify-end mt-auto">
                    <a
                        href={`/blog/${slug}`}
                        className="btn btn-sm btn-ghost gap-2 text-xs font-bold uppercase tracking-tighter text-white/40 group-hover:text-white transition-colors"
                    >
                        Leer más
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
