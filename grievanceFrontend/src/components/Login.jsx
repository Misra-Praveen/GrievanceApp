import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = ()=>{
    const [email, setEmail]=useState("");
    const [password, setPassword]= useState("");
    const [error, setError]= useState("");
    const navigate = useNavigate();

    const { login } = useAuth()

    const handleLogin = async(e)=>{
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password})
            });

            const data = await response.json();

            if(!response.ok){
                setError(data.message || "Login Failed");
                return;
            }

            login(data.user, data.token)

            navigate("/admin");

        } catch (error) {
            setError("Something went wrong");
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <form onSubmit={handleLogin} className="mt-5 max-w-lg mx-auto p-4">
                {error && <p className="text-red-600 text-center">{error}</p>}
                <fieldset className="flex flex-col justify-center md:items-center gap-5 shadow-2xl shadow-blue-200 p-4 bg-white rounded-3xl">
                    <legend className="font-semibold text-2xl text-gray-600 mb-4 ">Welcome to login page</legend>
                    <div className="flex flex-col md:flex-row justify-center md:items-center gap-2">
                        <label className="w-36 font-medium mb-1 rounded-lg underline underline-offset-8" >Email</label>
                        <input 
                        type="email" 
                        placeholder="example@email.com" 
                        onChange={(e)=>setEmail(e.target.value)}
                        className="w-full border rounded-lg mb-1 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="flex flex-col justify-start md:flex-row md:justify-center md:items-center gap-2">
                        <label className="w-36 font-medium py-2 mb-1 rounded-lg underline underline-offset-8">Password</label>
                        <input type="password" 
                        placeholder="**********" 
                        onChange={(e)=>setPassword(e.target.value)}
                        className="w-full border rounded-lg mb-1 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div> 
                    <button
                    type="submit"
                    className="bg-blue-600 text-white w-full md:w-36 p-2 rounded"
                    >
                        Login
                    </button>
                </fieldset>
                
            </form>
        </div>
    )
}

export default Login;