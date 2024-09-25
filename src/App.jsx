import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { Layout } from "./components/Layout";

function App() {
  return (
    <UserProvider>
      <Router>
        <Layout />
      </Router>
    </UserProvider>
  );
}

export default App;
