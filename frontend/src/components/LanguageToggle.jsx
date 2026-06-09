import React from 'react';
import { FiGlobe } from 'react-icons/fi';

const LanguageToggle = ({ language, setLanguage }) => {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1.5 shadow-sm">
      <button
        onClick={() => setLanguage('english')}
        className={`language-pill ${language === 'english' ? 'active' : ''}`}
        type="button"
      >
        <FiGlobe size={14} /> English
      </button>
      <button
        onClick={() => setLanguage('pidgin')}
        className={`language-pill ${language === 'pidgin' ? 'active' : ''}`}
        type="button"
      >
        <FiGlobe size={14} /> Pidgin
      </button>
    </div>
  );
};

export default LanguageToggle;
