"use client";
import Image, { ImageProps, StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";

import PlaceholderSquare from "@/public/placeholder-square.png";
import PlaceholderRectangle from "@/public/placeholder-rectangle.png";
import PlaceholderPortrait from "@/public/placeholder-portrait.png";
import { cn } from "@/lib/utils";

type Props = {
  errorClassName?: string;
  src: string | StaticImageData;
  type: "square" | "rectangle" | "portrait";
  errorMessage?: string
  alt?: string;
} & ImageProps;
const FallbackImage = ({ alt, errorClassName, errorMessage, src, type, ...props }: Props) => {
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
  }, [src]);
  return (
    error ? <div className={cn("text-xl text-red-500 h-full font-bold italic flex items-center justify-center", errorClassName)}>
      {errorMessage}
    </div> : <Image
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
      className={props.className}
    />
  );
};

export default FallbackImage;
