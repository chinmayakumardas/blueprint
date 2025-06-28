


// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// export default function HomePage() {
//   const router = useRouter();

//   return (
//     <div className="relative min-h-screen flex flex-col text-white bg-black overflow-hidden">
//       {/* Background Gradient Base */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-[#1a1a1a] z-0" />

//       {/* Floating Glow Elements using Framer Motion */}
//       <motion.div
//         className="absolute w-96 h-96 bg-purple-700 rounded-full opacity-20 blur-3xl"
//         animate={{ x: [0, 200, -200, 0], y: [0, -100, 100, 0] }}
//         transition={{
//           duration: 30,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />
//       <motion.div
//         className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600 rounded-full opacity-10 blur-2xl"
//         animate={{ x: [0, -150, 150, 0], y: [0, 100, -100, 0] }}
//         transition={{
//           duration: 40,
//           repeat: Infinity,
//           ease: "easeInOut",
//         }}
//       />

//       {/* Header */}
//       <header className="w-full flex justify-center mt-6 px-4 relative z-10">
//         <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-full flex items-center justify-between w-full max-w-6xl backdrop-blur-md">
//           <div className="text-xl font-bold tracking-tight">BluePrint</div>
//           <div className="flex gap-3">
//             <button
//               onClick={() => router.push("/login")}
//               className="text-sm text-white px-4 py-2 bg-transparent border border-white/20 hover:bg-white/10 rounded-md transition-all"
//             >
//               Login
//             </button>
//             <button
//               onClick={() => router.push("/signup")}
//               className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all"
//             >
//               Get Started
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-6 mt-16 relative z-10">
//         <section className="text-center max-w-4xl mb-16">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
//             Simplify Your <span className="text-blue-500">Team Workflow</span><br />
//             with <span className="text-purple-500">BluePrint</span>
//           </h1>
//           <p className="text-gray-400 text-lg sm:text-xl mt-6">
//             The ultimate project management platform for modern teams — plan, track, and execute with confidence.
//           </p>

//           <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
//             <button
//               onClick={() => router.push("/signup")}
//               className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-md shadow-md transition-all flex items-center justify-center"
//             >
//               Get Started
//               <ArrowRight className="ml-2 h-5 w-5" />
//             </button>
//             <button
//               onClick={() => router.push("/demo")}
//               className="px-6 py-3 border border-white/20 text-white bg-transparent rounded-md text-lg font-medium hover:bg-white/10 transition-all"
//             >
//               Watch Demo
//             </button>
//           </div>
//         </section>

//         {/* Image Section */}
//         <section className="w-full px-4 mb-24 max-w-6xl">
//           <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/10">
//             <Image
//               src="/images/linear-bgg.svg"
//               alt="App Interface Preview"
//               fill
//               className="object-contain"
//               priority
//             />
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="text-center text-sm text-gray-400 py-6 px-4 relative z-10">
//         © 2025 BluePrint — All rights reserved.
//       </footer>
//     </div>
//   );
// }





"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex flex-col text-black bg-white overflow-hidden">
      {/* Light Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-neutral-100 to-gray-50 z-0" />

      {/* Light Motion Blobs */}
      <motion.div
        className="absolute w-96 h-96 bg-sky-200 rounded-full opacity-30 blur-3xl"
        animate={{ x: [0, 200, -200, 0], y: [0, -100, 100, 0] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-100 rounded-full opacity-20 blur-2xl"
        animate={{ x: [0, -150, 150, 0], y: [0, 100, -100, 0] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Header */}
      <header className="w-full flex justify-center mt-6 px-4 relative z-10">
        <div className="bg-white/60 border border-black/10 px-6 py-3 rounded-xl flex items-center justify-between w-full max-w-6xl backdrop-blur-md shadow-sm">
          <div className="text-xl font-bold tracking-tight">BluePrint</div>
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/login")}
              className="text-sm text-black px-4 py-2 bg-transparent border border-black/10 hover:bg-black/5 rounded-md transition-all cursor-pointer shadow-md"
            >
              Login
            </button>
            <button
              onClick={() => router.push("/login")}
              className="text-sm px-4 py-2 bg-black hover:bg-gray-900 text-white rounded-md transition-all cursor-pointer shadow-md flex items-center justify-center"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 px-4 sm:px-6 mt-16 relative z-10">
        <section className="text-center max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-300 text-sm font-medium">
                <Zap className="w-4 h-4" />
                Next-Gen Project Management
              </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Simplify Your <span className="text-blue-600">Team Workflow</span><br />
            with <span className="text-purple-600">BluePrint</span>
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl mt-6">
            The ultimate project management platform for modern teams — plan, track, and execute with confidence.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-3 bg-black hover:bg-gray-900 text-white text-lg font-medium rounded-md  transition-all cursor-pointer shadow-md flex items-center justify-center"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-3 border border-black/10 text-black bg-white rounded-md cursor-pointer shadow-md text-lg font-medium hover:bg-black/5 transition-all"
            >
              Watch Demo
            </button>
          </div>
        </section>

        {/* Image Section */}
        <section className="w-full px-4 mb-24 max-w-6xl">
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-black/10 shadow-sm">
            <Image
              src="/images/linear-bgg.svg"
              alt="App Interface Preview"
              fill
              className="object-contain bg-black"
              priority
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-md font-medium text-gray-500 py-6 px-4 relative z-10">
        © 2025 BluePrint — All rights reserved.
      </footer>
    </div>
  );
}
