import { TableBody as MuiTableBody, TableRow, TableCell } from "@mui/material";
import _ from "lodash";

const TableBody = (props) => {
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    if (column.doublepath) {
      let doublepath = column.doublepath.split(",");
      return _.get(item, doublepath[0]) + " " + _.get(item, doublepath[1]);
    }
    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  const { data, columns } = props;
  return (
    <MuiTableBody>
      {data.map((item) => (
        <TableRow key={item._id}>
          {columns.map((column) => (
            <TableCell key={createKey(item, column)}>
              {renderCell(item, column)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </MuiTableBody>
  );
};

export default TableBody;
