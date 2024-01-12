'use client';

import axios from 'axios';
import { useState } from 'react';

const CalculatorPage = () => {
  const [price, setPrice] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    data.bedrooms = parseInt(data.bedrooms);
    data.bathrooms = parseInt(data.bathrooms);

    const response = await axios.post('/api/estimation', {
      ...data,
    });

    console.log(response.data);
    setPrice(response.data.price);
  };

  return (
    <>
      <form action="" method="POST" onSubmit={handleSubmit}>
        <label htmlFor="">
          Type:
          <input type="text" name="type" />
        </label>
        <label htmlFor="">
          Location:
          <input type="text" name="location" />
        </label>
        <label htmlFor="">
          Area:
          <input type="text" name="area" />
        </label>
        <label htmlFor="">
          Bedrooms:
          <input type="text" name="bedrooms" />
        </label>
        <label htmlFor="">
          Bathrooms:
          <input type="text" name="bathrooms" />
        </label>

        <button type="submit">Submit</button>
      </form>

      <h1 className="text-xl">Answer: {price}</h1>
    </>
  );
};

export default CalculatorPage;
