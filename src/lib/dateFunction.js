// lib.js

const SECOND = 1;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

export const timeAgo = (date) => {
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000;

  if (diff < 0) {
    return "in the future";
  } else if (diff < 2 * MINUTE) {
    return "just now";
  } else if (diff < HOUR) {
    const minutes = Math.floor(diff / MINUTE);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diff < DAY) {
    const hours = Math.floor(diff / HOUR);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diff < MONTH) {
    const days = Math.floor(diff / DAY);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (diff < YEAR) {
    const months = Math.floor(diff / MONTH);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diff / YEAR);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
};

export const formatDate = (timestamp) =>
  `${new Date(timestamp).toLocaleDateString()},${new Date(
    timestamp
  ).toLocaleTimeString()}`;
