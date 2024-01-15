'use client';

import { Button } from '@/components';
import helpers from '@/helpers';
import calculatorService from '@/services/calculatorService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  type: z.string().min(1),
  area: z.string().min(1),
  location: z.string().min(1),
  bedrooms: z.preprocess(
    (arg) => parseInt(z.string().parse(arg)),
    z.number().nonnegative().min(1),
  ),
  bathrooms: z.preprocess(
    (arg) => parseInt(z.string().parse(arg)),
    z.number().nonnegative().min(1),
  ),
});

const CalculatorPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

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

  const submit = async (data) => {
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
  };

  return (
    <div>
      <h1 className="text-3xl font-bold my-5 text-center inline-block">
        Calculate Estimated Price
      </h1>

      <form action="" method="POST" onSubmit={handleSubmit(submit)}>
        <div className="flex gap-5 wrap">
          <label className="font-bold tracking-wider" htmlFor="">
            Type:
            <select
              {...register('type')}
              className="bg-primary bg-opacity-20 py-2 px-5 rounded-md my-5 block"
            >
              <option value="">Select Type</option>
              <option value="House">House</option>
              <option value="Flat">Flat</option>
            </select>
            {errors.type && (
              <span role="alert" className="text-red-500 text-sm">
                {errors.type.message}
              </span>
            )}
          </label>
          <label className="font-bold tracking-wider" htmlFor="">
            Area:
            <select
              className="bg-primary bg-opacity-20 py-2 px-5 rounded-md my-5 block"
              {...register('area')}
            >
              <option value="">Select Area</option>
              {formValues.areas
                ?.sort(helpers.sortMeasurements)
                .map((area, index) => (
                  <option key={area + index} value={area}>
                    {area}
                  </option>
                ))}
            </select>
            {errors.area && (
              <span role="alert" className="text-red-500 text-sm">
                {errors.area.message}
              </span>
            )}
          </label>
        </div>

        <label className="font-bold tracking-wider" htmlFor="">
          Location:
          <select
            {...register('location')}
            className="bg-primary bg-opacity-20 py-2 px-5 rounded-md my-5 block max-w-md"
          >
            <option value="">Select Location</option>
            {formValues.locations?.map((location, index) => (
              <option key={location + index} value={location}>
                {location}
              </option>
            ))}
          </select>
          {errors.location && (
            <span role="alert" className="text-red-500 text-sm">
              {errors.location.message}
            </span>
          )}
        </label>

        <div className="flex gap-5 flex-wrap">
          <label className="font-bold tracking-wider" htmlFor="">
            Bedrooms:
            <input
              {...register('bedrooms')}
              type="text"
              className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.bedrooms && (
              <span role="alert" className="text-red-500 text-sm">
                {errors.bedrooms.message}
              </span>
            )}
          </label>
          <label className="font-bold tracking-wider" htmlFor="">
            Bathrooms:
            <input
              {...register('bathrooms')}
              type="text"
              className="py-2 px-3 pr-11 block w-full border border-gray-200 shadow-sm -mt-px -ml-px sm:mt-0 sm:first:ml-0 rounded-md text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.bathrooms && (
              <span role="alert" className="text-red-500 text-sm">
                {errors.bathrooms.message}
              </span>
            )}
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
