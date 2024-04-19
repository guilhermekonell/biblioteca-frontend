import { Link } from "react-router-dom";
import { Book, BookOpen, Library } from "lucide-react";

export function Sidebar() {
  return (
    <div className="flex flex-col h-full min-w-64 border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex w- h-16 items-center justify-between px-4 border-b">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <BookOpen className="h-6 w-6" />
          <span>Biblioteca</span>
        </Link>
      </div>
      <nav className="flex flex-col space-y-1 px-4 py-6">
        <div className="space-y-2">
          <h4 className="px-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Biblioteca
          </h4>
          <Link
            to="/shelf"
            className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
          >
            <Library className="h-5 w-5" />
            Estantes
          </Link>
          <Link
            to="/book"
            className="flex items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
          >
            <Book className="h-5 w-5" />
            Livros
          </Link>
        </div>
      </nav>
    </div>
  );
}
