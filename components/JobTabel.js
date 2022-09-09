import { AppShell, Header, Table, Title, Button } from "@mantine/core";
import { useState, useEffect } from "react";

export default function JobTabel({ jobs }) {
  const contentType = "text/plain";
  const [data, setData] = useState(jobs);

  // useEffect(() => {
  //   console.log(jobs);

  //   fetch("/api/jobs", {
  //     method: "GET",
  //   });
  //   // .then((res) => res.json())
  //   // .then((data) => {
  //   //   setData(data.data);
  //   //   setIsSubmitted(false);
  //   // });
  // }, [jobs]);

  useEffect(() => {
    console.log("USE EFFECT CALLED");

    const res = fetch("/api/jobs", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, [jobs]);

  const deleteJob = async (id) => {
    try {
      const res = await fetch("../api/jobs", {
        method: "DELETE",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: id,
      }).then(() => {
        setData(data.filter((i) => i._id !== id));
      });
    } catch (error) {
      console.log(error);
    }
  };

  const starJob = async (id) => {
    try {
      const res = await fetch("../api/jobs", {
        method: "PUT,",
        body: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const rows = data.map((j) => {
    return (
      <tr key={j._id}>
        <td>
          <span>
            <i className="bi bi-star"></i>
          </span>
        </td>
        <td>
          <i onClick={() => deleteJob(j._id)} className="bi bi-trash"></i>
        </td>
        <td>{j.position} </td>
        <td>{j.company} </td>
        <td>{j.techstack.toString().toUpperCase()}</td>
        <td>{j.status}</td>
        <td>{j.appliedDate}</td>
        <td>{j.link}</td>
      </tr>
    );
  });

  return (
    <Table>
      <thead>
        <tr>
          <th></th>
          <th></th>
          <th>Position</th>
          <th>Company</th>
          <th>Description/Tech-Stack</th>
          <th>Status</th>
          <th>Apply Date</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
