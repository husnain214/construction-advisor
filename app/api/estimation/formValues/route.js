import csv from 'csv-parser';
import fs from 'fs';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const columnsToExtract = ['Location', 'Area'];
  const data = {
    Location: new Set(),
    Area: new Set(),
  };

  // Wrap fs.createReadStream in a promise
  const readFilePromise = () =>
    new Promise((resolve, reject) => {
      const stream = fs.createReadStream(process.cwd() + '/public/dataset.csv');
      stream
        .pipe(csv())
        .on('data', (row) => {
          columnsToExtract.forEach((column) => {
            data[column].add(row[column]);
          });
        })
        .on('end', () => {
          resolve({
            locations: Array.from(data.Location),
            areas: Array.from(data.Area),
          });
        })
        .on('error', (error) => {
          reject({ error: error.message, status: 400 });
        });
    });

  // Use the promise to get the final response
  try {
    const response = await readFilePromise();
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(error);
  }
};
