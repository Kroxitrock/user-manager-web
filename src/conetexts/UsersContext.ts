import { Page, PageRequest } from "@/dtos/pagination";
import { UserDetails } from "@/dtos/userDtos";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { createContext, useContext } from "react";

interface Props {
  data?: Page<UserDetails>;
  isPending: boolean;
  error: Error | null;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
  pageRequest: PageRequest;
  setPageRequest: (pageRequest: PageRequest) => void;
}

export const UsersContext = createContext<Props | undefined>(undefined);

export function useUsers() {
  const context = useContext(UsersContext);

  if (context === undefined) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}
