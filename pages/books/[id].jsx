import Link from "next/link";
export async function getStaticPaths() {
  const paths = Array.from({ length: 10 }, (_, i) => ({
    params: { id: (i + 1).toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  try {
    const response = await fetch(`https://fakerestapi.azurewebsites.net/api/v1/Books/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        return {
          notFound: true,
        };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return {
      props: {
        books: data,
      },
      revalidate: 10, 
    };
    
  } catch (error) {
    console.error("Error fetching book:", error);
  }
}

export default function BookDetails({ books, error }) {
  if (error) {
    return <div>Error: {error}</div>;
  }

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