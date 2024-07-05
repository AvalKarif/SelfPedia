import React from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Search = ({ search, handleChange }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      navigate(`/search?searchQuery=${search}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className="border border-black px-5 py-2"
            value={search}
            onChange={handleChange}
          ></input>
          <button className="border border-black p-[0.75rem]" type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
    </>
  );
};

export default Search;
