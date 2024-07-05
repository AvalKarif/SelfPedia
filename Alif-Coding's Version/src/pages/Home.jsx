import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "../component/Search";
import { isEmpty, isNull } from "lodash";
function MyQuery() {
  return new URLSearchParams(useLocation().search);
}

export const StringLimit = (str, num) => {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};

const Home = ({ user }) => {
  const [blog, setblog] = useState([]);
  const [tags, setTags] = useState([]);
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const getQuery = MyQuery();
  const searchQuery = getQuery.get("searchQuery");
  const [isEmpty2, setIsEmpty] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);

  const handleDelete = async (id) => {
    try {
      deleteDoc(doc(db, "blogs", id));
      toast.success("blog deleted succesfully");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const undo = onSnapshot(collection(db, "blogs"), (event) => {
      let filtered = [];
      let tags = [];

      event.docs.forEach((doc) => {
        tags.push(...doc.get("tags"));
        filtered.push({ id: doc.id, ...doc.data() });
      });

      const uniqueTags = [...new Set(tags)];
      setTags(uniqueTags);

      setblog(filtered);
      setActive("home");
    });

    return () => {
      undo();
    };
  }, []);

  const getSearch = async () => {
    const collectionRef = collection(db, "blogs");
    const myQuery1 = query(collectionRef, where("title", "==", searchQuery));
    const myQuery2 = query(
      collectionRef,
      where("tags", "array-contains", searchQuery)
    );
    const myQuery3 = query(collectionRef, where("category", "==", searchQuery));

    const snapshot1 = await getDocs(myQuery1);
    const snapshot2 = await getDocs(myQuery2);
    const snapshot3 = await getDocs(myQuery3);

    let title = [];
    let tags = [];
    let category = [];

    snapshot1.forEach((doc) => {
      title.push({ id: doc.id, ...doc.data() });
    });

    snapshot2.forEach((doc) => {
      tags.push({ id: doc.id, ...doc.data() });
    });

    snapshot3.forEach((doc) => {
      category.push({ id: doc.id, ...doc.data() });
    });

    const gabung = title.concat(tags);
    const gabung2 = gabung.concat(category);

    setblog(gabung);
  };

  const getBlogs = async () => {
    const collectionRef = collection(db, "blogs");
    const firstFour = query(collectionRef, orderBy("title"), limit(4));
    const snapshot = await getDocs(firstFour);

    setblog(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
  };

  useEffect(() => {
    if (!isNull(searchQuery)) {
      getSearch();
    }
  }, [searchQuery]);

  const handleChange = (e) => {
    const { value } = e.target;
    if (isEmpty(value)) {
      getBlogs();
    }
    setSearch(value);
  };
  const updateState = (snapshot) => {
    const SnapshotEmpty = snapshot.size === 0;

    if (!SnapshotEmpty) {
      const blogData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setblog((blogs) => [...blogs, ...blogData]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    } else {
      toast.info("no more blog to display!");
      setIsEmpty(true);
    }
  };

  const handleMore = async () => {
    const collectionRef = collection(db, "blogs");
    const nextfour = query(
      collectionRef,
      orderBy("title"),
      limit(4),
      startAfter(lastVisible)
    );

    const getThat = await getDocs(nextfour);
    updateState(getThat);
  };

  useEffect(() => {
    if (!isEmpty(active)) {
      getBlogs();
    }
  }, [active]);

  return (
    <div className="container">
      <div>
        <p className="text-center text-2xl">Trending</p>
      </div>
      <div className="w-full flex">
        <div className="max-w-[60%] w-full">
          <p>Daily blogs</p>
          <div className="h-[0.5px] border border-black w-full mt-3 mb-3"></div>
          {blog &&
            blog.map((item, index) => (
              <div
                key={index}
                className="w-full ml-5 flex flex-row relative mb-5"
              >
                <div className="w-[40%] max-h-[200px]">
                  <img
                    src={item?.imgUrl}
                    className="rounded-sm w-full h-full"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col ml-2">
                  <p className="text-md rounded-md bg-blue-400 text-white border  p-1 w-[100px] text-center">
                    {item?.category}
                  </p>
                  <p className="text-xl mt-3">{item.title}</p>
                  <p className="mt-4">
                    {item?.username} - {item?.timestamp.toDate().toDateString()}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    {StringLimit(item?.description, 100)}
                  </p>
                  <button className=" bg-slate-700 text-white hover:bg-slate-500 max-w-[100px] rounded-md px-2 py-1 absolute bottom-0">
                    <Link to={`/detail/${item.id}`}>Load more</Link>
                  </button>

                  {item?.userID === user?.uid && (
                    <div className="absolute bottom-0 right-0 flex">
                      <FaTrash
                        size={25}
                        color="red"
                        onClick={() => handleDelete(item?.id)}
                        className="cursor-pointer"
                      />

                      <MdCreate
                        size={25}
                        color="blue"
                        className="cursor-pointer"
                        onClick={() => navigate(`/update/${item.id}`)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          {!isEmpty2 ? (
            <div className="w-full  flex justify-center">
              <button
                className="border border-black px-3 py-2"
                onClick={handleMore}
              >
                Load more
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <h1 className="text-2xl">No more Blogs to display!</h1>
            </div>
          )}
        </div>
        <div className="w-[40%] ml-2">
          <div className="flex justify-center content-center p-5">
            <Search search={search} handleChange={handleChange} />
          </div>
          <h1 className="w-full text-center text-2xl">Tags</h1>
          <div className="grid grid-cols-4 mt-3 ">
            {tags &&
              tags?.map((item, i) => {
                if (item?.length > 0) {
                  return (
                    <div
                      className=" cursor-pointer max-w-[100px] test-center rounded-sm bg-slate-300 text-semibold"
                      key={i}
                      onClick={() => navigate(`/tags/${item}`)}
                    >
                      {item}
                    </div>
                  );
                }
              })}
          </div>
          <h1 className="text-center text-2xl">Most Popular Blogs</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
