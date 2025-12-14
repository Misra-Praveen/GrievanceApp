import axios from "axios";
import { useEffect, useState } from "react";
import countryStateData from "../utils/countryStateData.js";

const RegisterGrievance = () => {
  const [form, setForm] = useState({
    name:"", 
    email:"", 
    gender:"", 
    mobile_No:"", 
    country:"", 
    state:"", 
    city:"", 
    pincode:"", 
    address:"", 
    category:"", 
    description:"" 
  });
  const [categorys, setCategorys]=useState([]);
  const [states, setStates] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");


  useEffect(()=>{
   
    const fetchCategory = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/department")
        const data = response.data.department
        //console.log(data)
        setCategorys(data);
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchCategory();
    
  },[])

  useEffect(() => {
    if (form.country) {
      const country = countryStateData.find(
        (c) => c.country === form.country
      );
      setStates(country ? country.states : []);
      setForm(prev => ({ ...prev, state: "" }));
    } else {
      setStates([]);
    }
  }, [form.country]);

  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(!form.email.includes("@") || !form.email.endsWith(".com")){
      alert("Please enter a valid email id")
      return;
    }

    if(!/^\d{10}$/.test(form.mobile_No)){
      alert("Please enter a 10 digit mobile number")
      return;
    }
    if(!/^\d{6}$/.test(form.pincode)){
      alert("Please enter a 6 digit pincode")
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/registerGrievance", {...form})
      //console.log("response data " , response.data)
      //alert("Your Grievance Registered Successfully")
      setSuccessMsg(`Your grievance number is ${response.data.grievanceNo}. This message will disappear after 1 minute.` || "Grievance submitted successfully");
      setTimeout(() => {
        setSuccessMsg("");
      }, 60000);
      
    } catch (error) {
      console.log(error.message)
    }
    setForm({
        name:"", 
        email:"", 
        gender:"", 
        mobile_No:"", 
        country:"", 
        state:"", 
        city:"", 
        pincode:"", 
        address:"", 
        category:"", 
        description:"" 
    });
    setStates([]);
  }



  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {successMsg && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white text-green-700 px-6 py-4 rounded-xl shadow-xl text-center w-[90%] max-w-md">
            <h3 className="text-lg font-semibold mb-2">Success</h3>
            <p>{successMsg}</p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-3 space-y-8">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-gray-700 border-b pb-3">
          Register Grievance
        </h2>

        {/* PERSONAL DETAILS */}
        <fieldset className="border p-3 rounded-xl">
          <legend className="font-semibold text-gray-600 mb-4 mx-2">
            Personal Details
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e)=>setForm({...form, name: e.target.value})}
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>


            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e)=>setForm({...form, email: e.target.value})}
                placeholder="example@email.com"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mobile Number</label>
              <input
                type="text"
                value={form.mobile_No}
                onChange={(e)=>setForm({...form, mobile_No: e.target.value})}
                placeholder="10 digit mobile number"
                maxLength="10"
                minLength="10"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium mb-1">Gender</label>
              <div className="flex gap-6 bg-gray-50 border rounded-lg p-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" value="M" 
                  checked={form.gender === "M"}
                  onChange={(e)=>setForm({...form, gender: e.target.value})}/> Male
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" value="F"
                  checked={form.gender === "F"}
                  onChange={(e)=>setForm({...form, gender: e.target.value})}/> Female
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" value="O" 
                  checked={form.gender === "O"}
                  onChange={(e)=>setForm({...form, gender: e.target.value})} /> Other
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select 
              value={form.country}
              onChange={(e)=>setForm({...form, country: e.target.value})}
              required
              className="w-full border rounded-lg px-4 py-2 bg-white">
                <option value="">---- Select Country ----</option>
                {countryStateData.map((c)=>{
                  return (<option key={c.countryCode} value={c.country}>{c.country}</option>)
                })}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select 
              value={form.state}
              onChange={(e)=>setForm({...form, state: e.target.value})}
              required
              className="w-full border rounded-lg px-4 py-2 bg-white">
                <option value="">---- Select State ----</option>
                {states.map((s)=>{
                  return (<option key={s.code} value={s.name}>{s.name}</option>)
                })}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                value={form.city}
                onChange={(e)=>setForm({...form, city: e.target.value})}
                placeholder="Enter city"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Pincode</label>
              <input
                type="text"
                value={form.pincode}
                onChange={(e)=>setForm({...form, pincode: e.target.value})}
                placeholder="6 digit pincode"
                maxLength="6"
                minLength="6"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e)=>setForm({...form, address: e.target.value})}
                placeholder="Enter full address"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

          </div>
        </fieldset>

        {/* GRIEVANCE DETAILS */}
        <fieldset className="bg-gray-50 rounded-xl p-5 border">
          <legend className="text-lg font-semibold text-gray-600 mb-4">
            Grievance Details
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* <div>
              <label className="block text-sm font-medium mb-1">
                Grievance No
              </label>
              <input
                type="text"
                disabled
                className="w-full bg-gray-200 border rounded-lg px-4 py-2 cursor-not-allowed"
              />
            </div> */}

            <div>
              <label className="block text-sm font-medium mb-1">
                Grievance Category
              </label>
              <select 
              value={form.category}
              onChange={(e)=>setForm({...form, category: e.target.value})}
              className="w-full border bg-slate-100 rounded-lg mb-1 px-4 py-2 outline-none"
              required >
                <option value="">---- Select category ----</option>
                {categorys.map((cat)=>{
                  return (<option key={cat._id} value={cat._id}>{cat.name}</option>)
                })}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Grievance Description
              </label>
              <textarea
                value={form.description}
                onChange={(e)=>setForm({...form, description: e.target.value})}
                rows="4"
                placeholder="Describe your grievance..."
                className="w-full border rounded-lg px-4 py-2"
                required
              ></textarea>
            </div>

          </div>
        </fieldset>

        {/* SUBMIT */}
        <div className="md:flex md:justify-end">
          <button
            type="submit"
            className="bg-blue-600 w-full lg:w-52 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Grievance
          </button>
        </div>

      </form>
    </div>
  );
};

export default RegisterGrievance;
