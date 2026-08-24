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

  return <p>{message}</p>
}

export default App
