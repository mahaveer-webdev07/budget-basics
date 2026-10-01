import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import VisitorClock from "./components/VisitorClock";
import Sitemap from "./pages/Sitemap";
import SearchPage from "./pages/SearchPage";
import ChatbotWidget from "./components/ChatbotWidget";
// import QuotesTicker from "./components/QuotesTicker";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* <QuotesTicker /> */}
      <VisitorClock />
      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* The Planner is usable as a guest -- sign-in is optional. When
            signed in, its data is saved per-account; as a guest, nothing
            is written to localStorage (see Dashboard.jsx). */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/*
          Budget Basic is now a single scrolling page. Every former "page"
          lives as a <section id="..."> inside LandingPage, so these old
          routes just redirect to the matching anchor on "/" -- this keeps
          any bookmarked or shared links working.
        */}
        <Route path="/budgeting-basics" element={<Navigate to="/#budgeting-basics" replace />} />
        <Route path="/needs-vs-wants" element={<Navigate to="/#needs-vs-wants" replace />} />
        <Route path="/50-30-20-rule" element={<Navigate to="/#budget-split" replace />} />
        <Route path="/savings-goals" element={<Navigate to="/#savings-goals" replace />} />
        <Route path="/money-mistakes" element={<Navigate to="/#money-mistakes" replace />} />
        <Route path="/infographics" element={<Navigate to="/#infographics" replace />} />
        <Route path="/about" element={<Navigate to="/#about" replace />} />

        <Route path="/sitemap" element={<Sitemap />} />
      </Routes>
      <ChatbotWidget />
    </BrowserRouter>
  );
}
