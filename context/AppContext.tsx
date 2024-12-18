import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
} from "react";
import { useGroupsList } from "@/hooks/useGroupsList";
import { RecentGroup } from "@/services/recentGroups";
import { Category, GroupDetails, GroupList } from "@/utils/trpc";
import {
  getStarredGroups,
  starGroup as addStarGroup,
  unstarGroup as removeStarGroup,
} from "@/services/staredGroups";
import {
  getArchivedGroups,
  archiveGroup as addArchiveGroup,
  unarchiveGroup as removeArchiveGroup,
} from "@/services/archivedGroups";
import { useCategoriesList } from "@/hooks/useCategoriesList";

// Define the interface for the context's value
interface AppContextProps {
  activeGroup: GroupDetails | null | undefined;
  setActiveGroup: Dispatch<SetStateAction<GroupDetails | null | undefined>>;
  recentGroups: RecentGroup[] | null;
  recentGroupsList: GroupList;
  refetch: () => void;
  fetchGroups: () => void;
  starredGroups: string[]; // List of starred group IDs
  starGroup: (groupId: string) => void; // Method to add a starred group
  unstarGroup: (groupId: string) => void; // Method to remove a starred group
  isGroupStarred: (groupId: string) => boolean; // Method to check if a group is starred
  archivedGroups: string[]; // List of archived group IDs
  archiveGroup: (groupId: string) => void; // Method to archive a group
  unarchiveGroup: (groupId: string) => void; // Method to unarchive a group
  isGroupArchived: (groupId: string) => boolean; // Method to check if a group is archived
  categoriesList: Category[];
  refetchCategories: () => void;
  isActiveGroupStarred: boolean;
  toggleStarActiveGroup: () => void;
}

// Create the context with a proper type
const AppContext = createContext<AppContextProps | undefined>(undefined);

// Define the props for the provider
interface AppProviderProps {
  children: ReactNode; // ReactNode to represent any valid React children
}

// Implement the provider component
export const GroupProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { recentGroups, recentGroupsList, refetch, fetchGroups } =
    useGroupsList();

  const { categoriesList, refetch: refetchCategories } = useCategoriesList();

  const [activeGroup, setActiveGroup] = useState<
    GroupDetails | null | undefined
  >(null);

  const [starredGroups, setStarredGroups] = useState<string[]>([]);
  const [archivedGroups, setArchivedGroups] = useState<string[]>([]);

  // Load starred groups on mount
  useEffect(() => {
    const storedStarredGroups = getStarredGroups();
    setStarredGroups(storedStarredGroups);

    const storedArchivedGroups = getArchivedGroups();
    setArchivedGroups(storedArchivedGroups);
  }, []);

  // Add a group to the starred list
  const starGroup = (groupId: string) => {
    unarchiveGroup(groupId);
    addStarGroup(groupId);
    setStarredGroups((prev) => [...prev, groupId]);
  };

  // Remove a group from the starred list
  const unstarGroup = (groupId: string) => {
    removeStarGroup(groupId);
    setStarredGroups((prev) => prev.filter((id) => id !== groupId));
  };

  const isGroupStarred = (groupId: string) => starredGroups.includes(groupId);

  // Add a group to the archived list
  const archiveGroup = (groupId: string) => {
    unstarGroup(groupId);
    addArchiveGroup(groupId);
    setArchivedGroups((prev) => [...prev, groupId]);
  };

  // Remove a group from the archived list
  const unarchiveGroup = (groupId: string) => {
    removeArchiveGroup(groupId);
    setArchivedGroups((prev) => prev.filter((id) => id !== groupId));
  };

  const isGroupArchived = (groupId: string) => archivedGroups.includes(groupId);

  const toggleStarActiveGroup = () => {
    if (activeGroup) {
      if (isGroupStarred(activeGroup.id)) {
        unstarGroup(activeGroup.id);
      } else {
        starGroup(activeGroup.id);
      }
    }
  };

  const isActiveGroupStarred = useMemo(() => {
    return activeGroup ? isGroupStarred(activeGroup.id) : false;
  }, [activeGroup, starredGroups]);

  return (
    <AppContext.Provider
      value={{
        activeGroup,
        setActiveGroup,
        recentGroups,
        recentGroupsList,
        refetch,
        fetchGroups,
        starredGroups,
        starGroup,
        unstarGroup,
        isGroupStarred,
        archivedGroups,
        archiveGroup,
        unarchiveGroup,
        isGroupArchived,
        categoriesList,
        refetchCategories,
        isActiveGroupStarred,
        toggleStarActiveGroup,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context with type safety
export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a GroupProvider");
  }
  return context;
};
