import Image from "next/image";
import React from "react";

const Hereos = () => {
  return (
    <div className=" flex items-center gap-14 ">
      <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] ">
        <Image
          src="/documents.png"
          fill
          className="object-contain dark:invert"
          alt="hero image"
        />
      </div>
      <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] hidden md:block ">
      <Image
        src="/reading.png"
        fill
        className="object-contain dark:invert"
        alt="hero image"
      />
      </div>
    </div>
  );
};

export default Hereos;
