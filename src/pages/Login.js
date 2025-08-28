import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Auth() {
  const { login } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);

  // Include all possible fields for registration
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNo: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isLogin) {
      // LOGIN FLOW
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Login failed");
      }

      const data = await res.json();
      const token = data.access;

      const userRes = await fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userBody = await userRes.json();
      const userData = userBody.data;

      login(token, userData); // store token + user in context

    } else {
      // REGISTRATION FLOW
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        // Try to parse JSON error from backend
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || "Registration failed");
      }

      // Option 1: Alert and switch to login
      alert("Registration successful! Logging you in...");

      // Option 2: Auto-login after registration
      const loginRes = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      if (!loginRes.ok) {
        const text = await loginRes.text();
        throw new Error(text || "Auto-login failed");
      }

      const loginData = await loginRes.json();
      const token = loginData.access;

      const userRes = await fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userBody = await userRes.json();
      const userData = userBody.data;

      login(token, userData); // auto-login
    }
  } catch (err) {
    alert(err.message);
  }
};


  return (
    <div className="p-6 max-w-sm mx-auto border rounded shadow-md auth-container">
      <h2 className="text-xl mb-4">{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {!isLogin && (
          <>
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              className="border p-2 w-full"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              className="border p-2 w-full"
            />
            <input
              name="mobileNo"
              placeholder="Mobile Number"
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </>
        )}
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-full"
           autoComplete="email"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-full"
           autoComplete="current-password"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p
        className="auth-toggle"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Create an account" : "Already have an account? Login"}
      </p>
    </div>
  );
}
