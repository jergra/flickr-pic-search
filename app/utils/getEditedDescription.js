const getEditedDescription = (text) => {
    const result = text.replaceAll('<a href', '<a target=”_blank” href')
    return result
  }

export default getEditedDescription