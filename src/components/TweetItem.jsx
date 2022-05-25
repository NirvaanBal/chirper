import { useEffect, useState } from 'react';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/Ai';
import { db } from '../firebase.config';

function TweetItem({ tweet: { likes, timestamp, content, user } }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getUsername = async () => {
      const q = query(collection(db, 'users'), where('userid', '==', user));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setUsername(doc.data().displayName);
      });
    };

    getUsername();
  }, []);

  const postDate = () => {
    const date = new Date(timestamp?.seconds * 1000).toDateString();
    return date;
  };

  return (
    <div className="tweet-item">
      <div className="user-and-date">
        <p className="username">{username}</p>
        <p>
          <small>{postDate()}</small>
        </p>
      </div>
      <p>{content}</p>
      <div className="tweet-item-actions">
        <button className="likes">
          {likes < 1 ? <AiOutlineHeart /> : <AiFillHeart />} {likes}
        </button>
      </div>
    </div>
  );
}

export default TweetItem;
