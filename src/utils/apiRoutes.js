export const apiRepositories = (searchTerm, pageNumber) =>
  `https://api.github.com/search/repositories?q=${searchTerm}+in:name&page=${pageNumber}&per_page=25&sort=stars&order=desc`;
