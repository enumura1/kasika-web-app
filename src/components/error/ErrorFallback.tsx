// src/components/error/ErrorFallback.tsx
import { useNavigate } from '@tanstack/react-router'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { RefreshCw } from 'lucide-react'

export function ErrorComponent() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">
              申し訳ありません
            </h2>
            <p className="text-slate-600">
              アプリケーションで問題が発生しました。しばらく時間をおいて再度お試しください。
            </p>
            <Button 
              onClick={() => {
                navigate({ to: '/' })
                window.location.reload()
              }}
            >
              <RefreshCw className="w-4 h-4" />
              再読み込み
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
