"use client";

import { useState, useEffect } from "react";


const NavbarScroll = (startPoint = 10) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > startPoint) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [startPoint]);
  return scrolled;
};

export default NavbarScroll;
