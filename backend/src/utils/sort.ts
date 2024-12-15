const allowedSortFields = ["createdAt"];
const allowedSortDirections = ["asc", "desc"];
interface SortQuery {
  [key: string]: 1 | -1;
}

export const getSortQuery = (
  sortField: string,
  sortDirection: string
): SortQuery => {
  if (
    !allowedSortFields.includes(sortField) ||
    !allowedSortDirections.includes(sortDirection)
  ) {
    throw new Error("Invalid sort field or direction");
  }
  return { [sortField]: sortDirection === "asc" ? 1 : -1 };
};
