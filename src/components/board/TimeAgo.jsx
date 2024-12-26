const TimeAgo = (timestamp) => {
    const now = new Date();
    const givenTime = new Date(timestamp);
    const differenceInMs = now - givenTime;
  
    // Convert to seconds, minutes, and hours
    const differenceInSeconds = Math.floor(differenceInMs / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
  
    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInMinutes < 60) {
      return `${differenceInMinutes} minutes ago`;
    } else if (differenceInHours < 24) {
      return `${differenceInHours} hours ago`;
    } else {
      const differenceInDays = Math.floor(differenceInHours / 24);
      return `${differenceInDays} days ago`;
    }
  }
  export default TimeAgo