import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import { getDocs, collection, query, where, limit } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app, db } from '../firebase.config';
import TweetItem from '../components/TweetItem';

function Profile() {
  const [user, setUser] = useState({});
  const [tweets, setTweets] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const auth = getAuth(app);
    if (!auth.currentUser) navigate('/sign-in');

    const getUser = async () => {
      const userRef = collection(db, 'users');
      const q = query(userRef, where('userid', '==', params.userId), limit(1));
      const qSnapshot = await getDocs(q);

      qSnapshot.forEach((user) => {
        setUser(user.data());
      });
    };

    getUser();
  }, []);

  useEffect(() => {
    const auth = getAuth(app);
    if (auth.currentUser.displayName === user?.displayName)
      setLoggedInUser(true);

    const getTweets = async () => {
      const tweetsRef = collection(db, 'tweets');
      const q2 = query(
        tweetsRef,
        where('user', '==', params.userId),
        limit(10)
      );
      const q2Snapshot = await getDocs(q2);
      const tweets = [];
      q2Snapshot.forEach((tweet) => tweets.push(tweet.data()));
      setTweets(tweets);
    };

    getTweets();

    console.log(tweets);
  }, [user]);

  const logOut = () => {};

  return (
    <div className="user-profile">
      <header>
        <nav>
          <Link to="/home">Home</Link>
          {loggedInUser && <button onClick={logOut}>Log out</button>}
        </nav>
      </header>
      <main>
        <h2>{user.displayName}</h2>
        <div>
          {tweets.map((tweet) => (
            <TweetItem key={tweet.tid} tweet={tweet} fromProfile={true} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Profile;
