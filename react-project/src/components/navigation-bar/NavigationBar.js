import React from 'react';
import './NavigationBar.css'

function NavigationBar() {
    return(
         <div className="navigation-bar-body">
            <div className="navigation-bar-wrapper">
                <div className="navigation-bar-links">
                    <a href='/' className="test1">
                        Home
                    </a>
                </div>
                <div className="navigation-bar-icons">
                    <a className="profile" href='/lists'>
                        Profile
                    </a>
                    <a className="notifications" href='/home'>
                        Notifs
                    </a>
                </div>
            </div>
         </div>
    )
}

export default NavigationBar;