import { useState, useMemo, useEffect } from 'react';
import PostCard from './PostCard';

const POSTS_PER_PAGE = 12;

export default function BlogFilter({ posts, allTags }) {
    const [selectedTags, setSelectedTags] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
        setCurrentPage(1);
    };

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => post.data.tags.includes(tag));
            return matchesTags;
        });
    }, [posts, selectedTags]);

    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    const paginatedPosts = useMemo(() => {
        const start = (currentPage - 1) * POSTS_PER_PAGE;
        return filteredPosts.slice(start, start + POSTS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    return (
        <div className="w-full space-y-12">
            {/* Controls Container */}
            <div className="flex flex-col gap-6 bg-black/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10">
                <div className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">Filtrar por etiquetas</p>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`btn btn-sm border transition-all rounded-full ${selectedTags.includes(tag)
                                    ? 'btn-primary border-primary text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
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
                {paginatedPosts.map(post => (
                    <PostCard
                        key={post.slug}
                        title={post.data.title}
                        description={post.data.description}
                        slug={post.slug}
                        date={new Date(post.data.pubDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
                        tags={post.data.tags}
                    />
                ))}

                {filteredPosts.length === 0 && (
                    <div className="col-span-full py-32 text-center rounded-2xl bg-white/5 border border-dashed border-white/10">
                        <div className="opacity-30 flex flex-col items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-xl font-bold">No se encontraron resultados</p>
                            <p className="text-sm">Prueba ajustando los filtros</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 pt-8">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="btn btn-sm btn-circle btn-ghost border border-white/10 disabled:opacity-20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${currentPage === i + 1
                                        ? 'bg-white text-black'
                                        : 'text-white/40 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="btn btn-sm btn-circle btn-ghost border border-white/10 disabled:opacity-20"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}
