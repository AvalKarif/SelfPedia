import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import TagsInput from "react-tagsinput";
import { Storage, auth, db } from "../config/firebase";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

const initialInput = {
  title: "",
  category: "",
  tags: [],
  description: "",
  trending: "no",
  comment: [],
  like: [],
};
const categoryOption = [
  "Sport",
  "Business",
  "Gaming",
  "Food",
  "Tecnology",
  "Music",
];

const Create = () => {
  const [form, setForm] = useState(initialInput);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState(null);

  const { title, category, tags, description, trending } = form;

  const handleSubmit = async (e) => {
    const collectionRef = collection(db, "blogs");

    e.preventDefault();

    if (
      tags &&
      category &&
      description &&
      trending &&
      title &&
      trending &&
      file
    ) {
      await addDoc(collectionRef, {
        ...form,
        timestamp: serverTimestamp(),
        userID: user?.uid,
        username: user?.displayName,
      });

      toast.success("created blog succesfully");
    } else {
      toast.error("please fill out the form with correct information");
    }
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategory = (category) => {
    setForm({ ...form, category });
  };

  const handleTrend = (e) => {
    setForm({ ...form, trending: e });
  };

  console.log(form);

  useEffect(() => {
    const uploadFile = () => {
      const categoryRef = ref(Storage, file.name);
      const uploadTask = uploadBytesResumable(categoryRef, file);

      uploadTask.on(
        "state_changed",
        (snaphot) => {
          const Task = (snaphot.bytesTransferred / snaphot.totalBytes) * 100;

          setProgress(Task);

          switch (snaphot.state) {
            case "paused":
              console.log("upload file paused");
              break;
            case "running":
              console.log("upload file running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setForm((prev) => ({ ...prev, imgUrl: url }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, [auth]);
  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <h1 className="text-center text-2xl mb-5">Create Blog</h1>
        <form
          className="flex flex-col space-y-5 max-w-[450px] w-full"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Title"
            className="border border-black py-2 rounded-sm"
            name="title"
            value={title}
            onChange={handleChange}
          ></input>

          <div className="border border-black w-full py-2 rounded-sm">
            <TagsInput
              placeHolder="Tags"
              value={tags}
              onChange={handleTags}
            ></TagsInput>
          </div>
          <select
            className="border border-black py-1"
            onChange={(e) => handleCategory(e.target.value)}
          >
            <option>Select Category</option>
            {categoryOption.map((item, index) => (
              <option value={"" || item} key={index}>
                {item}
              </option>
            ))}
          </select>

          <div className="w-full flex">
            <p>is it trending?</p>
            <input
              id="trending1"
              type="radio"
              value="yes"
              checked={trending === "yes"}
              name="trending"
              onChange={(e) => handleTrend(e.target.value)}
            ></input>
            <label htmlFor="trending1">Yes</label>
            <input
              id="trending2"
              type="radio"
              value="no"
              checked={trending === "no"}
              name="trending"
              onChange={(e) => handleTrend(e.target.value)}
            ></input>
            <label htmlFor="trending2">No</label>
          </div>

          <textarea
            placeholder="description"
            className="border border-black py-2 rounded-sm"
            name="description"
            value={description}
            onChange={handleChange}
          ></textarea>

          <input
            type="file"
            className="border border-black"
            onChange={(e) => setFile(e.target.files[0])}
          ></input>

          <button
            className="align-center p-2 bg-blue-600 text-white hover:bg-blue-400 disabled:bg-slate-400"
            type="submit"
            disabled={progress && progress < 100}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
