import { Stack, Pagination as MuiPagination } from "@mui/material";

const Pagination = (props) => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;

  return (
    <Stack spacing={2} sx={{ mt: "10px" }}>
      <MuiPagination
        count={pageCount}
        page={currentPage}
        onChange={onPageChange}
        color="secondary"
      />
    </Stack>
  );
};

export default Pagination;
