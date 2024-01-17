export function concatenateWithCondition(
  firstSentence: string,
  secondSentence: string,
): string {
  if (typeof firstSentence !== 'string' || typeof secondSentence !== 'string') {
    throw new Error('Both arguments should be strings');
  }

  // Capitalizing the first letter of the second sentence
  const capitalizedSecondSentence =
    secondSentence.charAt(0).toUpperCase() + secondSentence.slice(1);

  // Concatenating the sentences with a conditional structure
  const result = `If ${firstSentence.toLowerCase()}, then ${capitalizedSecondSentence.toLowerCase()}.`;

  return result;
}

// Example usage:
const firstSentence: string = 'Harsh is mad';
const secondSentence: string = 'Nikita is mad too';

const concatenatedSentence: string = concatenateWithCondition(
  firstSentence,
  secondSentence,
);
console.log(concatenatedSentence);
