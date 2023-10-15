import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TableComponent from "../TableComponent";
import { ClipLoader } from "react-spinners";
import { baseUrl } from "../../baseUrl";

const BookedCustomer = () => {
  const [bookedCustomer, setBookedCustomer] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await axios.get(`${baseUrl}/api/getBookedCustomer`);
      let data = res.data.map((item) => {
        delete item._id;
        delete item.__v;
        delete item.ServiceProviderId;
        delete item.CustomerId;
        delete item.GoldenParameters;
        delete item.AddonsParameters;
        delete item.Quantity;
        const start = new Date(item.BookingStartDate);
        const end = new Date(item.BookingEndDate);
        item.BookingStartDate = `${`0${start.getDate()}`.slice(-2)}-${`0${
          start.getMonth() + 1
        }`.slice(-2)}-${start.getFullYear()}`;
        item.BookingEndDate = `${`0${end.getDate()}`.slice(-2)}-${`0${
          end.getMonth() + 1
        }`.slice(-2)}-${end.getFullYear()}`;
        return item;
      });
      console.log(data);
      setBookedCustomer(data);
      setLoading(false);
    })();
  }, []);
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <ClipLoader loading={loading} />
      </div>
      {bookedCustomer && (
        <>
          <Typography
            component="div"
            variant="h3"
            align="center"
            sx={{ mb: 2 }}
          >
            Booking Services
          </Typography>
          <TableComponent data={bookedCustomer} />
        </>
      )}
    </div>
  );
};

export default BookedCustomer;
