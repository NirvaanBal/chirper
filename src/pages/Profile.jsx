import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import { getDocs, doc, collection, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { app, db } from '../firebase.config';

function Profile() {
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const user = getAuth(app);
    if (!user.currentUser) navigate('/sign-in');
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const q = query(
        collection(db, 'users'),
        where('userid', '==', params.userId)
      );
      const qSnapshot = await getDocs(q);

      qSnapshot.forEach((doc) => setUser(doc.data()));
    };

    getUser();
  }, []);

  return (
    <div className="user-profile">
      <main>
        <Link to="/home">Home</Link>
        <h2>Coming soon</h2>
      </main>
    </div>
  );
}

export default Profile;
