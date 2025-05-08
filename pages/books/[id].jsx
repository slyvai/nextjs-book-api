import Link from "next/link";
export async function getStaticPaths() {
  const res = await fetch("https://fakerestapi.azurewebsites.net/api/v1/Books");
  const data = await res.json();
  const paths = data.map((book) => {
    return {
      params: { id: book.id.toString() },
    };
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { id } = params;
  const response = await fetch(
    `https://fakerestapi.azurewebsites.net/api/v1/Books/${id}`
  );
  const book = await response.json();
  return {
    props: {
      books: book,
    },
  };
}

export default function BookDetails({ books }) {
  return (
    <div className="book-details">
      <h1>Book Details</h1>
      <p>Title: {books.title}</p>
      <p>Description: {books.description}</p>
      <p>Page Count : {books.pageCount}</p>
      <p>Publish Date : {books.publishDate}</p>
      <Link href={"/"}>
        <button>Back</button>
      </Link>
    </div>
  );
}
