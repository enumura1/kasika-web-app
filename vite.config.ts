import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // ベンダーチャンクの分割
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // 必要に応じて他のライブラリも分割可能
        },
      },
    },
    // テキスト圧縮の設定
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // console.logの削除
        drop_debugger: true // debuggerの削除
      }
    },
    assetsInlineLimit: 4096, // 4kb以下の画像をbase64にインライン化
    modulePreload: {
      polyfill: true
    },
  },
  plugins: [
    react(),
    {
      name: 'configure-response-headers',
      configureServer: (server) => {
        server.middlewares.use((_, res, next) => {
          res.setHeader(
            "Content-Security-Policy", 
            "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; connect-src 'self' https://qebi6s2uqc.execute-api.ap-northeast-1.amazonaws.com/dev/post-message"
          );
          res.setHeader("X-Content-Type-Options", "nosniff");
          res.setHeader("X-Frame-Options", "DENY");
          res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
          next();
        });
      },
    },
    visualizer({
      open: true,  // ビルド後に自動でブラウザを開く
      filename: "buildStats.html",  // 出力するファイル名
      gzipSize: true,  // gzipサイズも表示
      brotliSize: true,  // brotliサイズも表示
      template: "treemap"
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
