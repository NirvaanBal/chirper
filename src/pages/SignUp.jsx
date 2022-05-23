import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase.config';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [passwordFieldType, setPasswordFieldType] = useState(true);

  const { name, email, password } = formData;
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
      const userCrendential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCrendential.user;

      console.log(user);

      setFormData({ name: '', email: '', password: '' });
      navigate('/home');
    } catch (e) {
      console.error('ERROR:', e.message);
    }
  };

  return (
    <div className="sign-in-page sign-up-page">
      <div>
        <Link to="/" className="close-sign-in" title="close">
          x
        </Link>
        <div>
          <header>
            <h1>Create your account</h1>
          </header>

          <main>
            <form onSubmit={handleSubmit}>
              <div className="input-fields">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={onInputChange}
                  required
                  autoFocus
                />
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
                    className="show-password sign-up"
                    onClick={() => setPasswordFieldType(!passwordFieldType)}
                    title={
                      passwordFieldType ? 'Reveal password' : 'Hide password'
                    }
                  >
                    👁️‍🗨️
                  </p>
                </div>
              </div>
              <button
                type="submit"
                disabled={
                  email.length < 1 || password.length < 1 || name.length < 1
                }
              >
                Sign up
              </button>
            </form>

            <p className="to-sign-up">
              Already have an account? <Link to="/sign-in">Sign in</Link>
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
