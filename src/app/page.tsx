import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-[80vh] sm:min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 flex flex-col items-center justify-center text-center px-6">
      {/* Hero Text */}
      <h1 className="text-5xl sm:text-6xl font-poppins font-semibold text-white drop-shadow-lg mb-6 animate-fadeIn">
        Welcome to <span className="text-yellow-300 ">Your Dashboard</span>
      </h1>

      <p className="text-lg sm:text-xl font-poppins text-white/95 mb-10 max-w-xl bg-black/20 backdrop-blur-sm p-4 rounded-lg animate-fadeIn animate-delay-200">
        Explore and manage your{" "}
        <span className="text-yellow-300 font-semibold">products</span>{" "}
        effortlessly. View a{" "}
        <span className="text-yellow-300 font-semibold">paginated table</span>{" "}
        with the latest products first, sort by{" "}
        <span className="text-yellow-300 font-semibold">
          price, stock, or name
        </span>
        , and filter by{" "}
        <span className="text-yellow-300 font-semibold">
          category or status
        </span>
        .
        <span className="text-yellow-300 font-semibold">
          interactive UI enhancements
        </span>{" "}
        for a seamless experience.
      </p>

      {/* Animated Button */}
      <Link
        href="/products"
        className="relative group rounded-3xl overflow-hidden px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
      >
        <span className="relative z-10">🚀 View Dashboard</span>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-70 blur-xl transition duration-500"></div>
      </Link>
    </div>
  );
}
