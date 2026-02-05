"use client";

import Image from "next/image";
import { useState } from "react";
import { TriangleAlert } from "lucide-react";

export const OptionalImage = (props) => {
  const [isError, setIsError] = useState(false);

  if (isError)
    return (
      <div className="w-full h-full flex items-center justify-center text-warning opacity-70">
        <TriangleAlert h={16} w={16} />
      </div>
    );

  return <Image {...props} onError={() => setIsError(true)} />;
};
