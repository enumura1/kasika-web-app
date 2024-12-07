import { motion } from 'framer-motion';
import { Card, CardContent } from "./card";

export const TemplatesSkeleton = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[800px]">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.8 }}
            animate={{
              opacity: [0.8, 0.4, 0.8],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                {/* テンプレートプレビュー部分 */}
                <div className="aspect-video rounded-lg mb-6 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
                
                {/* タイトル部分 */}
                <div className="space-y-3">
                  <div className="h-6 bg-slate-100 rounded-md w-3/4" />
                  <div className="h-4 bg-slate-100 rounded-md w-1/2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  };
