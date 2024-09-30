import groupData from "../data/groups.json";
import postData from "../data/posts.json";
import "./MainPage.css";
import { useState } from "react";
import duif from "../assets/duif.png";
import { Group, Post } from "../types";
import { findUser, findGroupName } from "../utils/helpers";

export const MainPage = () => {
  const { groups } = groupData;
  const { posts } = postData;

  const [chosenGroup, setChosenGroup] = useState(0);

  const selectedPosts = posts.filter((post) =>
    chosenGroup !== 0 ? post.groupId === chosenGroup : posts
  );

  return (
    <div className="mainpage">
      <div className="groups">
        <div
          className={`groupBox ${chosenGroup === 0 ? "selected" : ""}`}
          onClick={() => setChosenGroup(0)}
        >
          <img src={duif} alt="duif" />
          <p>Mijn kerk</p>
        </div>
        {groups.map((group: Group) => (
          <div
            key={group.id}
            className={`groupBox ${chosenGroup === group.id ? "selected" : ""}`}
            onClick={() => setChosenGroup(group.id)}
          >
            <img src={require(`../assets/groups/${group.picture}`)} alt={group.name} />
            <p>{group.name}</p>
          </div>
        ))}
      </div>
      <div className="posts">
        {selectedPosts.map((post: Post) => (
          <div key={post.id} className="postBox">
            <div className="userBox">
              <img
                src={require(`../assets/users/${findUser(post.userId)?.picture}`)}
                alt={findUser(post.userId)?.name}
              />
              <div className="userName">{findUser(post.userId)?.name}</div>
              <div className="groupName">{findGroupName(post.groupId)}</div>
            </div>
            <div>{post.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
