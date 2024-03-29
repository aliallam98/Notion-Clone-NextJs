import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react";
import React, { MouseEvent } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { DropdownMenu,DropdownMenuTrigger,DropdownMenuSeparator,DropdownMenuItem,DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/clerk-react";

interface IProps {
  id?: Id<"documents">;
  label: string;
  icon: LucideIcon;
  documentIcon?: string;
  onClick?: () => void;
  onExpand?: () => void;
  expanded?: boolean;
  active?: boolean;
  level?: number;
  isSearch?: boolean;
}

const Item = ({
  id,
  label,
  icon: Icon,
  documentIcon,
  onClick,
  onExpand,
  expanded,
  active,
  level = 0,
  isSearch,
}: IProps) => {
  const {user} = useUser()
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const create = useMutation(api.document.create);
  const archive = useMutation(api.document.achieve);
  const onArchive =  ( e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>)=>{
    e.stopPropagation()
    if(!id) return
    const promise = archive({id})
    toast.promise(promise, {
      loading: 'Loading...',
      success: "Doc Is Archived",
      error: 'Error',
    })

  }
  const handleExpand = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    onExpand?.();
  };
  const onCreate = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        // router.push(`/documents/${documentId}`);
      }
    );
    toast.promise(promise, {
      loading: "Creating a new note...",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] w-full flex items-center gap-2 hover:bg-primary/5 duration-75 text-muted-foreground",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1"
          onClick={handleExpand}
        >
          <ChevronIcon size={16} />
        </div>
      )}

      {documentIcon ? (
        <div className="shrink-0 mr-2">{documentIcon}</div>
      ) : (
        <Icon size={18} />
      )}
      <span className="truncate">{label}</span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none select-none inline-flex items-center text-muted-foreground mr-2 bg-white border rounded text-sm">
          <span>Ctrl-k</span>
        </kbd>
      )}
      {!!id && (
        <div className="flex items-center gap-x-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild
            onClick={(e)=>e.stopPropagation()}
            >
              <div
              className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 text-muted-foreground"
              role={"button"}>
              <MoreHorizontal size={16}/>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
            className="w-60 p-2"
            align="start"
            side="right"
            forceMount
            >
              <DropdownMenuItem
              onClick={onArchive}
              >
                Delete
                <Trash size={16} className="ml-2"/>
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <div className="text-sm pl-2 text-muted-foreground">
                {`Last Edited By : ${user?.fullName}`}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <div
            className="ml-auto mr-2 opacity-0 group-hover:opacity-100 h-full  hover:bg-neutral-300 dark:hover:bg-neutral-600"
            role={"button"}
            onClick={onCreate}
          >
            <Plus size={18} />
          </div>
        </div>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
      className="flex gap-x-2"
    >
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-[30%] h-4" />
    </div>
  );
};

export default Item;
