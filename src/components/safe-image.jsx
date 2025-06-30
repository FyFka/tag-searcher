"use client";

import Image from "next/image";
import { useState } from "react";

export const SafeImage = ({ src, errSrc = "/placeholder.webp", ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(errSrc);
  };

  return <Image src={imgSrc} {...props} onError={handleError} />;
};
