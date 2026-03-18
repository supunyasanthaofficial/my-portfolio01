// 'use client';

// import { Sandpack } from "@codesandbox/sandpack-react";
// import { monokaiPro } from "@codesandbox/sandpack-themes";

// export default function CodePlayground() {
//   return (
//     <div className="py-20 px-4 md:px-20 bg-[#050505]">
//       <div className="max-w-6xl mx-auto">
//         <div className="mb-10">
//           <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">
//             Live <span className="text-blue-600">Playground</span>
//           </h2>
//           <p className="text-zinc-500 mt-2 font-mono uppercase tracking-widest text-xs">
//             Try some React code right here
//           </p>
//         </div>

//         <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
//           <Sandpack
//             template="react"
//             theme={monokaiPro}
//             options={{
//               showNavigator: true,
//               editorHeight: 400,
//               showLineNumbers: true,
//               externalResources: ["https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"]
//             }}
//             files={{
//               "/App.js": `export default function App() {
//   return (
//     <div className="p-8 bg-zinc-900 text-white h-screen flex flex-col items-center justify-center text-center">
//       <h1 className="text-4xl font-bold text-blue-500 mb-4 animate-bounce">
//         Hello from Supun's Site! 🚀
//       </h1>
//       <p className="text-zinc-400">
//         You can edit this code and see the changes instantly.
//       </p>
//       <button
//         onClick={() => alert("Keep Coding!")}
//         className="mt-6 bg-blue-600 px-6 py-2 rounded-full font-bold"
//       >
//         Click Me
//       </button>
//     </div>
//   );
// }`,
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
