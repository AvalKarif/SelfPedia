import React from "react";
import { MdThumbUp } from "react-icons/md";
import { RiThumbUpFill } from "react-icons/ri";
import { TbHomeUp } from "react-icons/tb";

const Like = ({ Like, handleLike, userId }) => {
  const LikeStatus = () => {
    if (Like?.length > 0) {
      return Like.find((id) => id === userId) ? (
        <div>
          <RiThumbUpFill size={30} /> {Like.length}{" "}
          {Like.length === 1 ? "Like" : "Likes"}
        </div>
      ) : (
        <div>
          <MdThumbUp size={30} /> {Like.length}{" "}
          {Like.length === 1 ? "Like" : "Likes"}
        </div>
      );
    }

    return (
      <>
        <MdThumbUp /> Likes
      </>
    );
  };
  return (
    <>
      <span onClick={!userId ? null : handleLike}>
        {!userId ? (
          <button title="please login to likes">
            <LikeStatus />
          </button>
        ) : (
          <button>
            <LikeStatus />
          </button>
        )}
      </span>
    </>
  );
};

export default Like;
