import DashbordLayout from "@/components/DashbordLayout";
import Header from "@/components/Header";
import React from "react";
import MiniHeader from "../components/MiniHeader";
import FileUpload from "../components/FileUpload";

function Settings() {
  return (
    <DashbordLayout>
      <main className=" bg-gray-200  min-h-screen w-full">
        <Header />
        <MiniHeader />
      </main>
    </DashbordLayout>
  );
}

export default Settings;
