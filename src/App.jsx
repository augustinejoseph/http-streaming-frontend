import { Route, Routes } from "react-router-dom";
import { StreamNumber } from "./StreamNumber";
import { StreamText } from "./StreamText";
import Home from "./Home";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/stream-number" element={<StreamNumber />} />
        <Route path="/stream-text" element={<StreamText />} />
        <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
