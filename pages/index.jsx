import "./styles/globals.css";
import Link from "next/link";

export async function getServerSideProps() {
  const res = await fetch("https://fakerestapi.azurewebsites.net/api/v1/Books");
  const data = await res.json();
  return {
    props: {
      books: data,
    },
  };
}

export default function Home({ books, error }) {
  if (error) {
    return <div>Error fetching books: {error}</div>;
  }

  return (
    <>
      <div className="book-container">
        <h1>Books List</h1>
        <ul className="book-list">
          {books &&
            books.map((book) => (
              <li key={book.id}>
                <Link href={`/books/${book.id}`}>
                  <h2>Title: {book.title}</h2>
                  <p>Description: {book.description}</p>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
