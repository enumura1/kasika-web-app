export type Category = {
  id: number;
  name: string;
  icon: string;
  templateCount: number;
  description: string;
};

export const categories: Category[] = [
  { 
    id: 1, 
    name: "提案・説明", 
    icon: "💡", 
    templateCount: 1,
    description: "アイデアや企画を分かりやすく図解化" 
  },
  { 
    id: 2, 
    name: "比較・検討", 
    icon: "⚖️", 
    templateCount: 2,
    description: "選択肢の比較や検討材料を整理" 
  },
  { 
    id: 3, 
    name: "問題・課題整理", 
    icon: "🎯", 
    templateCount: 3,
    description: "問題の構造化と解決策の検討" 
  },
  { 
    id: 4, 
    name: "プロセス・手順", 
    icon: "🔄", 
    templateCount: 4,
    description: "作業の流れや手順を視覚化" 
  },
  { 
    id: 5, 
    name: "構造・関係性", 
    icon: "🔗", 
    templateCount: 5,
    description: "要素間の関係や構造を図示" 
  },
  { 
    id: 6, 
    name: "状況・進捗共有", 
    icon: "📊", 
    templateCount: 6,
    description: "現状や進捗状況を簡潔に可視化" 
  },
  { 
    id: 7, 
    name: "意思決定・合意形成", 
    icon: "🤝", 
    templateCount: 7,
    description: "判断材料と結論を明確に整理" 
  },
  { 
    id: 8, 
    name: "分析・考察", 
    icon: "🔍", 
    templateCount: 8,
    description: "データや事象の分析結果を図解" 
  },
  { 
    id: 9, 
    name: "概念・アイデア整理", 
    icon: "💭", 
    templateCount: 9,
    description: "抽象的な概念やアイデアを構造化" 
  },
  { 
    id: 10, 
    name: "ゴール・計画設定", 
    icon: "🎯", 
    templateCount: 10,
    description: "目標と実現プランを明確に図示" 
  },
  { 
    id: 11, 
    name: "システム構成", 
    icon: "🏗️", 
    templateCount: 11,
    description: "アーキテクチャやインフラ構成を図示" 
  },
  { 
    id: 12, 
    name: "データフロー", 
    icon: "⚡", 
    templateCount: 12,
    description: "データの流れやAPI連携を可視化" 
  }
];
