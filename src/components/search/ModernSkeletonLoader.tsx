import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const ModernSkeletonLoader = () => {
  // シマーエフェクト用のスタイル
  const shimmer = {
    backgroundImage: 'linear-gradient(90deg, #f0f0f0 0px, #fafafa 40px, #f0f0f0 80px)',
    backgroundSize: '600px',
  };

  return (
    <div className="space-y-8">
      {/* プログレスインジケーター */}
      <div className="max-w-md mx-auto px-4 sm:px-0">
        <motion.div 
          className="bg-blue-50 rounded-xl p-4 border border-blue-100"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Search className="h-5 w-5 text-blue-500" />
            </motion.div>
            <span className="text-blue-600 font-medium text-sm sm:text-base">AIが最適なテンプレートを検索中...</span>
          </div>
          <motion.div 
            className="h-1 bg-blue-200 rounded-full mt-3 overflow-hidden"
          >
            <motion.div
              className="h-full bg-blue-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{ 
                width: "100%",
                transition: { duration: 2, repeat: Infinity }
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* 推奨フォーマットセクション */}
      <div className="space-y-4">
        <motion.div 
          className="h-8 w-64 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg mx-4 sm:mx-0"
          style={shimmer}
          animate={{
            backgroundPosition: ["0px", "600px"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden"
            >
              <motion.div 
                className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl"
                animate={{
                  scale: [1, 1.02, 1],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 border-blue-200 border-t-blue-500"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="h-4 w-3/4 bg-slate-200 rounded mt-4 mx-auto"
                style={shimmer}
                animate={{
                  backgroundPosition: ["0px", "600px"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* 関連カテゴリーセクション */}
      <div className="space-y-4">
        <motion.div 
          className="h-8 w-48 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg mx-4 sm:mx-0"
          style={shimmer}
          animate={{
            backgroundPosition: ["0px", "600px"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl p-4 flex items-center space-x-4"
            >
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-300"
                animate={{
                  scale: [1, 1.05, 1],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
              <div className="space-y-2 flex-1">
                <motion.div 
                  className="h-4 w-24 bg-slate-200 rounded"
                  style={shimmer}
                  animate={{
                    backgroundPosition: ["0px", "600px"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div 
                  className="h-3 w-32 bg-slate-200 rounded"
                  style={shimmer}
                  animate={{
                    backgroundPosition: ["0px", "600px"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernSkeletonLoader;
