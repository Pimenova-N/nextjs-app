'use server'
import { prisma } from '../../../lib/prisma'
import type { books } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const bookSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(10).max(4000),
})

interface BookFormState {
    errors: {
        title?: string[],
        description?: string[],
        _form?: string[],
    }
}

export async function createBook(
    author_id: number,
    formState: BookFormState,
    formData: FormData,    
): Promise<BookFormState> {
    const result = bookSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let book: books
    try {
        book = await prisma.books.create({
            data: {
                title: result.data.title,
                description: result.data.description,
                authors: { connect: { id: author_id } },
            }
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

    revalidatePath(`/authors/${author_id}`)
    redirect(`/authors/${author_id}`)
}

export async function updateBook(
    id: number,
    author_id: number,
    formState: BookFormState,
    formData: FormData
): Promise<BookFormState> {
    const result = bookSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let author: books
    try {
        author = await prisma.books.update({
            where: {id, author_id },            
            data: {
                title: result.data.title,
                description: result.data.description
            }
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

    revalidatePath(`/authors/${author_id}`)
    redirect(`/authors/${author_id}`)
}

export async function deleteBook(id: number, author_id: number){

    await prisma.books.delete({ where: { id, author_id }});    
    revalidatePath(`/authors/${author_id}`)
    redirect(`/authors/${author_id}`)

}

