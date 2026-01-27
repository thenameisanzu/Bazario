import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const loginHandler = async () => {
    setMessage("Logging in...");

    try {
      const res = await fetch("http://localhost:5003/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      // ✅ SAVE TOKEN
      localStorage.setItem("token", data.token);

      setMessage("Login successful ✅");
      console.log("LOGIN RESPONSE:", data);

    } catch (err) {
      setMessage("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={loginHandler}>Login</button>

      <p>{message}</p>
    </div>
  );
}

export default Login;