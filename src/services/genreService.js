export const genres = [
  { _id: "FvUbWTR9CT4ZjuZff62E471818", name: "Action" },
  { _id: "FvUbWTR9CT4ZjuZff62E471814", name: "Comedy" },
  { _id: "FvUbWTR9CT4ZjuZff62E471820", name: "Thriller" }
];

export function getGenres() {
  return genres.filter(g => g);
}
