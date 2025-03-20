import { notFound } from "next/navigation";
import { createBook } from "@/app/actions/books";
import { fetchAuthorsById } from "@/db/queries/authors";
import Header from '@/components/Header';
import BookForm from "@/components/BookForm";

export default async function BooksCreatePage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const createAction = createBook.bind(null, parseInt(id));
    const author = await fetchAuthorsById(parseInt(id));

    if (!author) {
        notFound();
    }

    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16 dark:bg-gray-600">
                <BookForm formAction={createAction} initialData={{ author_id: author.id, firstName: author?.firstName ?? '', lastName: author?.lastName ?? '', title: '', description: '' }} />
            </div>
        </div>
    );
}