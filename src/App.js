import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { COPY_Fail, COPY_SUCCESS } from "./message";
import {
  numbers,
  upperCaseLetters,
  lowerCaseLetters,
  specialCharacters,
} from "./characters";
import "./App.css";

function App() {
  const [password, setPassword] = useState();
  const [passwordLength, setPasswordLength] = useState(26);
  const [upperCase, setUppercase] = useState(false);
  const [lowerCase, setLowercase] = useState(false);
  const [number, setNumber] = useState(false);
  const [symbols, setSymbols] = useState(false);

  console.log(passwordLength);

  function handlePasswordGenerator() {
    if (!upperCase && !lowerCase && !number && !symbols) {
      notify("you need to select at least one check box", true);
    } else {
      let characterList = "";
      if (number) {
        characterList = characterList + numbers;
      }
      if (upperCase) {
        characterList = characterList + upperCaseLetters;
      }
      if (lowerCase) {
        characterList = characterList + lowerCaseLetters;
      }
      if (symbols) {
        characterList = characterList + specialCharacters;
      }
      setPassword(createPassword(characterList));
      notify("Password is generated successfully", false);
    }
  }
  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password);
  };

  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const handleCopyPassword = (e) => {
    if (password === "") {
      notify(COPY_Fail, true);
    } else {
      copyToClipboard(password);
      notify(COPY_SUCCESS, false);
    }
  };

  const min = 8;
  const max = 26;

  const handleInputNumber = (event) => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setPasswordLength(value);
  };

  return (
    <div className="App">
      <div className="generator">
        <h2 className="generator_heading"> Password Generator</h2>
        <div className="generator_password">
          <h3>{password}</h3>
          <div className="clipboard">
            <i onClick={handleCopyPassword} className="far fa-clipboard"></i>
          </div>
        </div>
        <div className="form">
          <label htmlFor="password-length">Password Length</label>
          <input
            type="number"
            id="password-length"
            Value={passwordLength}
            onChange={handleInputNumber}
            name="password-length"
            max="26"
            min="8"
          />
        </div>
        <div className="form">
          <label htmlFor="uppercase_letter">Add Uppercase letter</label>
          <input
            defaultvalue={24}
            type="checkbox"
            id="uppercase_letter"
            onChange={(e) => setUppercase(e.target.checked)}
            name="uppercase_letter"
          />
        </div>
        <div className="form">
          <label htmlFor="lowercase_letter">Add Lowercase letter</label>
          <input
            type="checkbox"
            id="lowercase_letter"
            name="lowercase_letter"
            onChange={(e) => setLowercase(e.target.checked)}
          />
        </div>
        <div className="form">
          <label htmlFor="number">Add Number</label>
          <input
            type="checkbox"
            id="number"
            name="number"
            onChange={(e) => setNumber(e.target.checked)}
          />
        </div>
        <div className="form">
          <label htmlFor="symbols">Include Symbols</label>
          <input
            type="checkbox"
            id="symbols"
            name="symbols"
            onChange={(e) => setSymbols(e.target.checked)}
          />
        </div>
        <button onClick={handlePasswordGenerator} className="generator_btn">
          Generate Password
        </button>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
