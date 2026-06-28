"use client"
import { cn } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Message {
    id: number;
    content: string;
    sender: 'user' | 'bot';
    button?: string;
}

const AnimatedMessage = () => {
    return (
        <div className="flex flex-col gap-1 text-black">
            <div className="flex items-start">
                <div className="w-8 h-8 bg-yellow-500 flex items-center justify-center rounded-full mr-2">CB</div>
                    <div className={cn("bg-gray-100 px-3 py-2 rounded-3xl max-w-[70%]")}>
                    <span>Hello! How can I help you today?</span>
                </div>
            </div>
        </div>
    )
}
const mockMessages: Message[] = [
    {
        id: 2,
        content: 'Hi! Tell me a joke.',
        sender: 'user'
    },
    {
        id: 3,
        content: 'Why did the developer go broke? Because he used up all his cache!',
        sender: 'bot',
        button: 'Clear chat history'
    },
  
]

interface TgbotProps {  
    ref6: React.RefObject<HTMLDivElement | null>;
}

export default function Tgbot({ref6}: TgbotProps) {
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [input, setInput] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessages(prev => [...prev, { id: (messages.length + 1), content: input, sender: 'user' }]);
        setInput('');
    };

    return (
        <>
        <div className="grid grid-rows-[max-content_1fr_max-content] w-[300px] aspect-[9/16] bg-gray-950 rounded-2xl relative border border-gray-800">
            <div className="absolute top-4 w-1/4 h-5 bg-black rounded-full left-1/2 -translate-x-1/2"/>
            {/* Header */}
            <header className="pt-10 pb-2 flex items-center justify-between px-4 bg-[#229ED9] rounded-t-2xl">
                <div className="w-10"/>
                <div className="flex flex-col items-center">
                    <span className="text-white font-semibold text-center">ChatBot</span>
                    <span className="text-white/50 text-xs text-center">bot</span>
                </div>
                <div className="flex">
                    <div className="w-8 h-8 bg-yellow-500 flex items-center justify-center rounded-full mr-2">CB</div>
                </div>
            </header>
            {/* Chat Area */}
            <main className="flex-1 p-4 flex flex-col justify-end relative">
                <Image src="/tgbg.png" alt="tgbot" fill className="z-0" />
                <div className="z-10 flex flex-col gap-3 ">
                    <AnimatedMessage />
                    {messages.map((message) => message.sender === 'user' ?
                    (<div key={message.id} className="self-end flex flex-col gap-1 text-black max-w-[70%]">
                        <div key={message.id} className="flex items-start">
                            <div className=" px-3 py-2 rounded-3xl bg-lime-200">
                                <span>{message.content}</span>
                            </div>
                        </div>
                    </div>)
                    :(
                        <div key={message.id} className="flex flex-col gap-1 text-black">
                            <div key={message.id} className="flex items-start">
                                <div className="w-8 h-8 bg-yellow-500 flex items-center justify-center rounded-full mr-2">CB</div>
                                <div className={cn("bg-gray-100 px-3 py-2 rounded-3xl max-w-[70%]",
                                    message.button && "rounded-b-md"
                                )}>
                                    <span>{message.content}</span>
                                </div>
                            </div>
                            {message.button && (
                                <button onClick={() => setMessages(mockMessages)} className="w-[70%] bg-slate-200 text-black px-2 py-1 rounded-md ml-10">
                                    {message.button}
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </main>
            {/* Input Area */}
            <div ref={ref6} className="bg-gray-100 border-t border-gray-200 px-3 py-2 w-full rounded-b-2xl">
                <form onSubmit={handleSubmit} className="flex items-center">
                    <input
                        type="text"
                        className="flex-1 bg-transparent outline-none px-2 py-1 text-black"
                        placeholder="Type a message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-[#229ED9] rounded-full p-2"
                    >
                        <SendHorizonal size={18} />
                    </button>
                </form>
            </div>
        </div>
        </>
    );
}
