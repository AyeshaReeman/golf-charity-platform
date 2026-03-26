"use client";
import { useState, useEffect } from "react";
import { createClient } from "../lib/supabase";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users");
  const [drawResult, setDrawResult] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const supabase = createClient();

    const { data: profilesData } = await supabase
      .from("profiles")
      .select("*");

    const { data: scoresData } = await supabase
      .from("scores")
      .select("*");

    setUsers(profilesData || []);
    setScores(scoresData || []);
    setLoading(false);
  }

  function runDraw() {
    const numbers = [];
    while (numbers.length < 5) {
      const num = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(num)) numbers.push(num);
    }
    setDrawResult(numbers);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex justify-between items-center px-8 py-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-green-400">⛳ GolfGives Admin</h1>
        <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-bold">Admin Panel</span>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-12">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <p className="text-gray-400 text-sm mb-1">Total Users</p>
            <p className="text-4xl font-black text-green-400">{users.length}</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <p className="text-gray-400 text-sm mb-1">Total Scores</p>
            <p className="text-4xl font-black text-yellow-400">{scores.length}</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <p className="text-gray-400 text-sm mb-1">Prize Pool</p>
            <p className="text-4xl font-black text-blue-400">£{users.length * 10}.00</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {["users", "scores", "draw"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-bold capitalize transition ${
                activeTab === tab
                  ? "bg-green-400 text-black"
                  : "bg-zinc-800 text-white hover:bg-zinc-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left px-6 py-4 text-gray-400 font-bold">Name</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-bold">Email</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-bold">Subscription</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-bold">Charity %</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400">Loading...</td></tr>
                ) : users.length === 0 ? (
                  <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-400">No users yet</td></tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b border-zinc-800 hover:bg-zinc-800 transition">
                      <td className="px-6 py-4">{user.full_name || "—"}</td>
                      <td className="px-6 py-4 text-gray-400">{user.email || "—"}</td>
                      <td className="px-6 py-4">
                        <span className="bg-green-400/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold">
                          {user.subscription_status || "inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4">{user.charity_percentage || 10}%</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Scores Tab */}
        {activeTab === "scores" && (
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left px-6 py-4 text-gray-400 font-bold">User ID</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-bold">Score</th>
                  <th className="text-left px-6 py-4 text-gray-400 font-bold">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-400">Loading...</td></tr>
                ) : scores.length === 0 ? (
                  <tr><td colSpan="3" className="px-6 py-8 text-center text-gray-400">No scores yet</td></tr>
                ) : (
                  scores.map((score) => (
                    <tr key={score.id} className="border-b border-zinc-800 hover:bg-zinc-800 transition">
                      <td className="px-6 py-4 text-gray-400 text-sm">{score.user_id?.slice(0, 8)}...</td>
                      <td className="px-6 py-4">
                        <span className="text-2xl font-black text-green-400">{score.score}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{score.played_at}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Draw Tab */}
        {activeTab === "draw" && (
          <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
            <h3 className="text-xl font-black mb-6">Monthly Draw Engine 🎯</h3>
            <p className="text-gray-400 mb-8">Run a simulation of the monthly draw. 5 random numbers between 1-45 will be generated.</p>

            <button
              onClick={runDraw}
              className="bg-green-400 text-black font-black px-8 py-4 rounded-xl hover:bg-green-300 transition text-lg mb-8"
            >
              Run Draw Simulation 🎲
            </button>

            {drawResult && (
              <div>
                <p className="text-gray-400 mb-4">Draw Result:</p>
                <div className="flex gap-4 flex-wrap">
                  {drawResult.map((num, i) => (
                    <div key={i} className="w-16 h-16 bg-green-400 text-black rounded-full flex items-center justify-center text-2xl font-black">
                      {num}
                    </div>
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-zinc-800 p-4 rounded-xl">
                    <p className="text-yellow-400 font-black">5 Match Jackpot</p>
                    <p className="text-2xl font-black">£{(users.length * 10 * 0.4).toFixed(2)}</p>
                  </div>
                  <div className="bg-zinc-800 p-4 rounded-xl">
                    <p className="text-gray-300 font-black">4 Match Prize</p>
                    <p className="text-2xl font-black">£{(users.length * 10 * 0.35).toFixed(2)}</p>
                  </div>
                  <div className="bg-zinc-800 p-4 rounded-xl">
                    <p className="text-orange-400 font-black">3 Match Prize</p>
                    <p className="text-2xl font-black">£{(users.length * 10 * 0.25).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}