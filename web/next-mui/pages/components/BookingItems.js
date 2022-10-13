import * as React from "react";
import { Container, Button } from "@mui/material";
import CardBox from "./CardBox";
export default function BookingItems(props) {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {props.data ? (
          props.data.map((i) => {
            return (
              <div key={i.booking_id}>
                <CardBox item={i} />
              </div>
            );
          })
        ) : (
          <></>
        )}

        <Button onClick={props.previousPage}>{"<"}</Button>
        {props.page}
        <Button onClick={props.nextPage}>{">"}</Button>
      </Container>
    </>
  );
}
