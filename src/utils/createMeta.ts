export default (total: number, limit: string, skip: string) => {
  const pageNumber: number = parseInt(skip) || 1;
  const pageSize: number = parseInt(limit) || 10;

  return {
    total,
    limit: pageSize,
    skip: (pageNumber - 1) * pageSize,
  }
}
