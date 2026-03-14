import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="loading-text">Loading profile...</div>;
  }

  useEffect(()=>{
    if(isAuthenticated && user){
        console.log(user);
    }
  }, [isAuthenticated,user])

  return (
    isAuthenticated && user ? (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <img 
          src={user.picture}
          style={{ 
            width: '110px', 
            height: '110px', 
            borderRadius: '50%', 
            objectFit: 'cover',
            border: '3px solid #63b3ed'
          }}
        />
        <div style={{ textAlign: 'center' }}>
          <p>
            user name: {user.name}
          </p>
          <p>
            user nickname: {user.nickname}
          </p>
          <p>user github id: {user.sub}</p>
        </div>
      </div>
    ) : null
  );
};

export default Profile;