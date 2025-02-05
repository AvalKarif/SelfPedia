/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const Card = ({ title, description, color }) => {
  return (
    <div
      className={`shadow-md rounded-2xl overflow-hidden border border-gray-200 p-4 ${color}`}
    >
      <div className="p-4">
        <h3 className="text-gray-900 text-center text-xl font-bold mb-2">
          {title}
        </h3>
        <p className="text-gray-700 text-center text-lg">{description}</p>
      </div>
    </div>
  );
};

const CardGrid = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 top-15 relative">
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          color={card.color || "bg-white"}
        />
      ))}
    </div>
  );
};

export default CardGrid;
