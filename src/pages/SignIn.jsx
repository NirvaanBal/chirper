import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase.config';

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
    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);

      navigate('/home');
      setFormData({ email: '', password: '' });
    } catch (e) {
      console.error('ERROR:', e.message);
    }
  };

  return (
    <div className="sign-in-page">
      <div>
        <Link to="/" className="close-sign-in">
          x
        </Link>
        <div>
          <header>
            <h1>Sign in to Chirper</h1>
          </header>

          <main>
            {/* OAuth SignIn */}

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
