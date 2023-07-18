import './style.css';
import React, {useState} from "react";
import Navbar from "../../components/navbar/Navbar";
import BottomMenu from "../../components/bottomMenu/BottomMenu";
import {Link} from "react-router-dom";
import user from '../../assets/images/Ellipse.png';
import uploadIcon from '../../assets/icons/bx_upload.svg';
import camera from "../../assets/icons/ph_camera-fill.svg";
import video from "../../assets/icons/ic_round-video-library.svg";
import document from "../../assets/icons/basil_document-solid.svg";
import {Post} from "../../components/post/Post";
const HomePage: React.FC = () => {
    const [posts , setPosts] = useState([
        {username:"Lili" , date:"2023/10/02" , description:"Lorem Ipsum is simply dummy text of the printing1" },
        {username:"neda" , date:"2023/10/02" , description:"Lorem Ipsum is simply dummy text of the printing" },
        {username:"Eveline" , date:"2023/10/02" , description:"Lorem Ipsum is simply dummy text of the printing3" },
    ])

    const [popup , setPopup] = useState(false)

    return (
        <div>
            <Navbar />
            {
                popup?
                    <div className="uploadtype-homePage">
                        <div className="uploadtype_items">
                            <img src={camera} alt="camera"/>
                            <h5>Camera</h5>
                        </div>

                        <div className="uploadtype_items">
                            <img src={video} alt="video" />
                            <h5>Photo & Video Library</h5>
                        </div>

                        <div className="uploadtype_items">
                            <img src={document} alt="document"/>
                            <h5>Document</h5>
                        </div>

                        <button type={"button"} className="cancelbutton" onClick={()=> setPopup(false)}>
                            Cancel
                        </button>
                    </div>
                    :
                    <div className="uploadBox_container">
                        <img src={user} className="userImage_style" alt="user profile"/>
                        <div className="uploadBox">
                            <Link to={"/uploadpost"} className="uploadbox_title_parent">
                                <div className="uploadBox_title">
                                    <h5>Write message</h5>
                                </div>
                            </Link>
                            <div onClick={()=> setPopup(true)} className="uploadBox_icon">
                                <img src={uploadIcon} alt="upload button"/>
                            </div>
                        </div>

                    </div>

            }

            <div className="postsContainer">
            {
                posts.map((node , _)=>{
                    return <Post username={node.username} date={node.date} description={node.description}/>
                })
            }
            </div>



            <BottomMenu />
        </div>

    );
};

export default HomePage;
