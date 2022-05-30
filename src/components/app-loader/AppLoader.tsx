import React from 'react'
import './AppLoader.scss'
import image from "../../Images/amicon.png"

export type AppLoaderProps = any

export const AppLoader = (props: AppLoaderProps) => {
    return (
        <div className="application-loading-container">
            <div className="application-loading-box">
                <h2>
                    <img src={image} alt="MUI Template" width="70" /> <br />
                    <div></div>
                </h2>
            </div>
        </div>
    )
}
