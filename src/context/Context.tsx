import { Dispatch, SetStateAction, createContext } from "react";

// Define the context type
interface SiteContextType {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

// Create the context
export const SiteContext = createContext<SiteContextType | undefined>(
  undefined
);
