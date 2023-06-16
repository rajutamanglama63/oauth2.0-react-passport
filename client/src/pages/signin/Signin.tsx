import styles from "./signin.module.css";
import Google from "../../img/google.png";
import Github from "../../img/github.png";

const Signin = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };
  return (
    <div className={styles.signin}>
      <h2 className={styles.title}>signin</h2>
      <form className={styles.form}>
        <input className={styles.input_field} placeholder="email" />
        <input className={styles.input_field} placeholder="password" />
        <button className={styles.submitBtn}>Signin</button>
      </form>
      <div
        className={`${styles.loginButton} ${styles.google}`}
        onClick={google}
      >
        <img src={Google} alt="google" className={styles.icon} />
        Google
      </div>

      <div
        className={`${styles.loginButton} ${styles.github}`}
        onClick={github}
      >
        <img src={Github} alt="google" className={styles.icon} />
        Github
      </div>
    </div>
  );
};

export default Signin;
