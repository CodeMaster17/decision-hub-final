import { transformColumns } from './useTransformedColumn';

export const useFetchColumns = async () => {
  try {
    const response = await fetch('http://localhost:3003/get-columns', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    const columns = transformColumns(responseData);
    console.log('Columns fetched:', columns);
    return columns;
  } catch (error) {
    console.error('Error fetching columns:', error);
  }
};
