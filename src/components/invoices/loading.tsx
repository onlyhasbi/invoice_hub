import { CircularProgress } from "@mui/material";
import React from "react";
import Center from "./center";

function Loading() {
  return (
    <Center>
      <CircularProgress />
    </Center>
  );
}

export default Loading;
