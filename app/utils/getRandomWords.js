import words from '../lib/words'

const getRandomWords = () => {
    const randomCount = Math.floor(Math.random() * 2) + 1; // 1 or 2
    const shuffled = words.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, randomCount);
  };

export default getRandomWords