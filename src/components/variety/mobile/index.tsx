import { AlfaTradeLogo } from "@/assets/AlfaTradeLogo";
import { ArrowDown, ArrowUp, Blocks, Search, Settings, User, Wallet } from "lucide-react";

const walletItems = [

    {name: 'Bitcoin', symbol: 'BTC', balance: 0.001},
    {name: 'Ethereum', symbol: 'ETH', balance: 0.001},
    {name: 'XRP', symbol: 'XRP', balance: 0.001},
    // {name: 'Solana', symbol: 'SOL', balance: 0.001},
    // {name: 'Avalanche', symbol: 'AVAX', balance: 0.001},
    // {name: 'Dogecoin', symbol: 'DOGE', balance: 0.001},
    // {name: 'Tether', symbol: 'USDT', balance: 0.001},
    
]
const Line = ({vertical, className}:{vertical?: boolean, className?: string}) => {
    return (
        <div className={` 
            ${vertical ? 'w-px h-full' : 'h-px w-full'} 
            ${vertical ? 'bg-gradient-to-b from-transparent via-green-900 to-transparent' : 'bg-gradient-to-r from-transparent via-green-900 to-transparent'}
            ${className}`} 
        />
    )
}

interface MobileSceletonProps {
    ref1: React.RefObject<HTMLDivElement | null>;
    ref2: React.RefObject<HTMLDivElement | null>;
}


export default function MobileSceleton({ref1, ref2}: MobileSceletonProps) {
    return (
        <div className="grid grid-rows-[max-content_1fr_max-content] w-[300px] aspect-[9/16] bg-gray-950 rounded-2xl relative border border-gray-800">
            <div className="absolute top-4 w-1/4 h-5 bg-black rounded-full left-1/2 -translate-x-1/2"/>
            {/* Header */}
            <header className="h-14 mt-8 flex items-center justify-between  px-4 shadow-emerald-700">
                <div className="font-bold text-lg ml-2">
                    <AlfaTradeLogo/>
                </div>
                <div className="flex space-x-3">
                    <div className="flex items-center gap-2">
                        <div className="p-1 rounded-md  flex items-center justify-center border border-gray-800">
                            <User size={20}/>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-sm">Mikteor</div>
                            <div className="text-xs text-gray-500">dm...@gmail.com</div>
                        </div>
                    </div>
                </div>
            </header>
            {/* Main Content */}
            <main className="grid grid-rows-[1fr_max-content_2fr] p-4">
                    <div className="rounded flex gap-4 justify-between">
                        <Line vertical />
                        <div ref={ref1} className="flex-1 flex flex-col gap-2 justify-between py-6">
                            <div className="flex items-end gap-1">
                                <div className="text-lg text-gray-500">$</div>
                                <div className="text-4xl font-bold">1000</div>
                                <div className="flex ml-auto items-end justify-between h-full gap-2">
                                    {[5,10,30,20,50,40,50,80,100].map((height, index) => (
                                        <div style={{height: `${height}%`}} className={`w-2 ${index === 9 ? 'bg-green-800' : 'bg-gray-700'} rounded`} key={index} />
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                <button className="text-white px-2 py-2 flex items-center justify-center rounded-lg border border-gray-800">
                                    <ArrowDown size={16}/>
                                </button>
                                <button className="text-white px-2 py-2 flex items-center justify-center rounded-lg border border-gray-800">
                                    <ArrowUp size={16}/>
                                </button>
                                <button className="text-white px-2 py-2 flex items-center justify-center rounded-lg border border-gray-800">
                                    <Wallet size={16}/>
                                </button>
                                <button className="text-white px-2 py-2 flex items-center justify-center rounded-lg border border-gray-800">
                                    <Settings size={16}/>
                                </button>
                            </div>
                            
                        </div>
                        <Line vertical />
                    </div>
                    <div className="text-lg font-bold my-2">Wallet</div>
                    <div className="flex flex-col gap-2 overflow-y-hidden " >
                        {walletItems.map((item) => (
                            <div key={item.symbol} className="flex items-center justify-between w-full p-2 bg-gray-950 border border-gray-800 rounded-lg">
                                <div className="flex items-center gap-2 w-full">
                                    <div className="w-10 h-10 bg-gray-700 rounded" />
                                    <div className="flex flex-col">
                                        <div className="text-sm">{item.name}</div>
                                        <div className="text-xs">{item.symbol}</div>
                                    </div>
                                    <div className="text-lg font-bold ml-auto flex-1 text-right">{item.balance}</div>
                                </div>
                            </div>
                        ))}
                    </div>
            </main>
            {/* Bottom Navigation */}
            <nav className="py-2">
                <Line className="mb-3" />
                <div ref={ref2} className="flex items-center justify-around">
                    <div className="flex flex-col items-center gap-1">
                        <Blocks size={20}/>
                        <span className="text-xs text-gray-500">Home</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Search size={20}/>
                        <span className="text-xs text-gray-500">Search</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <User size={20}/>
                        <span className="text-xs text-gray-500">Profile</span>
                    </div>
                </div>
            </nav>
        </div>
    );
}
