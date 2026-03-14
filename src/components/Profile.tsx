import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Hook moved to the top to follow the "Rules of Hooks"
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log(user);
    }
  }, [isAuthenticated, user]);

  // Conditional return happens AFTER hooks are declared
  if (isLoading) {
    return <div className="loading-text">Loading profile...</div>;
  }

  return isAuthenticated && user ? (
    /* Main horizontal container */
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "20px" }}>
      {/* Profile Picture on the Left */}
      <img
        src={user.picture}
        alt={user.name}
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          objectFit: "cover",
          border: "3px solid #63b3ed",
        }}
      />

      {/* Text Wrapper (Stacks Name and Email vertically) */}
      <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
        <h2 style={{ margin: 0, fontSize: "1.5rem", color: "white" }}>{user.name}</h2>
        <p style={{ margin: 0, color: "#718096", fontSize: "1rem" }}>
          {user.email || `@${user.nickname}`}
        </p>
        <p style={{ margin: "4px 0 0 0", color: "#4A5568", fontSize: "0.8rem" }}>ID: {user.sub}</p>
      </div>
    </div>
  ) : null;
};

export default Profile;
