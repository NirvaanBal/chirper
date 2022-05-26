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
  where,
  startAfter,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { app, db } from '../firebase.config';
import TweetItem from '../components/TweetItem';

function Home() {
  const [user, setUser] = useState({});
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [upto, setUpto] = useState({});
  const [allFetched, setAllFetched] = useState(false);

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
    const getUser = async () => {
      const realUserId = user.uid;
      if (realUserId) {
        const q = query(
          collection(db, 'users'),
          where('userid', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => setUser(doc.data()));
      }
    };

    if (user) getUser();
  }, [user]);

  useEffect(() => {
    const getTweets = async () => {
      const q = query(
        collection(db, 'tweets'),
        orderBy('timestamp', 'desc'),
        limit(5)
      );
      const querySnapshot = await getDocs(q);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

      setUpto(lastVisible);
      const tweets = [];

      querySnapshot.forEach((doc) => {
        tweets.push(doc.data());
      });

      setTweets(tweets);
    };

    getTweets();
  }, []);

  const onTweetChange = (e) => {
    setTweet(e.target.value);
    e.target.style.height = '23px';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const submitTweet = async (e) => {
    e.preventDefault();

    const newTweetRef = doc(collection(db, 'tweets'));
    const newTweet = await setDoc(newTweetRef, {
      content: tweet,
      user: user.userid || user.uid,
      timestamp: serverTimestamp(),
      likes: 0,
      tid: uuidv4(),
      creator: getAuth(app).currentUser.displayName,
    });

    setTweet('');
    location.reload();
  };

  const fetchMoreTweets = async () => {
    const next = query(
      collection(db, 'tweets'),
      orderBy('timestamp', 'desc'),
      startAfter(upto),
      limit(5)
    );

    const nextSnapshot = await getDocs(next);
    const lastVisible = nextSnapshot.docs[nextSnapshot.docs.length - 1];
    setUpto(lastVisible);
    if (nextSnapshot.docs.length === 0) setAllFetched(true);
    const tweetsNew = [];

    nextSnapshot.forEach((doc) => {
      tweetsNew.push(doc.data());
    });

    setTweets([...tweets, ...tweetsNew]);
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

        {tweets.length > 0 && !allFetched && (
          <button
            className="load-more-btn"
            type="button"
            onClick={fetchMoreTweets}
          >
            Load More
          </button>
        )}
      </section>
      <section className="search">Search...</section>
    </main>
  );
}

export default Home;
