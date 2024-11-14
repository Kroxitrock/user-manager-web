import { Page, PageRequest } from "@/dtos/pagination";
import { UserDetails } from "@/dtos/userDtos";
import axios from "axios";

const apiDomain = "http://localhost:8080";
const usersPath = "/users";

export function fetchUsers(
  pageRequest?: PageRequest
): Promise<Page<UserDetails>> {
  return axios
    .get(apiDomain + usersPath, { params: pageRequest })
    .then((response) => response.data as Page<UserDetails>);
}
