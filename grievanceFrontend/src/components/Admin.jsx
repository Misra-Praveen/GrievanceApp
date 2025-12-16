import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleXmark} from '@fortawesome/free-regular-svg-icons'
import CreateDepartment from "./CreateDepartment";
import Aside from "./Aside";
import CreateRole from "./CreateRole";

const Admin = ()=>{
    const [grievance, setGrievance]= useState([]);
    const [error, setError]=useState("")
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
                //console.log("data",data);

                if(response.ok){
                    setGrievance( data.grievance)
                }
            } catch (error) {
                //console.log("Error fetching grievances:", error);
                setError(error.message)
            }
        }
        fetchGrievance();

    },[])
    return (
    <div className="mt-5">
      {error && <h2 className="text-lg font-semibold text-red-500">{error}</h2>}
      <Aside setActiveSection={setActiveSection}/>
      {activeSection == "department" && (
        <div className="relative p-5  max-w-lg mx-auto mt-15 lg:mt-8">
            <CreateDepartment />
            <button
            className="absolute top-2 right-2 text-red-500 font-bold text-xl hover:text-red-700"
            onClick={() => setActiveSection("")}
            >
                <FontAwesomeIcon icon={faCircleXmark} />
            </button>
        </div>)}
      {activeSection == "role" && (
        <div className="relative p-5  max-w-lg mx-auto mt-15 lg:mt-8">
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
      <div className="hidden md:block max-w-3xl mx-auto overflow-x-auto">

        <h2 className="text-lg font-medium mt-5 mb-3">
          All Grievances
        </h2>

        {grievance?.length === 0 ? (
          <p className="text-gray-500">No grievances found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-900 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold border">
                    #
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold border">
                    Grievance No
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold border">
                    Description
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-semibold border">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {grievance.map((g, index) => (
                  <tr
                    key={g._id}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 border text-sm">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border text-sm font-medium">
                      {g.grievanceNo}
                    </td>
                    <td className="px-4 py-2 border text-sm">
                      {g.description}
                    </td>
                    <td className="px-4 py-2 border text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            g.status === "PENDING"
                              ? "bg-yellow-100 text-yellow-700"
                              : g.status === "RESOLVED"
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                      >
                        {g.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* Mobile view  */}
      <div className="block md:hidden space-y-4 m-5">
        <h2 className="text-lg font-medium text-center mt-15 mb-18">
          All Grievances
        </h2>
        {grievance.map((g, index) => (
          <div
            key={g._id}
            className="border rounded-xl p-4 shadow-sm bg-white"
          >
            <p className="text-sm text-gray-500">
              <b>#</b> {index + 1}
            </p>

            <p className="mt-1">
              <b>Grievance No:</b> {g.grievanceNo}
            </p>

            <p className="mt-1">
              <b>Description:</b> {g.description}
            </p>

            <p className="mt-2">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    g.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : g.status === "RESOLVED"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
              >
                {g.status}
              </span>
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Admin;