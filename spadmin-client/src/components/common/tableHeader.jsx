import { TableHead, TableRow, TableCell } from "@mui/material";

const TableHeader = (props) => {
  const raiseSort = (path) => {
    const sortColumn = { ...props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    props.onSort(sortColumn);
  };

  const renderSortIcon = (column) => {
    const { sortColumn } = props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <i className="fa fa-sort-asc" aria-hidden="true" />;
    return <i className="fa fa-sort-desc" aria-hidden="true" />;
  };

  return (
    <TableHead>
      <TableRow>
        {props.columns.map((column) => (
          <TableCell
            className="clickable"
            key={column.path || column.key || column.doublepath}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
            {renderSortIcon(column)}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
