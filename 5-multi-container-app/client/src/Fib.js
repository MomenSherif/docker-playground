import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchValues = () =>
  axios.get('/api/values/current').then((res) => res.data);

const fetchIndexes = () => axios.get('/api/values/all').then((res) => res.data);

export default function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/values', {
      index,
    });

    setIndex('');
  };

  useEffect(() => {
    fetchValues().then(setValues);
    fetchIndexes().then(setSeenIndexes);
  }, []);

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <label htmlFor="index">Enter your index:</label>
        <input
          type="number"
          name="index"
          id="index"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          min={0}
          max={40}
        />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen:</h3>
      {seenIndexes.map(({ number }) => number).join(', ')}
      <h3>Calculated Values:</h3>
      {Object.entries(values).map(([key, value]) => (
        <div key={key}>
          For index {key} I calculated {value}
        </div>
      ))}
    </div>
  );
}
