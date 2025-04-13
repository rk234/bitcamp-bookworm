import { Route, Routes } from "react-router";
import "./App.css";
// import MarkdownRenderer from './components/MarkdownRenderer'
import LandingPage from "./pages/LandingPage";
import EditorPage from "./pages/EditorPage";
import NetworkPage from "./pages/NetworkPage";
import LoginPage from "./pages/LoginPage";
import HelpPage from "./pages/HelpPage";
import RequireAuth from "./components/auth/RequireAuth";
import AuthProvider from "./providers/AuthProvider";
import useAuth from "./hooks/useAuth";
import NewPage from "./pages/NewPage";

function SecretPage() {
  const { user, logout } = useAuth();

  if (user) {
    return <p onClick={logout}>Hello {user.displayName}!</p>;
  }
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route index element={<LandingPage />}></Route>
        <Route
          path="/login"
          element={
            <RequireAuth noAuth redirect={"/secret"}>
              <LoginPage />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/edit/:workspaceID/:boardID"
          element={
            <RequireAuth>
              <EditorPage />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/new/:workspaceID/:boardName"
          element={
            <RequireAuth>
              <NewPage></NewPage>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/secret"
          element={
            <RequireAuth>
              <SecretPage />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/network"
          element={
            <RequireAuth>
              <NetworkPage />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/help"
          element={
              <HelpPage />
          }
        ></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
