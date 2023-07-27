import React from "react";

function Background() {
  return (
    <>
      <div className="absolute inset-0 -z-10 h-[55rem] w-screen bg-gradient-to-b from-black to-darkGray" />
      <div className="fixed inset-0 -z-20 h-screen w-screen bg-darkGray" />
    </>
  );
}

export default Background;
