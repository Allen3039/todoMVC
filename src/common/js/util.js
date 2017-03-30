function formatDate(oldDate) {
  let date = new Date(oldDate);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}
function getTodayRange() {
  let today = new Date();
  return [
    +new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    +new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 0, 0, -1)
  ];
}
module.exports = {
  formatDate,
  getTodayRange
};
