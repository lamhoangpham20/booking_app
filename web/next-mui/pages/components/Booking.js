import * as React from "react";
import { TextField, Paper, InputBase, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BookingItems from "./BookingItems";

export default function Booking() {
  const [input, setInput] = React.useState("");
  
  const submitEmail = async () => {
    const res = await fetch(
      `https://booking-app-24-01.herokuapp.com/booking/email?email=${input}`
    )
      .then((result) => {
        console.log(result)
        return result.data;
      })
      .catch((err) => {
        console.log(error);
      });
  };

  return (
    <>
      <Paper
        component="form"
        sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter your email"
          inputProps={{ "aria-label": "Enter your email" }}
          onChange={(event) => {
            setInput(event.target.value);
          }}
        />
        <IconButton
          onClick={submitEmail}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Box sx={{ marginTop: "2em" }}>
        <BookingItems />
      </Box>
    </>
  );
}
