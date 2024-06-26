const truncateTitle = (text) => {
    if (text?.length > 500) {
      return text.substring(0, 500) + ' . . .';
    }
    return text;
  };  

export default truncateTitle