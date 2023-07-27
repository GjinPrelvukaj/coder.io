import "./App.css";
import Navbar from "./Pages/NavBar/Navbar";
import Feed from "./Pages/Feed/Feed";
import Snippet from "./Pages/CodeSnippet/Snippet";
import { Spacer, Card } from "@nextui-org/react";
function App() {
  return (
    <div>
      <Navbar />

      <Feed />
    </div>
  );
}

export default App;
