import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const [counter, setCounter] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    if (counter <= 0) navigate("/");

    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [counter]);

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col justify-center items-center">
      <h1 className="text-white text-6xl font-[Mokoto] tracking-[5px]">
        Not Found
      </h1>
      <span className="text-white font-[Mokoto] tracking-[3px]">
        Redirecting in {counter}
      </span>
    </div>
  );
}
