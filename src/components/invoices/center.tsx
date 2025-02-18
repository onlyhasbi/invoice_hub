import React from "react";

function Center({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      {children}
    </div>
  );
}

export default Center;
