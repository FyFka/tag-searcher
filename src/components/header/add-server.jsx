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
      <button className="btn btn-primary gap-1 btn-sm msm:btn-md" ref={refs.setReference} {...getReferenceProps()}>
        <Plus height={20} width={20} />
        Add Server
      </button>
      {isOpen && (
        <FloatingPortal>
          <FloatingOverlay lockScroll className="bg-base-300/80 flex items-center justify-center z-1000">
            <FloatingFocusManager context={context}>
              <div className="fixed hidden md:flex flex-col items-center gap-1 top-16 right-16 z-50 group">
                <button
                  className="btn btn-neutral h-12 w-12 p-1 rounded-full"
                  onClick={handleCloseAddServer}
                  type="button"
                >
                  <X className="group-hover:opacity-100 opacity-75" height={24} width={24} />
                </button>
                <span className="text-sm font-semibold opacity-75 group-hover:opacity-100">ESC</span>
              </div>
              <div ref={refs.setFloating} {...getFloatingProps()} className="p-1 max-h-full w-full max-w-[650px]">
                <div className="relative bg-base-300 py-7 px-6 rounded-lg shadow-lg border-[color-mix(in_oklab,var(--color-base-content)_10%,transparent)] border-1 z-50">
                  <div className="flex justify-between gap-1">
                    <h2 className="font-extrabold font-mono text-xl msm:text-2xl mb-3">Add a Discord Server</h2>
                    <button
                      className="btn btn-neutral h-9 w-9 p-0 rounded-full z-50 md:hidden group"
                      onClick={handleCloseAddServer}
                      type="button"
                    >
                      <X className="opacity-85 group-hover:opacity-100" height={16} width={16} />
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
