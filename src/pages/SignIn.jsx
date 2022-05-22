import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordFieldType, setPasswordFieldType] = useState(true);

  const { email, password } = formData;

  const onInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="sign-in-page">
      <div>
        <Link to="/" className="close-sign-in">
          <GrClose stroke="rgb(255, 255, 255)" />
        </Link>
        <div>
          <header>
            <h1>Sign in to Chirper</h1>
          </header>

          <main>
            {/* OAuth SignIn */}

            <form>
              <div className="input-fields">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={onInputChange}
                />
                <div className="password-field">
                  <input
                    type={passwordFieldType ? 'password' : 'text'}
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={onInputChange}
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
