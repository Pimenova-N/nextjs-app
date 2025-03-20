import { notFound } from "next/navigation";
import Header from '@/components/Header';
import Author from '@/components/Author';
import Link from "next/link";
import { deleteAuthor } from "@/app/actions/authors";
import { fetchAuthorsByIdWithBooks } from "@/db/queries/authors";

export default async function AuthorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const author = await fetchAuthorsByIdWithBooks(parseInt(id));;

    if (!author) {
        notFound();
    }

    const deleteAction = deleteAuthor.bind(null, author.id)

    return (
        <div>
            <Header>
                <Link className="text-gray-900 dark:text-white hover:underline" href={`/authors/${author.id}/edit`}>Edit Author</Link>
                <Link onClick={deleteAction} className="text-gray-900 dark:text-white hover:underline" href={`/authors`}>Delete Author</Link>
                <Link className="text-gray-900 dark:text-white hover:underline" href={`/authors/${author.id}/books/create`}>Add Book</Link>
            </Header>

            <Author author={author} />
        </div>
    )
}