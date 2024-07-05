import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { isNull } from "lodash";
import { StringLimit } from "./Home";

const Tags = ({ user }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);

  const getManyBlog = async () => {
    const collectionRef = collection(db, "blogs");
    const Query = query(collectionRef, where("tags", "array-contains", id));
    const snapshot = await getDocs(Query);

    let filtered = [];
    snapshot.forEach((doc) => {
      filtered.push({ id: doc.id, ...doc.data() });
    });
    setBlog(filtered);
  };

  useEffect(() => {
    if (!isNull(id)) {
      getManyBlog();
    }
  }, [id]);

  console.log(blog);
  return (
    <>
      <div className="w-full h-full grid grid-cols-2 ml-5 mt-3">
        {blog &&
          blog.map((item, i) => (
            <div className="w-full flex relative" key={i}>
              <div className="w-[40%] h-[150px]">
                <img src={item?.imgUrl} className="w-full h-full rounded-sm" />
              </div>
              <div className="w-[60%] h-[150px] ml-2 overflow-hidden">
                <h1 className="text-black text-xl font-semibold">
                  {item?.title}
                </h1>
                <p className="mt-2 mb-2">
                  By {item?.username} -{" "}
                  {item?.timestamp.toDate().toDateString()}
                </p>
                <p className="mt-1 mb-1">{StringLimit(item.description, 43)}</p>

                <button className=" bg-slate-700 text-white hover:bg-slate-500 max-w-[100px] rounded-md px-2 py-1 absloute bottom-0 translate-y-5">
                  <Link to={`/detail/${item.id}`}>Load more</Link>
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Tags;
