import styles from "./signin.module.css";
import Google from "../../img/google.png";

const Signin = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };
  return (
    <div className={styles.signin}>
      <h2 className={styles.title}>signin</h2>
      <form className={styles.form}>
        <input className={styles.input_field} placeholder="email" />
        <input className={styles.input_field} placeholder="password" />
        <button className={styles.submitBtn}>Signin</button>
      </form>
      <div className={styles.loginButton} onClick={google}>
        <img src={Google} alt="google" className={styles.icon} />
        Google
      </div>
    </div>
  );
};

export default Signin;
