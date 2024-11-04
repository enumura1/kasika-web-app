import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, MoreHorizontal, ArrowRight } from 'lucide-react';
import { Card, CardContent } from "./components/ui/card";
import { SearchSection } from './components/search/SearchSection';
import { CategoryTemplates } from './components/template/CategoryTemplates';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "./components/ui/dialog";
import { categories } from "./data/categories";

const App = () => {
  const visibleCategories = categories.slice(0, 8);
  const hiddenCategories = categories.slice(8);
  const formatSectionRef = useRef<HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const scrollToFormats = () => {
    formatSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = (category: typeof categories[0]) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm">
        <div className="container mx-auto px-4">
          {/* メインナビゲーション */}
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              {/* ハンバーガーメニューとロゴ */}
              <div className="flex items-center space-x-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors md:hidden">
                    <Menu className="h-6 w-6 text-blue-600" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[300px] sm:left-0 sm:translate-x-0">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-slate-800">メニュー</h2>
                  </div>
                  <nav className="space-y-4">
                    {/* モバイルメニューリンク */}
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                      className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer"
                    >
                      <span className="text-slate-700">使い方</span>
                    </motion.a>
                    {/* カテゴリー一覧 */}
                    <div className="border-t border-blue-100 pt-4 mt-4">
                      <h3 className="text-sm text-slate-500 px-2 mb-2">カテゴリー</h3>
                      {categories.map((category) => (
                        <motion.div
                          key={category.id}
                          onClick={() => handleCategoryClick(category)}
                          whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                          className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer"
                        >
                          <span>{category.icon}</span>
                          <span className="text-slate-700">{category.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </nav>
                </DialogContent>
              </Dialog>

              <h1 
                onClick={() => setSelectedCategory(null)}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
              >
                カシカ
              </h1>
              </div>

              {/* デスクトップナビゲーションリンク */}
              <nav className="hidden md:flex items-center space-x-6">
                <a
                  href="#"
                  className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
                >
                  使い方
                </a>
                {/* カテゴリードロップダウン */}
                <div className="relative group">
                  <button className="text-slate-600 hover:text-blue-600 transition-colors font-medium flex items-center space-x-1">
                    <span>カテゴリ</span>
                    <motion.div
                      animate={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="h-4 w-4 rotate-90" />
                    </motion.div>
                  </button>

                  {/* カテゴリードロップダウンメニュー */}
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-blue-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      {categories.slice(0, 6).map((category) => (
                        <div
                          key={category.id}
                          onClick={() => handleCategoryClick(category)}
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          <span className="w-8 h-8 flex items-center justify-center bg-blue-50 rounded-lg">
                            {category.icon}
                          </span>
                          <div>
                            <span className="text-slate-700 font-medium">{category.name}</span>
                            <p className="text-xs text-slate-500">{category.description}</p>
                          </div>
                        </div>
                      ))}
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 hover:bg-blue-50 transition-colors text-blue-600 border-t border-blue-100">
                            <span className="font-medium">すべてのカテゴリーを表示</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <h3 className="text-lg font-semibold text-slate-800 mb-4">
                            すべてのカテゴリー
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {categories.map((category) => (
                              <div
                                key={category.id}
                                onClick={() => handleCategoryClick(category)}
                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                              >
                                <span className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg">
                                  {category.icon}
                                </span>
                                <div>
                                  <h4 className="font-medium text-slate-800">{category.name}</h4>
                                  <p className="text-sm text-slate-500">{category.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
              </nav>
            </div>

            {/* 右側のアクション */}
            <div className="flex items-center space-x-4">
            <button 
              onClick={scrollToFormats} 
              className="hidden md:flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <span className="font-medium">試してみる</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            </div>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-400 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold leading-tight"
              >
                あなたのアイデアを、
                <br />
                魅力的な図解に変換
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-blue-50"
              >
                カシカは、複雑な考えを分かりやすく伝えるための
                図解作成アシスタントです。AIがあなたの文章から
                最適な図解フォーマットを提案します。
              </motion.p>
              <motion.button 
                onClick={scrollToFormats}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-blue-50 transition-colors"
              >
                <span>クイックスタート</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative hidden md:block"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
                <div className="aspect-video bg-white/20 rounded-lg"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-12" ref={formatSectionRef}>
        {selectedCategory ? (
          <CategoryTemplates 
            category={selectedCategory} 
            onBack={() => setSelectedCategory(null)} 
          />
          ) : (
          <>
            {/* 検索セクション */}
            <SearchSection onCategorySelect={handleCategoryClick} />

        {/* フォーマットセクション */}
        <section>
  <div className="flex justify-between items-center mb-8">
    <h3 className="text-xl font-semibold text-slate-800">
      人気の図解フォーマット
    </h3>
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-blue-500 hover:text-blue-600 flex items-center space-x-1">
          <span>すべて見る</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category)}
              className="cursor-pointer hover:shadow-md transition-all"
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h4 className="font-semibold">{category.name}</h4>
                      <p className="text-sm text-slate-500">{category.templateCount} テンプレート</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  </div>

  <motion.div 
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="grid grid-cols-1 md:grid-cols-3 gap-6"
  >
    {visibleCategories.map((category) => (
      <motion.div
        key={category.id}
        variants={itemVariants}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={() => handleCategoryClick(category)}
      >
        <Card className="cursor-pointer hover:shadow-lg transition-all border-blue-100 hover:border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 p-3 rounded-xl">
                <span className="text-3xl">{category.icon}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  {category.name}
                </h3>
                <p className="text-sm text-blue-500">
                  {category.templateCount} テンプレート
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    ))}

    {hiddenCategories.length > 0 && (
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Card className="cursor-pointer hover:shadow-lg transition-all border-blue-100 hover:border-blue-200 bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <MoreHorizontal className="h-8 w-8 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      その他
                    </h3>
                    <p className="text-sm text-blue-500">
                      {hiddenCategories.length} カテゴリー
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <div className="grid grid-cols-1 gap-4 p-4">
              {hiddenCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className="cursor-pointer hover:shadow-md transition-all"
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <h4 className="font-semibold">{category.name}</h4>
                          <p className="text-sm text-slate-500">{category.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    )}
  </motion.div>
</section>

        {/* 使い方セクション */}
        <section className="mt-20">
          <h3 className="text-xl font-semibold text-slate-800 mb-8 text-center">
            カシカの使い方
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "✍️",
                title: "1. やりたい事を入力 or フォーマット選択",
                description: "伝えたい内容を文章で入力してくだい。もしくは、図解フォーマットから使用したいテンプレートを選択してください。"
              },
              {
                icon: "🤖",
                title: "2. AIが分析",
                description: "最適な図解フォーマットを自動で提案します"
              },
              {
                icon: "✨",
                title: "3. 編集・完成",
                description: "提案された図解を編集して完成させましょう"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="border-blue-100 hover:border-blue-200 transition-all">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-4">{step.icon}</div>
                    <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                    <p className="text-slate-600">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 活用例セクション */}
        <section className="mt-20">
          <h3 className="text-xl font-semibold text-slate-800 mb-8 text-center">
            こんな場面で活用できます
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "💼",
                title: "ビジネス提案",
                description: "企画書やプレゼン資料の作成に"
              },
              {
                icon: "👥",
                title: "チーム会議",
                description: "アイデアの共有やブレストに"
              },
              {
                icon: "📚",
                title: "学習・教育",
                description: "概念の整理や知識の体系化に"
              },
              {
                icon: "🎯",
                title: "目標設定",
                description: "計画立案や進捗管理に"
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-blue-100 h-full">
                  <CardContent className="p-6">
                    <div className="text-3xl mb-4">{useCase.icon}</div>
                    <h4 className="font-semibold text-lg mb-2">{useCase.title}</h4>
                    <p className="text-slate-600">{useCase.description}</p>
                    </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTAセクション */}
        <section className="mt-20 text-center">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-400 text-white">
            <CardContent className="p-12">
              <h3 className="text-2xl font-bold mb-4">
                今すぐアイデアを図解化しましょう
              </h3>
              <p className="text-blue-50 mb-8">
                カシカを使って、あなたの考えをより分かりやすく伝えてみませんか？
              </p>
              <motion.button 
                onClick={scrollToFormats}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold inline-flex items-center space-x-2 hover:bg-blue-50 transition-colors"
              >
                <span>使ってみる</span>
                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </CardContent>
          </Card>
        </section>
        </>
  )}
      </main>

      {/* フッター */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">カシカについて</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">概要</a></li>
                <li><a href="#" className="hover:text-white">利用規約</a></li>
                <li><a href="#" className="hover:text-white">プライバシーポリシー</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">機能</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">図解フォーマット</a></li>
                <li><a href="#" className="hover:text-white">AI支援機能</a></li>
                <li><a href="#" className="hover:text-white">テンプレート</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">サポート</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">ヘルプ</a></li>
                <li><a href="#" className="hover:text-white">お問い合わせ</a></li>
                <li><a href="#" className="hover:text-white">フィードバック</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">ソーシャル</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">X</a></li>
                <li><a href="#" className="hover:text-white">YouTube</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p>&copy; 2024 カシカ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;