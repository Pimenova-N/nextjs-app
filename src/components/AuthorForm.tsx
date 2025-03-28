'use client'

import Link from "next/link"
import { useActionState } from "react"

interface FormErrors {
    firstName?: string[],
    lastName?: string[],
    description?: string[],
}

interface FormState {
    errors: FormErrors,
}

interface AuthorFormProps {
    formAction: any,
    initialData: {
        firstName: string,
        lastName: string,
        description: string,
    },
}

export default function AuthorForm({ formAction, initialData }: AuthorFormProps) {
    const [formState, action] = useActionState<FormState>(formAction, {
        errors: {},
    })

    return <div className="m-2 p-5 relative flex flex-col bg-white dark:bg-gray-700 dark:text-white shadow-sm rounded-lg ">
        <h1 className="mb-4  text-xl font-semibold text-center text-sky-900 dark:text-yellow-500 ">{initialData.firstName ? 'Update' : 'Create'} Author</h1>        
        <form action={action}>
            <div className="w-96">
                <div className="mb-4">
                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                    <input type="text" id="firstName" name="firstName" defaultValue={initialData.firstName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />


                    {
                        formState.errors.firstName
                        && <div className="text-red-500">
                            {formState.errors.firstName?.join(', ')}
                        </div>
                    }
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                    <input type="text" id="lastName" name="lastName" defaultValue={initialData.lastName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    {
                        formState.errors.lastName
                        && <div className="text-red-500">
                            {formState.errors.lastName?.join(', ')}
                        </div>
                    }
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea id="description" rows={8} name="description" defaultValue={initialData.description} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
                    {
                        formState.errors.description
                        && <div className="text-red-500">
                            {formState.errors.description?.join(', ')}
                        </div>
                    }
                </div>
                <div className="mb-4 space-x-4">
                    <button type="submit" className="text-sky-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-yellow-500 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Save</button>
                    <Link href={`/authors/${1}`} className="rounded-md bg-slate-800 py-2 px-4 mt-6 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none">Cancel</Link>

                </div>
            </div>
        </form>
    </div>
}

