import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, MoreHorizontal, ArrowRight } from 'lucide-react';
import { Link } from '@tanstack/react-router'
import { Card, CardContent } from "../components/ui/card";
import { SearchSection } from '../components/search/SearchSection';
import { CategoryTemplates } from '../components/template/CategoryTemplates';
import { ScrollToTop } from '../components/ui/scroll-to-top';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../components/ui/dialog";
import { categories } from "../data/categories";

export const HomePage = () => {
  const visibleCategories = categories.slice(0, 8);
  const hiddenCategories = categories.slice(8);
  const formatSectionRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
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

  const scrollToSearch = () => {
    if (searchInputRef.current) {
      const windowHeight = window.innerHeight;
      const elementRect = searchInputRef.current.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = absoluteElementTop - (windowHeight / 2) + (elementRect.height / 2);
      
      window.scrollTo({
        top: middle,
        behavior: 'smooth'
      });
    }
  };

  const handleCategoryClick = (category: typeof categories[0]) => {
    setSelectedCategory(category);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleAIAssistClick = () => {
    searchInputRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 500);
  };

  const SectionHeader = ({ title, description }: { title: string; description: string }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
        {title}
      </h2>
      <p className="text-lg text-slate-600 max-w-2xl mx-auto">
        {description}
      </p>
    </motion.div>
   );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
       <ScrollToTop />
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
                        <motion.div
                            whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                            >
                            <Link
                                to="/usage"
                                className="flex items-center space-x-2 p-2 rounded-lg cursor-pointer"
                            >
                                <span className="text-slate-700">使い方</span>
                            </Link>
                        </motion.div>
                        {/* カテゴリー一覧 */}
                        <div className="border-t border-blue-100 pt-4 mt-4">
                        <h3 className="text-sm text-slate-500 px-2 mb-2">カテゴリー</h3>
                        {categories.map((category) => (
                            <motion.div
                                key={category.id}
                                whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                                className="rounded-lg cursor-pointer"
                            >
                                <div
                                onClick={() => handleCategoryClick(category)}
                                className="flex items-center space-x-2 p-2"
                                >
                                <span>{category.icon}</span>
                                <span className="text-slate-700">{category.name}</span>
                                </div>
                            </motion.div>
                        ))}
                        </div>
                    </nav>
                    </DialogContent>
                </Dialog>

                <Link
                    to="/"
                    onClick={() => setSelectedCategory(null)}
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
                    >
                    カシカ
                </Link>
              </div>

              {/* デスクトップナビゲーションリンク */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                    to="/usage"
                    className="text-slate-600 hover:text-blue-600 transition-colors font-medium"
                    >
                    使い方
                </Link>
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
              onClick={scrollToSearch} 
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
      {!selectedCategory && (
        <section className="bg-gradient-to-br from-blue-600 to-blue-400 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold leading-tight"
                >
                  あなたのチャットを、
                  <br />
                  図解で分かりやすく
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-blue-50"
                >
                  カシカは、ビジネスチャットでの複雑な説明を
                  図解でサポートするアシスタントです。AIが
                  最適な図解テンプレートを提案し、あなたの
                  説明をより分かりやすくします。
                </motion.p>
                <motion.button 
                  onClick={scrollToSearch}
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
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg flex items-center justify-center min-h-[400px]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
                  <defs>
                    <linearGradient id="bgGradient" x1="0" y1="0" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EFF6FF" stopOpacity="0.6"/>
                      <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.3"/>
                    </linearGradient>
                  </defs>
                  <rect width="400" height="300" fill="url(#bgGradient)" rx="20"/>
                  
                  {/* グループ要素のy位置を90に変更して中央寄りに */}
                  <g transform="translate(50, 90)">
                    <rect x="0" y="0" width="300" height="24" rx="12" fill="#FFFFFF" opacity="0.9">
                      <animate 
                        attributeName="width" 
                        values="0;300" 
                        dur="1s" 
                        begin="0s;anim3.end+2s"
                        id="anim1"
                        fill="freeze"
                      />
                    </rect>
                    
                    <rect x="0" y="50" width="240" height="24" rx="12" fill="#FFFFFF" opacity="0.7">
                      <animate 
                        attributeName="width" 
                        values="0;240" 
                        dur="0.8s" 
                        begin="anim1.begin+0.3s;anim3.end+2.3s"
                        id="anim2"
                        fill="freeze"
                      />
                    </rect>
                    
                    <rect x="0" y="100" width="180" height="24" rx="12" fill="#FFFFFF" opacity="0.5">
                      <animate 
                        attributeName="width" 
                        values="0;180" 
                        dur="0.6s" 
                        begin="anim2.begin+0.3s;anim3.end+2.6s"
                        id="anim3"
                        fill="freeze"
                      />
                    </rect>
                  </g>
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

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
            <SearchSection 
              onCategorySelect={handleCategoryClick} 
              inputRef={searchInputRef}
            />

        {/* フォーマットセクション */}
        <section className="py-24">
          <div className="className=py-24">
            <SectionHeader
              title="図解フォーマット"
              description="12カテゴリ96種類のテンプレートから、最適な図解を選べます"
            />
            <div className="flex justify-end mb-8">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-blue-500 hover:text-blue-600 inline-flex items-center">
                    <span className="mr-2">すべて見る</span>
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
                                  <p className="text-sm text-slate-500">8 テンプレート</p>
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
                          8 テンプレート
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


        <section className="py-24">
          <SectionHeader
            title="ビジネスチャットの課題を解決"
            description="文字だけでは伝わりにくい複雑な説明も、図解を使えば簡単に共有できます"
          />
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-8 relative">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-50 rounded-full opacity-20 group-hover:scale-110 transition-transform" />
                  <div className="flex items-start space-x-6 relative z-10">
                    <div className="bg-blue-50 p-4 rounded-xl group-hover:bg-blue-100 transition-colors">
                      <span className="text-4xl">⚡️</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-slate-800 mb-3">
                        素早く正確に伝えたい
                      </h4>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        複雑な内容もAIが瞬時に理解し、最適な図解を提案。
                        チャットでの説明時間を大幅に削減できます。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <CardContent className="p-8 relative">
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-50 rounded-full opacity-20 group-hover:scale-110 transition-transform" />
                  <div className="flex items-start space-x-6 relative z-10">
                    <div className="bg-blue-50 p-4 rounded-xl group-hover:bg-blue-100 transition-colors">
                      <span className="text-4xl">🎯</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-slate-800 mb-3">
                        認識の齟齬を減らしたい
                      </h4>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        96種類のテンプレートを活用して視覚的に表現。
                        チーム全員が同じイメージを共有できます。
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* 使い方セクション */}
        <section className="py-24">
          <SectionHeader
            title="カシカの使い方"
            description="3つの簡単なステップで、あなたのチャットを分かりやすい図解に変換します"
          />
          <div className="flex justify-end mb-8">
              <Link 
                to="/usage"
                className="text-blue-500 hover:text-blue-600 flex items-center space-x-2"
              >
                <span>詳しい使い方を見る</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "✍️",
                title: "1. チャットの内容を入力",
                description: "ビジネスチャットでの会話や説明したい内容を入力してください。もしくは、図解フォーマットから使用したいテンプレートを選択できます。"
              },
              {
                icon: "🤖",
                title: "2. AIが分析",
                description: "入力内容から最適な図解テンプレートを提案します"
              },
              {
                icon: "✨",
                title: "3. 編集・完成",
                description: "提案された図解を編集して、チャットに添付してみましょう"
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
        <section className="py-24">
          <SectionHeader
            title="こんな場面で活用できます"
            description="ビジネスチャットでの様々なシーンで、コミュニケーションをサポートします"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🛠️",
                title: "ビジネス提案",
                description: "機能やフローの説明をビジュアル化"
              },
              {
                icon: "👥",
                title: "プロジェクト共有",
                description: "アイデアの共有やブレスト、状況の共有に"
              },
              {
                icon: "📚",
                title: "提案・レビュー",
                description: "アイデアや改善案の説明に"
              },
              {
                icon: "🔄",
                title: "プロセス改善",
                description: "業務改善や効率化の提案に"
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
                onClick={scrollToSearch}
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
                <li>
                  <Link 
                    to="/usage"
                    className="hover:text-white cursor-pointer" 
                  >
                    使い方
                  </Link>
                </li>
                <li><a href="#" className="hover:text-white">利用規約</a></li>
                <li><a href="#" className="hover:text-white">プライバシーポリシー</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">機能</h4>
              <ul className="space-y-2">
              <li>
                <motion.a
                  className="hover:text-white cursor-pointer"
                  onClick={() => formatSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                >
                  図解フォーマット
                </motion.a>
              </li>
                <li><motion.a
                  className="hover:text-white cursor-pointer"
                  onClick={handleAIAssistClick}
                >
                  AI支援機能
                </motion.a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">サポート</h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/support"
                    className="hover:text-white cursor-pointer" 
                  >
                    QA
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/support"
                    className="hover:text-white cursor-pointer"
                  >
                    お問い合わせ
                  </Link>
                </li>
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

