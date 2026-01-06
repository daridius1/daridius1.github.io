import React from 'react';

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.slug
 */
export default function ProjectCard({ title, description, slug }) {
    return (
        <div className="card bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl transition-all hover:scale-[1.02] group overflow-hidden flex flex-col h-full">
            <div className="card-body p-6 flex flex-col h-full">
                <h3 className="card-title text-xl font-black tracking-tighter text-white">
                    {title}
                </h3>

                <p className="text-sm text-white/60 my-4 leading-relaxed font-medium">
                    {description}
                </p>

                <div className="card-actions justify-end mt-auto">
                    <a
                        href={`/projects/${slug}`}
                        className="btn btn-sm btn-ghost gap-2 text-xs font-bold uppercase tracking-tighter text-white/40 group-hover:text-white transition-colors"
                    >
                        Ver Proyecto
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
