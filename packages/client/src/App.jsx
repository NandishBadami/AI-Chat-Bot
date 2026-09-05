import { useEffect, useState } from "react";

function App() {
  const [gotMessage, setGotMessage] = useState(false);
  const [conversationId, setConversationId] = useState(self.crypto.randomUUID());
  
  useEffect(() => {
    (async function fetchData() {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/hello`);
      const data = await res.json();
      console.log(data);
    })();
  }, []);

  async function sendPrompt() {
    document.querySelector('.errors').textContent = '';
    setGotMessage(true);
    let prompt = document.querySelector('input').value;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        conversationId
      })
    });
    
    const data = await res.json();
    if(res.status == 400) {
      console.log(data.prompt._errors[0]);
      document.querySelector('.errors').textContent = data.prompt._errors[0];
    }
    else if(res.status == 500) {
      console.log(data.error);
      document.querySelector('.errors').textContent = data.error;
    }
    else {
      console.log(data);
      const div = document.createElement('div');
      div.append(document.createElement('hr'));
      const p = document.createElement('p');
      p.innerHTML = `<b>Prompt:</b> ${prompt} <br> <b>Resonse:</b> ${data.message}`;
      div.append(p);
      div.append(document.createElement('hr'));
      div.append(document.createElement('br'));
      document.querySelector('.body').prepend(div);
      document.querySelector('input').value = '';
    }
    setGotMessage(false);
  }

  return (
   <>
    <div className="p-4">
      <p className="font-bold text-3xl">AI Chat Bot</p>
      <br />
      <p style={{color: "red"}} className="errors font-bold"></p>
      <input required type="text" placeholder="Enter Your Prompt Here" className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm outline-none transition duration-200 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 disabled:text-gray-500" />
      <br />
      <button onClick={sendPrompt} className="bg-black hover:bg-gray-800 active:scale-95 text-white px-4 py-2 rounded cursor-pointer transition">Send</button>
    </div>

    {gotMessage? 
    <>
    <div className="flex items-center space-x-1.5 p-2 bg-gray-100 rounded-lg w-max m-4">
      <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
    </div>
    </>: ''}

    <div className="body p-4">

    </div>
  </>
  )
}
export default App
