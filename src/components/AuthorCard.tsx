import { Author } from '@/types/types';
import React from 'react';
import Link from "next/link";


interface Props {
  author: Author;
}

const substringStr = (description: string, maxLength: number = 220): string => {
  if (description.length <= maxLength) {
    return description;
  }

  return `${description.substring(0, maxLength)}...`;
}

const AuthorCard: React.FC<Props> = ({ author }) => {


  return (
    <Link href={`/authors/${author.id}`}>
      <div key={author.id} className="m-2 flex bg-white dark:bg-gray-800 shadow-sm border border-slate-200 rounded-lg w-96  hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors duration-300r-item">
        <div className="p-4">
          <h5 className="mb-2 text-gray-900 dark:text-white text-xl font-semibold">
            {author.firstName} {author.lastName}
          </h5>
          <p className="text-gray-500 dark:text-gray-400  leading-normal font-light">
            {substringStr(author.description)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default AuthorCard;