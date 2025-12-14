import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import {faHouse, faRegistered} from '@fortawesome/free-solid-svg-icons'
import {faHouse, faRegistered, faUser, faEye, faPaperPlane} from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'


const Header = () => {
    const {user, logout} = useAuth();
  return (
    <div className='mt-2 py-1 flex justify-around shadow-md shadow-amber-200 items-center'>
        <img src='logo.jpeg' alt='Logo' className='w-30 h-18 rounded-4xl' />
        <ul className='flex justify-end items-center gap-4 w-[70%] p-2'>
            <li className='shadow-md shadow-gray-300 p-2 mx-2 rounded-xl bg-gray-600 text-white font-semibold'>
                <Link to='/' className='flex items-center cursor-pointer'>
                    <FontAwesomeIcon icon={faHouse} />
                    <span className='mx-1.5'>Home</span>
                </Link>
            </li>
            <li className='shadow-md shadow-gray-300 p-2 mx-2 rounded-xl bg-gray-600 text-white font-semibold'>
                <Link to='/registerGrievance' className='flex items-center cursor-pointer'>
                    <FontAwesomeIcon icon={faRegistered} />
                    <span className='mx-1.5'>Register Grievance</span>
                </Link>
            </li>
            <li className='shadow-md shadow-gray-300 p-2 mx-2 rounded-xl bg-gray-600 text-white font-semibold'>
                <Link to='/sendReminder' className='flex items-center cursor-pointer'>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    <span className='mx-1.5'>Send Reminder</span>
                </Link>
            </li>
            <li className='shadow-md shadow-gray-300 p-2 mx-2 rounded-xl bg-gray-600 text-white font-semibold'>
                <Link to='/viewStatus' className='flex items-center cursor-pointer'>
                    <FontAwesomeIcon icon={faEye} />
                <span className='mx-1.5'>View Status</span>
                </Link>
            </li>
            { user ? (
                <>
                    <FontAwesomeIcon icon={faUserTie} />
                    {user.userName}
                    <Link to='/login' >
                        <button onClick={logout} 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 
                        rounded focus:outline-none focus:shadow-outline" type="button">
                        Logout
                        </button>
                    </Link>
                </>
                ) : (
                    <li className='shadow-md shadow-gray-300 p-2 mx-2 rounded-xl bg-gray-600 text-white font-semibold'>
                        <Link to='/login' className='flex items-center cursor-pointer'>
                        <FontAwesomeIcon icon={faUser} />
                    <span className='mx-1.5'>Admin</span>
                </Link>
            </li>)
}
        </ul>
    </div>
  )
}

export default Header;