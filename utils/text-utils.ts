export const capitalize = (text: string): string => {
  const firstCharacter = text.slice(0, 1).toUpperCase();
  const restCharacters = text.slice(1);
  return firstCharacter + restCharacters;
};