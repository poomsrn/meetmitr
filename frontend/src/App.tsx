import React from "react";
import "./App.css";
import JoinEventPage from "./pages/JoinEventPage";
import EventPage from "./pages/EventPage";
import LoginPage from "./pages/LoginPage";
import TablePage from "./pages/TablePage";
import RegisterPage from "./pages/RegisterPage";
import { Routes, Route } from "react-router-dom";
import { UserInfoProvider } from "./context/UserInfoProvider";

function App() {
  return (
    <UserInfoProvider>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/event" element={<JoinEventPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/event/:id" element={<EventPage name="a" />} />
      </Routes>
    </UserInfoProvider>
  );
}

export default App;
