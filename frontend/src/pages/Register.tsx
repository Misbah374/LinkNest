import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // API call will come next

    try{
      const response = await api.post("/auth/register", {username: name,
  email,
  password,});
      if(response.data.success){
        alert("Registration successful! Please login.");
        navigate("/login");
      }else{
        alert(response.data.message);
        console.log({
  name,
  email,
  password,
});
      }
    }catch(error: any){
      console.log(error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          className="w-full mb-4 p-2 border rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={() => setShowPassword(!showPassword)} className="w-full bg-blue-500 text-white p-2 rounded">
          {showPassword ? "Hide" : "Show"} Password
        </button>

        <br></br><br></br>

        <button onClick={handleRegister} className="w-full bg-blue-500 text-white p-2 rounded">
          Register
        </button>

        <p className="text-sm mt-3 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;