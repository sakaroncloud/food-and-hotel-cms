"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context state
interface GalleryContextType {
  open: boolean;
  setOpen: (value: boolean) => void;
}

// Create the context with default values
const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

// Create a provider component
interface GalleryProviderProps {
  children: ReactNode;
}

export const GalleryProvider: React.FC<GalleryProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <GalleryContext.Provider value={{ open, setOpen }}>
      {children}
    </GalleryContext.Provider>
  );
};

// Custom hook to use the GalleryContext
export const useGalleryContext = (): GalleryContextType => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error("useGalleryContext must be used within a GalleryProvider");
  }
  return context;
};
