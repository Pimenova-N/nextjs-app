'use server'

import { prisma } from '../../../lib/prisma'
import type { authors } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const authorSchema = z.object({
    firstName: z.string().min(3).max(255),
    lastName: z.string().min(3).max(255),
    description: z.string().min(10).max(4000),
})

interface AuthorFormState {
    errors: {
        firstName?: string[],
        lastName?: string[],
        description?: string[],
        _form?: string[],
    }
}

export async function createAuthor(
    formState: AuthorFormState,
    formData: FormData
): Promise<AuthorFormState> {
    const result = authorSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        description: formData.get('description'),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let author: authors
    try {
        author = await prisma.authors.create({
            data: {
                firstName: result.data.firstName,
                lastName: result.data.lastName,
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

    revalidatePath('/authors')
    redirect('/authors')
}

export async function updateAuthor(
    id: number,
    formState: AuthorFormState,
    formData: FormData
): Promise<AuthorFormState> {
    const result = authorSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        description: formData.get('description'),
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let author: authors
    try {
        author = await prisma.authors.update({
            where: {id},
            data: {
                firstName: result.data.firstName,
                lastName: result.data.lastName,
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

    revalidatePath('/authors')
    redirect('/authors')
}

export async function deleteAuthor(
    id: number,
): Promise<AuthorFormState> {
    let author: authors
    try {
        author = await prisma.authors.delete({
            where: { id },
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

    revalidatePath('/authors')
    redirect('/authors')
}