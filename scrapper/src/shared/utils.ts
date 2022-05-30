export const chunkArray = (array) => {
  const chunks = [];
  const chunkSize = 10;
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    chunks.push(chunk);
  }
  return chunks;
};
