import { updateAuthor } from "@/app/actions/authors";
import AuthorForm from "@/components/AuthorForm";
import { fetchAuthorsById } from "@/db/queries/authors"; 
import Header from '@/components/Header';

export default async function AuthorEditPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;
    const author = await fetchAuthorsById(parseInt(id));
    const updateAction = updateAuthor.bind(null, parseInt(id));

    return (
        <div>
             <Header/>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16 dark:bg-gray-600">
                <AuthorForm formAction={updateAction} initialData={{ firstName: author?.firstName ?? '', lastName: author?.lastName ?? '',
                    description: author?.description ?? ''
                 }} />
            </div>
        </div>

    );
}
