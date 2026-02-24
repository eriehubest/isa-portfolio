import React, { useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";

import ScreenScribble from "./HomeScribble";
import { Canvas, useFrame } from "@react-three/fiber";

import { OrbitControls, PerspectiveCamera, Scroll } from "@react-three/drei";
import { Geometry } from "./Geometry";
import Application from "../../threejsCode/Application";
import AnimationTracker from "../../threejsCode/utils/AnimationTracker";

gsap.registerPlugin(ScrollTrigger, SplitText)

const animationTrack = AnimationTracker.getInstance();

const Home = () => {
    const root = useRef(null);
    const [introAnimation, setIntroAnimation] = useState(false);

    const progress = useRef(0);
    const canvasRef = useRef(null);
    const applicationRef = useRef(null);

    useLayoutEffect(() => {
        if (!canvasRef.current)
            return;

        if (applicationRef.current)
            return;

        applicationRef.current = Application.getInstance({
            $canvas: canvasRef.current,
        })
    }, [canvasRef])

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Intro Animation
            let heroDownSplitText = new SplitText(".transform-text", {
                type: "words",
                wordsClass: "word",
            })

            gsap.set('.bgblackanimate', {
                scaleX: 0,
                scaleY: 0,
            })

            gsap.set(heroDownSplitText.words, { yPercent: 150 })

            const homeDom = document.querySelector('.home')
            
            if (!introAnimation) {
                document.body.classList.add( "overflow-hidden", 'h-[100dvh]');
                homeDom.classList.add("overflow-hidden", 'h-[100dvh]' )
                return;
            }

            homeDom.classList.remove("overflow-hidden", 'h-[100dvh]')
            
            gsap.to(heroDownSplitText.words, {
                yPercent: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                onComplete: () => document.body.classList.remove("overflow-hidden", 'h-[100dvh]'),
            });


            const herotl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,

                    onUpdate: (self) => {
                        animationTrack.updateEvent('HEROIN', self.progress)
                    }
                }
            })

            // Scroll Timeline
            const journeytl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.journey',
                    start: 'top top',
                    end: () => (`+=${window.innerHeight * 4}`),
                    scrub: true,
                    pin: true,
                    pinSpacing: true,

                    onUpdate: (self) => {
                        animationTrack.updateEvent('JOURNEYIN', self.progress)
                    }
                }
            })

            journeytl.to('.bgblackanimate', {
                opacity: 1,
                duration: 0.2,
            })

            journeytl.to('.bgblackanimate', {
                scaleX: 1,
                scaleY: 1,
                duration: 1,
            }, "<")

            const abouttl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.about',
                    start: 'top bottom',
                    end: 'top top',
                    scrub: true,

                    onUpdate: (self) => {
                        animationTrack.updateEvent('ABOUTIN', self.progress)
                    }
                }
            })

            applicationRef.current.setAnimation(true);
        })

        return () => ctx.revert();
    }, [introAnimation])

    return (
        <div className="home" ref={root}>
            <ScreenScribble setIntroAnimation={setIntroAnimation} />

            <div className="canvas">
                <canvas ref={canvasRef} className="block w-full h-full"></canvas>
            </div>

            <div className="hero">
                <div className="hero-text">
                    <h1 className="transform-text">Hu Wenxuan's</h1>
                    <h2 className="transform-text">DSA Portfolio</h2>
                    <p className="transform-text">A student focusing on Mathemtical Thinking and Computer Sciences</p>
                </div>

                <div className="hero-info relative "></div>
            </div>

            <div className="journey h-screen w-screen flex flex-col justify-center items-center">
                {/* <h1 className="mt-20 animatetext text-7xl text-black opacity-0">My Journey</h1> */}
                <div className="absolute bgblackanimate top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[3000px] w-[3000px] bg-[#171412] rounded-full opacity-0"></div>
            </div>

            <div className="about">
                <h1>hi</h1>
            </div>
        </div>
    );
};

export default Home;