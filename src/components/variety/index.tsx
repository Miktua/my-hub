"use client"
import Saas from "./saas";
import MobileSceleton from "./mobile";
import Tgbot from "./tgbot";
import { useState } from "react";
import { useRef } from "react";
export default function Variety() {

    const [, setSelected] = useState(0);
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const ref3 = useRef<HTMLDivElement>(null);
    const ref4 = useRef<HTMLDivElement>(null);
    const ref6 = useRef<HTMLDivElement>(null);

    return (
        <section className="flex h-screen w-screen relative" onMouseLeave={() => setSelected(0)}>
                {/* <div className="w-[2px] h-[130vh] bg-gradient-to-b from-transparent via-white to-transparent absolute left-[30%] -top-32 z-20 rotate-[7deg]"/>
                <div className="w-[2px] h-[130vh] bg-gradient-to-b from-transparent via-white to-transparent absolute left-[65%] -top-32 z-20 rotate-[7deg]"/> */}
            <div className="flex h-screen w-screen  relative">
                <div
                    className="w-max absolute left-0 bottom-0 bg-background h-screen flex items-end"
                    onMouseEnter={() => setSelected(1)}

                >
                    <MobileSceleton ref1={ref1} ref2={ref2} />
                </div>
                <div className="w-max absolute left-1/2 -translate-x-1/2 bottom-0 bg-background h-screen scale-50 flex items-end"
                    onMouseEnter={() => setSelected(2)}
                >
                    <Saas ref3={ref3} ref4={ref4} />
                </div>
                <div className="w-max absolute left-[60%] bottom-0 bg-background h-screen flex items-end"
                    onMouseEnter={() => setSelected(3)}
                >
                    <Tgbot ref6={ref6} />
                </div>
            </div>
        </section>
    )
}
