"use client";

/**
 * Banner Component
 *
 * This component is responsible for updating each page's image/cover banner. It includes
 * functionalities to remove or restore a document and provides UI feedback for these actions.
 *
 */

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ConfirmModal } from "@/components/modals/confirm-modal";

/**
 * BannerProps Interface
 * @interface BannerProps
 * @property {Id<"documents">} documentId - The ID of the document to be managed.
 */
interface BannerProps {
  documentId: Id<"documents">;
}

/**
 * Banner Component
 *
 * Renders a banner with options to restore or delete a document. Provides visual feedback
 * during the actions of restoring and deleting using toasts.
 *
 * @param {BannerProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered banner component.
 */
export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  /**
   * Handles the removal of the document.
   * Initiates the remove mutation and provides toast feedback.
   */
  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });

    router.push("/documents");
  };

  /**
   * Handles the restoration of the document.
   * Initiates the restore mutation and provides toast feedback.
   */
  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  return (
    <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
      <p>This page is in the Trash.</p>
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
