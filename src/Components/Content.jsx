import React from 'react'
import Home from './pages/Home'
import Cursor from './Cursor'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

import '../styles/content.css'

gsap.registerPlugin(ScrollTrigger);

const Content = ({ currentPage }) => {
    return (
        <>
            <Cursor />
            <Home />
        </>
    )
}

export default Content