export const useFoo = () => {
  return useState('foo', () => Math.round(Math.random() * 100));
};
