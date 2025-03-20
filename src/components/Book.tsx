import React from 'react'
import Link from "next/link";
import { BookWithAuthor } from '@/db/queries/book';

type Props = {
  book: BookWithAuthor;
}
const Book: React.FC<Props> = ({ book }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center m-8 p-8 border border-gray-200 dark:bg-gray-600 w-1/2 md:w-lg">
        <Link className="my-3 text-3xl p-4 hover:underline" href={`/authors/${book.author_id}`}>{book?.authors?.firstName} {book?.authors?.lastName}</Link>
        <div className="my-3 text-2xl p-4 border border-gray-200 border-t-1 border-l-0 border-r-0 border-b-0">{book?.title}</div>
        <div className="my-3 p-4 border border-gray-200 border-t-1 border-l-0 border-r-0 border-b-0">{book?.description}</div>
      </div>
    </div>
  )
}

export default Book;