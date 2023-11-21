import listFiles from "../pages/api/getAll";

let cachedResults;

export default async function getResults() {
  if (!cachedResults) {
    const fetchedResults = await listFiles({
      path: process.env.IMAGEKIT_FOLDER,
      limit: 400,
    });

    cachedResults = fetchedResults;
  }

  return cachedResults;
}
