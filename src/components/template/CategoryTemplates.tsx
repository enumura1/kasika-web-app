import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { TemplatePreview } from './TemplatePreview';
import { useTemplates } from '../../hooks/useTemplates';
import type { Category } from '../../data/categories';

interface CategoryTemplatesProps {
  category: Category;
  onBack: () => void;
}

export function CategoryTemplates({ category, onBack }: CategoryTemplatesProps) {
  const { templates } = useTemplates();
  
  // カテゴリーに対応するテンプレートのタイトルバリエーション
  const templateVariations = [
    { title: `${category.name}のフローチャート`, description: "プロセスを視覚的に表現" },
    { title: `${category.name}のマインドマップ`, description: "アイデアを構造化" },
    { title: `${category.name}の概念図`, description: "関係性を明確に表現" },
    { title: `${category.name}の比較図`, description: "要素の比較を可視化" },
    { title: `${category.name}のタイムライン`, description: "時系列での表現" },
    { title: `${category.name}のマトリックス`, description: "多次元での分析" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      {/* ヘッダー */}
      <div className="mb-8 flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-6 w-6 text-blue-600" />
        </motion.button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center space-x-3">
            <span className="text-3xl">{category.icon}</span>
            <span>{category.name}</span>
          </h2>
          <p className="text-slate-600 mt-1">{category.description}</p>
        </div>
      </div>

      {/* テンプレート一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templateVariations.map((template, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <TemplatePreview 
                  template={{
                    content: templates?.[0]?.content || '',
                    title: template.title
                  }} 
                />
                <h3 className="font-semibold text-lg mt-4 mb-2">{template.title}</h3>
                <p className="text-slate-600 text-sm">{template.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
