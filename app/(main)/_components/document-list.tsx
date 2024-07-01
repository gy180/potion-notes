"use client";

/**
 * Document List Component
 *
 * This component renders a hierarchical list of documents. It fetches the documents
 * based on the `parentDocumentId` and displays them with their respective icons.
 * Users can expand/collapse folders and navigate to individual document pages.
 *
 */

import { Doc, Id } from "@/convex/_generated/dataModel";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Item } from "./item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

/**
 * DocumentListProps Interface
 * @interface DocumentListProps
 * @property {Id<"documents">} [parentDocumentId] - The ID of the parent document.
 * @property {number} [level=0] - The hierarchical level of the document list.
 * @property {Doc<"documents">[]} [data] - The document data.
 */
interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
}

/**
 * DocumentList Component
 *
 * Renders a list of documents, allowing for nested hierarchical structures. Users can
 * expand/collapse items and navigate to individual documents.
 *
 * @param {DocumentListProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered document list.
 */
export const DocumentList = ({
  parentDocumentId,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  /**
   * Toggles the expanded state of a document.
   * @param {string} documentId - The ID of the document to toggle.
   */
  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const documents = useQuery(api.documents.getSideBar, {
    parentDocument: parentDocumentId,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  // can only be undefined when loading
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
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No pages inside
      </p>
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            onClick={() => onRedirect(document._id)}
            label={document.title}
            icon={FileIcon}
            documentIcon={document.icon}
            active={params.documentId === document._id}
            level={level}
            onExpand={() => onExpand(document._id)}
            expanded={expanded[document._id]}
          />
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};
