import { fetchBookById } from "@/db/queries/book";
import { deleteBook } from "@/app/actions/books";
import { notFound } from "next/navigation";
import Header from '@/components/Header';
import Book from '@/components/Book';
import Link from "next/link";

export default async function BookPage({ params }: { params: Promise<{ id: string, bookId: string }> }) {

    const { id, bookId } = await params;
    const book = await fetchBookById(parseInt(bookId), parseInt(id));
    const deleteAction = deleteBook.bind(null, parseInt(bookId), parseInt(id))

    if (!book) {
        notFound();
    }

    return (
        <div>
            <Header>
                <Link className="text-gray-900 dark:text-white hover:underline" href={`/authors/${book?.author_id}/books/${book?.id}/edit`}>Edit Book</Link>
                <Link onClick={deleteAction} className="text-gray-900 dark:text-white hover:underline" href={`/authors`}>Delete Book</Link>
            </Header>
            <Book book={book}/>
        </div>
    );
}