import MaterialTable from "material-table";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";
import { makeStyles } from "@mui/styles";

const tableIcons = {
  Edit: () => <button className="table-button">Edit</button>,
  Delete: () => (
    <button
      className="table-button"
      style={{
        background: "red",
        color: "white",
        borderColor: "red",
      }}
    >
      Delete
    </button>
  ),
};

const CustomTable = (props) => {
  const useStyles = makeStyles({
    root: {
      "& .Mui-selected": {
        backgroundColor: "#DC3545 !important",
        color: "white",
      },
      "& .MuiButtonBase-root": {
        width: "47px",
        height: "30px",
        fontSize: "14px",
      },
      "& .MuiPagination-ul": {
        columnGap: "16px",
      },
      "& .MuiPaginationItem-previousNext": {
        width: "47px",
        background: "#DFDFDF",
      },
    },
  });

  const CustomPagination = (props) => {
    const { count, rowsPerPage, onChangePage, onChangeRowsPerPage } = props;
    const classes = useStyles();

    const totalPage = Math.ceil(count / rowsPerPage) || 1;

    return (
      <div
        style={{
          padding: "15px 25px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          background: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "47px",
          }}
        >
          <div
            style={{
              color: "#6C757D",
              marginRight: "25px",
              fontSize: "14px",
            }}
          >
            Display
          </div>

          <input
            value={rowsPerPage}
            onChange={(event) => {
              onChangeRowsPerPage(event);
            }}
            style={{
              border: "1px solid #DFDFDF",
              borderRadius: "4px",
              padding: "4px 15px",
              width: "80px",
              color: "#343A40",
              fontSize: "14px",
            }}
          />
        </div>

        <Pagination
          className={classes.root}
          onChange={(event, page) => {
            onChangePage(event, page - 1);
          }}
          count={totalPage}
          variant="text"
          shape="rounded"
        />
      </div>
    );
  };

  return (
    <MaterialTable
      {...props}
      icons={tableIcons}
      components={{
        Pagination: (props) => {
          return <CustomPagination {...props} />;
        },
      }}
      title={
        <div
          style={{
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          {props.title}
        </div>
      }
      options={{
        showTitle: false,
        ...props?.options,
        headerStyle: {
          whiteSpace: "nowrap",
          ...props?.options?.headerStyle,
          color: "#343A40",
          fontWeight: "bold",
        },
        rowStyle: {
          whiteSpace: "nowrap",
          ...props?.options?.rowStyle,
          color: "#6C757D",
          fontSize: "14px",
          fontWeight: 400,
          width: "100% !important",
        },
      }}
    />
  );
};

export default CustomTable;