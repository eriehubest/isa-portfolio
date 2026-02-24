import React from 'react'
import gsap from 'gsap'

import { useGSAP } from '@gsap/react'

const Cursor = () => {
    useGSAP(() => {
        const dot = document.querySelector(".cursor-dot");
        if (!dot) return;

        gsap.set(dot, { xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(dot, "x", {
            duration: 0.3,
            ease: "power3.out"
        });

        const yTo = gsap.quickTo(dot, "y", {
            duration: 0.3,
            ease: "power3.out"
        });

        const move = (e) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener("mousemove", move);

        return () => {
            window.removeEventListener("mousemove", move);
        };
    }, [])

    return (
        <div className={`h-[20px] aspect-square cursor-dot pointer-events-none fixed top-0 left-0 rounded-full backdrop-blur-2xl bg-[#997E67]/50 z-9999 translate-x-[50%] flex-center `} >
            
        </div>
  )
}

export default Cursor