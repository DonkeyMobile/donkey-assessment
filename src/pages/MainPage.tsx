import userData from "../data/users.json";
import groupData from "../data/groups.json";
import postData from "../data/posts.json";
import "./MainPage.css";
import { useState } from "react";
import duif from "../assets/duif.png";

type Group = {
  id: number;
  name: string;
  picture: string;
};

type Post = {
  id: number;
  userId: number;
  groupId: number;
  message: string;
};

export const MainPage = () => {
  const { users } = userData;
  const { groups } = groupData;
  const { posts } = postData;

  const [chosenGroup, setChosenGroup] = useState(0);

  const selectedPosts = posts.filter((post) =>
    chosenGroup !== 0 ? post.groupId === chosenGroup : posts
  );

  const findUser = (userId: Number) => {
    const user = users.find((user) => user.id === userId);
    return user;
  };

  const findGroupName = (groupId: Number) => {
    const groupName = groups.find((group) => group.id === groupId);
    return groupName?.name;
  };

  return (
    <div className="mainpage">
      <div className="groups">
        <div className={`groupBox ${chosenGroup === 0 ? "selected" : ""}`} onClick={() => setChosenGroup(0)}>
          <img src={duif} alt="duif" />
          <p>Mijn kerk</p>
        </div>
        {groups.map((group: Group) => (
          <div
            key={group.id}
            className={`groupBox ${chosenGroup === group.id ? "selected" : ""}`}
            onClick={() => setChosenGroup(group.id)}
          >
            <img src={require(`../assets/${group.picture}`)} alt={group.name} />
            <p>{group.name}</p>
          </div>
        ))}
      </div>
      <div className="posts">
        {selectedPosts.map((post: Post) => (
          <div key={post.id} className="postBox">
            <div className="userBox">
              <img
                src={require(`../assets/${findUser(post.userId)?.picture}`)}
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
