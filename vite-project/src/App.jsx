import React, { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState("");
  const [customTip, setCustomTip] = useState("");
  const [numPeople, setNumPeople] = useState("");
  const [finalTip, setFinalTip] = useState(0);
  const [total, setTotal] = useState(0);
  const [perPerson, setPerPerson] = useState(0);
  console.log(numPeople);

  function calculateBill() {
    if (!amount || (customTip === "" && tipPercentage === "") || !numPeople) {
      alert("please fill detail carefully");
      return;
    }
    const totalAmount = Number(amount);
    const people = Number(numPeople);
    const customTipPercentage = customTip
      ? Number(customTip)
      : Number(tipPercentage);

    if (totalAmount && people > 0) {
      const tipAmount = (totalAmount * customTipPercentage) / 100;
      const totalBill = totalAmount + tipAmount;
      const perPersonAmount = totalBill / people;

      setPerPerson(perPersonAmount);
    }
  }

  function handleTipClick(percent) {
    setTipPercentage(percent);
    setCustomTip("");

    const totalAmount = Number(amount);

    const customTipPercentage = Number(percent);

    if (totalAmount && customTipPercentage && numPeople) {
      const tipAmount = (totalAmount * customTipPercentage) / 100;
      const totalBill = totalAmount + tipAmount;
      setFinalTip(tipAmount);
      setTotal(totalBill);
    } else if (totalAmount) {
      const tipAmount = (totalAmount * percent) / 100;

      setFinalTip(tipAmount);
    }
  }

  function HandleReset() {
    setAmount("");
    setTipPercentage("");
    setCustomTip("");
    setNumPeople("");
    setFinalTip(0);
    setTotal(0);
    setPerPerson(0);
  }
  function handleNumPeople(e) {
    const value = e.target.value;
    setNumPeople(value);

    const totalAmount = Number(amount);

    const customTipPercentage = tipPercentage
      ? Number(tipPercentage)
      : Number(customTip);

    if (amount && (customTip || tipPercentage) && value > 0) {
      const TipAmount = (totalAmount * customTipPercentage) / 100;
      const totalBill = totalAmount + TipAmount;

      setTotal(totalBill);
    }
  }

  function handleCustomTip(e) {
    const value = e.target.value;
    setCustomTip(value);
    setTipPercentage("");

    const totalAmount = Number(amount);
    const customTipPercentage = value ? Number(value) : 0;

    if (totalAmount && customTipPercentage && numPeople) {
      const tipAmount = (totalAmount * customTipPercentage) / 100;
      const totalBill = totalAmount + tipAmount;
      setFinalTip(tipAmount);
      setTotal(totalBill);
    } else if (totalAmount && customTipPercentage >= 0) {
      const tipAmount = (totalAmount * customTipPercentage) / 100;
      setFinalTip(tipAmount);
    }
  }

  return (
    <>
      <div className="wrapper">
        <h1 className="heading">Bill Splitter</h1>
        <div className="parent">
          <div className="BillSplitter">
            <div className="inputs">
              <div className="amount">
                <h2>Bill</h2>
                <input
                  type="number"
                  placeholder="Enter your amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="PercentTip">
                <h3>Select Tip</h3>
                <button onClick={() => handleTipClick(5)}>5%</button>
                <button onClick={() => handleTipClick(10)}>10%</button>
                <button onClick={() => handleTipClick(15)}>15%</button>
                <button onClick={() => handleTipClick(25)}>25%</button>
                <button onClick={() => handleTipClick(50)}>50%</button>
                <button onClick={() => handleTipClick(75)}>75%</button>
              </div>
              <div className="customTip">
                <input
                  type="number"
                  placeholder="Custom Tip in Percent"
                  value={customTip}
                  onChange={(e) => handleCustomTip(e)}
                />
              </div>
              <div className="totalPerson">
                <input
                  type="number"
                  placeholder="Number of People"
                  value={numPeople}
                  onChange={(e) => handleNumPeople(e)}
                />
              </div>

              <button onClick={calculateBill}>Generate Bill</button>
            </div>

            <div className="final">
              <h1>Tip Amount: {finalTip}</h1>
              <h1>Total: {total}</h1>
              <h1>Each Person's Bill: {perPerson}</h1>
              <button className="ResetButton" onClick={HandleReset}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
