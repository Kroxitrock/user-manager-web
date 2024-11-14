import { Page, PageRequest } from "@/dtos/pagination";
import { SaveUserDto, UserDetails } from "@/dtos/userDtos";
import axios from "axios";

const apiDomain = "http://localhost:8080";
const usersPath = "/users";

export function createUser(userDto: SaveUserDto) {
  return axios.post(apiDomain + usersPath, userDto);
}

export function fetchUsers(
  pageRequest?: PageRequest
): Promise<Page<UserDetails>> {
  return axios
    .get(apiDomain + usersPath, { params: pageRequest })
    .then((response) => response.data as Page<UserDetails>);
}

export function updateUser(userId: number, userDto: SaveUserDto) {
  return axios.put(`${apiDomain}${usersPath}/${userId}`, userDto);
}

export function deleteUser(userId: number) {
  return axios.delete(`${apiDomain}${usersPath}/${userId}`);
}
