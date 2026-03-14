import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import Profile from "./components/Profile";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";

function App() {
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong: {error.message}</div>;
  }

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <>
          <NavBar />
          <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
            <SideBar />
            <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
              <Profile />
              {/* something here later maybe??? */}
            </main>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <h1>GitScribe</h1>
          <p>Sign in with Github to get started</p>
          <LoginButton />
        </div>
      )}
    </div>
  );
}

export default App;
