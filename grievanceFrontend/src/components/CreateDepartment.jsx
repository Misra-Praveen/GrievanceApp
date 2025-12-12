import { useState } from "react"



const CreateDepartment = ()=>{
    const [name, setName]= useState("");
    const [loading, setLoading]=useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e)=>{
        e.preventdefault();
        setLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token")
            const response = await fetch("http://localhost:5001/api/department", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body : JSON.stringify({name})
            })
            const data = await response.json();
            console.log("data",data);

            if(!response.ok){
                setMessage(data.message || "Something went wrong");
                setLoading(false);
                return;
            }

            setMessage("Department created successfully!");
            setName("");
      
        } catch (error) {
            console.log(error);
            setMessage("Server error");
        }

    }

    return (
        <div className="max-w-lg mx-auto bg-white p-6 shadow rounded-lg">
            {message && (<p className="text-center text-sm mb-2 text-blue-600">{message}</p>)}
            <form onSubmit={handleSubmit} >
                <fieldset className="flex flex-col justify-center md:items-center gap-5 border shadow-2xl shadow-blue-200 p-4 bg-white rounded-3xl">
                    <legend className="font-semibold text-2xl text-gray-600 mb-4 ">Create a department</legend>
                        <div className="flex flex-col md:flex-row justify-center md:items-center gap-2">
                            <label className="w-36 font-medium mb-1 rounded-lg underline underline-offset-8">Name</label>
                            <input 
                            type="email" 
                            placeholder="Enter department name" 
                            onChange={(e)=>setName(e.target.value)}
                            className="w-full border rounded-lg mb-1 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        >
                            {loading ? "Creating..." : "Create Department"}
                        </button>
                </fieldset>

            </form>
        </div>
    )
}

export default CreateDepartment