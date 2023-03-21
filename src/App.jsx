import { useState, useEffect } from "react";
import { FaPause, FaDiceFour } from "react-icons/fa";

function Advice({ advice, isPending }) {
  return (
    <p className="quote-font-size">{isPending ? "Loading..." : advice}</p>
  );
}

function Divider() {
  return (
    <div className="divider">
      <div className="line"></div>
      <FaPause className="divider-icon" />
      <div className="line"></div>
    </div>
  );
}

function App() {
  const [advice, setAdvice] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [header, setHeader] = useState("");

  const url = "https://api.adviceslip.com/advice";

  useEffect(() => {
    setAdvice("Generate a random advice");
    setHeader("");
  }, []);

  const generateAdvice = () => {
    setIsPending(true);
    setAdvice("");
    setHeader("");
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsPending(false);
        setAdvice(data.slip.advice);
        setHeader(`A D V I C E #${data.slip.id}`);
      });
  };

  return (
    <section className="main-container">
      <h4 className="header">{header}</h4>
      <Advice advice={advice} isPending={isPending} />
      <Divider />
      <div className="btn-container">
        <FaDiceFour className="dice" onClick={generateAdvice} />
      </div>
    </section>
  );
}

export default App;
