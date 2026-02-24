import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const ScreenScribble = ({ replayKey, setIntroAnimation }) => {
    const root = useRef(null);
    const inkPathRef = useRef(null);
    const shadowPathRef = useRef(null);

    const D = `M 6 588 C 220 395 384 386 426 387 C 526 389 594 470 541 502 C 498 520 460 501 456 433 C 450 330 503 247 615 216 C 815 172 989 254 1200 0`
    
    useLayoutEffect(() => {
        const svg = root.current;
        const ink = inkPathRef.current;
        if (!svg || !ink) return;

        const ctx = gsap.context(() => {
            const length = ink.getTotalLength();

            gsap.set(ink, {
                strokeDasharray: length,
                strokeDashoffset: length,
                opacity: 1,
            });

            const tl = gsap.timeline({
                onComplete: () => {
                    setIntroAnimation(true);
                }
            });

            tl.to(ink, {
                strokeDashoffset: 0,
                duration: 1.4,
                ease: "power2.inOut",
            });

            tl.to(ink, {
                strokeDashoffset: length,
                duration: 1.2,
                ease: "power2.inOut",
            }, "+=0.15");

            tl.to(shadowPathRef.current, { opacity: 0, duration: 0.25 }, "<");
        }, root);

        return () => ctx.revert();
    }, [replayKey]);

    return (
        <svg
            ref={root}
            className="screen-scribble absolute z-1000"
            viewBox="0 0 1200 600"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            {/* thin grey base */}
            <path
                ref={shadowPathRef}
                d={D}
                fill="none"
                stroke="rgba(0,0,0,0.28)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* black ink that draws */}
            <path
                ref={inkPathRef}
                d={D}
                fill="none"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ScreenScribble;