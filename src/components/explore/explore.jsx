"use client";
import { ThiingsGrid } from "@/components/things-grid/thiings-grid";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ServerListItem } from "@/components/server-card/server-card";

import {
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
} from "@floating-ui/react";

const ThiingsIconCell = ({ gridIndex, servers }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const [isVisible, setIsVisible] = useState(false);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    if (!hasBeenVisible.current) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        hasBeenVisible.current = true;
      }, Math.random() * 100);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!hasBeenVisible.current) {
      setIsVisible(false);
    }
  }, []);

  if (!servers || servers.length === 0) {
    return null;
  }

  let server;
  if (gridIndex < servers.length) {
    server = servers[gridIndex];
  } else {
    const randomIndex = gridIndex % servers.length;
    server = servers[randomIndex];
  }

  return (
    <div className="absolute inset-1 flex items-center justify-center">
      <div
        className={`group transition-transform duration-500 ease-in-out ${
          isVisible ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{
          transformOrigin: "center center",
        }}
      >
        <button
          ref={refs.setReference}
          {...getReferenceProps()}
          className="btn md:btn-xl btn-sm md:px-6.5 border border-[color-mix(in_oklab,var(--color-base-content)_10%,transparent)] flex items-center gap-1 md:gap-2 rounded-full bg-base-100 font-semibold overflow-hidden cursor-pointer hover:bg-base-200 transition-colors relative shimmer"
        >
          {server.tagImg && (
            <Image
              src={`https://cdn.discordapp.com/${server.tagImg}.webp?size=40`}
              alt={`[${server.tagName}]`}
              width={20}
              height={20}
              className="w-4 h-4 md:w-5 md:h-5 text-transparent"
              unoptimized
            />
          )}
          <span className="text-base">{server.tagName}</span>
        </button>
        {isOpen && (
          <FloatingPortal root={document.body}>
            <FloatingFocusManager context={context} modal={true}>
              <div
                className="z-50"
                ref={refs.setFloating}
                style={floatingStyles}
                {...getFloatingProps()}
                onMouseDown={(evt) => evt.stopPropagation()}
                onMouseMove={(evt) => evt.stopPropagation()}
                onTouchStart={(evt) => evt.stopPropagation()}
              >
                <div className="w-76 md:w-sm">
                  <ServerListItem server={server} idx={0} />
                </div>
              </div>
            </FloatingFocusManager>
          </FloatingPortal>
        )}
      </div>
    </div>
  );
};

export const Explore = ({ servers = [] }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridSize = isMobile ? 145 : 200;
  return (
    <ThiingsGrid
      gridSize={gridSize}
      renderItem={(props) => <ThiingsIconCell {...props} servers={servers} />}
      initialPosition={{ x: 0, y: 0 }}
    />
  );
};
