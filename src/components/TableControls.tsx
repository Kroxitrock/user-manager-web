import SearchBar from "./SearchBar";
import { UserDetailsDialog } from "./UserDetailsDialog";

export default function TableControls() {
  return (
    <div className="flex flex-row justify-start space-x-4">
      <UserDetailsDialog></UserDetailsDialog>
      <SearchBar></SearchBar>
    </div>
  );
}
