import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { app, db } from '../firebase.config';
import TweetItem from '../components/TweetItem';

function Home() {
  const [user, setUser] = useState({});
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        navigate('/sign-in');
      }
    });
  }, []);

  useEffect(() => {
    const getTweets = async () => {
      const q = query(
        collection(db, 'tweets'),
        orderBy('timestamp', 'desc'),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const tweets = [];

      querySnapshot.forEach((doc) => {
        tweets.push(doc.data());
      });

      setTweets(tweets);
    };

    getTweets();
  }, [tweets]);

  const onTweetChange = (e) => {
    setTweet(e.target.value);
    e.target.style.height = '23px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const submitTweet = async (e) => {
    e.preventDefault();

    const newTweetRef = doc(collection(db, 'tweets'));
    await setDoc(newTweetRef, {
      tweet,
      userid: user.uid,
      timestamp: serverTimestamp(),
      likes: 0,
      tid: uuidv4(),
    });

    setTweet('');
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
              style={{ height: '23px' }}
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

        <section className="tweets">
          {tweets.map((t) => (
            <TweetItem key={t.tid} tweet={t} />
          ))}
        </section>
      </section>
      <section className="search">Search...</section>
    </main>
  );
}

export default Home;
