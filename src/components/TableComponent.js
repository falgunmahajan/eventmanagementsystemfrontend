import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  tableCellClasses,
  Button,
  styled,
} from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TableComponent = (props) => {
  let data = props.data;
  console.log(data);
  const navigate = useNavigate();
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {Object.keys(data[0]).map((key) => {
                console.log(typeof data[0][key]);
                if (key !== "ServiceAddedBy") {
                  if (key != "Location" && typeof data[0][key] == "object") {
                    return Object.keys(data[0][key]).map((subkey) => {
                      return (
                        <StyledTableCell align="center" key={subkey}>
                          {subkey.split(/(?=[A-Z])/).join(" ")}
                        </StyledTableCell>
                      );
                    });
                  }
                  return (
                    <StyledTableCell align="center" key={key}>
                      {key.split(/(?=[A-Z])/).join(" ")}
                    </StyledTableCell>
                  );
                }
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => {
              return (
                <StyledTableRow key={data.indexOf(item)}>
                  {Object.keys(item).map((key) => {
                    if (key !== "ServiceAddedBy") {
                      if (key == "Location") {
                        return (
                          <StyledTableCell align="center" key={key}>
                            {item.Location.value.Name}
                            {item.Location.price && props.LocationPrice && (
                              <div>
                                <br />
                                <b>Price per km: </b> {item.Location.price}
                              </div>
                            )}
                          </StyledTableCell>
                        );
                      }
                      if (key == "Action") {
                        return (
                          <StyledTableCell align="center" key={key}>
                            <Button
                              variant="contained"
                              type="button"
                              size="large"
                              value={item[key]}
                              onClick={(e) =>
                                props.getBookedService(e.target.value)
                              }
                            >
                              Book Service
                            </Button>
                          </StyledTableCell>
                        );
                      }
                      if (key == "Details") {
                        return (
                          <StyledTableCell align="center" key={key}>
                            <Button
                              // variant="contained"
                              type="link"
                              size="large"
                              value={item[key]}
                              onClick={(e) =>
                                 props.getDetails(e.target.value)
                              }
                            >
                              View Service Details
                            </Button>
                          </StyledTableCell>
                        );
                      }
                      if (typeof item[key] === "object") {
                        return Object.keys(item[key]).map((subkey) => {
                          if (typeof item[key][subkey] === "object") {
                            return (
                              <StyledTableCell align="center" key={subkey}>
                                {Object.keys(item[key][subkey]).map(
                                  (childkey) => {
                                    return (
                                      <div>
                                        {" "}
                                        <b>
                                          {childkey !== "value" &&
                                            `${childkey}:`}
                                        </b>{" "}
                                        {item[key][subkey][childkey]}
                                      </div>
                                    );
                                  }
                                )}
                              </StyledTableCell>
                            );
                          }
                          return (
                            <StyledTableCell align="center" key={subkey}>
                              {" "}
                              {item[key][subkey]}
                            </StyledTableCell>
                          );
                        });
                      }
                      return (
                        <StyledTableCell align="center" key={key}>
                          {item[key]}
                        </StyledTableCell>
                      );
                    }
                  })}
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
