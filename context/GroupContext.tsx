import { GroupDetails } from "@/utils/trpc";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the interface for the context's value
interface GroupContextProps {
  activeGroup: GroupDetails | null | undefined;
  setActiveGroup: Dispatch<SetStateAction<GroupDetails | null | undefined>>;
}

// Create the context with a proper type
const GroupContext = createContext<GroupContextProps | undefined>(undefined);

// Define the props for the provider
interface GroupProviderProps {
  children: ReactNode; // ReactNode to represent any valid React children
}

// Implement the provider component
export const GroupProvider: React.FC<GroupProviderProps> = ({ children }) => {
  const [activeGroup, setActiveGroup] = useState<
    GroupDetails | null | undefined
  >(null);

  return (
    <GroupContext.Provider value={{ activeGroup, setActiveGroup }}>
      {children}
    </GroupContext.Provider>
  );
};

// Custom hook to use the context with type safety
export const useGroupContext = (): GroupContextProps => {
  const context = useContext(GroupContext);
  if (!context) {
    throw new Error("useGroupContext must be used within a GroupProvider");
  }
  return context;
};
