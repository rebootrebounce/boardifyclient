const DueDate = (timestamp) => {
    const date = new Date(timestamp);

// Extract day, month, and year
const day = String(date.getDate()).padStart(2, "0"); // Ensures two digits
const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
const year = date.getFullYear();
const formattedDate = `${day}/${month}/${year}`;
return formattedDate
  }
  export default DueDate