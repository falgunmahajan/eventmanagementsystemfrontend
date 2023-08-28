import styled from '@emotion/styled';
import { Paper, Table, TableCell, TableContainer, TableHead, TableRow, TableBody, tableCellClasses } from '@mui/material';
import React from 'react'

const TableComponent = (props) => {
    let data=props.data
    console.log(data)
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
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
  return (
    <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {Object.keys(data[0]).map(key=>{
                  return  <StyledTableCell align="center" key={key}>{key.split(/(?=[A-Z])/).join(" ")}</StyledTableCell>
                })
              } 
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item=>{
          return <StyledTableRow key={data.indexOf(item)}>
           {Object.keys(item).map(key=>{
            if(typeof item[key]==="object")
            {
              return  <StyledTableCell key={key} >{Object.keys(item[key]).map(subkey=>{
                  return <div><b>{subkey}</b> : {item[key][subkey]}</div>
              })}</StyledTableCell>
            }
             return  <StyledTableCell align="center" key={key} >{item[key]}</StyledTableCell>
            
            })}
            </StyledTableRow>
          })}
          
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default TableComponent


// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function CustomizedTables() {
//     return (
      // <TableContainer component={Paper}>
      //   <Table sx={{ minWidth: 700 }} aria-label="customized table">
      //     <TableHead>
      //       <TableRow>
      //         {p}
      //         <StyledTableCell>Dessert (100g serving)</StyledTableCell>
      //         {/* <StyledTableCell align="right">Calories</StyledTableCell>
      //         <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
      //         <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
      //         <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
      //       </TableRow>
      //     </TableHead>
      //     <TableBody>
      //       {rows.map((row) => (
      //         <StyledTableRow key={row.name}>
      //           <StyledTableCell component="th" scope="row">
      //             {row.name}
      //           </StyledTableCell>
      //           <StyledTableCell align="right">{row.calories}</StyledTableCell>
      //           <StyledTableCell align="right">{row.fat}</StyledTableCell>
      //           <StyledTableCell align="right">{row.carbs}</StyledTableCell>
      //           <StyledTableCell align="right">{row.protein}</StyledTableCell>
      //         </StyledTableRow>
      //       ))}
      //     </TableBody>
      //   </Table>
      // </TableContainer>
//     );
//   }
