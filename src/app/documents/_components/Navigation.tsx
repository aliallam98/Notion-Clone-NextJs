"use client";

import { ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { cn } from "../../../lib/utils";

const Navigation = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

useEffect(()=>{
    if(isMobile){
        collapseHandler()
    }else{
        extendHandler()
    }
},[isMobile])

  const onClickHandler = () => {};

  const onMouseMoveHandler = (e: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = e.clientX;
    console.log(newWidth);

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 340) newWidth = 340; //480

    if (sidebarRef.current && navbarRef.current) {
        sidebarRef.current.style.width = `${newWidth}px`;
        navbarRef.current.style.setProperty("left", `${newWidth}px`);
        navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
      }
  };
  const onMouseUpHandler = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", onMouseMoveHandler);
    document.removeEventListener("mouseup", onMouseUpHandler);
  };
  const onMouseDownHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove", onMouseMoveHandler);
    document.addEventListener("mouseup", onMouseUpHandler);
  };

  console.log(isResetting);


  const collapseHandler = ()=>{
    if (sidebarRef.current && navbarRef.current) {

        setIsCollapsed(true);
        setIsResetting(true);
  
        sidebarRef.current.style.width = "0";
        navbarRef.current.style.setProperty("width", "100%");
        navbarRef.current.style.setProperty("left", "0");
        setTimeout(() => setIsResetting(false), 300);
      }

    }
    const extendHandler =()=>{
        if (sidebarRef.current && navbarRef.current) {
            
            setIsCollapsed(false);
            setIsResetting(true);
      
            sidebarRef.current.style.width = isMobile ? "100%" : "240px"
            navbarRef.current.style.setProperty( "width",
            isMobile ? "0" : "calc(100% - 240px)"
          );
            navbarRef.current.style.setProperty( "left",
            isMobile ? "0" : "240px");
            setTimeout(() => setIsResetting(false), 300);
          }

    }
  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "w-60 bg-secondary relative h-full flex flex-col z-[99999] overflow-y-auto group/sidebar",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        {/* Collapse Btn */}
        <button
          className="absolute border rounded-full p-2 top-5 right-5 shadow-md hover:bg-neutral-300 transition "
          onClick={collapseHandler}
        >
          <ChevronsLeft size={20} />
        </button>

        <div>
          <p>Actions Items</p>
        </div>
        <div className="mt-4">
          <p>Documents</p>
        </div>
        <div
          onMouseDown={onMouseDownHandler}
          onClick={(e) => {}}
          className={cn(
            "absolute right-0 opacity-0 w-1 h-full bg-primary/10 group-hover/sidebar:opacity-100 transition cursor-ew-resize",
            isMobile && "hidden"
          )}
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "left-60 w-[calc(100%-240px)] absolute p-6 top-0 bg-purple-600",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full p-6"
            
        )}
      >
        {/* {isCollapsed && (
          <button
            className="border rounded-full p-2 shadow-md hover:bg-neutral-300 transition"
            onClick={extendHandler}
          >
            <MenuIcon size={20} />
          </button>
        )} */}
        <button
            className="border rounded-full p-2 shadow-md hover:bg-neutral-300 transition"
            onClick={extendHandler}
          >
            <MenuIcon size={20} />
          </button>
      </div>
    </>
  );
};

export default Navigation;