"use client";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "../lib/supabase";

export default function DashboardPage() {
  const [scores, setScores] = useState(["", "", "", "", ""]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function updateScore(index, value) {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  }

  async function saveScores() {
    setSaving(true);
    setMessage("");
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Please login first!");
      setSaving(false);
      return;
    }

    // Delete old scores first
    await supabase.from("scores").delete().eq("user_id", user.id);

    // Insert new scores
    const scoreData = scores
      .filter(s => s !== "")
      .map(s => ({
        user_id: user.id,
        score: parseInt(s),
        played_at: new Date().toISOString().split("T")[0]
      }));

    const { error } = await supabase.from("scores").insert(scoreData);

    if (error) {
      setMessage("Error saving scores: " + error.message);
    } else {
      setMessage("Scores saved successfully! ✅");
    }
    setSaving(false);
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex justify-between items-center px-8 py-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-green-400">⛳ GolfGives</h1>
        <Link href="/" className="text-gray-400 hover:text-white transition">Logout</Link>
      </nav>
      <div className="max-w-5xl mx-auto px-8 py-12">
        <h2 className="text-3xl font-black mb-2">Welcome back! 👋</h2>
        <p className="text-gray-400 mb-10">Here's your GolfGives dashboard</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <p className="text-gray-400 text-sm mb-1">Subscription</p>
            <p className="text-2xl font-black text-green-400">Active ✅</p>
            <p className="text-gray-500 text-sm mt-1">Monthly Plan</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <p className="text-gray-400 text-sm mb-1">Total Winnings</p>
            <p className="text-2xl font-black text-yellow-400">£0.00</p>
            <p className="text-gray-500 text-sm mt-1">No wins yet</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
            <p className="text-gray-400 text-sm mb-1">Charity Donated</p>
            <p className="text-2xl font-black text-blue-400">£0.00</p>
            <p className="text-gray-500 text-sm mt-1">10% of subscription</p>
          </div>
        </div>
        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 mb-6">
          <h3 className="text-xl font-black mb-6">My Golf Scores 🏌️</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {scores.map((score, i) => (
              <div key={i} className="text-center">
                <p className="text-gray-400 text-sm mb-2">Score {i + 1}</p>
                <input
                  type="number"
                  min="1"
                  max="45"
                  value={score}
                  onChange={(e) => updateScore(i, e.target.value)}
                  placeholder="--"
                  className="w-full bg-zinc-800 text-white text-center text-xl font-black px-4 py-4 rounded-xl border border-zinc-700 focus:outline-none focus:border-green-400"
                />
              </div>
            ))}
          </div>
          {message && (
            <div className="mt-4 text-green-400 font-bold">{message}</div>
          )}
          <button
            onClick={saveScores}
            disabled={saving}
            className="mt-6 bg-green-400 text-black font-black px-8 py-3 rounded-xl hover:bg-green-300 transition disabled:opacity-50">
            {saving ? "Saving..." : "Save Scores →"}
          </button>
        </div>
        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
          <h3 className="text-xl font-black mb-4">Next Draw 🎯</h3>
          <p className="text-gray-400">Next monthly draw: <span className="text-white font-bold">April 1, 2026</span></p>
          <p className="text-gray-400 mt-2">Your status: <span className="text-green-400 font-bold">Entered ✅</span></p>
        </div>
      </div>
    </main>
  );
}