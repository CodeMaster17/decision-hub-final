// Define the type for the input array elements
type Column = {
  column_name: string;
};

// Define the type for the output array elements
type TransformedColumn = {
  id: number;
  value: string;
  column_name: string; // Retaining the original column_name
};

// Function to transform the array
export function transformColumns(columns: Column[]): TransformedColumn[] {
  return columns.map((column, index) => ({
    id: index, // Unique ID, here just using the index
    value: column.column_name, // Setting value as the column_name
    column_name: column.column_name, // Retaining the original column_name
  }));
}
