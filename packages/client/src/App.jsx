import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async function fetchData() {
      const res = await fetch('/api/hello');
      const data = await res.json();
      setMessage(data.message);
    })();
  }, []);

  return (
   <>
   <div className="p-4">
    <p className="font-bold text-3xl">{message}</p>
    <button className="bg-black hover:bg-gray-800 active:scale-95 text-white px-4 py-2 rounded cursor-pointer transition">Click Me</button>
  </div>
  </>
  )
}

export default App
