import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


type DateFormatOptions = {
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "short" | "long";
  hour12?: boolean;
};

export function formatDate(
  dateString: string,
  formatOptions?: DateFormatOptions
): string {
  const date = new Date(dateString);

  const defaultOptions: DateFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    // hour: "numeric",
    // minute: "numeric",
    // second: "numeric",
    // hour12: false,
  };

  const options = { ...defaultOptions, ...formatOptions };

  const formatter = new Intl.DateTimeFormat("en-US", options);

  return formatter.format(date);
}



/**
 * Converts a file size from bytes to a human-readable format (KB or MB).
 *
 * @param sizeInBytes - The size of the file in bytes.
 * @returns A string representing the size in KB or MB.
 */
export function formatFileSize(sizeInBytes: number): string {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} bytes`;
  } else if (sizeInBytes < 1024 * 1024) {
    // Size in KB
    return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  } else {
    // Size in MB
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}