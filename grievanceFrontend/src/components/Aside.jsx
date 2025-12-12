import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBuildingUser, faUserTie } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const Aside = ({ setActiveSection })=>{
    const [isOpen, setIsOpen] = useState(false)
    return (
        <aside 
          className="fixed right-0 content-center top-26 h-40 bg-white rounded-l-4xl transition-all duration-300"
          onMouseEnter={()=>setIsOpen(true)}
          onMouseLeave={()=>setIsOpen(false)}
        >
            <ul className="space-y-2">
                <li className="flex justify-center items-center gap-2 px-4 cursor-pointer hover:text-blue-600"
                  onClick={() => setActiveSection("department")}
                >
                    <FontAwesomeIcon icon={faBuildingUser} size="lg" className="p-4 bg-slate-100 shadow rounded-full"/>
                    {isOpen && <span className="text-lg font-medium py-2 px-1">Department</span>}
                </li>

                <li className="flex items-center gap-2 px-4 cursor-pointer hover:text-blue-600"
                  onClick={() => setActiveSection("role")}
                >
                    <FontAwesomeIcon icon={faUserTie} size="lg" className="p-4 bg-slate-100 shadow rounded-full" />
                    {isOpen && <span className="text-lg font-medium py-2 px-1">Role</span>}
                </li>
            </ul>
        </aside>
    )
}

export default Aside;