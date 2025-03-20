import { prisma } from '../../../lib/prisma'
import Header from '@/components/Header';
import AuthorCard from '@/components/AuthorCard';
import Link from "next/link";

export default async function AuthorsPage() {

  const authors = await prisma.authors.findMany();

  return (
    <div>
      <Header>
        <Link className="hover:underline dark:text-white" href={`/authors/create`}> Add Author</Link>
      </Header>
      <div className="flex flex-wrap font-[family-name:var(--font-geist-sans)]">
        {authors.map((author) => (
          <AuthorCard author={author} key={author.id} />
        ))}
      </div>
    </div>
  );
}