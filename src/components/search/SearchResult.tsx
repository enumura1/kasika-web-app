import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { ArrowLeft, Search } from 'lucide-react';
import { categories } from '../../data/categories';
import { TemplatePreview } from '../template/TemplatePreview';

// Template型の定義
type Template = {
  id: string;           // テンプレートID (例: "1-1")
  summary: string;      // テンプレートの説明
  categoryId: number;   // 関連するカテゴリーID
  content: string;      // SVGコンテンツ
};

// APIレスポンスの型定義
type APIResponse = {
  matched_id_1: string;
  matched_id_2: string;
  matched_id_3: string;
};

// 検索結果の型定義
type SearchResult = {
  templateId: string;
  title: string;
  description: string;
  category: typeof categories[0];
  templateContent: string;
};

interface SearchResultProps {
  searchQuery: string;
  onBack: () => void;
  onCategorySelect?: (category: typeof categories[0]) => void;
}

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

export function SearchResult({ searchQuery, onBack, onCategorySelect = () => {} }: SearchResultProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [relatedCategories, setRelatedCategories] = useState<typeof categories>([]);
  const [templates, setTemplates] = useState<Template[]>([]);

  // テンプレートデータの取得
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/templates.json');
        const data = await response.json();
        setTemplates(data.templates);
      } catch (err) {
        console.error('Failed to load templates:', err);
        setError('テンプレートの読み込みに失敗しました');
      }
    };
    
    fetchTemplates();
  }, []);

  // APIリクエストを行う関数
  const fetchRecommendedTemplates = async (query: string): Promise<APIResponse> => {
    try {
      const response = await fetch(import.meta.env.VITE_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify({
          user_input: query
        })
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      const data = await response.json();
      return {
        matched_id_1: data.matched_id_1,
        matched_id_2: data.matched_id_2,
        matched_id_3: data.matched_id_3
      };
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  // 検索結果を生成する関数
  const generateSearchResults = (
    apiResponse: APIResponse, 
    templates: Template[]
  ): SearchResult[] => {
    const templateIds = [
      apiResponse.matched_id_1,
      apiResponse.matched_id_2,
      apiResponse.matched_id_3
    ];

    return templateIds
      .map(templateId => {
        const template = templates.find(t => t.id === templateId);
        if (!template) return null;

        const category = categories.find(c => c.id === template.categoryId);
        if (!category) return null;

        return {
          templateId,
          title: template.summary,
          description: category.description,
          category,
          templateContent: template.content
        };
      })
      .filter((result): result is SearchResult => result !== null);
  };

  // 検索実行の副作用
  useEffect(() => {
    const fetchResults = async () => {
      if (!templates.length) return;
      
      setLoading(true);
      setError(null);

      try {
        // APIリクエスト
        const apiResponse = await fetchRecommendedTemplates(searchQuery);
        
        // 検索結果の生成
        const searchResults = generateSearchResults(apiResponse, templates);

        if (searchResults.length === 0) {
          setError('検索結果が見つかりませんでした。別のキーワードをお試しください。');
          return;
        }

        // 関連カテゴリーの設定
        const usedCategoryIds = searchResults.map(result => result.category.id);
        const availableCategories = categories.filter(c => !usedCategoryIds.includes(c.id));
        const shuffledCategories = availableCategories
          .sort(() => Math.random() - 0.5)
          .slice(0, 3);

        setResults(searchResults);
        setRelatedCategories(shuffledCategories);
      } catch (err) {
        setError('検索中にエラーが発生しました。もう一度お試しください。');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery, templates]);

  if (error) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={onBack}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          検索画面に戻る
        </button>
      </div>
    </div>
  );
}

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
                推奨フォーマット {results.length === 0 && "(該当なし)"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {results.map((result) => (
                  <motion.div
                    key={result.templateId}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="cursor-pointer hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <TemplatePreview 
                          template={{
                            content: result.templateContent,
                            title: result.title,
                            id:result.templateId
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
                    <Card 
                      className="cursor-pointer hover:shadow-lg transition-all"
                      onClick={() => onCategorySelect(category)}
                    >
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
