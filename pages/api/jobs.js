import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from "mongodb";

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

        res.status(200).json({ success: true, data: job });
      } catch (err) {
        res.status(400).json({ success: false, error: err });
      }
      break;

    case "DELETE":
      try {
        const deleteResult = await db
          .collection("Jobs")
          .deleteOne({ _id: new ObjectId(data) });

        if (deleteResult.deletedCount === 1) {
          console.log("Successfully deleted one document.");
        } else {
          console.log("No documents matched the query. Deleted 0 documents.");
        }
      } catch (err) {
        //   console.log(err);
      }
      break;

    case "PUT":
      try {
      } catch (err) {}
    default:
      console.log("error");
      break;
  }

  //const data = await db.collection("Jobs").find({}).toArray();

  res.json(data);
}
