import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Button } from "./components/ui/button";
import { UsersProvider } from "./providers/UsersProvider";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersProvider>
        <Button>Click me</Button>
      </UsersProvider>
    </QueryClientProvider>
  );
}

export default App;
