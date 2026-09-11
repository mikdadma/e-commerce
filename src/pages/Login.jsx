import { useState } from "react";
import { loginUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const users = await loginUser(email, password);

      if (users.length === 0) {
        alert("Invalid email or password");
        return;
      }

      const user = users[0];

      localStorage.setItem("user", JSON.stringify(user));

      console.log("Logged in user:", user);

      alert("Login successful");
      navigate("/");
      
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <br />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

          <button type="submit">Login</button>
          <p>
               Don't have an account?{" "}
               <Link to="/register">Register</Link>
          </p>
      </form>
    </div>
  );
}

export default Login;