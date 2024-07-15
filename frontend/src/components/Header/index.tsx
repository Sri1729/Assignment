"use client";
import { logoutUser } from "@/services";
import { useRouter } from "next/navigation";
import React from "react";
interface HeaderCompProps {
  title: string;
}
export const Header = ({ title }: HeaderCompProps) => {
  const router = useRouter();
  return (
    <header className="fixed top-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex-grow text-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <button
        onClick={() => {
          logoutUser().then(() => router.push("/"));
        }}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </header>
  );
};
