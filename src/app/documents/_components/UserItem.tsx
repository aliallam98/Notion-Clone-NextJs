"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser,SignOutButton } from "@clerk/clerk-react"
import { ChevronsUpDown } from "lucide-react"


const UserItem = () => {
    const {user} = useUser()
  return (
    <DropdownMenu>
    <DropdownMenuTrigger className="p-2 w-full flex items-center focus-within:outline-none gap-2">
        <Avatar>
            <AvatarImage
            src={user?.imageUrl}
            />
        </Avatar>
        <p>{user?.firstName}&apos;s Jotion</p>
        <ChevronsUpDown size={20} className="text-muted-foreground" />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>{user?.emailAddresses[0].emailAddress}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="font-bold">
        <SignOutButton>Log out</SignOutButton>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  )
}

export default UserItem