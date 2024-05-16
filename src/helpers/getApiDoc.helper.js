import fs from 'fs/promises';

const getApiDoc = async () => {
  try {
    const apiDoc = JSON.parse(await fs.readFile('./swagger.json', 'utf8'));
    return apiDoc;
  } catch (err) {
    console.log(err);
  }
};

export default getApiDoc;
