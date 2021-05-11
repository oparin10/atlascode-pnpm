const getCurrentPath: (fullPath?: boolean) => string = (
  fullPath: boolean = false
) => {
  const fullWindowPath = window.location.pathname;
  const currentLocationArray = fullWindowPath.split("/");
  const currentLocation = currentLocationArray[currentLocationArray.length - 1];

  if (fullPath) {
    return fullWindowPath.toString();
  } else {
    return currentLocation;
  }
};

export default getCurrentPath;
