// src/components/error/ErrorFallback.tsx
import { FallbackProps } from 'react-error-boundary';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { RefreshCw } from 'lucide-react';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">
              申し訳ありません
            </h2>
            <p className="text-slate-600">
              予期せぬエラーが発生しました。
            </p>
            <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 break-all">
              {error.message}
            </div>
            <Button 
              onClick={resetErrorBoundary}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              再読み込み
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
