const response = (success, data, message = "") => {
  return {
    success,
    message,
    data,
  };
};

const getTimeStamp = (time = null) => {
  const date = time ? new Date(time) : new Date();
  return date.toISOString();
};



module.exports = { response, getTimeStamp };
