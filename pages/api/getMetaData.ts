import { NextApiRequest, NextApiResponse } from "next";
import { imagekit } from "../../imageKit/imageKit";

export default async function metadata(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await imagekit.getFileMetadata(req.body.fileId); 
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ error: "Failed to get file metadata" });
  }
}
