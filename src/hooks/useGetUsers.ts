import { fetchUsers } from "@/apis/usersApi";
import { UserFilterRequest } from "@/dtos/pagination";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers(filter?: UserFilterRequest) {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(filter),
  });
}
