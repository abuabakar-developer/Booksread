export async function fetchBooks(query: string) {
  const response = await fetch(`/api/books?query=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();
  return data.items;
}


  






