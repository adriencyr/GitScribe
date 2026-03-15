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
        backgroundColor: "#d6BCFA",
        // borderBottom: "1px solid #98a8be",
        borderRadius: "16px 16px 16px 16px",
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.2)",
        margin: "15px",
        color: "black",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="/img/logo1.png"
          alt="GitScribe"
          style={{ width: "50px", height: "50px" }}
        />
        <span
          style={{ fontWeight: "bold", fontSize: "32px", color: "#4f2ba1" }}
        >
          GitScribe
        </span>
      </div>

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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
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
                color: "#000000",
                fontWeight: "500",
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
