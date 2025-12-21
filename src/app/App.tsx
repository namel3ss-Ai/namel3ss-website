import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { DocumentationPage } from "./pages/DocumentationPage";

export default function App() {
  return (
    <div className="relative">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/docs" element={<DocumentationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}