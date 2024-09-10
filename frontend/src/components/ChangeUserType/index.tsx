"use client";
import { changeUserType } from "@/services";
import React, { useState } from "react";
import { Button } from "../Button";

export const ChangeUserType = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const onButtonPress = async () => {
    setLoading(true);
    const details = await changeUserType();
    if (details) {
      setShowSuccess(true);
    }
    setLoading(false);
  };
  const onOkClick = () => {
    window.location.reload();
  };
  return (
    <>
      <Button
        loading={loading}
        onClick={onButtonPress}
        text="Change usertype"
      />
      {showSuccess && <SuccessDialog onClick={onOkClick} />}
    </>
  );
};

const SuccessDialog = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white flex flex-col p-6 rounded-lg shadow-lg text-center items-center">
        <p className="mb-4">
          User type chaged succesfully. Click on button to reload the page and
          see the updated content
        </p>
        <div className="w-48 flex items-center">
          <Button loading={false} text="OK" onClick={onClick} />
        </div>
      </div>
    </div>
  );
};
