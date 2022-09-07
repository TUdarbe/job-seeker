import { AppShell, Header, Table, Title, Button } from "@mantine/core";
import { useState } from "react";

export default function JobTabel({ jobs }) {
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
      <tbody>
        {jobs.map((j) => (
          <tr key={j._id}>
            <td>
              <span>
                <i className="bi bi-star"></i>
              </span>
            </td>
            <td>
              <i className="bi bi-trash"></i>
            </td>
            <td>{j.position} </td>
            <td>{j.company} </td>
            <td>{j.techstack.toString().toUpperCase()}</td>
            <td>{j.status}</td>
            <td>{j.appliedDate}</td>
            <td>{j.link}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
