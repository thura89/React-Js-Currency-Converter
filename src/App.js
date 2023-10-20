import React, { useEffect, useState } from "react";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromAmount, setFromAmount] = useState("USD");
  const [toAmount, setToAmount] = useState("EUR");
  const [outPut, setOutPut] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      const controller = new AbortController();
      async function convert() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromAmount}&to=${toAmount}`,
            { signal: controller.signal }
          );
          const data = await res.json();
          console.log(data);
          if (fromAmount === toAmount)
            return setOutPut(amount), setIsLoading(false);

          setOutPut(data.rates[toAmount]);
          setIsLoading(false);
        } catch (error) {
          if (error.name !== "AbortError") {
            console.log(error.message);
          }
        }
      }
      convert();
      return function () {
        controller.abort();
      };
    },
    [amount, fromAmount, toAmount]
  );
  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromAmount}
        onChange={(e) => setFromAmount(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toAmount}
        onChange={(e) => setToAmount(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {outPut} {toAmount}
      </p>
    </div>
  );
};

export default App;
