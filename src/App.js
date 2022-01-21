import "./App.css";
import {useEffect, useState } from "react";

// const theme = createTheme({
//   palette: {
//     type: "dark",
//   },
// });


const App = () => {


  // function toggleMenu() {
  //   const menu = document.getElementById("mobileNavContainer")!;
  //   menu.classList.toggle("open-menu");
  //   console.log("pressed");
  // }

  const [toggleMenu, setToggleMenu] = useState(false)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {

    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', changeWidth)

    return () => {
      window.removeEventListener('resize', changeWidth)
    }

  }, [])

  const [inputValue, setInputValue] = useState(1000);
  const [currSol, setCurrSol] = useState(1);
  const [currJackpot, setCurrJackpot] = useState(1);
  const [solMarket, setSolMarket] = useState(1);

  // const onInputChange = (event) => {
  //   const { value } = event.target;
  //   setInputValue(value);
  // };

  const lamportValue = 0.000000001

  // Scroll to Top
  const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  const calculations = [
    {
      title: "Jackpot",
      multiplier: 0.47,
      value: currJackpot,
    },
    {
      title: "1st Daily Winner (20%)",
      multiplier: 0.2,
      value: 0,
    },
    {
      title: "2nd Daily Winner (10%):",
      multiplier: 0.11,
      value: 0,
    },
    // {
    //   title: "4th-10th Winners (1% each):",
    //   multiplier: 0.001,
    // },
    {
      title: "Total HSL Holders (20%):",
      multiplier: 0.2,
      value: 0,
    },
    {
      title: "Team (3%):",
      multiplier: 0.03,
      value: 0,
    },
  ]

  const questions = [
    {
      title: "How many lotto tickets can I buy?",
      answer: "Unlimited per person. Unfortunately, right now you need to mint one ticket at a time.",
    },
    {
      title: "When will Lotto take place?",
      answer: "Every week and everyday from Monday to Saturday. You can mint tickets to lotto from 8am to 8pm UTC.",
    },
  ]

  // NFT Giveaway
  const tickets_needed = 250;
  

  return (
    <main>
      <nav>
        <div className="nav-responsive">
          <div className="logo" onClick={() => topFunction()}>
            <p>Heavens Sevens Lotto</p>
          </div>
          <div className="nav-burger" onClick={() => setToggleMenu(!toggleMenu)}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        {(toggleMenu || screenWidth > 1300) && (
          <div className="nav-links">
            <a href="#about" className="nav-link nav-item" onClick={() => setToggleMenu(!toggleMenu)}>About Us</a>
            <a href="#calculator" className="nav-link nav-item" onClick={() => setToggleMenu(!toggleMenu)}>Calculator</a>
            <a href="#winners" className="nav-link nav-item" onClick={() => setToggleMenu(!toggleMenu)}>Winners</a>
            <a href="http://discord.gg/z2fSZZEMTE" target="_blank" className="nav-link" onClick={() => setToggleMenu(!toggleMenu)}>
              <img src="/discord.png" alt="Discord" className="nav-favicon" />
            </a>
            <a href="https://twitter.com/HeavensLotto" target="_blank" className="nav-link" onClick={() => setToggleMenu(!toggleMenu)}>
              <img src="/twitter.png" alt="Twitter" className="nav-favicon" />
            </a>
          </div>
        )}
      </nav>
      <div className="landing-container">
        {/* <marquee behavior="scroll" direction="left" scrollamount="12" loop="infinite">
          {
            [...Array(n)].map((e, i) => <img src="/ticket.png" width="120" height="80" key={i}/>)
          }
        </marquee> */}
        <div className="pot-container">
          <div className="current-pot-container">
            <p className="pot pot-sol">{(currJackpot + 0.47*currSol).toFixed(1).toLocaleString()} ◎</p>
            <p className="pot pot-usd">(${((currJackpot + 0.47*currSol)*solMarket).toFixed(1).toLocaleString()})</p>
            {/* <h1><a href="https://solscan.io/account/5LBuqY4atj7txzL6eri7XBcn9qy9MhSyVA6ACiHQGrGq" target="_blank">Current JACKPOT</a></h1> */}
            <h1>Current JACKPOT</h1>
          </div>
          <div className="nft-container">
            <img src="/hsl-nft.gif" alt="" />
            <h1><a href="https://magiceden.io/marketplace/heavens_sevens_lotto" target="_blank">Win an OG HSL Ticket</a></h1>
            <div>
              <div className="progress-container">
                { Math.round((currSol/0.1)) >= tickets_needed ?
                  (
                    <span>100%</span>
                  ) :
                  (
                    <span>{((Math.round((currSol/0.1)) / tickets_needed) * 100).toFixed(1)}%</span>
                  )
                }
                <progress value={Math.round((currSol/0.1))} max={tickets_needed} />
              </div>
              { Math.round((currSol/0.1)) >= tickets_needed ?
                (
                  <p>NFT Unlocked: <span className="colored-text">{tickets_needed}/{tickets_needed}</span></p>
                ) :
                (
                  <p>Unlocking NFT: <span className="colored-text">{Math.round((currSol/0.1))}/{tickets_needed}</span></p>
                )
              }
            </div>
          </div>
        </div>
        {/* <div className="buy-container">
          <button className="cta-button" onClick={() => updateData()}> GET TICKET FOR 0.1 SOL </button>
        </div> */}
        <p className="tickets-bought">Number of Tickets Bought: <span className="colored-text">{Math.round((currSol/0.1))}</span></p>
        <div>
        </div>
        {/* <p>Number of Tickets Bought: <span>{(currSol.toFixed(1)/0.1).toLocaleString()}</span></p> */}
        <div className="ticket-fans">
          <img src="/ticketsLeft.png" alt="" />
          <img src="/ticketsRight.png" alt="" />
        </div>
        {/* <marquee behavior="scroll" direction="right" scrollamount="12" loop="infinite">
          {
            [...Array(n)].map((e, i) => <img src="/ticket.png" width="120" height="80" key={i} loop="infinite"/>)
          }
        </marquee> */}
      </div>
      <div className="info-container">
        <h1 id="about" className="colored-text">Welcome to Heavens Sevens Lotto</h1>
        <div className="info-content">
          <div className="info about-container">
            <p>Heavens Sevens is the daily lottery of Solana. At our site you can mint lotto tickets everyday for a price of 0.1 sol and at the end of the day we will announce the winner of the days lotto.</p>
            {/* <p>For each lottery, there always 10 winners taking 77% of the pot (35%, 25%, 10%, and 7x of 1%). The 23% of the pot then goes to the NFT holders (20%) and the team (3%).</p> */}
            <img src="/ticket.png" />
          </div>
          <div className="info faq-container">
            {questions.map((question, index) => (
              <div className="faq">
                <h3 className="colored-text">{question.title}</h3>
                <p>{question.answer}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="how-container">
          <h1 className="colored-text">How will the lottery work?</h1>
          <div className="steps-container">
            <div>
              <div className="step">
                <p><span>1.</span> Purchase lotto ticket(s) for 0.1 SOL</p>
              </div>
              <div className="step">
                <p><span>2.</span> Wait until 8:30pm UTC</p>
              </div>
              <div className="step">
                <p><span>3.</span> Join Heavens Sevens Lotto Discord</p>
              </div>
              <div className="step">
                <p><span>4.</span> Watch the live winning ticket being picked in #winners</p>
              </div>
              <div className="step">
                <p><span>5.</span> Wait for your prize to get sent to your wallet</p>
              </div>
            </div>
            <img src="https://media2.giphy.com/media/Ps8XflhsT5EVa/giphy.gif" />
          </div>
        </div>
      </div>
      <div className="calculator-container">
        <h1 id="calculator" className="colored-text">Prizepool Calculator</h1>
        {/* <input type="number" placeholder="Enter Total Tickets" value={parseInt(inputValue)} onChange={onInputChange} min="1000"/> */}
        {/* <input type="range" min="1" max="1000000" defaultValue={inputValue} class="slider" id="myRange" /> */}
        <p>Total Prizepool: {inputValue.toFixed(1).toLocaleString()} ◎</p>
        <button onClick={() => setInputValue(currSol)}>Current Pot</button>
        <div className="ticket-buttons">
          <button onClick={() => setInputValue(50)}>50</button>
          <button onClick={() => setInputValue(100)}>100</button>
          <button onClick={() => setInputValue(500)}>500</button>
          <button onClick={() => setInputValue(1000)}>1000</button>
        </div>
        <div className="calculations">
          {calculations.map((calculation, index) => (
            <div className="calculation">
              <p>{calculation.title}</p>
              <p>{(inputValue*calculation.multiplier + calculation.value).toFixed(2).toLocaleString()} ◎</p>
              {/* <h2>{parseFloat((parseInt(inputValue) * calculation.multiplier).toFixed(1)).toLocaleString()} ◎</h2> */}
            </div>
          ))}
        </div>
        <p>*there are 2 guaranteed winners for the Daily Prize Pool</p>
        <p>*there is a 10% chance of winning the Heavens Sevens Jackpot</p>
        <p>*47% of the daily ticket sales will be rolled over to the Jackpot</p>
      </div>
      <div className="dashboard-container">
        <h1 id="winners" className="colored-text">Hall of Winners</h1>
        <p>Coming Soon</p>
      </div>
      <footer>
        <h2 className="colored-text">Feeling lucky?</h2>
        <p>Buy your Heavens Sevens Lotto ticket now!</p>
        <button onClick={() => topFunction()}>Buy Tickets →</button>
        <div className="footer-links">
          <a href="http://discord.gg/z2fSZZEMTE" target="_blank" className="nav-link" onClick={() => setToggleMenu(!toggleMenu)}>
            <img src="/discord.png" alt="Discord" className="nav-favicon" />
          </a>
          <a href="https://twitter.com/HeavensLotto" target="_blank" className="nav-link" onClick={() => setToggleMenu(!toggleMenu)}>
            <img src="/twitter.png" alt="Twitter" className="nav-favicon" />
          </a>
        </div>
      </footer>
    </main>
  );
};

export default App;
