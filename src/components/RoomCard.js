"use client";
import React, { useState } from "react";
import FillButton from "./FillButton";
import { FaPeopleRoof } from "react-icons/fa6";

const getRooms = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/rooms", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading topics", error);
  }
};

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();
  return `${month}/${date}/${year}`;
}

async function RoomCard() {
  let [currentDate, setCurrentDate] = useState(getDate());
  const { rooms } = await getRooms();
  const datez = [
    "01/01/2024",
    "02/21/2024",
    "04/18/2024",
    "05/01/2024",
    "05/25/2024",
    "12/22/2024",
    "12/25/2024",
    "12/26/2024",
  ];

  return (
    <>
      {rooms.map((room) => {
        if (datez.includes(currentDate)) {
          room.price = Number(room.price) + 80;
        }

        return (
          <div key={room._id} className="w-96 h-[600px]  border ">
            <img
              src={room.image}
              alt="Staff"
              width={400}
              height={500}
              className="w-96 h-80 object-cover"
            />

            <div className="flex flex-col items-start p-4 ">
              <h1 className="uppercase text-amber-900 md:text-3xl">
                {room.name}
              </h1>
              <hr className=" border-x-4 border-amber-950 w-10" />
              {/* <h2 className="text-amber-900 text-2xl">{name}</h2> */}
              <div className="flex items-center justify-normal py-2 gap-4 text-gray-600">
                <FaPeopleRoof size={"1.8rem"} />
                <p>4 Guests</p>
              </div>
              <p className="text-start py-2 text-gray-500">
                {room.description}
              </p>
              <div className="flex  items-center gap-">
                <p className="p-2 bg-gray-600 text-white my-1">
                  USD ${room.price}
                </p>
                <FillButton name={"BOOK NOW "} link={`/booking/${room._id}`} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default RoomCard;
