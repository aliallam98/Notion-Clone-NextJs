"use client"

import Link from 'next/link'
import React from 'react'
import Logo from './Logo'
import { cn } from '@/lib/utils'
import NavbarScroll from './hooks/NavbarScroll'
import { ThemeToggler } from './ThemeToggler'


const Navbar = () => {
    const isNavbarScrolled = NavbarScroll()
    
  return (
    <header className={cn(
        "flex justify-between items-center fixed top-0 w-full p-6",
        isNavbarScrolled && "border-b shadow-md  dark:shadow-white/5"
    )}>
        <nav>
            <Link
            href={'/'}
            >
            <Logo/>
            </Link>
        </nav>
        <ThemeToggler/>
    </header>
  )
}

export default Navbar