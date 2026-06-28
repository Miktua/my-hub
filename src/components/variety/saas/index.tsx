
interface SaasProps {
    ref3: React.RefObject<HTMLDivElement | null>;
    ref4: React.RefObject<HTMLDivElement | null>;
}
export default function Saas({ref3, ref4}: SaasProps) {
    return (
        <div>
            <div className="flex flex-col h-full w-screen bg-background rounded-2xl ">
                {/* Header */}
                <header className="h-16 bg-gray-200 flex items-center px-6">
                    <div className="flex-1">Logo</div>
                    <div className="flex space-x-4">
                        <div className="w-8 h-8 bg-gray-300 rounded" />
                        <div className="w-8 h-8 bg-gray-300 rounded" />
                    </div>
                </header>
                <div className="flex flex-1">
                    {/* Sidebar */}
                    <aside className="relative w-56 bg-gray-100 p-4 flex flex-col space-y-4 ">
                        <div ref={ref3} className="h-10 bg-gray-200 rounded" />
                        <div className="h-10 bg-gray-200 rounded" />
                        <div className="h-10 bg-gray-200 rounded" />
                        <div className="h-10 bg-gray-200 rounded" />
                    </aside>
                    {/* Main Content */}
                    <main className="flex-1 bg-white p-8 grid grid-cols-2 gap-6">
                        <div ref={ref4} className="h-32 bg-gray-100 rounded" />
                        <div className="h-32 bg-gray-100 rounded" />
                        <div className="h-32 bg-gray-100 rounded" />
                        <div className="h-32 bg-gray-100 rounded" />
                        <div className="h-32 bg-gray-100 rounded" />
                        <div className="h-32 bg-gray-100 rounded" />
                    </main>
                </div>
            </div>
        </div>
    )
}