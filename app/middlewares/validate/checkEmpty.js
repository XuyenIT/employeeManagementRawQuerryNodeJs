const checkEmpty = (req, res, next) => {
  const { fullName, age, address } = req.body;
  if (fullName && age && address) {
    next();
  } else {
    const filedNull = "Cac filed ko duoc de trong";
    req.filedNull = filedNull;
    next();
  }
};
module.exports = checkEmpty;
