"use client";
import Link from "next/link";
import { Spinner } from "../../../components/Spinner";

import React from 'react'
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";


import { useConvexAuth } from "convex/react";


const ButtonsWrapper = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="flex justify-center items-center">
    {isLoading && <Spinner />}
    {!isAuthenticated && !isLoading && (
      <Button>
        Get Jotion free
        <ArrowRight className="ml-2" size={15} />
      </Button>
    )}
    {isAuthenticated && !isLoading && (
      <Link href={"/documents"}>
        <Button>Enter Jotion
        <ArrowRight className="ml-2" size={15} />
        </Button>
      </Link>
    )}
  </div>
  )
}

export default ButtonsWrapper