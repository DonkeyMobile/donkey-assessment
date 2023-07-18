import React, {useState} from "react";
import './style.css'
import uploadIcon from "../../assets/icons/bx_upload.svg";
import deleteIcon from "../../assets/icons/material-symbols_delete.png";
import {Link} from "react-router-dom";
import camera from '../../assets/icons/ph_camera-fill.svg';
import video from '../../assets/icons/ic_round-video-library.svg';
import document from '../../assets/icons/basil_document-solid.svg';
import leftIcon from '../../assets/icons/Circle Left.png'
import BottomMenu from "../../components/bottomMenu/BottomMenu";
import Navbar from "../../components/navbar/Navbar";
export const Uploadposts: React.FC =() => {
    const [popup , setPopup] = useState(false);
    return (
      <>
          <Navbar />
          <div className="postContainer">
              <Link to={'/homepage'} className="PoText">
                  <img  className="leftIcon" src={leftIcon}/>
              </Link>

              <textarea
                  onClick={()=> setPopup(false)}
                  className="postInput"
                  placeholder="Write your post here..."
              ></textarea>

              {
                  popup ?
                      <div className="uploadtype">
                          <div className="uploadtype_items">
                              <img src={camera}/>
                              <h5>Camera</h5>
                          </div>

                          <div className="uploadtype_items">
                              <img src={video}/>
                              <h5>Photo & Video Library</h5>
                          </div>

                          <div className="uploadtype_items">
                              <img src={document}/>
                              <h5>Document</h5>
                          </div>

                          <button type={"button"} className="cancelbutton" onClick={()=> setPopup(false)}>
                              Cancel
                          </button>
                      </div>
                      :
                      <div  className="postBox">
                          <div className="delete_icon">
                              <img src={deleteIcon}/>
                          </div>
                          <Link to={'/homepage'} className="PoText">
                              <span className='postText'>Post</span>
                          </Link>
                          <div onClick={()=>{
                              setPopup(true)
                          }} className="uploadBox_icon_post">
                              <img src={uploadIcon}/>
                          </div>
                      </div>
              }
          </div>
          <BottomMenu/>
      </>
    )
}