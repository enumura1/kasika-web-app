import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { SearchResult } from './SearchResult';
import { categories } from '../../data/categories'; 

interface SearchSectionProps {
  onCategorySelect: (category: typeof categories[0]) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}


export function SearchSection({ onCategorySelect, inputRef }: SearchSectionProps)  {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
    }
  };

  const handleBack = () => {
    setIsSearching(false);
    setSearchQuery("");
  };

  return (
    <AnimatePresence mode="wait">
      {!isSearching ? (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="max-w-xl mx-auto mb-16"
        >
          <motion.h3 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-semibold text-slate-800 mb-4 text-center"
          >
            あなたの考えを入力してください
          </motion.h3>
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
              <input
                ref={inputRef}
                type="text"
                placeholder="例：新規事業の立ち上げプロセスを説明したい..."
                className="w-full pl-12 pr-24 py-3 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 bg-white shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 rounded-xl transition-all ${
                  searchQuery.trim() 
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
                disabled={!searchQuery.trim()}
              >
                <span className="font-medium text-sm">検索</span>
              </button>
            </div>
          </form>
        </motion.section>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-full"
        >
          <SearchResult 
           searchQuery={searchQuery}
           onBack={handleBack} 
           onCategorySelect={onCategorySelect}/>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
