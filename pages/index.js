import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { AppShell, Header, Table, Title, Button } from "@mantine/core";
import { connectToDatabase } from "../util/mongodb";

import { useState } from "react";
import NewJobModal from "../components/NewJobModal";
import JobTabel from "../components/JobTabel";

export default function Home({ jobs }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = () => setOpen(true);

  return (
    <AppShell
      padding="md"
      header={
        <Header className="nav" height={60} p="xs">
          {/* Header content */}
          <Title className="navTitle">Job Seeker</Title>
        </Header>
      }
    >
      <Button onClick={handleOpen}>New Job</Button>

      <JobTabel jobs={jobs}></JobTabel>

      <NewJobModal open={open} onClose={() => setOpen(false)}></NewJobModal>
    </AppShell>
  );
}

/*
  Connect to my MongoDB database and retrieve the jobs stored inside it
  Then pass the props to the home page
*/
export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const data = await db.collection("Jobs").find({}).toArray();

  const jobs = JSON.parse(JSON.stringify(data));

  return {
    props: { jobs: jobs },
  };
}
