export const getRandomChoice = choices => {
  if (choices.length < 1) throw new Error('choices is empty');
  return choices[Math.floor(Math.random() * choices.length)];
};

export const getWinner = (firstChoice, secondChoice, config) => {
  if (!config[firstChoice] || !config[secondChoice]) return -1;
  if (firstChoice === secondChoice) return 0;
  return config[secondChoice][firstChoice] + 1;
};
