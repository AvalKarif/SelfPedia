import React from "react";
import { FaComment } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Commentbox = ({ userId, userComment, setUserComment, handleSubmit }) => {
  return (
    <>
      <div className="w-full justify-center content-center">
        <form onSubmit={handleSubmit} className="flex flex-row">
          <input
            className="px-5 py-2 border border-black"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
          ></input>
          {!userId ? (
            <div>
              <h1>
                You have not Sign up yet!, login to comment{" "}
                <Link to={"/login"}>Login</Link>
              </h1>
            </div>
          ) : (
            <div>
              <button className="border border-black" type="submit">
                <FaComment size={30} />
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Commentbox;
