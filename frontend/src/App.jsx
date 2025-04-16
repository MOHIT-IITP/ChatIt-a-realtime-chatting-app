import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Navigate } from "react-router-dom";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/authStore.js";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const { userAuth, checkAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();
  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ userAuth });

  // if user is not logged in then this will happens
  if (checkAuth && !userAuth) {
    console.log("user is not authenticated");
  }

  return (
    <div data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={userAuth ? <HomePage /> : <Navigate to="/login" />} // if user is present then home page otherwise login page
        />
        <Route
          path="/login"
          element={!userAuth ? <LoginPage /> : <Navigate to="/" />} // if not user then login page other wise home page
        />
        <Route
          path="/signup"
          element={!userAuth ? <SignUpPage /> : <Navigate to="/" />} // is not user then signup page other wise home page
        />
        <Route
          path="/settings"
          element={ <SettingsPage />} // if not user then login
        />
        <Route
          path="/profile"
          element={userAuth ? <ProfilePage /> : <Navigate to="/" />} // if not use then login
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
