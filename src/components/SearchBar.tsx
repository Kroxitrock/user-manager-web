import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useUsers } from "@/conetexts/UsersContext";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const { refetch, filter, setFilter } = useUsers();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setFilter({ ...filter, name: searchQuery });
    setTimeout(refetch);
  };

  return (
    <div className="flex flex-row justify-start space-x-1">
      <Input
        placeholder="Search by name..."
        value={searchQuery}
        onChange={handleInputChange}
      ></Input>
      <Button onClick={handleSearchClick}>Search</Button>
    </div>
  );
}
