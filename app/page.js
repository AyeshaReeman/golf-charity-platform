import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold text-green-400">⛳ GolfGives</h1>
        <div className="flex gap-4">
          <Link href="/admin" className="text-gray-400 hover:text-white transition text-sm">Admin</Link>
          <Link href="/login" className="text-white hover:text-green-400 transition">Login</Link>
          <Link href="/signup" className="bg-green-400 text-black px-4 py-2 rounded-full font-bold hover:bg-green-300 transition">Join Now</Link>
        </div>
      </nav>
      <section className="flex flex-col items-center justify-center text-center px-4 py-32">
        <span className="bg-green-400 text-black text-sm font-bold px-4 py-1 rounded-full mb-6">Golf. Win. Give Back.</span>
        <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          Play Golf.<br />
          <span className="text-green-400">Change Lives.</span>
        </h2>
        <p className="text-gray-400 text-xl max-w-2xl mb-10">
          Subscribe, enter your scores, win monthly prizes — and automatically donate to a charity you believe in.
        </p>
        <Link href="/signup" className="bg-green-400 text-black text-xl font-black px-10 py-4 rounded-full hover:bg-green-300 transition">
          Start Playing & Giving →
        </Link>
      </section>
      <section className="px-8 py-20 bg-zinc-900">
        <h3 className="text-center text-3xl font-black mb-12">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { step: "01", title: "Subscribe", desc: "Choose a monthly or yearly plan and join the community." },
            { step: "02", title: "Enter Scores", desc: "Log your last 5 Stableford golf scores after each round." },
            { step: "03", title: "Win & Give", desc: "Get entered into monthly draws and donate to your chosen charity." },
          ].map((item) => (
            <div key={item.step} className="bg-black p-8 rounded-2xl border border-zinc-800">
              <span className="text-green-400 text-4xl font-black">{item.step}</span>
              <h4 className="text-xl font-bold mt-4 mb-2">{item.title}</h4>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="px-8 py-20">
        <h3 className="text-center text-3xl font-black mb-12">Monthly Prize Pool</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { match: "5 Number Match", share: "40%", label: "Jackpot 🏆", color: "text-yellow-400" },
            { match: "4 Number Match", share: "35%", label: "2nd Prize 🥈", color: "text-gray-300" },
            { match: "3 Number Match", share: "25%", label: "3rd Prize 🥉", color: "text-orange-400" },
          ].map((item) => (
            <div key={item.match} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 text-center">
              <span className={`text-4xl font-black ${item.color}`}>{item.share}</span>
              <h4 className="text-xl font-bold mt-4 mb-2">{item.match}</h4>
              <p className="text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="px-8 py-20 bg-green-400 text-black text-center">
        <h3 className="text-4xl font-black mb-4">Ready to Make Your Game Matter?</h3>
        <p className="text-xl mb-8">Join hundreds of golfers already winning and giving back.</p>
        <Link href="/signup" className="bg-black text-white text-xl font-black px-10 py-4 rounded-full hover:bg-zinc-800 transition">
          Subscribe Now →
        </Link>
      </section>
      <footer className="px-8 py-8 text-center text-gray-500 bg-black">
        <p>© 2026 GolfGives. All rights reserved.</p>
      </footer>
    </main>
  );
}
