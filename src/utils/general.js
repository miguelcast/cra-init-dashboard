export const nextNumber = (next = 1) => () => next++;

const nextRouteIndex = nextNumber();
export const createRoute = (
  url,
  title,
  component,
  icon,
  menu = 'primary',
  exact = false,
) => ({
  index: nextRouteIndex(),
  title,
  path: url,
  component,
  icon,
  menu,
  exact,
});
