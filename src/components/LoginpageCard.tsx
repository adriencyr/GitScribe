import { useAuth0 } from "@auth0/auth0-react";

const LoginPageCard = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div style={cardStyle}>
      <h1
        style={{
          fontSize: "64px",
          marginBottom: "50px",
          marginTop: "0px",
          color: "black",
          fontWeight: "600",
        }}
      >
        GitScribe
      </h1>
      <p style={{ fontSize: "16px", marginBottom: "25px", color: "#4A5568" }}>
        Please sign in with your GitHub account to continue.
      </p>

      {/*GitHub Login Button */}
      <button
        onClick={() => loginWithRedirect({ authorizationParams: { connection: "github" } })}
        style={githubButtonStyle}
      >
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="GitHub Logo"
          style={{ width: "20px", marginRight: "10px" }}
        />
        Continue with GitHub
      </button>
    </div>
  );
};

// Styles
const cardStyle: React.CSSProperties = {
  backgroundColor: "#D9D9D9",
  padding: "30px 50px 50px 50px",
  borderRadius: "30px",
  width: "400px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
};

const githubButtonStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "white",
  color: "black",
  padding: "12px 24px",
  border: "1px solid #000",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  width: "100%",
  transition: "background-color 0.2s",
};
export default LoginPageCard;
