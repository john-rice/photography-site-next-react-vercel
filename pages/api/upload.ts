import { NextApiRequest, NextApiResponse } from "next";
import { imagekit } from "../../imageKit/imageKit";

export default async function upload(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await imagekit.upload({
      file: req.body.file,
      fileName: req.body.fileName,
      tags: req.body.tags, 
      extensions: [
        {
          name: "google-auto-tagging",
          minConfidence: 80, 
          maxTags: 10, 
        },
      ],
    });
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ error: "Failed to upload file" });
  }
}
