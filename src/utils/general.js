export const nextNumber = (next = 1) => () => next++;

const nextRouteIndex = nextNumber();
export const createRoute = (url, component, exact = false) => ({
  index: nextRouteIndex(),
  path: url,
  component,
  exact,
});

const nextMenuIndex = nextNumber();
export const createMenu = (url, title, icon, when) => ({
  index: nextMenuIndex(),
  title,
  path: url,
  icon,
  when,
});

export const createComponent = (component, when) => ({
  index: nextMenuIndex(),
  component,
  when,
});

export const sortString = key => (a, b) =>
  a[key] ? a[key].localeCompare(b[key]) : true;
export const sortNumber = key => (a, b) => a[key] - b[key];
export const sortBool = key => (a, b) => b[key] - a[key];
