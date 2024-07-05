import { signOut } from "firebase/auth";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      toast.info("you have been logged out!");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="flex justify-between w-full items-center p-2.5 bg-slate-200">
        <h1 className="text-3xl">
          <Link to={"/"}>SelfPedia</Link>
        </h1>

        {user?.uid ? (
          <div>
            <p
              className="text-xl ml-2 inline cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              {user.displayName}
            </p>
            <button className="border border-black p-2 rounded-sm ml-2">
              <Link to={"create"}>Create</Link>
            </button>
            <button
              className="border border-black p-2 rounded-sm ml-2"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button className="border border-black p-2 rounded-sm ml-2">
              <Link to={"register"}>Register</Link>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
