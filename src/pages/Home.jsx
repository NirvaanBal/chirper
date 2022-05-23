import { useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { app } from '../firebase.config';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState({});
  const [tweet, setTweet] = useState('');
  const [rows, setRows] = useState(1);
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

  const onTweetChange = (e) => {
    setTweet(e.target.value);
  };

  const submitTweet = (e) => {
    e.preventDefault();
    console.log(user.uid);
  };

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
        <h1 style={{ fontSize: '1.6rem', marginBottom: '20px' }}>Home</h1>

        <form onSubmit={submitTweet}>
          <div className="text-field">
            <textarea
              type="text"
              name="tweet"
              id="tweet"
              placeholder="What's happening?"
              required
              value={tweet}
              onChange={onTweetChange}
              rows={rows}
            />
          </div>
          <div className="text-info">
            <div className="characters">
              {tweet.length <= 140 ? (
                <p>{140 - tweet.length} characters left</p>
              ) : (
                <p style={{ color: 'indianred' }}>{140 - tweet.length}</p>
              )}
            </div>
            <button type="submit" disabled={tweet.length < 1 ? true : false}>
              Tweet
            </button>
          </div>
        </form>
      </section>
      <section className="search">Search...</section>
    </main>
  );
}

export default Home;
