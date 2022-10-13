import * as React from "react";
import { TextField, Paper, InputBase, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BookingItems from "./BookingItems";
import axios, * as others from "axios";

export default function Booking(initialData) {
  const [input, setInput] = React.useState("");
  const [data, setData] = React.useState(initialData);
  const [page, setPage] = React.useState(1);
  const fetchData = async (pageInput) => {
    await axios
      .get(
        process.env.NEXT_PUBLIC_API_URL +
          `/booking/email?email=${input}&page=${pageInput}`
      )
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(page);
  };
  const submitEmail = async (event) => {
    event.preventDefault();
    fetchData(1);
  };

  const nextPage = async () => {
    setPage(page + 1);
    fetchData(page + 1);
  };
  const previousPage = async () => {
    if (page > 1) {
      setPage(page - 1);
      fetchData(page - 1);
    }
  };
  const bookingItems = () => {
    if (data !== null) {
      if (Array.isArray(data)) {
        return (
          <BookingItems
            data={data}
            nextPage={nextPage}
            previousPage={previousPage}
            page={page}
          />
        );
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
        onSubmit={submitEmail}
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
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Box sx={{ marginTop: "2em" }}>{bookingItems()}</Box>
    </>
  );
}

Booking.getInitialProps = async () => {
  const req = await axios.get(
    "https://booking-app-24-01.herokuapp.com/booking/email?email=johndoe@home&page=1"
  );
  const data = await req.data;
  return { initialData: data };
};
