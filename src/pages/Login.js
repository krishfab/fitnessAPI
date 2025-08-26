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
        // LOGIN
        const res = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password }),
        });

        if (!res.ok) throw new Error("Login failed");

        const data = await res.json();
        login(data.access); // save token in context and localStorage
      } else {
        // REGISTER
        const res = await fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        if (!res.ok) throw new Error("Registration failed");

        alert("Registered! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto border rounded shadow-md">
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
        className="mt-3 text-sm cursor-pointer text-blue-600"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Create an account" : "Already have an account? Login"}
      </p>
    </div>
  );
}
