import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { UsersProvider } from "./providers/UsersProvider";
import { Toaster } from "./components/ui/toaster";
import Home from "./components/Home";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UsersProvider>
          <Home></Home>
        </UsersProvider>
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
