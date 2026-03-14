import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';
import SideBar from "./components/SideBar"


function App() {
  const { isAuthenticated, isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if (error) {
    return (
      <div>Something went wrong: {error.message}</div>
    );
  }

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Github user profile</h2>
          <SideBar />
          <Profile />
          <LogoutButton />
        </div>
      ) : (
        <div>
          <p>Sign in with Github</p>
          <LoginButton />
        </div>
      )}
    </div>
  );
}

export default App;