import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { UsersProvider } from "./providers/UsersProvider";
import UsersTable from "./components/UsersTable";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersProvider>
        <UsersTable></UsersTable>
      </UsersProvider>
    </QueryClientProvider>
  );
}

export default App;
