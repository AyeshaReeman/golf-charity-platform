"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin() {
    console.log("Login clicked!", email, password);
    setLoading(true);
    setError("");
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("Login response:", data, error);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-black text-center mb-2">Welcome <span className="text-green-400">Back</span></h1>
        <p className="text-gray-400 text-center mb-8">Login to your GolfGives account</p>
        <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:outline-none focus:border-green-400"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:outline-none focus:border-green-400"
            />
          </div>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-green-400 text-black font-black py-3 rounded-xl hover:bg-green-300 transition text-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login →"}
          </button>
          <p className="text-center text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-green-400 hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </main>
  );
}