import React from 'react'
import * as ICONS from 'react-icons/fa6'

const NavbarLinks = ({ children, index, setCurrentLinkTarget, currentLinkTarget, onClickFunction }) => {
    return (
        <div 
        className={`navlink link${index}`}
        onMouseEnter={() => {setCurrentLinkTarget(index)}}
        onMouseLeave={() => {setCurrentLinkTarget(0)}}  
        onClick={onClickFunction}
        >
            {children}
        </div>
    )
}

export default NavbarLinks