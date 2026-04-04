import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
      const response = await api.post("/auth/login", {email, password,});
      console.log(response.data);
      if(response.data.token){
        const token = response.data.token;
        localStorage.setItem("token", token);       // store token
        navigate("/dashboard");                    // redirect to dashboard
      }
      else{
        alert(response.data.message);
      }
    }catch(error: any){
      console.log(error);
      console.log(error.response);
      alert(error.response?.data?.message || "Login failed"); 
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type={showPassword ? "text" :"password"}
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={() => setShowPassword(!showPassword)} className="w-full bg-blue-500 text-white p-2 rounded">
          {showPassword ? "Hide" : "Show"} Password
        </button>

        <br></br><br></br>

        <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
        <p className="text-sm mt-3 text-center">
          New to LinkNest?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;