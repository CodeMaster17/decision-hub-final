export function useReplaceComma(sentence: string, replacement: string): string {
  if (typeof sentence !== 'string' || typeof replacement !== 'string') {
    throw new Error('Both sentence and replacement should be strings');
  }

  return sentence.replace(/,\s*/g, ` ${replacement} `);
}
