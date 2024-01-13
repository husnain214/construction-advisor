'use client';

import { Button } from '@/components';
import helpers from '@/helpers';
import calculatorService from '@/services/calculatorService';
import { useEffect, useState } from 'react';

const CalculatorPage = () => {
  const [price, setPrice] = useState(0);
  const [formValues, setFormValues] = useState({
    locations: [],
    areas: [],
  });

  useEffect(() => {
    (async () => {
      const data = await calculatorService.getFormValues();
      setFormValues(data);
    })();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    data.bedrooms = parseInt(data.bedrooms);
    data.bathrooms = parseInt(data.bathrooms);

    const { price } = await calculatorService.getEstimation(data);

    const pkr = new Intl.NumberFormat('ur-PK', {
      style: 'currency',
      currency: 'PKR',
    });

    const roundedPrice = Math.ceil(price);
    const formattedPrice = pkr.format(roundedPrice);

    setPrice(formattedPrice);

    event.target
      .querySelectorAll('input')
      .forEach((input) => (input.value = ''));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold my-5 text-center inline-block">
        Calculate Estimated Price
      </h1>

      <form action="" method="POST" onSubmit={handleSubmit}>
        <div className="flex gap-5 wrap">
          <label className="font-bold tracking-wider" htmlFor="">
            Type:
            <select
              className="bg-primary bg-opacity-20 py-2 px-5 rounded-md my-5 block"
              name="type"
            >
              <option value="House" defaultChecked>
                House
              </option>
              <option value="Flat">Flat</option>
            </select>
          </label>
          <label className="font-bold tracking-wider" htmlFor="">
            Area:
            <select
              className="bg-primary bg-opacity-20 py-2 px-5 rounded-md my-5 block"
              name="area"
            >
              {formValues.areas
                ?.sort(helpers.sortMeasurements)
                .map((area, index) => (
                  <option key={area + index} value={area}>
                    {area}
                  </option>
                ))}
            </select>
          </label>
        </div>

        <label className="font-bold tracking-wider" htmlFor="">
          Location:
          <select
            className="bg-primary bg-opacity-20 py-2 px-5 rounded-md my-5 block max-w-md"
            name="location"
          >
            {formValues.locations?.map((location, index) => (
              <option key={location + index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>

        <div className="flex gap-5 flex-wrap">
          <label className="font-bold tracking-wider" htmlFor="">
            Bedrooms:
            <input
              type="number"
              name="bedrooms"
              className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
          <label className="font-bold tracking-wider" htmlFor="">
            Bathrooms:
            <input
              type="number"
              name="bathrooms"
              className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>

        <Button loading={false} type={'submit'} style={'my-5'}>
          Submit
        </Button>
      </form>

      <span className="text-xl">
        Estimated Price: <strong className="uppercase">{price}</strong>
      </span>
    </div>
  );
};

export default CalculatorPage;
