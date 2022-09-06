import { connectToDatabase } from "../../util/mongodb";

export default async function jobHandler(req, res) {
  const { db } = await connectToDatabase();

  const { method } = req;

  const data = req.body;

  switch (method) {
    case "GET":
      try {
        const data = await db.collection("Jobs").find({}).toArray();

        const jobs = JSON.parse(JSON.stringify(data));

        res.status(200).json({ success: true, data: jobs });
      } catch (err) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        const job = await db.collection("Jobs").insertOne(data);
        console.log("success");
      } catch (err) {
        console.log("error");
      }
      break;
    default:
      console.log("error");
      break;
  }

  //const data = await db.collection("Jobs").find({}).toArray();

  res.json(data);
}
