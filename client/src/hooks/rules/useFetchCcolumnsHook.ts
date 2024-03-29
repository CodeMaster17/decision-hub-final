export const useFetchColumns = async () => {
  try {
    const response = await fetch(
      'https://postgres-server-harshit.onrender.com/get-columns',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    // const columns = transformColumns(responseData);
    console.log('Columns fetched:', responseData);
    return responseData;
  } catch (error) {
    console.error('Error fetching columns:', error);
  }
};
