import React, { useLayoutEffect, useRef, useState } from 'react'

import gsap from 'gsap'

import { AiFillHome } from 'react-icons/ai'
import { FaFaceSmile, FaFaceSurprise, FaLightbulb } from 'react-icons/fa6'

import NavbarLinks from './NavbarLinks'

const navItems = [
	{
		id: 1,
		icon: <AiFillHome className="home-link icon-link" />,
	},
	{
		id: 2,
		icon: <FaFaceSmile className="achievements-link icon-link" />,
	},
	{
		id: 3,
		icon: <FaLightbulb className="projects-link icon-link" />,
	},
];

const Navbar = ({ pagesListInfo, setCurrentPage, currentPage }) => {
	const [currentLinkTarget, setCurrentLinkTarget] = useState(0);
	const root = useRef(null);

	useLayoutEffect(() => {
		const ctx = gsap.context(() => {
			gsap.killTweensOf('.navlink');
			gsap.to('.navlink', { opacity: 0.2, width: '50%', duration: 0.2, ease: 'power2.inOut' });

			if (currentLinkTarget !== 0) {
				gsap.killTweensOf(`.link${currentLinkTarget}`);
				gsap.to(`.link${currentLinkTarget}`, { width: '60%', opacity: 1, duration: 0.2, ease: 'power2.inOut' });
			}
		}, root)

	}, [currentLinkTarget])

	return (
		<div className="navbar" ref={root}>
			<div className="title flex-1 opacity-0">
				<h1>
					Eric
				</h1>
			</div>

			<div className="navlinks">
				{navItems.map((item) => (
					<NavbarLinks
						key={item.id}
						index={item.id}
						currentLinkTarget={currentLinkTarget}
						setCurrentLinkTarget={setCurrentLinkTarget}
						onClickFunction={() => setCurrentPage(pagesListInfo[item.id - 1])}
					>
						{item.icon}
					</NavbarLinks>
				))}
			</div>

			<div className="logo flex-1 opacity-0">LOGO</div>
		</div>
	)
}

export default Navbar