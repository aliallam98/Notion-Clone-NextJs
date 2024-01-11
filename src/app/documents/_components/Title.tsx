"use client";
import { Button } from "@/components/ui/button";
import { Doc } from "../../../../convex/_generated/dataModel";
import { ChangeEvent, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

interface IProps {
  initialData: Doc<"documents">;
}

const Title = ({ initialData }: IProps) => {
    const [isEditing,setIsEditing] = useState(false)
    const [title,setTitle] = useState(initialData.title || "Untitled")
    const titleInputRef = useRef<HTMLInputElement | null>(null)

    const update = useMutation(api.document.updateById)


    const enableInput = ()=>{
        setIsEditing(true)
        setTimeout(()=>{
            titleInputRef.current?.focus()
            titleInputRef.current?.setSelectionRange(0,titleInputRef.current.value.length)
        },0)
    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.target.value)
        update({
            title:e.target.value || "Untitled",
            id:initialData._id
        })
    }
    const disableInput = ()=>{
        setIsEditing(false)
    }

    const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === "Enter"){
            disableInput()
        }
    }
  return (
    <div className="flex gap-x-1 items-center">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input
        className="px-2 focus-visible:ring-transparent"
        ref={titleInputRef}
        value={title}
        onClick={enableInput}
        onBlur={disableInput}
        onChange={onChangeHandler}
        onKeyDown={onKeyDown}
        />
      ): (
              <Button className="group flex gap-2"
              onClick={enableInput}
              variant={"ghost"}
              >
              <span className="truncate">{initialData.title}</span>
              <span className="opacity-0 group-hover:opacity-100"><Pencil size={15}/></span>
            </Button>
      ) }

    </div>
  );
};

export default Title;
