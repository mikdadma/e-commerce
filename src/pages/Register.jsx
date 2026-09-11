import { useState } from "react";
import { registerUser, getUsers } from "../services/userService";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 const handleRegister = async (e) => {
  e.preventDefault();

  if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
    alert("Please fill all fields");
    return;
  }
  if (password.length < 8) {
  alert("Password must be at least 8 characters");
  return;
}

  try {
        const users = await getUsers();     

        const existingUser = users.find(
        (user) => user.email === email
        );

        if (existingUser) {
          alert("Email already registered");
          return;
          }
    const user = {
      name,
      email,
      password
    };

    const data = await registerUser(user);

    console.log("Registered user:", data);

    alert("Registration successful");

    setName("");
    setEmail("");
    setPassword("");

    navigate("/login");
  } catch (error) {
    console.log(error);
    alert("Registration failed");
  }
};

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Name</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <br />

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

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;