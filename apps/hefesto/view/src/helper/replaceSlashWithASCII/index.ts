const replaceSlashWithASCII = (str: string): string => {
  let replaceString: string = str.replaceAll(/\//g, "%2F");

  return replaceString;
};

export default replaceSlashWithASCII;
