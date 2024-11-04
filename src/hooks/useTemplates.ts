// 型定義を追加
type Template = {
  id: string;
  summary: string;
  categoryId: number;
  content: string;
};

type TemplatesData = {
  templates: Template[];
};

import { useState, useEffect } from 'react';

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('/templates.json')
      .then(response => response.json())
      .then((data: TemplatesData) => {
        setTemplates(data.templates);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { templates, loading, error };
}

export type { Template, TemplatesData };
