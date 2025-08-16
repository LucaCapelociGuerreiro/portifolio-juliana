'use client';

import { useLanguage } from '../context/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);
  const secondItemRef = useRef<HTMLButtonElement>(null);

  const languageNames = {
    en: { short: 'EN', full: 'English', flag: '/flags/usa.svg' },
    pt: { short: 'PT', full: 'Português', flag: '/flags/brazil.svg' },
  };

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Acessibilidade: teclas no botão
  const onButtonKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(true);
      // foca o primeiro item
      setTimeout(() => firstItemRef.current?.focus(), 0);
    }
  }, []);

  // Acessibilidade: teclas na lista
  const onMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      buttonRef.current?.focus();
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (document.activeElement === firstItemRef.current) {
        secondItemRef.current?.focus();
      } else {
        firstItemRef.current?.focus();
      }
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (document.activeElement === secondItemRef.current) {
        firstItemRef.current?.focus();
      } else {
        secondItemRef.current?.focus();
      }
    }
  }, []);

  const toggleDropdown = () => setIsOpen((v) => !v);

  const handleLanguageChange = (lang: 'en' | 'pt') => {
    setLanguage(lang);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        onKeyDown={onButtonKeyDown}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60"
        aria-label="Alterar idioma"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <Image 
          src={languageNames[language].flag} 
          alt={`${languageNames[language].full} Flag`} 
          width={20} 
          height={15} 
          className="rounded-sm"
        />
        <span className="font-medium">{languageNames[language].short}</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-600 dark:text-gray-300 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 z-50"
          role="menu"
          aria-orientation="vertical"
          onKeyDown={onMenuKeyDown}
        >
          <div className="py-1">
            <button
              ref={firstItemRef}
              className={`w-full text-left block px-4 py-2 text-sm rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 ${
                language === 'en'
                  ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleLanguageChange('en')}
              role="menuitem"
            >
              <div className="flex items-center gap-2">
                <Image 
                  src={languageNames.en.flag} 
                  alt="USA Flag" 
                  width={20} 
                  height={15} 
                  className="rounded-sm"
                />
                <span className="font-semibold">EN</span>
                <span>{languageNames.en.full}</span>
              </div>
            </button>
            <button
              ref={secondItemRef}
              className={`w-full text-left block px-4 py-2 text-sm rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/60 ${
                language === 'pt'
                  ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => handleLanguageChange('pt')}
              role="menuitem"
            >
              <div className="flex items-center gap-2">
                <Image 
                  src={languageNames.pt.flag} 
                  alt="Brazil Flag" 
                  width={20} 
                  height={15} 
                  className="rounded-sm"
                />
                <span className="font-semibold">PT</span>
                <span>{languageNames.pt.full}</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
