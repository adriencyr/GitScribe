import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#EDF2F7", // gray 100
        borderBottom: "1px solid #718096", // gray 500
        color: "black",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "32px", color: "black" }}>GitScribe</div>

      {isAuthenticated && (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "black" }}>{user?.name}</span>
          <div
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "1px solid #ccc",
            }}
          >
            <img src={user?.picture} alt={user?.name} style={{ width: "100%" }} />
          </div>
          <LogoutButton />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
