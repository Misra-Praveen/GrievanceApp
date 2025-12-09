const RegisterGrievance = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <form className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-3 space-y-8">

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
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium mb-1">Gender</label>
              <div className="flex gap-6 bg-gray-50 border rounded-lg p-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" /> Male
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" /> Female
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" /> Other
                </label>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Mobile Number</label>
              <input
                type="text"
                placeholder="10 digit mobile number"
                maxLength="10"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <select className="w-full border rounded-lg px-4 py-2 bg-white">
                <option>India</option>
                <option>USA</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select className="w-full border rounded-lg px-4 py-2 bg-white">
                <option>Uttar Pradesh</option>
                <option>Delhi</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                placeholder="Enter city"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Pincode</label>
              <input
                type="text"
                placeholder="6 digit pincode"
                maxLength="6"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                placeholder="Enter full address"
                className="w-full border rounded-lg px-4 py-2"
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

            <div>
              <label className="block text-sm font-medium mb-1">
                Grievance No
              </label>
              <input
                type="text"
                disabled
                className="w-full bg-gray-200 border rounded-lg px-4 py-2 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Grievance Category
              </label>
              <select className="w-full border rounded-lg px-4 py-2 bg-white">
                <option>Select category</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">
                Grievance Description
              </label>
              <textarea
                rows="4"
                placeholder="Describe your grievance..."
                className="w-full border rounded-lg px-4 py-2"
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
