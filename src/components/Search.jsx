import { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, limit, where } from 'firebase/firestore';
import { db } from '../firebase.config';

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    setSearchValue(e.target.value);
    setLoading(true);
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', e.target.value)
    );
    const qSnapshot = await getDocs(q);

    const users = [];
    qSnapshot.forEach((doc) => users.push(doc.data()));

    setLoading(false);
    setUsers(users);
  };

  return (
    <div className="search-field">
      <form>
        <input
          type="text"
          placeholder="Search users..."
          onChange={handleChange}
          value={searchValue}
        />
      </form>

      {loading && <div className="result">Loading...</div>}
      {!loading && searchValue.length > 0 && users.length === 0 && (
        <div className="result">No user found!</div>
      )}

      {!loading &&
        users.length > 0 &&
        users.map((user) => (
          <div className="user-found" key={user.userid}>
            <Link to={`/profile/${user.userid}`}>{user.displayName}</Link>
          </div>
        ))}
    </div>
  );
}

export default Search;
