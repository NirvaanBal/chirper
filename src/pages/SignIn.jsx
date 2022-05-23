import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { app } from '../firebase.config';
import { FcGoogle } from 'react-icons/fc';

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordFieldType, setPasswordFieldType] = useState(true);

  const { email, password } = formData;
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth(app);
    const userCrendential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCrendential.user;

    setFormData({ email: '', password: '' });
    navigate('/home');
  };

  const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    navigate('/home');
  };

  return (
    <div className="sign-in-page">
      <div>
        <Link to="/" className="close-sign-in" title="close">
          x
        </Link>
        <div>
          <header>
            <h1>Sign in to Chirper</h1>
          </header>

          <main>
            <button type="button" onClick={handleClick} className="o-auth-btn">
              <FcGoogle size="1.2rem" /> Sign in with Google
            </button>

            <form onSubmit={handleSubmit}>
              <div className="input-fields">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={onInputChange}
                  required
                  autoFocus
                />
                <div className="password-field">
                  <input
                    type={passwordFieldType ? 'password' : 'text'}
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={onInputChange}
                    required
                  />
                  <p
                    className="show-password"
                    onClick={() => setPasswordFieldType(!passwordFieldType)}
                    title={
                      passwordFieldType ? 'Reveal password' : 'Hide password'
                    }
                  >
                    👁️‍🗨️
                  </p>
                  <small>
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </small>
                </div>
              </div>
              <button
                type="submit"
                disabled={email.length < 1 || password.length < 1}
              >
                Sign in
              </button>
            </form>

            <p className="to-sign-up">
              Don't have an account? <Link to="/sign-up">Sign up</Link>
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
