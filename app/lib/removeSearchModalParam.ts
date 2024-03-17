function removeSearchModalParam(queryParams: string): string {
  const urlObj = new URLSearchParams(queryParams);
  urlObj.delete("search-modal");
  return urlObj.toString();
}

export default removeSearchModalParam;
