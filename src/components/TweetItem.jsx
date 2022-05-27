import { Link } from 'react-router-dom';
// import { AiOutlineHeart, AiFillHeart } from 'react-icons/Ai';

function TweetItem({
  tweet: { likes, timestamp, content, creator, user },
  fromProfile,
}) {
  const postDate = () => {
    const date = new Date(timestamp?.seconds * 1000).toDateString();
    return date;
  };

  return (
    <div className="tweet-item">
      <div className="user-and-date">
        {!fromProfile && (
          <p className="username">
            <Link to={`/profile/${user}`}>{creator}</Link>
          </p>
        )}
        <p>
          <small>{postDate()}</small>
        </p>
      </div>
      <p>{content}</p>
      <div className="tweet-item-actions">
        {/* <button className="likes">
          {likes < 1 ? <AiOutlineHeart /> : <AiFillHeart />} {likes}
        </button> */}
      </div>
    </div>
  );
}

export default TweetItem;
