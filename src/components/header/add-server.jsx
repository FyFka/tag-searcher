"use client";
import {
  flip,
  offset,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useFloating,
  autoUpdate,
} from "@floating-ui/react";
import { useState } from "react";
import { Plus } from "lucide-react";

export const AddServer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  return (
    <>
      <div ref={refs.setReference} {...getReferenceProps()}>
        <button className="btn btn-primary gap-1" disabled>
          <Plus height={20} width={20} />
          Add Server
        </button>
      </div>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="p-2 rounded-lg shadow-lg bg-base-300 border-input-color border-[color-mix(in_oklab,var(--color-base-content)_10%,transparent)] border-1 z-50"
        >
          Temporarily unavailable
        </div>
      )}
    </>
  );
};
