import type { authors } from '@prisma/client'
import { Prisma } from '@prisma/client';
import { prisma } from '../../../lib/prisma'
import { notFound } from 'next/navigation'

export type AuthorWithBooks = Prisma.authorsGetPayload<{
    include: {
        books: true;
    }
}>;

export async function fetchAuthors(): Promise<authors[]> {
    return await prisma.authors.findMany({
        orderBy: [
            {
                firstName: 'desc',
            }
        ],
    })
}

export async function fetchAuthorsById(id: number): Promise<authors | null> {
    const author = await prisma.authors.findFirst({
        where: {
            id
        }
    })

    if (!author) {
        notFound()
    }

    return author
}

export async function fetchAuthorsByIdWithBooks(id: number): Promise<AuthorWithBooks | null> {
    const author = await prisma.authors.findFirst({
        where: {
            id
        },
        include:{
            books:true
        }
    })

    if (!author) {
        notFound()
    }

    return author
}