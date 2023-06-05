import React from 'react'
import Cards from '../Cards/Cards'
import Sidebar from '../Sidebar/Sidebar'
import Table from '../Table/Table'
import './home.css'
import '../../App.css'

const Home = () => {
    return (
        <div className='AppGlass'>
            <Sidebar />
            <div className=''>
                <h1>Dashboard</h1>
                <div className="Home">
                    <Cards />
                    <Table />
                </div>
            </div>
        </div>
    )
}

export default Home