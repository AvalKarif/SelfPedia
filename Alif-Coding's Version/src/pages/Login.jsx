import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";

const Login = ({ user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      {error && toast.error(error)}
      <div className="w-full flex justify-center items-center flex-col">
        <h1 className="text-center text-2xl mb-5">Login</h1>
        <form
          className="flex flex-col space-y-5 max-w-[450px] w-full"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Email"
            className="border border-black py-2 rounded-sm"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            placeholder="Password"
            className="border border-black py-2 rounded-sm"
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <button
            className="align-center p-2 bg-blue-600 text-white hover:bg-blue-400"
            type="submit"
          >
            Submit
          </button>
        </form>

        <p className="text-center">
          dont have an account? <Link to={"/register"}>Login</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
