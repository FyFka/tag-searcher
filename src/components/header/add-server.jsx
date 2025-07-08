"use client";
import {
  useDismiss,
  useRole,
  useInteractions,
  useFloating,
  useClick,
  FloatingOverlay,
  FloatingFocusManager,
  FloatingPortal,
} from "@floating-ui/react";
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { SubmitServer } from "@/components/header/submit-server";
import { AddRequestList } from "@/components/header/add-request-list/add-request-list";

export const AddServer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { refs, context } = useFloating({ open: isOpen, onOpenChange: setIsOpen });

  const click = useClick(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);
  const handleCloseAddServer = () => setIsOpen(false);

  return (
    <>
      <button className="btn btn-primary gap-1" ref={refs.setReference} {...getReferenceProps()}>
        <Plus height={20} width={20} />
        Add Server
      </button>
      {isOpen && (
        <FloatingPortal>
          <FloatingOverlay lockScroll className="bg-base-300/80 flex items-center justify-center z-1000">
            <FloatingFocusManager context={context}>
              <div ref={refs.setFloating} {...getFloatingProps()} className="p-2 w-full max-w-[625px]">
                <div className="relative bg-base-300 py-4 px-6 rounded-lg shadow-lg border-[color-mix(in_oklab,var(--color-base-content)_10%,transparent)] border-1 z-50">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-extrabold font-mono text-2xl">Add a Discord Server</h2>
                    <button
                      className="btn btn-neutral h-8.5 w-8.5 p-1 rounded-full"
                      onClick={handleCloseAddServer}
                      type="button"
                    >
                      <X height={18} width={18} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-4">
                    <SubmitServer />
                    <AddRequestList />
                  </div>
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        </FloatingPortal>
      )}
    </>
  );
};
