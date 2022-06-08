import Authentication from "./components/Authentication/Authentication";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Authentication />} />
          {/* <Route path="/homepage" component={HomePage} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
