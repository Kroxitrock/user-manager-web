import { UsersContext } from "@/conetexts/UsersContext";
import { PageRequest } from "@/dtos/pagination";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export function UsersProvider({ children }: Props) {
  const [pageRequest, setPageRequest] = useState<PageRequest>({
    page: 0,
    size: 5,
  });
  const { data, isPending, error, refetch } = useGetUsers(pageRequest);

  return (
    <UsersContext.Provider
      value={{ data, isPending, error, pageRequest, setPageRequest, refetch }}
    >
      {children}
    </UsersContext.Provider>
  );
}
