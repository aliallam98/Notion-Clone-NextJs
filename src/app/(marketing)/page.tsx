import Image from "next/image";
import Heading from "./_components/Heading";
import Hereos from "./_components/Hereos";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col mt-40">
      <div className="flex flex-col justify-center items-center  md:justify-start text-center flex-1 gap-y-8 px-4 pb-10 ">
        <Heading />
        <Hereos/>
      </div>
    </div>
  );
}
