import './App.css';
import divisorDesktop from './assets/pattern-divider-desktop.svg';
import divisorMobile from './assets/pattern-divider-mobile.svg';
import dice from './assets/icon-dice.svg';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface Data {
  advice: string;
  id: number;
}

async function getApi(): Promise<Data>{
  const response = await axios.get('https://api.adviceslip.com/advice');
  return await response.data.slip
}

export function App() {
  const [ advice, setAdvice ] = useState<string>('');
  const [ adviceId, setAdviceId ] = useState<number>(0);

  async function fetchData(){
    const data: Data = await getApi();
    setAdvice(data.advice);
    setAdviceId(data.id);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <>
      <main className="main">
        <div className="flex-container">
          <h1 className='advice-id'>advice #{adviceId}</h1>
          <p id="advice">"{advice}"</p>
          <picture>
            <source src={divisorMobile} media="(min-width:600px)" />
            <img src={divisorDesktop} alt="line space" className="line-space" />
          </picture>
          <div className="div-for-position-button">
            <button id="diceButton" onClick={fetchData}>
              <img src={dice} alt="dice" />
            </button>
          </div>
        </div>
      </main>
    </>
  )
}