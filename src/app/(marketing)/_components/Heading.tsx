
import React from "react";
import ButtonsWrapper from "./ButtonsWrapper";

const Heading = () => {

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to <br />
        <span className="underline">Jotion</span>
      </h1>
      <h3 className="text-base sm:text-2xl md:text-3xl font-medium">
        {" "}
        Jotion is the connected workspace where <br />
        better, faster work happens.
      </h3>
      <ButtonsWrapper/>
    </div>
  );
};

export default Heading;
