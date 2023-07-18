import './style.css';
import React from "react";
import community from '../../assets/icons/fluent_people-community-24-filled.svg'
import profile from '../../assets/icons/iconamoon_profile-fill.svg'
import giving from '../../assets/icons/mdi_charity.svg'
import myChurch from '../../assets/icons/mdi_church.svg'
import calender from '../../assets/icons/uis_calender.svg'

const BottomMenu: React.FC = () =>{
       return(
        <div className="BottomMenu_container">
            <div className="bottomMenu_option">
                <img src={myChurch}/>
                <h5>My church</h5>
            </div>

            <div className="bottomMenu_option">
                <img src={community}/>
                <h5>Community</h5>
            </div>

            <div className="bottomMenu_option">
                <img src={giving}/>
                <h5>Giving</h5>
            </div>

            <div className="bottomMenu_option">
                <img src={calender}/>
                <h5>Calender</h5>
            </div>

            <div className="bottomMenu_option">
                <img src={profile}/>
                <h5>Profile</h5>
            </div>
        </div>
    )
}
export default BottomMenu;