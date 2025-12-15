
import { useEffect, useState } from "react";

const statusGifMap = {
  Working: "/gifs/working.gif",
  "In Office": "/gifs/office.gif",
  "In Gym": "/gifs/gym.gif",
  Sleeping: "/gifs/sleeping.gif",
  Available: "/gifs/available.gif",
  Driving: "/gifs/driving.gif"
};

const emojiMap = {
  Working: "💻",
  "In Office": "🏢",
  "In Gym": "🏋️",
  Sleeping: "😴",
  Available: "✅",
  Driving: "🚗"
};

export default function Home() {
  const [status, setStatus] = useState("Available");

  useEffect(() => {
    fetch("https://atulstatusserver.vercel.app/api/status")
      .then(res => res.json())
      .then(data => {
        setStatus(data?.currentStatus || "Available");
      });
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">

      {/* Dynamic GIF */}
      <img
        src={statusGifMap[status]}
        alt={status}
        className="w-72 h-72 object-contain mb-6"
      />

      <p className="text-3xl font-bold text-gray-900">
        Atul is currently
      </p>

      <p className="text-4xl font-extrabold text-purple-700 mt-2">
        {status} {emojiMap[status]}
      </p>

    </div>
  );
}
