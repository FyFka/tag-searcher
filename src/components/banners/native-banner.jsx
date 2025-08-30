import { Wind } from "lucide-react";
import Script from "next/script";

export const NativeBanner = ({
  id,
  src,
  title = "No ads here 👀",
  description = "Looks like AdBlock did its thing.",
}) => {
  return (
    <>
      <div className="card group bg-base-100 w-full shadow-md overflow-hidden rounded-xl relative border-1 border-[color-mix(in_oklab,var(--color-base-content)_10%,transparent)]">
        <div className="relative z-30 min-h-64">
          <div id={id}></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <div className="flex flex-col items-center justify-center p-6 text-center h-full w-full">
            <Wind className="w-10 h-10 mb-2 text-primary" />
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-gray-400 text-sm mt-1">{description}</p>
          </div>
        </div>
      </div>
      <Script strategy="afterInteractive" data-cfasync="false" src={src}></Script>
    </>
  );
};
