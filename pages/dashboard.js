
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STATUSES = [
  "Working",
  "In Office",
  "In Gym",
  "Sleeping",
  "Available",
  "Driving"
];

export default function Dashboard() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, []);

  const updateStatus = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("https://atulstatusserver.vercel.app/api/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ currentStatus: status })
    });

    if (res.ok) {
      setMessage("Status updated successfully ✅");
    } else {
      setMessage("Unauthorized ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Update Your Status</h1>

        <select
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select status</option>
          {STATUSES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <button
          onClick={updateStatus}
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          Update Status
        </button>

        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
}
