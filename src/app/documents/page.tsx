"use client";
import { useUser } from "@clerk/clerk-react";
import Image from "next/image";
import React from "react";
import { Button } from "../../components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

const Documents = () => {
  const { user } = useUser();
  const create = useMutation(api.document.create)
  const onCreate = ()=>{
    const promise = create({
      title:"Untitled"
    })
    toast.promise(promise,{
      loading: 'Loading...',
      success:"Created",
      error: 'Error',
    }
      )
  }

  
  
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <Image
        className="dark:invert"
        src={"/empty.png"}
        height={300}
        width={300}
        alt="jotion"
      />
      <h3>Welcome To {user?.firstName}&apos;s Jotion </h3>
      <Button className="flex items-center gap-2 mt-2"
      onClick={onCreate}
      >
        Create a Note
        <PlusCircle size={15} />
      </Button>
    </div>
  );
};

export default Documents;
