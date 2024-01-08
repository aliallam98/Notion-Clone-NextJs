import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { Id } from "../../../../convex/_generated/dataModel";
import { Spinner } from "@/components/Spinner";
import { Search, Trash, Undo } from "lucide-react";
import ConfirmModel from "./ConfirmModel";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.document.getAchievedDocs);
  const restore = useMutation(api.document.restore);
  const remove = useMutation(api.document.deleteDoc);
  const [searchTerm, setSearchTerm] = useState("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const filteredData = documents?.filter((doc) =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    documentId: Id<"documents">
  ) => {
    e.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring...",
      success: "Restored",
      error: "Error",
    });
  };
  const onRemove = (
    // e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    documentId: Id<"documents">
  ) => {
    // e.stopPropagation()
    const promise = remove({ id: documentId });
    toast.promise(promise, {
      loading: "Removing...",
      success: "removed",
      error: "Error",
    });
    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return <Spinner size={"50"} />;
  }
  return (
    <div>
      <div className="flex items-center gap-2 p-2 w-72">
        <Search size={16} />
        <input
          type="text"
          value={searchTerm}
          onChange={onChangeHandler}
          placeholder="Filter By Page Title"
          className="bg-muted-foreground/10 focus:outline-none rounded-sm"
        />
      </div>

      <div>
        <p className="hidden last:block text-sm text-center text-muted-foreground mb-2">
          No Docs Found.{" "}
        </p>

        {filteredData?.map((doc) => (
          <div
            key={doc._id}
            role={"button"}
            className="flex items-center justify-between hover:bg-muted-foreground/10"
            onClick={() => {}}
          >
            <span>{doc.title}</span>
            <div className="flex items-center gap-x-2">
              <div
                className="hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-sm"
                role={"button"}
                onClick={(e) => onRestore(e, doc._id)}
              >
                <Undo size={16} />
              </div>
              <ConfirmModel onConfirm={() => onRemove(doc._id)}>
                <div className="hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-sm">
                  <Trash size={16} />
                </div>
              </ConfirmModel>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
