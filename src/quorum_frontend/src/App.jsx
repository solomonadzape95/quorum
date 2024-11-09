import { useState } from 'react';
import { quorum_backend } from 'declarations/quorum_backend';
import Header from './components/landingPage/Header';

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
    <main className='w-full'>
        <Header/>
        <main className="w-full">
            <section className="py-12 w-full max-h-[80vh] overflow-hidden bg-black">
                <img src="/Images/lines.svg" alt="lines" className='w-full h-full' />
                <h1></h1>
            </section>
        </main>
    </main>
  );
}

export default App;
