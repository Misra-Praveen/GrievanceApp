import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [form, setForm] = useState({ userName:"", email:"", password:"", department:"", role:""})
    const [error, setError]= useState("")
    const [departments, setDepartments] = useState([])
    const [roles, setRoles] = useState([])
    const navigate= useNavigate();

    useEffect(()=>{
        const fetchDepartments = async ()=>{
            try {
                const res = await axios.get("http://localhost:5001/api/department")
                //console.log(res)
                const data = res.data.department;
                // console.log(data)
                setDepartments(data)
            } catch (error) {
                console.log(error);
                setError(error.message)
            }
        };
        
        fetchDepartments();
        
    },[]);

    useEffect(()=>{
        const fetchRoles = async ()=>{
            try {
                const res = await axios.get("http://localhost:5001/api/role")
                const data = res.data.role;
                const result = data.filter((r)=> r.department === form.department)
                // console.log(data)
                setRoles(result)
            } catch (error) {
                console.log(error);
                setError(error.message)
            }
        };
        fetchRoles();
    },[form.department])

    const handleRehister = async (e)=>{
        e.preventDefault();

        if(!form.email.includes("@") || !form.email.endsWith(".com")){
            alert("Please enter a valid email id");
            return;
        }
        
        try {
            const res = await axios.post("http://localhost:5001/api/auth/register", {...form});
            alert("User registered. Go to login.");
            navigate("/login")
        } catch (error) {
            alert("User registration failed.");
            setError(error.message)
        }
    }

  return (
        <div className="bg-gray-100 pt-8 rounded-2xl">
            <form onSubmit={handleRehister} className="mt-5 max-w-lg mx-auto p-4">
                {error && <p className="text-red-600 text-center">{error}</p>}
                <fieldset className="flex flex-col justify-start gap-5 shadow-2xl shadow-blue-200 p-4 bg-white rounded-3xl">
                    <legend className="font-semibold text-2xl text-gray-600 mb-4 ">Welcome to register page</legend>
                    <div className="flex flex-col md:flex-row justify-center md:items-center gap-2">
                        <label className="w-36  font-medium py-2 mb-1 rounded-lg underline underline-offset-8" >userName <sup className='text-red-500 font-semibold'>*</sup></label>
                        <input 
                        type="type" 
                        value={form.userName}
                        placeholder="Enter your name" 
                        onChange={(e)=>setForm({...form, userName: e.target.value})}
                        className="w-full border rounded-lg mb-1 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                        />
                    </div>
                    <div className="flex flex-col md:flex-row justify-start md:items-center gap-2">
                        <label className="w-36 font-medium py-2 mb-1 rounded-lg underline underline-offset-8" >Email <sup className='text-red-500 font-semibold'>*</sup></label>
                        <input 
                        type="email" 
                        value={form.email}
                        placeholder="example@email.com" 
                        onChange={(e)=>setForm({...form, email: e.target.value})}
                        className="w-full border rounded-lg mb-1 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                        />
                    </div>
                    <div className="flex flex-col justify-start md:flex-row  md:items-center gap-2">
                        <label className="w-36 font-medium py-2 mb-1 rounded-lg underline underline-offset-8">Password <sup className='text-red-500 font-semibold'>*</sup></label>
                        <input type="password" 
                        value={form.password}
                        placeholder="**********" 
                        onChange={(e)=>setForm({...form, password: e.target.value})}
                        className="w-full border rounded-lg mb-1 px-4 py-2 pt-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                        />
                    </div> 
                    <div className="flex flex-col justify-start md:flex-row  md:items-center gap-2">
                        <label className="w-36  font-medium py-2 mb-1 rounded-lg underline underline-offset-8">Department <sup className='text-red-500 font-semibold'>*</sup></label>
                        <select
                         value={form.department}
                         onChange={(e)=>setForm({...form, department: e.target.value})}
                         className="w-full border bg-slate-50 rounded-lg mb-1 px-4 py-2 outline-none"
                         required
                        >
                            <option value="">---- Select Department ----</option>
                            {departments.map((dept)=> {
                                return (<option key={dept._id} value={dept._id}>{dept.name}</option>)
                            })}
                        </select>
                       
                    </div> 
                    <div className="flex flex-col justify-start md:flex-row  md:items-center gap-2">
                        <label className="w-36  font-medium py-2 mb-1 rounded-lg underline underline-offset-8">Role <sup className='text-red-500 font-semibold'>*</sup></label>
                        <select
                         value={form.role}
                         onChange={(e)=>setForm({...form, role: e.target.value})}
                         className="w-full border bg-slate-100 rounded-lg mb-1 px-4 py-2 outline-none"
                         required
                        >
                            <option value="">---- Select Role ----</option>
                            {roles.map((role)=> {
                                return (<option key={role._id} value={role._id}>{role.name}</option>)
                            })}
                        </select>
                       
                    </div>
                    <button
                    type="submit"
                    className="bg-blue-600 text-white w-full p-2 rounded"
                    >
                        Register
                    </button>
                    <p className="text-center text-sm text-gray-600 underline underline-offset-2">
                        Already have an account?{" "}
                        <span
                            onClick={() => navigate("/login")}
                            className="text-blue-600 hover:font-bold cursor-pointer"
                        >
                            Sign In
                        </span>
                    </p>
                </fieldset>
                
            </form>
        </div>
    )
}
export default Register