"use client";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/buildresume");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={handleClick} className="bg-blue-400 text-black p-5 rounded-3xl text-3xl">
        Build Your Resume Now
      </button>
    </div>
  );
}
