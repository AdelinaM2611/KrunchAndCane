/**
 * Root app: defines routes and wraps all pages in a shared Layout (navbar + footer).
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { FindUsPage } from "./pages/FindUsPage";
import { PreOrderPage } from "./pages/PreOrderPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-us" element={<FindUsPage />} />
          <Route path="/pre-order" element={<PreOrderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}