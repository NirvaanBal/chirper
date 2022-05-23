import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

function Chirper() {
  const handleClick = () => {
    console.log('CREATE USERS COLLECTION');
  };

  return (
    <div className="home">
      <header>
        <h1>Happening now</h1>
        <h2 style={{ fontSize: '2.4rem' }}>Join Chirper today.</h2>
      </header>

      <main>
        <section className="sign-up">
          <button onClick={handleClick} className="o-auth-btn">
            <FcGoogle size="1.2rem" /> Sign up with Google
            {/**
             * Add user after OAuth Login to users collection
             */}
          </button>
          <Link className="sign-up-btn" to="/sign-up">
            Sign up with email
          </Link>
        </section>

        <section className="sign-in">
          <p className="sign-in-label">Already have an account?</p>
          <Link className="sign-in-btn" to="/sign-in">
            Sign In
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Chirper;
