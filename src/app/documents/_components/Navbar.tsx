"use client"

import React from 'react'
import Title from './Title'
import { cn } from '@/lib/utils'
import { MenuIcon } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { useParams } from 'next/navigation'
import { Doc, Id } from '../../../../convex/_generated/dataModel'
interface IProps {
  isMobile:boolean
  isResetting:boolean
  navbarRef:React.RefObject<HTMLDivElement>
  extendHandler:()=>void
}
const Navbar = ({isResetting,isMobile,navbarRef,extendHandler}:IProps) => {
  const params = useParams()
  console.log(params);
  
  const document= useQuery(api.document.getById,{
    documentId:params.documentId as Id<"documents">
  })
  console.log(document);
  
  if(document === undefined){
    return <p>Loading ...</p>
  }
  if(document === null){
    return null
  }

  return (
    <nav
        ref={navbarRef}
        className={cn(
          "flex items-center gap-4 left-60 w-[calc(100%-240px)] absolute p-6 top-0 bg-purple-300",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <button
          className="block border rounded-full p-2 shadow-md hover:bg-neutral-300 transition"
          onClick={extendHandler}
        >
          <MenuIcon size={20} />
        </button>
        <Title
        initialData={document}
        />
      </nav>
  )
}

export default Navbar