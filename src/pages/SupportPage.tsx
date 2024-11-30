// src/pages/SupportPage.tsx
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, PlusCircle, MinusCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';

export function SupportPage() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: "カシカの使い方を教えて下さい。",
      answer: "使い方は XXX/usage ページに記載しております。ご参照ください。"
    },
    {
      id: 2,
      question: "エディターページの基本操作を教えてください。",
      answer: "エディターページでは左上のメニューから基本操作が可能です。ズームイン/アウトで図解の表示サイズを調整できます。元に戻す/やり直すボタンで変更履歴を操作できます。グリッドボタンで補助線の表示/非表示を切り替えできます。また、エクスポートボタンからSVG、WebP、PNG形式での保存が可能です。"
    },
    {
      id: 3,
      question: "図解の要素を編集するにはどうすればよいですか？",
      answer: "編集したい要素をクリックして選択すると、右側のパネルにプロパティが表示されます。テキストの場合は内容、位置、配置方法を変更できます。図形の場合は位置、サイズ、色を調整できます。"
    },
    {
      id: 4,
      question: "スタイルの変更方法を教えてください。",
      answer: "右側パネルの「スタイル」タブから塗りつぶし色の変更、線の色の変更、線の太さの調整が可能です。"
    },
    {
      id: 5,
      question: "編集した図解フォーマットの保存方法を教えてください。",
      answer: "右上の「エクスポート」ボタンからSVG、WebP、PNG、JPEG形式で保存できます。"
    },
    {
      id: 6,
      question: "図解フォーマットできますか？",
      answer: "現在、図解フォーマットの編集機能は実装されておりません。今後のアップデートにご期待ください。"
    },
    {
      id: 7,
      question: "参考にしたいテンプレートの見つけ方がわかりません。",
      answer: "XXXページの検索ボックスからやりたい事をご入力し検索していただければ、適したフォーマットをAIが複数表示いたします。また、フォーマットのカテゴリからテンプレート一覧も確認いただくことも可能です。"
    },
    {
      id: 8,
      question: "図解のテンプレートは追加されますか？",
      answer: "定期的に新しいテンプレートを追加しています。"
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
              サポート
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* イントロセクション */}
        <section className="max-w-4xl mx-auto text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-slate-800 mb-6"
          >
            お困りの際は、こちらをご確認ください
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600"
          >
            よくある質問や各種お問い合わせ方法をご案内しています
          </motion.p>
        </section>

        {/* FAQセクション */}
        <section id="qa" className="max-w-3xl mx-auto mb-20">
          <h3 className="text-2xl font-bold text-slate-800 text-center mb-12">
            よくある質問
          </h3>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: faq.id * 0.1 }}
              >
                <Card className="cursor-pointer hover:shadow-md transition-all">
                  <CardContent className="p-6">
                    <div 
                      className="flex justify-between items-center"
                      onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}
                    >
                      <h4 className="font-semibold text-slate-800">{faq.question}</h4>
                      {openFaqId === faq.id ? 
                        <MinusCircle className="h-5 w-5 text-blue-500" /> :
                        <PlusCircle className="h-5 w-5 text-blue-500" />
                      }
                    </div>
                    {openFaqId === faq.id && (
                      <motion.p 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 text-slate-600"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* お問い合わせセクション */}
        <section id="contact" className="max-w-6xl mx-auto mb-20">
            <h3 className="text-2xl font-bold text-slate-800 text-center mb-12">
                お問い合わせ方法
            </h3>
            <div className="flex justify-center">
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                >
                <Card className="h-full w-full ">
                    <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6 justify-center">
                        <div className="p-3 bg-blue-50 rounded-xl">
                        <Mail className="h-8 w-8 text-blue-500" />
                        </div>
                        <h4 className="text-xl font-semibold text-slate-800">
                        メールでのお問い合わせ
                        </h4>
                    </div>
                    <p className="text-slate-600 mb-6">
                        詳細な内容やご要望について、メールでご連絡ください。
                    </p>
                    <p className="text-slate-600 mb-6 text-center">
                        連絡先:XXX@xXXXXX
                    </p>
                    </CardContent>
                </Card>
                </motion.div>
            </div>
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