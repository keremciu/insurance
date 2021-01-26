export const capitalizeSnakeCase = snakeCaseWord =>
  snakeCaseWord
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')