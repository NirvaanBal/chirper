import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase.config';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        navigate('/sign-in');
      }
    });
  }, []);

  return (
    <div className="main-page">
      <div className="actions">
        {user.displayName ? user.displayName : user.email}
      </div>
      <div className="user-home">Home</div>
      <div className="search">Search...</div>
    </div>
  );
}

export default Home;
