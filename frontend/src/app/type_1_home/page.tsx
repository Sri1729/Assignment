import { getUserProfile } from "@/services";
import React from "react";
import { cookies } from "next/headers";
import { Header } from "@/components";
import { redirect } from "next/navigation";

const Type1Home = async () => {
  const data = await getData();

  if (!data) {
    redirect("/");
  }
  if (data?.user_type === 2) {
    redirect("/type_2_home");
  }
  return (
    <>
      <Header title="Type 1 Home" />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <div className="text-center">
            <p className="font-bold">
              Username: <span className="text-blue-600">{data.username}</span>
            </p>
            <p className="font-bold">
              User Type: <span className="text-blue-600">{data.user_type}</span>
            </p>
            <p className="font-bold">
              DOB: <span className="text-blue-600">{data.DOB}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

async function getData() {
  const res = await getUserProfile(cookies().get("auth-token")?.value || "");
  return res;
}

export default Type1Home;
