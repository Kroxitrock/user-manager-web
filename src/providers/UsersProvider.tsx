import { UsersContext } from "@/conetexts/UsersContext";
import { UserFilterRequest } from "@/dtos/pagination";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export function UsersProvider({ children }: Props) {
  const [filter, setFilter] = useState<UserFilterRequest>({
    page: 0,
    size: 5,
  });
  const { data, isPending, error, refetch } = useGetUsers(filter);

  return (
    <UsersContext.Provider
      value={{ data, isPending, error, filter, setFilter, refetch }}
    >
      {children}
    </UsersContext.Provider>
  );
}
