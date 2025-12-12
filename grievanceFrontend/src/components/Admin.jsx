import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons'
import CreateDepartment from "./CreateDepartment";
import Aside from "./Aside";
import CreateRole from "./CreateRole";

const Admin = ()=>{
    const [grievance, setGrievance]= useState("");
    const [active, setActive]=useState(null)
    const [activeSection, setActiveSection] = useState("");
    const {user} = useAuth();
    console.log(user);


    useEffect(()=>{
        const fetchGrievance = async ()=>{
            try {
                const token = localStorage.getItem("token")
                const response = await fetch("http://localhost:5001/api/adminGrievances", {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                const data = await response.json();
                console.log("data",data);

                if(response.ok){
                    setGrievance( data.grievance)
                }
            } catch (error) {
                console.log("Error fetching grievances:", error);
            }
        }
        fetchGrievance();

    },[])
    return (
    <div className="mt-5">
        <h1 className="text-xl font-semibold">
          Welcome {user?.userName} — Department: {user?.department?.name}
        </h1>
      <Aside setActiveSection={setActiveSection}/>
      {activeSection == "department" && (
        <div className="relative p-5  max-w-lg mx-auto mt-5">
            <CreateDepartment />
            <button
            className="absolute top-2 right-2 text-red-500 font-bold text-xl hover:text-red-700"
            onClick={() => setActiveSection("")}
            >
                <FontAwesomeIcon icon={faCircleXmark} />
            </button>
        </div>)}
      {activeSection == "role" && (
        <div className="relative p-5  max-w-lg mx-auto mt-5">
            <CreateRole />
            <button
            className="absolute top-2 right-2 text-red-500 font-bold text-xl hover:text-red-700"
            onClick={() => setActiveSection("")}
            >
            <FontAwesomeIcon icon={faCircleXmark} />
            </button>
        </div>)
      }

      {/* ---- MAIN AREA ---- */}
      <div className="ml-64 p-5">
        <h1 className="text-xl font-semibold">
          Welcome {user?.userName} — Department: {user?.department?.name}
        </h1>

        <h2 className="text-lg mt-5">All Grievance for your department:</h2>

        {grievance?.length === 0 ? (
          <p>No grievances found.</p>
        ) : (
          grievance.map((g) => (
            <div key={g._id} className="p-4 border rounded-lg my-3 shadow-sm">
              <p><b>Grievance No:</b> {g.grievanceNo}</p>
              <p><b>Name:</b> {g.name}</p>
              <p><b>Status:</b> {g.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;