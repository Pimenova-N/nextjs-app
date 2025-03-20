import { notFound } from "next/navigation";
import { updateBook } from "@/app/actions/books";
import { fetchBookById } from "@/db/queries/book";
import Header from '@/components/Header';
import BookForm from "@/components/BookForm";

export default async function BookEditPage({ params }: { params: Promise<{ id: string, bookId: string }> }) {

    const { id, bookId } = await params;
    const book = await fetchBookById(parseInt(bookId), parseInt(id));
    const updateAction = updateBook.bind(null, parseInt(bookId), parseInt(id))

    if (!book) {
        notFound();
    }

    return (
        <div>
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center -mt-16 dark:bg-gray-600">
                <BookForm formAction={updateAction} initialData={{
                    author_id: book.author_id, firstName: book?.authors?.firstName ?? '', lastName: book?.authors?.lastName ?? '',
                    title: book?.title ?? '', description: book?.description ?? ''
                }} />
            </div>
        </div>
    );
}