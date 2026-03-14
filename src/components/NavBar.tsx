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
        backgroundColor: "#EDF2F7",
        borderBottom: "1px solid #718096",
        color: "black",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "32px", color: "black" }}>GitScribe</div>

      {isAuthenticated && (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Profile Picture on the Left */}
          <div
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "1px solid #718096",
            }}
          >
            <img
              src={user?.picture}
              alt={user?.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>

          {/* Stacked Name and Email */}
          <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
            <span
              style={{
                fontWeight: "bold",
                fontSize: "14px",
                color: "black",
                lineHeight: "1.2",
              }}
            >
              {user?.name}
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#718096", // Gray 500 subtext
              }}
            >
              {/* This fallback ensures the space isn't empty if the email is private */}
              {user?.email || `@${user?.nickname}`}
            </span>
          </div>

          <LogoutButton />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
