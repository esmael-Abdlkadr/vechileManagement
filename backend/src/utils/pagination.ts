interface Pagination {
  skip: number;
  limit: number;
}

export const getPagination = (page: number, limit: number): Pagination => {
  const skip = (page - 1) * limit;
  return { skip, limit };
};
