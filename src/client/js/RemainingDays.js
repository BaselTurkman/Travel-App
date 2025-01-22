const calculateRemainingDays = (date) => {
  // set the start date and end date
  const startDate = new Date();
  const endDate = new Date(date);
  const timeDiff = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays;
};

export { calculateRemainingDays };

