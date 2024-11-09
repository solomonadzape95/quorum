import { useState } from 'react';
import { quorum_backend } from 'declarations/quorum_backend';

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    quorum_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <main className='w-full h-screen flex items-center justify-center'>
        <button className='rounded-full bg-blue-500 p-2 text-white  text-sm
        '>Click me</button>
    </main>
  );
}

export default App;
