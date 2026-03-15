import { useAuth0 } from "@auth0/auth0-react";
import LoginPageCard from "./components/LoginpageCard";
import NavBar from "./components/NavBar";
import Profile from "./components/Profile";
import SideBar from "./components/SideBar";
import SubmissionInput from "./components/SubmissionInput";
import GeneraterBar from "./components/GeneraterBar";

function App() {
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    return <div style={loadingOverlayStyle}>Loading GitScribe...</div>;
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
              <SubmissionInput />
              <div style={{ marginTop: "20px" }}>
                <GeneraterBar />
              </div>
              <div style={{ marginTop: "20px" }}>
                <GeneraterBar />
              </div>
              <div style={{ marginTop: "20px" }}>
                <GeneraterBar />
              </div>
            </main>
          </div>
        </>
      ) : (
        <div style={loginContainerStyle}>
          <LoginPageCard />
        </div>
      )}
    </div>
  );
}

// css for login-stuff
const loginContainerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#1A202C", // Dark Slate background
};

const loadingOverlayStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  fontSize: "20px",
  color: "white",
  backgroundColor: "#1A202C",
};

export default App;
