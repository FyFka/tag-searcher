import { Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <div className="py-24 text-center flex flex-col gap-4 px-2 md:px-10">
      {/* <span className="inline-flex">
        <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" /> */}
      <h2 className="font-extrabold text-4xl md:text-6xl">Discord server tag searcher</h2>
      {/* <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" />
      </span> */}
      <p className="text-base">
        Discover amazing communities and connect with like-minded people across the Discord universe
      </p>
    </div>
  );
};
