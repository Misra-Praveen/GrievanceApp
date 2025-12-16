import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBuildingUser, faUserTie } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const Aside = ({ setActiveSection })=>{
    const [isOpen, setIsOpen] = useState(false)
    return (
        <aside 
          className="fixed right-0 content-center top-16 h-16 lg:top-13 lg:h-32 bg-white rounded-l-4xl transition-all duration-300"
          onMouseEnter={()=>setIsOpen(true)}
          onMouseLeave={()=>setIsOpen(false)}
        >
            <ul className="flex lg:block space-y-2">
                <li className="flex justify-center items-center gap-2 pl-2 pt-0.5 cursor-pointer hover:text-blue-600"
                  onClick={() => setActiveSection("department")}
                >
                    <FontAwesomeIcon icon={faBuildingUser} size="lg" className="p-2 bg-slate-200 shadow rounded-full"/>
                    {isOpen && <span className="text-lg font-medium py-0.5 px-1">Department</span>}
                </li>

                <li className="flex items-center gap-2 pl-2 pb-0.5 cursor-pointer hover:text-blue-600"
                  onClick={() => setActiveSection("role")}
                >
                    <FontAwesomeIcon icon={faUserTie} size="lg" className="p-2 bg-slate-200 shadow rounded-full" />
                    {isOpen && <span className="text-lg font-medium py-0.5 px-1">Role</span>}
                </li>
            </ul>
        </aside>
    )
}

export default Aside;