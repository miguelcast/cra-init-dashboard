export const nextNumber = (next = 1) => () => next++;

const nextRouteIndex = nextNumber();
export const createRoute = (url, component, exact = false) => ({
  index: nextRouteIndex(),
  path: url,
  component,
  exact,
});

const nextMenuIndex = nextNumber();
export const createMenu = (url, title, icon) => ({
  index: nextMenuIndex(),
  title,
  path: url,
  icon,
});

export const sortString = key => (a, b) => a[key].localeCompare(b[key]);
export const sortNumber = key => (a, b) => a[key] - b[key];
export const sortBool = key => (a, b) => b[key] - a[key];
