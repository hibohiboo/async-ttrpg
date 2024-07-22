import { useEffect, useState } from 'react';
import { client } from '@pl-app/client';

import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

import './App.css';

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    (async () => {
      const res = await client.api.httpTrigger1.$get();
      console.log('rpc response', res);
      if (res.ok) {
        const responseJson = await res.json();
        console.log('response data', responseJson);
      }
    })();
  }, []);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
