import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../src/Components/LandingPage";
import UserForm from "../src/Components/UserForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add-user" element={<UserForm />} />
        <Route path="/edit-user/:id" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
