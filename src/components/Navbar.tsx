"use client";

import { useConvexAuth } from "convex/react";
// import { useUser } from "@clerk/clerk-react";

import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";

import Logo from "./Logo";
import { cn } from "@/lib/utils";
import NavbarScroll from "../hooks/NavbarScroll";
import { ThemeToggler } from "./ThemeToggler";
import { Button } from "./ui/button";
import { Spinner } from "./Spinner";

const Navbar = () => {
  const {isAuthenticated,isLoading} = useConvexAuth();
  // const { user } = useUser();
  const isNavbarScrolled = NavbarScroll();

  console.log("isAuthenticated",isAuthenticated);

  return (
    <header
      className={cn(
        "flex justify-between items-center fixed top-0 w-full p-6 backdrop-blur-sm",
        isNavbarScrolled && "border-b shadow-md  dark:shadow-white/5"
      )}
    >
      <nav>
        <Link href={"/"}>
          <Logo />
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        {isLoading && (
          <Spinner />
        )}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton >
              <Button variant={"ghost"}>Sign In </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">Get Jotion free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated  && !isLoading && (
          <>
            <UserButton afterSignOutUrl="/" />
            <Link href={"/documents"}>
              <Button variant={"ghost"}>Enter Jotion</Button>
            </Link>
          </>
        )}
        <ThemeToggler />
      </div>
    </header>
  );
};

export default Navbar;
