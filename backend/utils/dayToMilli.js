const daysToMilliseconds=function daysToMilliseconds(days) {
    // 👇️        hour  min  sec  ms
    return Math.round(days * 24 * 60 * 60 * 1000);
}
  
module.exports = daysToMilliseconds;