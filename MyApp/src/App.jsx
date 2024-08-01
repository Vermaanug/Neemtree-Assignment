import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddUser from "./Components/AddUser";
import LandingPage from "./Components/LandingPage";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/add-user" element={<AddUser />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
