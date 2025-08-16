import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold mb-4 text-gray-800 dark:text-gray-200">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Página não encontrada</h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">A página que você está procurando não existe ou foi movida.</p>
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          aria-label="Voltar para a página inicial"
        >
          ← Voltar ao Início
        </Link>
      </div>
    </div>
  );
}