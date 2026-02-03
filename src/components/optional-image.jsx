"use client";

import Image from "next/image";
import { useState } from "react";

export const OptionalImage = (props) => {
  const [isError, setIsError] = useState(false);

  if (isError) return null;

  return <Image {...props} onError={() => setIsError(true)} />;
};
