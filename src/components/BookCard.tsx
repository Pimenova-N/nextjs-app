import React from 'react';
import Link from "next/link";
import { BookWithAuthor } from "@/db/queries/book";

interface Props {
  book: BookWithAuthor
}

const substringStr = (description: string, maxLength: number = 220): string => {
  if (description.length <= maxLength) {
    return description;
  }

  return `${description.substring(0, maxLength)}...`;
}

const BookCard: React.FC<Props> = ({ book }) => {


  return (
    <Link href={`/authors/${book.author_id}/books/${book.id}`}>
    <div key={book.id} className="m-2 relative flex flex-col bg-white dark:bg-gray-800 shadow-sm border border-slate-200 rounded-lg w-96  hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-300r-item">
      <div className="p-4">
        <h4 className="mb-2 text-gray-900 dark:text-white text-xl font-semibold">
          {book.authors.firstName} {book.authors.lastName}
        </h4>
        <h5 className="mb-2 text-slate-800 dark:text-white text-xl font-semibold">
          {book.title}
        </h5>
        <p className="text-gray-500 dark:text-gray-400  leading-normal font-light">
          {substringStr(book.description ?? '')}
        </p>
      </div>
    </div>
    </Link>
  );
}

export default BookCard;