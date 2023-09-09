export async function getData() {
  const response = await fetch(
    'https://api-movie-quotes.jarji-abuashvili.link/api/user'
  );
  const jsonData = await response.json();
  return jsonData;
}

export default async function handler(res: any) {
  const jsonData = await getData();
  res.status(200).json(jsonData);
}
