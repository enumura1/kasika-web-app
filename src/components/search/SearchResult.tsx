import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { ArrowLeft, Search } from 'lucide-react';
import { categories } from '../../data/categories';

import { TemplatePreview } from '../template/TemplatePreview';
import { useTemplates } from '../../hooks/useTemplates';


// 検索結果の型定義
type SearchResult = {
  formatId: number;
  title: string;
  description: string;
  category: typeof categories[0];
  svg: string;
};

// スケルトンローダーコンポーネント
const SkeletonLoader = () => (
  <div className="space-y-8">
    <div className="space-y-4">
      <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-slate-200 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
    <div className="space-y-4">
      <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-slate-200 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  </div>
);

interface SearchResultProps {
  searchQuery: string;
  onBack: () => void;
}

export function SearchResult({ searchQuery, onBack }: SearchResultProps) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [relatedCategories, setRelatedCategories] = useState<typeof categories>([]);
  const { templates } = useTemplates();

  // 疑似的な検索処理
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      // 擬似的な遅延
      await new Promise(resolve => setTimeout(resolve, 1500));

      // ランダムにカテゴリを選択
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      
      // 疑似的な検索結果を生成
      const mockResults: SearchResult[] = [
        {
          formatId: 1,
          title: `${randomCategory.name}のフローチャート`,
          description: "プロセスを視覚的に表現",
          category: randomCategory,
          svg: "/* SVG string */"
        },
        {
          formatId: 2,
          title: `${randomCategory.name}のマインドマップ`,
          description: "アイデアを構造化",
          category: randomCategory,
          svg: "/* SVG string */"
        },
        {
          formatId: 3,
          title: `${randomCategory.name}の概念図`,
          description: "関係性を明確に表現",
          category: randomCategory,
          svg: "/* SVG string */"
        }
      ];

      // ランダムに関連カテゴリを選択
      const shuffledCategories = [...categories]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      setResults(mockResults);
      setRelatedCategories(shuffledCategories);
      setLoading(false);
    };

    fetchResults();
  }, [searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 py-8"
    >
      {/* 検索ヘッダー */}
      <div className="mb-8 flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-blue-600" />
        </motion.button>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
          <input
            type="text"
            value={searchQuery}
            readOnly
            className="w-full pl-12 pr-4 py-3 border border-blue-200 rounded-2xl bg-white shadow-sm"
          />
        </div>
      </div>

      {/* 検索結果 */}
      <AnimatePresence mode="wait">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {/* 推奨フォーマット */}
            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                推奨フォーマット
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {results.map((result) => (
                  <motion.div
                    key={result.formatId}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="cursor-pointer hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <TemplatePreview 
                          template={{
                            content: templates.find(t => t.categoryId === result.category.id)?.content || templates[0].content,
                            title: result.title
                          }} 
                        />
                        <h3 className="font-semibold text-lg mb-2">{result.title}</h3>
                        <p className="text-slate-600 text-sm">{result.description}</p>
                        <div className="mt-4 flex items-center space-x-2">
                          <span className="text-2xl">{result.category.icon}</span>
                          <span className="text-sm text-slate-500">{result.category.name}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 関連カテゴリー */}
            <section>
              <h2 className="text-xl font-semibold text-slate-800 mb-6">
                関連カテゴリー
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedCategories.map((category) => (
                  <motion.div
                    key={category.id}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="cursor-pointer hover:shadow-lg transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <h3 className="font-semibold">{category.name}</h3>
                            <p className="text-sm text-slate-500">{category.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 再検索ボタン */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span>別のキーワードで検索</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}