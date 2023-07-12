import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { UilBars, UilSignOutAlt } from '@iconscout/react-unicons'
import Logo from '../../imgs/logo.png'
import { SidebarData } from '../../Data/Data'
import './sidebar.css'
import { Link, useLocation ,useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Sidebar = () => {
    const [expanded, setExpanded] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () =>{
        Cookies.remove('access_token')
        navigate('/login')
    }

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
                    <div className="menuItem" onClick={handleLogout}>
                        <UilSignOutAlt />
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default Sidebar