import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../api/auth";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await login({ email, password });
    console.log('Server response:', response);
    navigate('/');
  };

  return (
    <div className="auth__container"> 
      <h1 className="auth__title">
        Hey,
        welcome ....
      </h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="auth__input__container">
          <p className="auth__input__title">Email</p>
          <input
            type="email"
            className="auth__input__field"
            placeholder="Enter your email or number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="auth__input__container">
          <p className="auth__input__title">Password</p>
          <input
            type="password"
            className="auth__input__field"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link className="auth__input__link" to="/reset">Forgot your password?</Link>
        </div>

        <button className="auth__submit">Sign in</button>
      </form>

      <p className="auth__text">or continue with</p>

      <div className="auth__socials">
        <a href="" className="auth__link"><img src="/imgs/Apple.svg" alt="Apple" className="auth__link__img" /></a>
        <a href="" className="auth__link"><img src="/imgs/Facebook.svg" alt="Facebook" className="auth__link__img" /></a>
        <a href="" className="auth__link"><img src="/imgs/Google.svg" alt="Google" className="auth__link__img" /></a>
      </div>

      <footer className="auth__footer">
        Don't have an account? <Link className="auth__footer__link" to="/register">Sign up</Link>
      </footer>
    </div>
  );
};