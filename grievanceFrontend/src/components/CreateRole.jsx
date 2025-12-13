import { useEffect, useState } from "react";
import axios from 'axios'

const CreateRole = ()=>{
    const [name, setName] = useState("")
    const [departmentId, setDepartmentId] = useState("");
    const [departments, setDepartments] = useState([]);
    const [permissionInput, setPermissionInput] = useState("")
    const [permissions, setPermissions] = useState([]);
    

    useEffect(()=>{
        const fetchDepartments = async ()=>{
            try {
                const res = await axios.get("http://localhost:5001/api/department");
                setDepartments(res.data.department)
            } catch (error) {
                console.log(error)
            }
        } 
        fetchDepartments()
    },[]);

    const addPermission = ()=>{
        if (!permissionInput.trim()) return;

        if (permissions.includes(permissionInput.toUpperCase())) {
            alert("Permission already exists");
            return;
        }
        setPermissions([...permissions, permissionInput.toUpperCase()]);
        setPermissionInput("");
    }


    const handleSubmit =async (e)=>{
        e.preventDefault();
        const data = { name, department: departmentId, permissions };
        const token = localStorage.getItem("token");

        try {
        const res = await axios.post("http://localhost:5001/api/role", data,
        { headers : {
            Authorization : `Bearer ${token}`   
        }}
        );
        alert("Role Created Successfully");

        // reset
        setName("");
        setDepartmentId("");
        setPermissions([]);
        } catch (error) {
            console.log("error is ",error.message)
            alert( "Failed to create role");
        }
    }
    return (
        <div className="p-6 rounded bg-white shadow-lg border-t-2 border-gray-300 max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">Create Role</h2>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2 font-semibold">Role Name</label>
                <input 
                   type="text"
                   value={name}
                   placeholder="Enter Role Name"
                   onChange={(e)=>setName(e.target.value.toUpperCase())}
                   className="border p-2 w-full rounded"
                   required
                />
                <label className="block mt-4 mb-2 font-semibold">Department</label>
                <select
                 value={departmentId}
                 onChange={(e)=>setDepartmentId(e.target.value)}
                 className="border p-2 w-full rounded"
                 required
                >
                    <option value="">Select Department</option>
                    {departments.map((dept)=>(
                        <option key={dept._id} value={dept._id}>{dept.name}</option>
                    
                    ))}
                </select>

                <label className="block mt-4 mb-2 font-semibold">Add Permission</label>
                <div className="flex">
                    <input
                        type="text"
                        value={permissionInput}
                        placeholder="Enter Permission"
                        onChange={(e) => setPermissionInput(e.target.value)}
                        className="border p-2 w-full rounded"
                    />
                    <button
                        type="button"
                        onClick={addPermission}
                        className="ml-2 bg-gray-700 text-white px-4 py-2 rounded"
                    >
                        Add
                    </button>
                </div>
                <div className="mt-3">
                    {permissions.map((p, i) => (
                        <span
                        key={i}
                        className="inline-block px-3 py-1 text-sm bg-blue-100 rounded-full mr-2 mb-2"
                        >
                        {p}
                        </span>
                    ))}
                </div>

                <button 
                   type="submit"
                   className="w-full bg-green-600 text-white py-2 rounded mt-4"
                  
                >
                    Save Role
                </button>

            </form>

        </div>
    )
}

export default CreateRole;