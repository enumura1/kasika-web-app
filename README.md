# カシカ - ビジネスチャットを図解で分かりやすく

カシカは、ビジネスチャットでの説明を図解でサポートするAIアシスタントです。AIによる図解テンプレートの提案と編集機能を提供するWebアプリケーションです。

[デモサイト](https://kasika-web-app.vercel.app/)

## 主な機能

### 1. AIによる図解サポート
- チャットの内容を入力すると、AIが最適な図解テンプレートを提案
- 多様な図解テンプレートに対応（システム構成図、フロー図、アイデア比較図など）
- RAGを活用した効率的なテンプレート検索

### 2. 直感的な編集機能
- ドラッグ&ドロップで要素の配置を調整
- 色やサイズ、線の太さなどを自由にカスタマイズ
- SVG、PNG、JPEG形式での出力に対応

## 技術スタック

### フロントエンド
- Vite
- React/TypeScript
- shadcn/ui
- Tailwind CSS
- Framer Motion（アニメーション）

### バックエンド
- AWS
  - API Gateway
  - Lambda
  - Bedrock (Claude)
  - ECR
  - S3
  - CloudWatch
  - EventBridge
- scikit-learn（テンプレート検索最適化）

### 開発環境
- Docker

## ライセンス
- 
