import listFiles from "../pages/api/getAll";

let cachedResults;

export default async function getResults() {
  if (!cachedResults) {
    const fetchedResults = await listFiles({
      path: "your_imagekit_folder_path",
      limit: 400,
    });

    cachedResults = fetchedResults;
  }

  return cachedResults;
}
