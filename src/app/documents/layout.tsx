"use client";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import { Spinner } from "../../components/Spinner";
import Navigation from "./_components/Navigation";

const DocumentsLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="fixed top-0 w-full h-full flex justify-center items-center bg-black/10 z-50">
        <Spinner size={"50"} />
      </div>
    );
  }
  if (!isAuthenticated) {
    redirect("/");
  }

  return (
      <main className="h-full  flex">
        <Navigation />
        {children}
      </main>
  );
};

export default DocumentsLayout;
