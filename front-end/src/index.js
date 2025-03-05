import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";

const RootComponent = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {loggedIn ? (
          <Route path="/" element={<App />} />
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        <Route path="/register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RootComponent />);


