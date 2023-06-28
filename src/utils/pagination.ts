export default {
  prisma: (limit: string, skip: string) => {
    const pageNumber: number = parseInt(skip) || 1;
    const pageSize: number = parseInt(limit) || 10;
  
    return {
      skip: (pageNumber - 1) * pageSize,
      take: pageSize
    }
  },

  meta: (total: number, limit: string, skip: string) => {
    const pageNumber: number = parseInt(skip) || 1;
    const pageSize: number = parseInt(limit) || 10;
  
    return {
      meta: {
        total,
        limit: pageSize,
        skip: (pageNumber - 1) * pageSize,
      }
    }
  }
}



