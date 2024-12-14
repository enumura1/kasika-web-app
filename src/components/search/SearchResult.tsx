import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { ArrowLeft, Search } from 'lucide-react';
import { categories } from '../../data/categories';
import { TemplatePreview } from '../template/TemplatePreview';
// import { SvgRenderer } from '../svg/SvgRenderer';
import ModernSkeletonLoader from './ModernSkeletonLoader';
import { Link } from '@tanstack/react-router';

// Template型の定義
type Template = {
  id: string;
  summary: string;
  categoryId: number;
  content: string;
};

// APIレスポンスの型定義
type DefaultModeResponse = {
  matched_id_1: string;
  matched_id_2: string;
  matched_id_3: string;
};

type StandardModeResponse = {
  svg_content: string;
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
  isStandardMode: boolean;
}

export function SearchResult({ 
  searchQuery, 
  onBack, 
  onCategorySelect = () => {}, 
  isStandardMode 
}: SearchResultProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [standardModeSvg, setStandardModeSvg] = useState<string | null>(null);
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
    
    if (!isStandardMode) {
      fetchTemplates();
    }
  }, [isStandardMode]);

  // APIリクエストを行う関数
  const fetchRecommendedTemplates = async (query: string, isStandard: boolean): Promise<DefaultModeResponse | StandardModeResponse> => {
    try {
      const endpoint = isStandard 
        ? import.meta.env.VITE_STANDARD_API_ENDPOINT 
        : import.meta.env.VITE_API_ENDPOINT;
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify({
          user_input: query,
          isStandardMode: isStandard
        })
      });
  
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
  
      const data = await response.json();
      // スタンダードモードの場合、bodyを再度パースする必要がある
      if (isStandard) {
        const parsedBody = JSON.parse(data.body);
        return {
          svg_content: parsedBody.svg_content
        };
      }
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  };

  // 検索結果を生成する関数
  const generateSearchResults = (
    apiResponse: DefaultModeResponse, 
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
      if (!isStandardMode && !templates.length) return;
      
      setLoading(true);
      setError(null);

      try {
        const apiResponse = await fetchRecommendedTemplates(searchQuery, isStandardMode);
        
        if (isStandardMode) {
          const standardResponse = apiResponse as StandardModeResponse;
          console.log('Standard mode response:', standardResponse);
          setStandardModeSvg(standardResponse.svg_content);
          setResults([]);
        } else {
          const defaultResponse = apiResponse as DefaultModeResponse;
          const searchResults = generateSearchResults(defaultResponse, templates);

          if (searchResults.length === 0) {
            setError('検索結果が見つかりませんでした。別のキーワードをお試しください。');
            return;
          }

          setResults(searchResults);
          
          // 関連カテゴリーの設定
          const usedCategoryIds = searchResults.map(result => result.category.id);
          const availableCategories = categories.filter(c => !usedCategoryIds.includes(c.id));
          const shuffledCategories = availableCategories
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

          setRelatedCategories(shuffledCategories);
        }
      } catch (err) {
        setError('検索中にエラーが発生しました。もう一度お試しください。');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchQuery, templates, isStandardMode]);

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
          <ModernSkeletonLoader />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            {isStandardMode ? (
              <section>
                <h2 className="text-xl font-semibold text-slate-800 mb-6">
                  生成された図解
                </h2>
                {standardModeSvg && (
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to="/editor/generated"
                      search={{ svg: standardModeSvg }}
                      className="block"
                    >
                      <Card className="cursor-pointer hover:shadow-lg transition-all">
                        <CardContent className="p-6">
                        <TemplatePreview 
                          template={{
                            content: standardModeSvg,
                            title: "生成された図解",
                            id: "generated"
                          }}
                        />
                          <h3 className="font-semibold text-lg mb-2 mt-4">図解を編集する</h3>
                          <p className="text-slate-600 text-sm">
                            クリックして図解エディターで編集を開始できます
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                )}
              </section>
            ) : (
              // デフォルトモードの表示
              <>
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
                                id: result.templateId
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
              </>
            )}

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