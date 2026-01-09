import React from 'react';

/**
 * @param {Object} props
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.href
 */
export default function AppCard({ title, description, href }) {
    return (
        <div className="card bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl transition-all hover:scale-[1.02] group overflow-hidden flex flex-col h-full">
            <div className="card-body p-6 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="card-title text-xl font-black tracking-tighter text-white">
                        {title}
                    </h3>
                </div>

                <p className="text-sm text-white/60 mb-6 leading-relaxed font-medium">
                    {description}
                </p>

                <div className="card-actions justify-end mt-auto">
                    <a
                        href={href}
                        className="btn btn-sm btn-ghost gap-2 text-xs font-bold uppercase tracking-tighter text-white/40 group-hover:text-white transition-colors"
                    >
                        Ejecutar App
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
