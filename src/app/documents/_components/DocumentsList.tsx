import { useParams, useRouter } from "next/navigation";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Item from "./Item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface IProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}
const DocumentsList = ({ parentDocumentId, level = 0 }: IProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prev) => ({
      ...prev,
      [documentId]: !prev[documentId],
    }));
  };

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const documents = useQuery(api.document.getSidebar, {
    parentDocument: parentDocumentId,
  });

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No Pages Inside
      </p>
      {documents.map((doc)=>(
        <div key={doc._id}>
            <Item
            id={doc._id}
            onClick={()=>onRedirect(doc._id)}
            label={doc.title}
            icon={FileIcon}
            documentIcon={doc.icon}
            active={params.documentId === doc._id}
            level={level}
            onExpand={()=>onExpand(doc._id)}
            expanded={expanded[doc._id]}
            />
            {expanded[doc._id] && (
            <DocumentsList
            parentDocumentId={doc._id}
            level={level + 1}
            />
      )}
        </div>
      ))}
      
    </>
  );
};

export default DocumentsList;


// 3:30