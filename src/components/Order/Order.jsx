/* eslint-disable react/jsx-pascal-case */
import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import "./Order.css";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { UilClipboardAlt } from "@iconscout/react-unicons";
import { Button, Select } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "No.",
    numeric: false,
    disablePadding: true,
    label: "No.",
  },
  {
    id: "order_name",
    numeric: true,
    disablePadding: false,
    label: "order_name",
  },
  {
    id: "order_detail",
    numeric: true,
    disablePadding: false,
    label: "order_detail",
  },
  {
    id: "order_timeline",
    numeric: true,
    disablePadding: false,
    label: "order_timeline",
  },
  {
    id: "created_by",
    numeric: true,
    disablePadding: false,
    label: "รับผิดชอบโดย",
  },
  {
    id: "created_at",
    numeric: true,
    disablePadding: false,
    label: "created_at",
  },
  {
    id: "updated_at",
    numeric: true,
    disablePadding: false,
    label: "updated_at",
  },
  {
    id: "Action",
    numeric: true,
    disablePadding: false,
    label: "Action",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "" : ""}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Product
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Product() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [product, setProduct] = React.useState([]);
  const [count, setcount] = React.useState([]);
  const [count1, setcount1] = React.useState([]);
  const [count2, setcount2] = React.useState([]);
  const [count3, setcount3] = React.useState([]);
  const [count4, setcount4] = React.useState([]);
  const [sum, setSum] = React.useState([]);

  const creat = product.map((number) => number.created_at);
  const success = (~~count4 * 100) / count;

  const neworder = (~~count1 * 100) / count;
  const show = (~~count2 * 100) / count;
  const talk = (~~count3 * 100) / count;

  const cardsData = [
    {
      title: "งานใหม่",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      barValue: ~~neworder,
      value: count1,
      png: UilUsdSquare,
      series: [
        {
          name: "Product",
          data: count1,
        },
      ],
      create: creat,
    },
    {
      title: "นำเสนอ",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: ~~show,
      value: count2,
      png: UilMoneyWithdrawal,
      series: [
        {
          name: "Sale",
          data: count2,
        },
      ],
    },
    {
      title: "ต่อรอง",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: ~~talk,
      value: count3,
      png: UilClipboardAlt,
      series: [
        {
          name: "Expenses",
          data: count3,
        },
      ],
    },
    {
      title: "ปิดการขาย",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      barValue: ~~success,
      value: count4,
      png: UilClipboardAlt,
      series: [
        {
          name: "Expenses",
          data: count4,
        },
      ],
    },
  ];

  const [orderdetail, setOrderdetail] = useState("");
  React.useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    const role = localStorage.getItem("role");
    if (role == 1) {
      const items = localStorage.getItem("company_id");
      axios
        .get(`${process.env.REACT_APP_API_KEY}/order/getall/${items}`)
        .then((res) => {
          console.log(res,'getall');
          setSum(res.data.sum);
          setProduct(res.data.data);
          setcount(res.data.count);
          setcount1(res.data.count1);
          setcount2(res.data.count2);
          setcount3(res.data.count3);
          setcount4(res.data.count4);
        });
    }
    if (role == 2) {
      const organize_id = localStorage.getItem("organize_id");
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/order/getorderDepartment/${organize_id}`
        )
        .then((res) => {
          console.log(res,'getorderDepartment');
          setSum(res.data.sum);
          setProduct(res.data.data);
          setcount(res.data.count);
          setcount1(res.data.count1);
          setcount2(res.data.count2);
          setcount3(res.data.count3);
          setcount4(res.data.count4);
        });
    }   
     if (role == 3) {
      const user_id = localStorage.getItem("user_id");
      axios
        .get(
          `${process.env.REACT_APP_API_KEY}/order/getorderRepro/${user_id}`
        )
        .then((res) => {
          console.log(res,'getorderDepartment');
          setSum(res.data.sum);
          setProduct(res.data.data);
          setcount(res.data.count);
          setcount1(res.data.count1);
          setcount2(res.data.count2);
          setcount3(res.data.count3);
          setcount4(res.data.count4);
        });
    }
  };
  const handleRequestSort = (event, customer_id) => {
    const isAsc = orderBy === customer_id && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(customer_id);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChange = (event) => {
    setOrderdetail(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div className="MainDash">
      <h1>Admin/Order</h1>
      <div className="Cards">
        {cardsData.map((card, id) => {
          return (
            <div className="parentContainer" key={id}>
              <Card
                title={card.title}
                color={card.color}
                barValue={card.barValue}
                value={card.value}
                png={card.png}
                series={card.series}
                create={card.create}
                chart={false}
              />
            </div>
          );
        })}
      </div>

      <Box sx={{ width: "100%" }}>
        <Button
          variant="contained"
          style={{ marginTop: 10 }}
          component={Link}
          to="/Addorder"
        >
          Add
        </Button>
        <Paper sx={{ width: "100%", height: "90%" }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={orderdetail}
              label="สถานะงาน"
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">ทั้งหมด</MenuItem>
              <MenuItem value={"1"}>เปิดงานใหม่</MenuItem>
              <MenuItem value={"2"}>เสนอ</MenuItem>
              <MenuItem value={"3"}>ต่อรอง</MenuItem>
              <MenuItem value={"4"}>ปิดงาน</MenuItem>
            </Select>
            <Table
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={count}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                {stableSort(product, getComparator(order, orderBy))
                  .filter(
                    (row) =>
                      // note that I've incorporated the searchedVal length check here
                      !orderdetail.length ||
                      row.order_timeline.toString().includes(orderdetail)
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.order_id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const Order_timeline = () => {
                      if (row.order_timeline === 1) {
                        return (
                          <Chip
                            label="เปิดงานใหม่"
                            style={{ backGroundcolor: "white" }}
                          />
                        );
                      }
                      if (row.order_timeline === 2) {
                        return (
                          <Chip
                            label="นำเสนอ"
                            style={{
                              backgroundColor: "#00b0ff",
                              color: "white",
                            }}
                          />
                        );
                      }
                      if (row.order_timeline === 3) {
                        return (
                          <Chip
                            label="ต่อรอง"
                            style={{
                              backgroundColor: "#ff9100",
                              color: "white",
                            }}
                          />
                        );
                      }
                      if (row.order_timeline === 4) {
                        return (
                          <Chip
                            label="ปิดการขาย"
                            style={{
                              backgroundColor: "#4caf50",
                              color: "white",
                            }}
                          />
                        );
                      }
                    };
                    const ButtonAdd = () => {
                      if (row.order_timeline === 4) {
                        return (
                          <Button
                            variant="contained"
                            color="success"
                            component={Link}
                            to={`/Orderupdate/` + row.order_id}
                          >
                            ดูรายละเอียด
                          </Button>
                        );
                      } else {
                        return (
                          <Button
                            variant="contained"
                            component={Link}
                            to={`/Orderupdate/` + row.order_id}
                          >
                            อัพเดทสถานะ
                          </Button>
                        );
                      }
                    };
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.order_id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            onClick={(event) =>
                              handleClick(event, row.order_id)
                            }
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell>{row.order_name}</TableCell>
                        <TableCell>{row.order_detail}</TableCell>
                        <TableCell>
                          <Order_timeline />
                        </TableCell>
                        <TableCell>
                          {row.user_firstname} {row.user_surname}
                        </TableCell>
                        <TableCell>{row.created_at}</TableCell>
                        <TableCell>{row.updated_at}</TableCell>

                        <TableCell>
                          <ButtonAdd />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}
