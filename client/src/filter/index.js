const filters = {
  currency: (value) => {
    if (value) {
      return `$ ${value.toLocaleString()}`;
    }
    return value;
  },
};

export default filters;
