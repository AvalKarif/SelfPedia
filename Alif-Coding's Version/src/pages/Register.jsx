import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../config/firebase";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(user, { displayName: `${firstName} ${lastName} ` });
        toast.success("register succes!");
      } else {
        toast.error("password doesnt match");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <h1 className="text-center text-2xl mb-5">Register</h1>
        <form
          className="flex flex-col space-y-5 max-w-[450px] w-full"
          onSubmit={handleSubmit}
        >
          <div className="w-[100%]">
            <input
              placeholder="Fist Name"
              className="border border-black py-2 px-5 w-[50%]"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <input
              placeholder="Last Name"
              className="border border-black py-2 px-5 w-[50%]"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </div>
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
          <input
            placeholder="Confirm Password"
            className="border border-black py-2 rounded-sm"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          <button
            className="align-center p-2 bg-blue-600 text-white hover:bg-blue-400"
            type="submit"
          >
            Submit
          </button>
        </form>

        <p className="text-center">
          already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
