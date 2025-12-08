import React from 'react'

const Home = () => {
  return (
    <section className='mt-6 text-center flex flex-col justify-center items-center shadow-md rounded-b-4xl w-[80%] mx-auto p-2 bg-slate-50'>
        <h1 className='text-3xl font-bold p-2 mx-1 underline text-blue-900'>Welcome to <strong className=''>Our</strong> Grievance Management System</h1>
        <img src='Logo.png' className='w-[70%] h-96 shadow' />
        <p className='text-xl font-semibold py-1 px-2 shadow rounded-lg bg-white m-1.5'>A transparent grievance redressal platform designed to ensure that every concern is heard and addressed responsibly. This system allows individuals to submit grievances without complexity while maintaining clarity and accountability throughout the resolution process.</p>
        <p className='text-xl font-semibold py-1 px-2 shadow rounded-lg bg-white m-1.5'>Each grievance is reviewed by the appropriate department, and users can track its status in real time. Regular updates and clear visibility into progress help build trust, reduce uncertainty, and ensure that issues are handled efficiently and fairly.</p>
        <p className='text-xl font-semibold py-1 px-2 shadow rounded-lg bg-white m-1.5'>If a grievance remains unresolved, users can send timely reminders to ensure proper follow-up. By promoting transparency, accountability, and structured communication, this platform aims to deliver faster and more meaningful resolutions.</p>
    </section>
  )
}

export default Home