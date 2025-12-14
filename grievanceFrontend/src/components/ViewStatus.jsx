import React, { useState } from "react";
import axios from "axios";

const ViewStatus = () => {
  const [grievanceNo, setGrievanceNo] = useState("");
  const [grievance, setGrievance] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setGrievance(null);

    if (!grievanceNo.trim()) {
      setError("Please enter your grievance number");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5001/api/viewStatus",
        { params: { grievanceNo } }
      );

      setGrievance(response.data.grievance);
    } catch (err) {
      setError(err.response?.data?.message || "Grievance not found");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Check Grievance Status
        </h1>

        {/* Error */}
        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Grievance Number
            </label>
            <input
              type="text"
              value={grievanceNo}
              onChange={(e) => setGrievanceNo(e.target.value)}
              placeholder="Enter your grievance number"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {/* Result */}
        {grievance && (
          <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">
              Grievance Details
            </h2>

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Grievance No:</span>{" "}
                {grievance.grievanceNo}
              </p>
              <p>
                <span className="font-medium">Description:</span>{" "}
                {grievance.description}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                <span
                  className={`px-2 py-1 rounded text-white text-xs
                    ${
                      grievance.status === "Pending"
                        ? "bg-yellow-500"
                        : grievance.status === "Resolved"
                        ? "bg-green-600"
                        : "bg-gray-500"
                    }
                  `}
                >
                  {grievance.status}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStatus;