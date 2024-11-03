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
    name: "プロジェクト管理", 
    icon: "📊", 
    templateCount: 8,
    description: "プロジェクトの計画や進捗を可視化" 
  },
  { 
    id: 2, 
    name: "ビジネスモデル", 
    icon: "💼", 
    templateCount: 6,
    description: "事業構造やビジネスプランの図解" 
  },
  { 
    id: 3, 
    name: "組織図", 
    icon: "🏢", 
    templateCount: 4,
    description: "組織構造や役割分担の整理" 
  },
  { 
    id: 4, 
    name: "プロセス", 
    icon: "⚙️", 
    templateCount: 7,
    description: "業務フローやワークフローの設計" 
  },
  { 
    id: 5, 
    name: "マインドマップ", 
    icon: "🧠", 
    templateCount: 5,
    description: "アイデアや概念の関係性を整理" 
  },
  { 
    id: 6, 
    name: "タイムライン", 
    icon: "📅", 
    templateCount: 4,
    description: "時系列での計画や実績の可視化" 
  },
  { 
    id: 7, 
    name: "フローチャート", 
    icon: "📈", 
    templateCount: 9,
    description: "処理の流れやロジックの図解" 
  },
  { 
    id: 8, 
    name: "ピラミッド", 
    icon: "🔺", 
    templateCount: 3,
    description: "階層構造や優先順位の整理" 
  },
  { 
    id: 9, 
    name: "マトリックス", 
    icon: "🎯", 
    templateCount: 5,
    description: "2軸での分析や評価の整理" 
  },
  { 
    id: 10, 
    name: "ベン図", 
    icon: "⭕", 
    templateCount: 4,
    description: "要素間の関係性や共通点の図解" 
  }
];
