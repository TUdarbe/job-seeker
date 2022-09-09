import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { AppShell, Header, Table, Title, Button } from "@mantine/core";
import { connectToDatabase } from "../util/mongodb";

import { useState, useEffect } from "react";
import NewJobModal from "../components/NewJobModal";
import JobTabel from "../components/JobTabel";

export default function Home({ jobs }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(jobs);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpen = () => setOpen(true);

  const handleOnClose = async () => {
    const res = await fetch("../api/jobs", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((jobs) => {
        setData(jobs.data);
        setOpen(false);
        setIsSubmitted(false);
      });
  };

  const handleSubmit = async () => {
    console.log(data);
    setIsSubmitted(true);
    //fetch updated data
    // const res = await fetch("../api/jobs", {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setData(data);
    //     setIsSubmitted(false);
    //   });
  };

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
      <p>Applied</p>
      <p>Interviewed</p>
      <p>Rejected</p>

      <Button onClick={handleOpen}>New Job</Button>

      <JobTabel isSubmitted={isSubmitted} jobs={data}></JobTabel>

      <NewJobModal
        open={open}
        onClose={() => handleOnClose()}
        onSubmit={() => handleSubmit()}
      ></NewJobModal>
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
