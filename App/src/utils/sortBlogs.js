export function sortBlogsByLatest(blogs) {
  return [...blogs].sort((a, b) => {
    const dateA = new Date(a.date).getTime() || 0;
    const dateB = new Date(b.date).getTime() || 0;
    return dateB - dateA;
  });
}
