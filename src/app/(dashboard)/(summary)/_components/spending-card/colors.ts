export const COLORS = [...Array(4).keys()].map(
  index => `hsl(var(--color-pie-${index + 1}))`
);
