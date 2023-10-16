import { useCallback, useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // useRef hook
  const passwordRef = useRef(null);

  // function to generate password
  const passwordGenerator = useCallback(() => {
    let pass = '';

    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numbersAllowed) str += '0123456789';

    if (specialCharAllowed) str += '!@#$%^&*()_+}{[]~`';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomIndex);
    }

    setPassword(pass);
  }, [length, numbersAllowed, specialCharAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, specialCharAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    const passRef = passwordRef.current;
    passRef?.select();

    navigator.clipboard.writeText(password);

    // note: if you want to select limited password length
    // passRef?.setSelectionRange(0, 15); // to see only
    // navigator.clipboard.writeText(password.slice(0, 15));
  }, [password]);

  return (
    <div className="flex justify-center items-center h-screen  bg-green-200 ">

      <main className=" bg-green-400   text-white w-full mx-auto max-w-lg before:shadow-lg px-5 rounded-md h-2/6">
        <h1 className="text-white mt-5 text-center text-2xl">Password Generator</h1>

        <div className="flex mt-4 shadow rounded-lg overflow-hidden py-4 text-orange-400 ">
          <input
            type="text"
            className="outline-none w-full py-1 px-3 rounded-s-lg"
            placeholder="Password"
            readOnly
            value={password}
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5  shrink-0 rounded-e-lg hover:bg-blue-500"
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm mt-6 gap-x-2 pb-3">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              id="length"
              className="cursor-pointer"
              min={8}
              max={50}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numbers"
              className="cursor-pointer"
              defaultChecked={numbersAllowed}
              onChange={() => setNumbersAllowed((prev) => !prev)}
            />
            <label htmlFor="numbers">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="chars"
              className="cursor-pointer"
              defaultChecked={specialCharAllowed}
              onChange={() => setSpecialCharAllowed((prev) => !prev)}
            />
            <label htmlFor="chars">Special chars</label>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
