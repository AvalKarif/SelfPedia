/* eslint-disable no-unused-vars */
import { useState } from "react";
import MainLayout from "../../components/Layouts/MainLayout";
import Navbar from "./Navbar";
import CardGrid from "../../components/CardGrid";

function Home() {
  const [count, setCount] = useState(0);

  const cards = [
    {
      title: "Fact 1",
      description:
        "lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit. lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      title: "Fact 2",
      description: "This is the second fact.",
      color: "bg-blue-500",
    },
    {
      title: "Fact 3",
      description: "This is the third fact.",
      color: "bg-red-500",
    },
    {
      title: "Fact 4",
      description: "This is the fourth fact.",
      color: "bg-green-500",
    },
  ];
  return (
    <MainLayout>
      <div className="h-[400px] w-full flex flex-col justify-center items-center">
        <div className="flex flex-col">
          <h1 className="text-[70px] font-sans font-bold text-center mb-2">
            SelfPedia
          </h1>
          <input
            className="w-[700px] h-[50px] bg-slate-200 placeholder-slate-600 rounded-full p-3"
            placeholder="Search wiki articles, patents and othres.."
            type="text"
          ></input>
          <h2
            className="text-2xl font-light text-center mt-5"
            style={{ fontFamily: "cursive" }}
          >
            ... Or do you prefer to see around?
          </h2>
        </div>
      </div>
      <div className="relative bottom-[60px]">
        <CardGrid cards={cards} />
      </div>
    </MainLayout>
  );
}
export default Home;
