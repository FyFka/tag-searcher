"use client";

import Link from "next/link";
import { Feedback } from "./feedback";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export const Footer = () => {
  const year = new Date().getFullYear();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (globalThis.innerWidth > 768) {
      setCollapsed(false);
    }
  }, []);

  const toggleFooter = () => {
    const footerCollapsed = !collapsed;
    setCollapsed(footerCollapsed);
  };

  return (
    <footer className="z-40 w-full bg-base-300/90 backdrop-blur-md border-t border-base-100/50 transition-all duration-300 py-6">
      <div
        className={`max-w-7xl mx-auto px-4 md:px-10 xl:px-14 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-4 xl:gap-8 overflow-hidden transition-all duration-300 ${
          collapsed ? "max-h-0 opacity-0" : "max-h-200 opacity-100"
        }`}
      >
        <div className="space-y-3 max-w-80">
          <h2 className="font-extrabold text-lg font-mono">About</h2>
          <p className="text-sm opacity-80">
            Made in {year} for the Discord community. Not affiliated with{" "}
            <Link
              className="link"
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              prefetch={false}
            >
              Discord
            </Link>
            . Discover and find servers, tags, badges, and join communities easily.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="font-extrabold text-lg font-mono">Links</h2>
          <ul className="flex flex-col gap-1 text-sm">
            <li>
              <Link className="link" href="/explore" prefetch={false}>
                Explore Tags
              </Link>
            </li>
            <li>
              <Link className="link" href="/trending-tags" prefetch={false}>
                Trending Tags
              </Link>
            </li>
            <li>
              <Link className="link" href="/contact" prefetch={false}>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="font-extrabold text-lg font-mono">Resources</h2>
          <ul className="flex flex-col gap-1 text-sm">
            <li>
              <Link className="link" href="/terms" prefetch={false}>
                Terms of Service
              </Link>
            </li>
            <li>
              <Link className="link" href="/privacy" prefetch={false}>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <Feedback />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-2 md:px-10 xl:px-14 flex justify-between items-center">
        <span className="text-sm opacity-60">© {year} TagSearcher. All rights reserved.</span>
        <button
          className="btn btn-sm btn-ghost flex items-center gap-1"
          aria-label="Toggle footer"
          onClick={toggleFooter}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${collapsed ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      </div>
    </footer>
  );
};
