import { useState } from "react";
import axios from "axios";
import "./Login.css"; // ✅ import CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        window.location.href = "/"; // redirect to dashboard
      } else {
        setError(res.data.message || "Invalid email or password");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">

        <h2>Login to your account</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="input-field"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="input-field"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
