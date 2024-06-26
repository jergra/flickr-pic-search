const getDateUploaded = (timestamp) => {
    const milliseconds = timestamp * 1000;
    const dateObject = new Date(milliseconds);
    const humanReadableDate = dateObject.toISOString().slice(0, 16).replace('T', ' ');
    return humanReadableDate
  }

export default getDateUploaded