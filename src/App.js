import "./App.css";
import { useEffect, useState } from "react";
import Draw from "./draw/Draw";

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

  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", changeWidth);

    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

  const [inputValue, setInputValue] = useState(1000);
  const [currSol, setCurrSol] = useState(1);
  const [currJackpot, setCurrJackpot] = useState(1);
  const [solMarket, setSolMarket] = useState(1);

  // const onInputChange = (event) => {
  //   const { value } = event.target;
  //   setInputValue(value);
  // };

  const lamportValue = 0.000000001;

  // Scroll to Top
  const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

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
  ];

  const questions = [
    {
      title: "How many lotto tickets can I buy?",
      answer:
        "Unlimited per person. Unfortunately, right now you need to mint one ticket at a time.",
    },
    {
      title: "When will Lotto take place?",
      answer:
        "Every week and everyday from Monday to Saturday. You can mint tickets to lotto from 8am to 8pm UTC.",
    },
  ];

  // NFT Giveaway
  const tickets_needed = 250;

  return (
    <main>
      <nav className="placeholder"></nav>
      <nav>
        <div className="nav-responsive">
          <div className="logo" onClick={() => topFunction()}>
            <p>Heavens Sevens Lotto</p>
          </div>
          <div
            className="nav-burger"
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        {(toggleMenu || screenWidth > 1300) && (
          <div className="nav-links">
            <a
              href="http://discord.gg/z2fSZZEMTE"
              target="_blank"
              className="nav-link"
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <img src="/discord.png" alt="Discord" className="nav-favicon" />
            </a>
            <a
              href="https://twitter.com/HeavensLotto"
              target="_blank"
              className="nav-link"
              onClick={() => setToggleMenu(!toggleMenu)}
            >
              <img src="/twitter.png" alt="Twitter" className="nav-favicon" />
            </a>
          </div>
        )}
      </nav>
      <div className="landing-container">
        <div className="draw-container">
          <Draw />
        </div>
      </div>
      <footer>
        <h2 className="colored-text">Feeling lucky?</h2>
        <p>Buy your Heavens Sevens Lotto ticket now!</p>
        <button onClick={() => topFunction()}>Buy Tickets →</button>
        <div className="footer-links">
          <a
            href="http://discord.gg/z2fSZZEMTE"
            target="_blank"
            className="nav-link"
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <img src="/discord.png" alt="Discord" className="nav-favicon" />
          </a>
          <a
            href="https://twitter.com/HeavensLotto"
            target="_blank"
            className="nav-link"
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <img src="/twitter.png" alt="Twitter" className="nav-favicon" />
          </a>
        </div>
      </footer>
    </main>
  );
};

export default App;
