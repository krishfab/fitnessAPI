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
      const res = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        console.log("API URL:", process.env.REACT_APP_API_URL);
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

      // Fetch user details immediately after login
      const userRes = await fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userBody = await userRes.json();
      const userData = userBody.data;

      login(token, userData); // store token + user in context
    } else {
      // registration...
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
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-full"
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
