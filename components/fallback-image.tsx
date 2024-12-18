"use client";
import Image, { ImageProps, StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";

import PlaceholderSquare from "@/public/placeholder-square.png";
import PlaceholderRectangle from "@/public/placeholder-rectangle.png";
import PlaceholderPortrait from "@/public/placeholder-portrait.png";

type Props = {
  src: string | StaticImageData;
  type: "square" | "rectangle" | "portrait";
  alt?: string;
} & ImageProps;
const FallbackImage = ({ alt, src, type, ...props }: Props) => {
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
  }, [src]);
  return (
    <Image
      alt={alt ?? "Placeholder Image"}
      onError={() => setError(true)}
      src={
        error
          ? type === "square"
            ? PlaceholderSquare
            : type === "rectangle"
            ? PlaceholderRectangle
            : PlaceholderPortrait
          : src
      }
      {...props}
    />
  );
};

export default FallbackImage;
