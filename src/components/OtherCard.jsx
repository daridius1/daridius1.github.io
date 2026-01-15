/**
 * @param {Object} props
 * @param {string} props.title
 * @param {React.ReactNode} props.children
 * @param {string} [props.href]
 */
export default function OtherCard({ title, children, href }) {
    const CardContent = () => (
        <div className={`card bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl transition-all hover:scale-[1.01] overflow-hidden flex flex-col h-full ${href ? 'cursor-pointer hover:bg-white/10' : ''}`}>
            <div className="card-body p-6 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                    <h3 className="card-title text-xl font-black tracking-tighter text-white">
                        {title}
                    </h3>
                </div>

                <div className="text-sm text-white/80 leading-relaxed font-medium flex-1 flex flex-col">
                    {children}
                </div>
            </div>
        </div>
    );

    if (href) {
        return (
            <a href={href} className="block h-full no-underline">
                <CardContent />
            </a>
        );
    }

    return <CardContent />;
}
