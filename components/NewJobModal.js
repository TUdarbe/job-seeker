import React, { useState } from "react";
import { Modal, Button, Group, Box, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function NewJobModal(props) {
  const { open, onClose, onSubmit } = props;

  const contentType = "application/json";

  const form = useForm({
    initialValues: {
      position: "",
      company: "",
      techstack: "",
      link: "",
    },
  });

  const postData = async (values) => {
    values.techstack = values.techstack.split();
    values.status = "Applied";
    values.appliedDate = new Date().toLocaleDateString();

    try {
      const res = await fetch("../api/jobs", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(values),
      });
      console.log(res);
      form.reset();
    } catch (error) {}
  };

  return (
    <>
      <Modal
        onSubmit={onSubmit}
        opened={open}
        onClose={onClose}
        title="Insert New"
      >
        {/* Modal content */}
        <Box>
          <form onSubmit={form.onSubmit((values) => postData(values))}>
            <TextInput
              withAsterisk
              label="Position"
              placeholder="Position Name"
              {...form.getInputProps("position")}
            />
            <TextInput
              withAsterisk
              label="Company"
              placeholder="Company Name"
              {...form.getInputProps("company")}
            />
            <TextInput
              withAsterisk
              label="Tech-Stack"
              placeholder="Java, Javascript etc."
              {...form.getInputProps("techstack")}
            />
            <TextInput
              withAsterisk
              label="Link"
              placeholder="www.indeed.com"
              {...form.getInputProps("link")}
            />
            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
              <Button onClick={() => form.reset()}>Reset</Button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  );
}
