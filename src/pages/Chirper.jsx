import { Link } from 'react-router-dom';

function Chirper() {
  return (
    <div className="home">
      <header>
        <h1>Happening now</h1>
        <h2>Join Chirper today.</h2>
      </header>

      <main>
        <section className="sign-up">{/* Sign Up */}</section>

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
