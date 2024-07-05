import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import {
  Timestamp,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { isEmpty } from "lodash";
import { FaComment } from "react-icons/fa";
import UserComment from "../component/UserComment";
import Commentbox from "../component/Commentbox";
import Like from "../component/Like";

const Details = ({ user }) => {
  const userId = user?.uid;
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState([]);
  const { id } = useParams();
  const [userComment, setUserComment] = useState("");
  let [like, setLike] = useState([]);

  const collectionRef = doc(db, "blogs", id);
  const getBlog = async () => {
    try {
      const undo = await getDoc(collectionRef);
      setBlog(undo.data());

      setComment(undo.data().comment ? undo.data().comment : []);
      setLike(undo.data().like ? undo.data().like : []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    id && getBlog();
  }, [id]);

  console.log(blog);
  console.log(comment);

  const handleSubmit = async (e) => {
    e.preventDefault();
    comment.push({
      createdAt: Timestamp.fromDate(new Date()),
      userId,
      name: user?.displayName,
      body: userComment,
    });
    await updateDoc(doc(db, "blogs", id), {
      ...blog,
      comment,
      timestamp: serverTimestamp(),
    });

    setComment(comment);
    setUserComment("");
  };

  console.log("user", userComment);

  const handleLike = async () => {
    if (userId) {
      if (blog?.like) {
        const index = like.findIndex((id) => id === userId);
        if (index === -1) {
          like.push(userId);
          setLike([...new Set(like)]);
        } else {
          like = like.filter((id) => id !== userId);
          setLike(like);
        }
      }

      await updateDoc(doc(db, "blogs", id), {
        ...blog,
        like,
        timestamp: serverTimestamp(),
      });
    }
  };

  return (
    <>
      <div
        className="w-full h-screen relative"
        style={{
          backgroundImage: `url("${blog?.imgUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          objectFit: "fill",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <p className="absolute text-2xl text-semibold bottom-0 translate-x-[100vh]">
          {blog?.title}
        </p>
      </div>
      <div className="w-full ml-10 mt-5">
        <div className="max-w-[60%] relative">
          <p className="text-xl">
            By {blog?.username} - {blog?.timestamp.toDate().toDateString()}
          </p>
          <div className="absolute top-0 right-0">
            <Like userId={userId} Like={like} handleLike={handleLike} />
          </div>
          <div className="mt-5 mb-5 border border-black h-[0.5px]"></div>
          <div>{blog?.description}</div>
          <div>
            <h4>{blog?.comment.length} Comments</h4>
          </div>
          {isEmpty(comment) ? (
            <UserComment
              msg={
                "No comment yet posted on this blog, be the first to comment!"
              }
            />
          ) : (
            comment?.map((comment, i) => (
              <UserComment
                createdAt={comment?.createdAt}
                key={i}
                name={comment?.name}
                body={comment?.body}
                userId={comment?.userId}
              />
            ))
          )}
          <Commentbox
            userId={user?.uid}
            handleSubmit={handleSubmit}
            userComment={userComment}
            setUserComment={setUserComment}
          />
        </div>
      </div>
    </>
  );
};

export default Details;
