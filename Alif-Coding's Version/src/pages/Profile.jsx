import { collection, getDocs, query, where } from "firebase/firestore";
import { isNull } from "lodash";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";

const Profile = ({ user }) => {
  const [metadata, setMetadata] = useState(null);
  const [blog, setBlog] = useState([]);
  const [id, setId] = useState(null);
  console.log(id);

  const getBlog = async () => {
    try {
      const collectionRef = collection(db, "blogs");
      const myquery = query(collectionRef, where("userID", "==", id));
      const snapshot = await getDocs(myquery);

      let filter = [];
      snapshot.forEach((doc) => {
        filter.push({ doc: doc.id, ...doc.data() });
      });

      setBlog(filter);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!isNull(id)) {
      getBlog();
    }
  }, [id]);

  useEffect(() => {
    if (!isNull(user)) {
      const { metadata, uid } = user;
      setMetadata(metadata);
      setId(uid);
    }
  }, [user]);

  console.log(blog);

  return (
    <>
      <div className="ml-10 w-full h-full mt-5">
        <p className="text-2xl">{user?.displayName}</p>
        <p>created At {!isNull(metadata) && Date(metadata.createdAt)}</p>
        <div className="w-full grid grid-cols-2 mt-4">
          {blog && blog?.length !== 0 ? (
            blog.map((item, i) => {
              return (
                <div key={i} className="w-full flex mt-4">
                  <div className="w-[40%] h-[150px]">
                    <img src={item?.imgUrl} className="w-full h-full" />
                  </div>
                  <div className="w-[60%] h-[150px]">
                    <p className="text-xl">{item?.title}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>You have not created any Blog, create some!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
