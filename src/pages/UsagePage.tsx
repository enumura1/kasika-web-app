import { motion } from 'framer-motion';
import { ArrowLeft, Search, ArrowRight, Edit, Sparkles, Share2, Download, Palette } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Link } from '@tanstack/react-router';

export function UsagePage() {
  window.scrollTo(0, 0);
  const editorFeatures = [
    {
      title: "基本操作",
      description: "ズーム調整、元に戻す/やり直し、補助線表示など、直感的な操作が可能",
      icon: <Edit className="h-5 w-5 text-blue-400" />
    },
    {
      title: "スタイル編集",
      description: "色や線の太さ、テキストの配置など、細かなスタイル調整が可能",
      icon: <Palette className="h-5 w-5 text-blue-400" />
    },
    {
      title: "エクスポート",
      description: "SVG、WebP、PNG、JPEG形式での保存に対応",
      icon: <Download className="h-5 w-5 text-blue-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* ヘッダー */}
      <header className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              to="/"
              className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-blue-600" />
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              使い方ガイド
            </h1>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-12">
        {/* イントロセクション */}
        <section className="max-w-4xl mx-auto text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-slate-800 mb-6"
          >
            4ステップで、テキストチャットの内容を
            <br />
            分かりやすい図解に変換
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            カシカは、ビジネスチャットでの説明を図解でサポートするツールです。
            <br />
            チャットの内容を入力するだけで、AIが最適な図解を提案します。
          </motion.p>
        </section>

        {/* ステップセクション */}
        <section className="max-w-6xl mx-auto mb-20">
          {/* ステップ1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-medium">
                  Step 1
                </span>
                <h3 className="text-2xl font-bold text-slate-800">
                  アイデアを入力
                </h3>
                <p className="text-slate-600">
                  伝えたい内容を自然な文章で入力してください。
                  事業計画、組織図、プロセス説明など、どんな内容でもOKです。
                </p>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="例：新規事業の立ち上げプロセスを説明したい..."
                    className="w-full pl-12 pr-4 py-3 border border-blue-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 bg-white"
                    readOnly
                  />
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 aspect-video flex items-center justify-center">
                <Edit className="h-20 w-20 text-blue-400" />
              </div>
            </div>
          </motion.div>
          {/* ステップ2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="md:order-2 space-y-6">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-medium">
                  Step 2
                </span>
                <h3 className="text-2xl font-bold text-slate-800">
                  AIが最適な図解を提案
                </h3>
                <p className="text-slate-600">
                  AIがあなたの入力内容を分析し、最適な図解フォーマットを提案。
                  複数の候補から、ぴったりな形式を選べます。
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-blue-50 rounded-lg p-4 aspect-video flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-blue-400" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:order-1 bg-blue-50 rounded-xl p-6 aspect-video flex items-center justify-center">
                <Sparkles className="h-20 w-20 text-blue-400" />
              </div>
            </div>
          </motion.div>

          {/* ステップ3：エディタ機能 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-medium">
                  Step 3
                </span>
                <h3 className="text-2xl font-bold text-slate-800">
                  エディタで編集
                </h3>
                <p className="text-slate-600">
                  直感的なエディタで図解を自由にカスタマイズ。
                  豊富な編集機能で思い通りの表現が可能です。
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  {editorFeatures.map((feature, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-2">
                        {feature.icon}
                        <h4 className="font-semibold">{feature.title}</h4>
                      </div>
                      <p className="text-sm text-slate-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 aspect-video flex items-center justify-center">
                <Edit className="h-20 w-20 text-blue-400" />
              </div>
            </div>
          </motion.div>

          {/* ステップ4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="md:order-2 space-y-6">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full font-medium">
                  Step 4
                </span>
                <h3 className="text-2xl font-bold text-slate-800">
                  保存して活用
                </h3>
                <p className="text-slate-600">
                  作成した図解をSVG、WebP、PNG形式で保存。
                  プレゼンテーションやドキュメントにすぐに活用できます。
                </p>
                <div className="flex space-x-4">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                    エクスポート
                  </button>
                  <button className="px-6 py-3 border border-blue-200 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors">
                    共有する
                  </button>
                </div>
              </div>
              <div className="md:order-1 bg-blue-50 rounded-xl p-6 aspect-video flex items-center justify-center">
                <Share2 className="h-20 w-20 text-blue-400" />
              </div>
            </div>
          </motion.div>
        </section>
        {/* 使用例セクション */}
        <section className="max-w-6xl mx-auto mb-20">
          <h3 className="text-2xl font-bold text-slate-800 text-center mb-12">
            さまざまな場面で活用できます
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {
            [
              {
                title: "システム設計",
                description: "システム構成やデータフローを視覚的に表現",
                examples: ["アーキテクチャ図", "シーケンス図", "ER図"]
              },
              {
                title: "プロジェクト進行",
                description: "プロジェクトの状況や進め方を共有",
                examples: ["ガントチャート", "マイルストーン", "タスクフロー"]
              },
              {
                title: "提案・改善",
                description: "アイデアや改善案の説明",
                examples: ["比較図", "Before/After", "ロードマップ"]
              }
            ].map((use, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold text-slate-800 mb-4">
                      {use.title}
                    </h4>
                    <p className="text-slate-600 mb-4">{use.description}</p>
                    <ul className="space-y-2">
                      {use.examples.map((ex, i) => (
                        <li key={i} className="flex items-center text-sm text-slate-500">
                          <ArrowRight className="h-4 w-4 mr-2 text-blue-400" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTAセクション */}
        <section className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-br from-blue-600 to-blue-400 text-white">
            <CardContent className="p-12">
              <h3 className="text-2xl font-bold mb-4">
                さっそく試してみましょう
              </h3>
              <p className="text-blue-50 mb-8">
                カシカを使って、あなたのアイデアを魅力的な図解に変えてみませんか？
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                >
                  <span>使ってみる</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 カシカ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
