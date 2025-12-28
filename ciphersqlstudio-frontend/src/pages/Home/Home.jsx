import "./Home.scss";

function Home({ onLoginClick }) {
  return (
    <section className="hero">
      <h1>
        Welcome to <span>CipherSQLStudio</span>
      </h1>
      <p>Practice SQL in a secure sandbox environment</p>

      <button onClick={onLoginClick}>Get Started</button>
    </section>
  );
}

export default Home;
