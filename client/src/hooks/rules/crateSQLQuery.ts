// creating the sentence
export const createQuery = (formFields, connectedBy) => {
  // Or 'OR', depending on your application's logic

  let conditions = formFields
    .map((item) => {
      return `${item.property} ${item.operator} '${item.value}'`; // Assuming value is a string or number
    })
    .join(` ${connectedBy} `);

  let sentence = `SELECT * FROM userdata WHERE ${conditions}`;
  return sentence;
};
