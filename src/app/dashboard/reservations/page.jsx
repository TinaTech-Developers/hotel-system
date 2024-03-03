import DashbordLayout from "@/components/DashbordLayout";
import Link from "next/link";
import React from "react";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import ApprovedOrders from "../components/ApprovedOrders";
import RemoveButton from "../components/RemoveButton";
import Header from "@/components/Header";

const getReservations = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/reservations", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading orders", error);
  }
};

async function Customers() {
  const { reservations } = await getReservations();

  return (
    <DashbordLayout>
      <main className=" bg-gray-200  min-h-screen w-full">
        <Header />

        <div className="bg-gray-100 min-h-screen w-full">
          <hr className="bg-white mt-4" />
          <div className="p-4">
            <h1 className="py-4 font-semibold">Recent Orders</h1>
            <div className="w-full p-4 border rounded-lg bg-white overflow-y-auto">
              <div className="my-3 p-2 font-semibold grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 justify-between cursor-pointer">
                <span>Name</span>
                <span className="sm:text-left text-right">Email</span>
                <span className="hidden md:grid">Period</span>
                <span className="hidden md:grid">Note</span>
              </div>
              {reservations?.map((resv) => (
                <ul key={resv._id}>
                  <li className="bg-gray-50 hover:bg-gray-200 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer ">
                    <div className="flex items-center">
                      <div className="bg-amber-50 p-3 rounded-lg">
                        <BsPersonFill className="text-amber-800" />
                      </div>
                      <p className="pl-4">{resv.fullname}</p>
                    </div>
                    <p className="text-gray-500 sm:text-left text-right">
                      {resv.email}
                    </p>
                    <p className="hidden md:flex">
                      {resv.arrivaldate} - {resv.deptdate}
                    </p>
                    <div className="sm:flex hidden justify-between items-center  ">
                      <p className="truncate text-ellipsis w-32">
                        {resv.message}
                      </p>
                      <RemoveButton id={resv._id} />
                      <Link href={`/dashboard/resdetails/${resv._id}`}>
                        <BsThreeDotsVertical />
                      </Link>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </div>

          <ApprovedOrders />
        </div>
      </main>
    </DashbordLayout>
  );
}

export default Customers;
