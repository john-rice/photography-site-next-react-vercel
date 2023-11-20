import { NextApiRequest, NextApiResponse } from "next";
import { imagekit } from "../../imageKit/imageKit";

export default async function listFiles(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await imagekit.listFiles({});
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ error: "Failed to list files" });
  }
}
