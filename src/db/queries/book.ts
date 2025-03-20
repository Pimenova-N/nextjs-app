import { prisma } from '../../../lib/prisma'
import { Prisma } from '@prisma/client';
import { notFound } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export type BookWithAuthor = Prisma.booksGetPayload<{
    include: {
        authors: true;
    }
}>

export async function fetchBookById(id: number, author_id: number): Promise<BookWithAuthor | null> {
    const book = await prisma.books.findFirst({
        where: {
            id,
            author_id
        },
        include: {
            authors: true,
        },
    })

    if (!book) {
        notFound()
    }

    return book
}

export async function fetchBooks(): Promise<BookWithAuthor[] | null> {
    const books = await prisma.books.findMany({
        include: {
            authors: true,
        },
    })

    if (!books) {
        notFound()
    }

    return books
}

export async function deleteBook( id: number,
    author_id: number,) {
    try{
     await prisma.books.delete({
        where: { id , author_id},
    })

} catch (error: unknown) {
    if (error instanceof Error) {
        return {
            errors: {
                _form: [error.message],
            },
        }
    }
    else {
        return {
            errors: {
                _form: ['Something went wrong'],
            },
        }
    }
}

revalidatePath('/')
redirect('/')
}