import { createAuthor } from "@/app/actions/authors";
import Header from '@/components/Header';
import AuthorForm from "@/components/AuthorForm";

export default function AuthorsCreatePage() {
    return (
        <div>
            <Header />
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16 dark:bg-gray-600">
                <AuthorForm formAction={createAuthor} initialData={{ firstName: '', lastName: '', description: '' }} />
            </div>
        </div>
    );
}