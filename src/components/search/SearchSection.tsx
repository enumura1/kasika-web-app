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
          className="max-w-3xl mx-auto mb-16"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              AIが最適な図解を提案します
            </h3>
            <p className="text-slate-600 mb-8">
              チャットでの説明内容を入力してください。
              AIがあなたの意図を理解し、ぴったりな図解テンプレートを見つけます。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="例：新規事業の立ち上げプロセスを説明したい..."
                  className="w-full pl-12 pr-24 py-4 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 bg-white shadow-sm text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 rounded-xl transition-all ${
                    searchQuery.trim() 
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                  disabled={!searchQuery.trim()}
                >
                  <span className="font-medium">検索</span>
                </button>
              </div>
            </form>
          </motion.div>
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
