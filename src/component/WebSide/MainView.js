import React from 'react'
import "../css/home.css"
export default function MainView() {
    return (

        <div className='home-main-div'>
            <div className='home-sub-div'>
                <div className='home-left-bar'>
                    <div className='home-heading'>
                        Medical Care
                    </div>
                    <div className='home-info'>
                        Help the medical student or doctors to manage drug associate with diseases and search them
                    </div>
                </div>
                <div className='home-right-bar'>
                    <img src='/medicine.jpg' />
                </div>
            </div>
        </div>

    )
}
