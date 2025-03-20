import { AuthorWithBooks } from '@/db/queries/authors'
import Link from 'next/link';

type Props = {
    author: AuthorWithBooks;
}

const Author: React.FC<Props> = ({ author }) => {
    return (
        <div className="flex flex-col sm:flex-row">
            <div className="flex flex-col m-8 p-4">
                <div className="text-2xl my-2">{author.firstName} {author.lastName}</div>
                <div className="my-2">{author.description}</div>
            </div>
            {author?.books &&
                <div className="flex flex-col bg-white m-8 p-4 border border-gray-200 dark:bg-gray-600">
                    <div className="text-2xl my-2">Books</div>
                    {author?.books.map(book => (
                        <Link key={book.id} href={`/authors/${author.id}/books/${book.id}`}>
                            <div className="border border-gray-200 border-t-1 border-l-0 border-r-0 border-b-0 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-300r-item">
                                <div className="my-3 font-bold">{book.title}</div>
                                <div className="my-2">{book.description}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            }
        </div>
    )
}

export default Author;
