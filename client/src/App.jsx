import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage";
import ChatPage from "./ChatPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
