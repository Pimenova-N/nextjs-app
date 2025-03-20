import { fetchBooks } from "@/db/queries/book";
import Header from '@/components/Header';
import BookCard from '@/components/BookCard';

export default async function BooksPage() {

    const books = await fetchBooks();

    return (
        <div>
            <Header />
            <div className="flex flex-row flex-wrap font-[family-name:var(--font-geist-sans)]">
                {books && books.map((book) => (
                    <BookCard book={book} key={book.id} />
                ))}
            </div>
        </div>
    );
}