import React, {useEffect} from "react";
import './style.css'
import photo1 from '../../assets/images/Rectangle .svg'
import postPhoto from '../../assets/images/Rectangle 5930.png';
import likeIcon from '../../assets/icons/Icons.svg'
import commentIcon from '../../assets/icons/Icons (1).svg'
import forwardIcon from '../../assets/icons/Icons (2).svg'
import gropeIcon from '../../assets/icons/Group 56598 .svg'

export const Post: React.FC<{ username: string, date: string, description: string }> = ({ username, date, description }) => {
    return (
        <div className="postParent">
            <div className="profile-photo">
                <div className="profilePhoto">
                    <img src={photo1} alt="Profile" />
                </div>
                <div className="nameDate">
                    <h5>{username}</h5>
                    <p>{date}</p>
                </div>
            </div>
            <div className="userComment">
                <p>{description}</p>
                <span>See more</span>
            </div>

            <button className="translation">See translation</button>

            <div className="postPhoto">
                <img src={postPhoto} alt="Post" />
            </div>
            <div className="like-comment-forward">
                    <div className="leftsectionIcons">
                        <img src={likeIcon} alt="like"/>
                        <img src={commentIcon} alt="comment"/>
                        <img src={forwardIcon} alt="forward"/>
                    </div>
                    <div className="rightSectionIcon">
                        <img  className="gropeIcon" src={gropeIcon} alt="grope"/>
                        <span>
                            1239
                        </span>
                    </div>
            </div>
        </div>
    );
};
