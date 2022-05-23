import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase.config';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
        console.log(user);
      } else {
        navigate('/sign-in');
      }
    });
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <main className="main-page">
      <section className="actions">
        <p>{user && user.displayName ? user.displayName : user.email}</p>
        <button onClick={() => auth.signOut()} className="logout-btn">
          Log out
        </button>
      </section>
      <section className="user-home">
        <h1>Home</h1>
        <p>lorem10000</p>
      </section>
      <section className="search">Search...</section>
    </main>
  );
}

export default Home;
