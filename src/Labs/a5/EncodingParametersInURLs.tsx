import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

function EncodingParametersInURLs() {
  const [a, setA] = useState(34);
  const [b, setB] = useState(23);
  const [welcome, setWelcome] = useState("");
  const [result, setResult] = useState(0);
  
  const fetchWelcome = async () => {
    const response = await axios.get(`${API_BASE}/a5/welcome`);
    setWelcome(response.data);
  };
  useEffect(() => {
    fetchWelcome();
  }, []);

  const fetchSum = async (a: number, b: number) => {
    const response = await axios.get(`${API_BASE}/a5/add/${a}/${b}`);
    setResult(response.data);
  };
  const fetchSubtraction = async (a: number, b: number) => {
    const response = await axios.get(`${API_BASE}/a5/subtract/${a}/${b}`);
    setResult(response.data);
  };

  return (
    <div>
      <h3>Encoding Parameters In URLs</h3>
      <h4>Integrating React with APIs</h4>
      <h5>Fetching Welcome</h5>
      <h6>{welcome}</h6>
      <br />
      <h4>Calculator</h4>
      <input
        type="number"
        value={a}
        onChange={(e) => setA(parseInt(e.target.value))}
      />
      <br />
      <input
        type="number"
        value={b}
        onChange={(e) => setB(parseInt(e.target.value))}
      />
      <br />
      <input value={result} type="number" readOnly />
      <h3>Fetch Result</h3>
      <button className="btn btn-primary mb-2" onClick={() => fetchSum(a, b)}>
        Fetch Sum of {a} + {b}
      </button>
      <br />
      <button
        className="btn btn-danger mb-2"
        onClick={() => fetchSubtraction(a, b)}
      >
        Fetch Substraction of {a} - {b}
      </button>
      <h3>Path Parameters</h3>
      <a className="btn btn-primary me-2" href={`${API_BASE}/a5/add/${a}/${b}`}>
        Add {a} + {b}
      </a>
      <a
        className="btn btn-danger me-2"
        href={`${API_BASE}/a5/subtract/${a}/${b}`}
      >
        Substract {a} - {b}
      </a>
      <a
        className="btn btn-warning me-2"
        href={`${API_BASE}/a5/multiply/${a}/${b}`}
      >
        Multiply {a} * {b}
      </a>
      <a className="btn btn-success" href={`${API_BASE}/a5/divide/${a}/${b}`}>
        Divide {a} / {b}
      </a>
      <br />
      <h3>Query Parameters</h3>
      <a
        className="btn btn-primary me-2"
        href={`${API_BASE}/a5/calculator?operation=add&a=${a}&b=${b}`}
      >
        Add {a} + {b}
      </a>
      <a
        className="btn btn-danger me-2"
        href={`${API_BASE}/a5/calculator?operation=subtract&a=${a}&b=${b}`}
      >
        Substract {a} - {b}
      </a>
      <a
        className="btn btn-warning me-2"
        href={`${API_BASE}/a5/calculator?operation=multiply&a=${a}&b=${b}`}
      >
        Multiply {a} * {b}
      </a>
      <a
        className="btn btn-success"
        href={`${API_BASE}/a5/calculator?operation=divide&a=${a}&b=${b}`}
      >
        Divide {a} / {b}
      </a>
      <br />
      <br />
    </div>
  );
}
export default EncodingParametersInURLs;
