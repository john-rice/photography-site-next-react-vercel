import type { NextApiRequest, NextApiResponse } from "next";
import { imagekit } from "../../imageKit/imageKit";

export default function auth(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = imagekit.getAuthenticationParameters();
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ error: "Failed to get Authentication Parameters" });
  }
}

