'use client';
import { FC, ReactNode } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";


type Props = {
    children?: ReactNode,
}

const Header: FC<Props> = ({ children }) => {
    const { theme, setTheme } = useTheme();
    const pathname = usePathname()

    console.log(pathname)

    return (
        <nav className="sticky top-0 z-10 border-gray-200 bg-zinc-200  dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-5xl mx-auto px-4">

                <div className="flex items-center justify-between h-16 ">
                    <div className="flex space-x-4 text-gray-900">
                        {children}
                    </div>
                    <div className="flex space-x-4 text-gray-900 items-center">                        
                        <Link className={`hover:underline ${pathname === '/authors' ? 'text-sky-900  dark:text-yellow-500' : 'text-gray-900 dark:text-white'}`} href={`/authors`}>Authors</Link>

                        <Link className={`dark:text-white hover:underline ${pathname === '/books' ? 'text-sky-900 dark:text-yellow-500' : 'text-gray-900'}`} href={`/books`}>Books</Link>

                        <button onClick={() => theme == "dark" ? setTheme('light') : setTheme("dark")}
                            className="h-10 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                            <svg className="fill-sky-700 block dark:hidden" fill="currentColor" viewBox="0 0 25 25">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                            </svg>
                            <svg className="fill-yellow-500 hidden dark:block" fill="currentColor" viewBox="0 0 25 25">
                                <path
                                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                    fillRule="evenodd" clipRule="evenodd"></path>
                            </svg>
                        </button>

                        <a href="https://github.com/Pimenova-N" target="_blank" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">GitHub account</span>
                        </a>
                    </div>

                </div>
            </div>
        </nav>

    )
}

export default Header;