import * as React from "react";
import { TextField, Paper, InputBase, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BookingItems from "./BookingItems";
import axios, * as others from "axios";

export default function Booking() {
  const [input, setInput] = React.useState("");
  const [data, setData] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const fetchData = async () => {
    await axios
      .get(
        `https://booking-app-24-01.herokuapp.com/booking/email?email=${input}&page=${page}`
      )
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitEmail = async (event) => {
    event.preventDefault()
    fetchData()
  };

  const changePage = () => {
    setPage(page + 1);
    fetchData();
  };
  const bookingItems = () => {
    if (data !== null) {
      if (Array.isArray(data)) {
        return <BookingItems data={data} changePage={changePage} page={page} />;
      } else {
        return <div>{data.message}</div>;
      }
    } else {
      return <></>;
    }
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
      <Box sx={{ marginTop: "2em" }}>{bookingItems()}</Box>
    </>
  );
}
