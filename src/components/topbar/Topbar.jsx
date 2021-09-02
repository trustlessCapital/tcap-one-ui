import React from 'react'
import "./topbar.css"
import {Notifications, Build, Help, AccountCircle, Description} from '@material-ui/icons';
export default function Topbar(){
return(
    <div className="topbar">
        <div className="topbarWrapper">
            <div className="topLeft">
                <span className="logo">
                    <img src="https://www.trustless.capital/assets/images/logo-red-small.png" alt="Trustless Capital" className="" />
                </span>
                <div className="tcapOneTitle"><h3>Welcome to TCAP One</h3></div>
            </div>
            
            

            <div className="searchBox">
                <input type="text" className="searchInput" placeholder="Serach" />
            </div>
            
            <div className="topRight">
                <div className="topbarIconContainer">
                    <Notifications/><span className="topIconBadge">2</span>
                </div>
                <div className="topbarIconContainer">
                    <Build/>
                </div>
                <div className="topbarIconContainer">
                    <Help/>
                </div>
                <div className="loggedAs">Arranger: Arranger1</div>
            </div>
            
        </div>
    </div>
)
}