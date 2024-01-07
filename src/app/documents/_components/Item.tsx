import { ChevronDown, ChevronRight, LucideIcon, Plus } from "lucide-react";
import React, { MouseEvent } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

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
  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const create = useMutation(api.document.create);
  const handleExpand = (e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>)=>{
    e.stopPropagation()
    onExpand?.()
  }
  const onCreate = (e:  React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
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
          className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
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
        <div className="ml-auto mr-2 opacity-0 group-hover:opacity-100 h-full  hover:bg-neutral-300 dark:hover:bg-neutral-600"
        role={"button"}
        onClick={onCreate}
        >
          <Plus size={18}  />
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
