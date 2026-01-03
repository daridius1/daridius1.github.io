import { useState, useMemo } from 'react';

export default function BlogFilter({ posts, allTags }) {
    const [selectedTags, setSelectedTags] = useState([]);

    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            // Strict filtering (AND): Post must contain ALL selected tags
            const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => post.data.tags.includes(tag));

            return matchesTags;
        });
    }, [posts, selectedTags]);

    return (
        <div className="w-full space-y-8">
            {/* Controls Container */}
            <div className="flex flex-col gap-6 bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10">

                {/* Tags Filter */}
                <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`btn btn-sm border transition-all ${selectedTags.includes(tag)
                                    ? 'btn-primary border-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]'
                                    : 'btn-ghost border-white/10 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/30'
                                    }`}
                            >
                                {tag}
                                {selectedTags.includes(tag) && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map(post => (
                    <a key={post.slug} href={`/blog/${post.slug}`} className="card bg-white/5 border border-white/10 shadow-xl backdrop-blur-md hover:bg-white/10 transition-all group overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
                        <div className="card-body p-6">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                                    {new Date(post.data.pubDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </span>
                            </div>

                            <h3 className="card-title text-xl font-black tracking-tighter text-white group-hover:text-primary transition-colors">
                                {post.data.title}
                            </h3>

                            <p className="text-sm text-white/60 line-clamp-2 my-4 leading-relaxed">
                                {post.data.description}
                            </p>

                            {/* Tags in Card */}
                            <div className="flex flex-wrap gap-1 mb-4">
                                {post.data.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="badge badge-xs badge-outline text-[9px] font-bold uppercase tracking-widest text-white/30 border-white/20">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="card-actions justify-end mt-auto">
                                <span className="btn btn-sm btn-ghost gap-2 text-xs font-bold uppercase tracking-tighter text-white/50 group-hover:text-white">
                                    Leer más
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </a>
                ))}

                {filteredPosts.length === 0 && (
                    <div className="col-span-full py-32 text-center rounded-2xl bg-white/5 border border-dashed border-white/10">
                        <div className="opacity-30 flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xl font-bold">No se encontraron resultados</p>
                            <p className="text-sm">Prueba ajustando los filtros o la búsqueda</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
