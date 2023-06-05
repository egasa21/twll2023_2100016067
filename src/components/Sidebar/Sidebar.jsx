import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { UilBars, UilSignOutAlt } from '@iconscout/react-unicons'
import Logo from '../../imgs/logo.png'
import { SidebarData } from '../../Data/Data'
import './sidebar.css'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(true);

    const location = useLocation();
    const sidebarVariants = {
        true: {
            left: '0'
        },
        false: {
            left: '-60%'
        }
    }
    console.log(window.innerWidth);
    return (
        <>
            <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpanded(!expanded)}>
                <UilBars />
            </div>
            <motion.div className='sidebar' variants={sidebarVariants} animate={window.innerWidth <= 768 ? `${expanded}` : ''}>
                {/* Logo */}
                <div className="logo">
                    <img src={Logo} alt="logo" />
                    <span>
                        SIMRS
                    </span>
                </div>

                <div className="menu">
                    {SidebarData.map((item, index) => {
                        const isActive = location.pathname === item.url;

                        return (
                            <Link
                                className={isActive ? "menuItem active" : "menuItem"}
                                key={index}
                                style={{ textDecoration: "none", color: "black" }}
                                to={item.url}
                            >
                                <item.icon />
                                <span>{item.heading}</span>
                            </Link>
                        );
                    })}
                    {/* Signout Icon */}
                    <div className="menuItem">
                        <UilSignOutAlt />
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Sidebar