import React from 'react';
import { FiGlobe } from 'react-icons/fi';

const LanguageToggle = ({ language, setLanguage }) => {
  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
      <button
        onClick={() => setLanguage('english')}
        className={`
          flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200
          ${language === 'english' 
            ? 'bg-white text-green-700 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
          }
        `}
      >
        English
      </button>
      <button
        onClick={() => setLanguage('pidgin')}
        className={`
          flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200
          ${language === 'pidgin' 
            ? 'bg-white text-green-700 shadow-sm' 
            : 'text-gray-600 hover:text-gray-900'
          }
        `}
      >
        Pidgin
      </button>
    </div>
  );
};

export default LanguageToggle;