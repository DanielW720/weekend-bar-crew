function removeSearchModalParam(params: string): string {
  const urlObj = new URLSearchParams(params);
  urlObj.delete("search-modal");
  return urlObj.toString();
}

export default removeSearchModalParam;
