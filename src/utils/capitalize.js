export const capitalizeSnakeCase = snakeCaseWord =>
  snakeCaseWord
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')