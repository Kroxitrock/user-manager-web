import { fetchUsers } from "@/apis/usersApi";
import { PageRequest } from "@/dtos/pagination";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers(pageRequest?: PageRequest) {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(pageRequest),
  });
}
