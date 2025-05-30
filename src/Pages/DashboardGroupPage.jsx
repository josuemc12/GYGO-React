import React from 'react';
import "../styles/DashboardGPage.css";
import { DashboardsCards } from '../components/DashboardsCards';


export const DashboardGroupPage = () => {
    return (
        <>
            <div className='container mt-5'>
                <div className='mb-5'>
                    <h3>Bienvenido ~Usuario~</h3>
                </div>
                <DashboardsCards />
            </div>
        </>
    )
}
