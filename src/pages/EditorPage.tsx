import { ArrowLeft, Download, ZoomIn, ZoomOut, Grid, Undo, Redo } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link, useSearch } from '@tanstack/react-router';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { SvgRenderer } from '../components/svg/SvgRenderer';

interface SvgElement {
  type: 'rect' | 'circle' | 'text' | 'path';
  id: string;
  attributes: Record<string, string>;
  textContent?: string;
}

interface Template {
  id: string;
  summary: string;
  categoryId: number;
  content: string;
}

interface RouteParams {
  templateId: string;
}

interface SearchParams {
  svg?: string;
}

export function EditorPage() {
  const params = { templateId: window.location.pathname.split('/').pop() } as RouteParams;
  const { svg } = useSearch({ from: '/editor/generated' }) as SearchParams;
  const [selectedElement, setSelectedElement] = useState<SvgElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null) as React.MutableRefObject<SVGSVGElement | null>;
  const containerRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [exportFormat, setExportFormat] = useState<'svg'|'webp'|'png'|'jpeg'>('webp');
  const [history, setHistory] = useState<Array<string>>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        setLoading(true);
        if (svg) {
          // スタンダードプランの生成SVGの場合
          setTemplate(svg);
          setHistory([svg]);
          setCurrentIndex(0);
        } else {
          // 通常のテンプレートの場合
          const response = await fetch('/templates.json');
          const data = await response.json();
          const targetTemplate = data.templates.find((t: Template) => t.id === params.templateId);
          
          if (!targetTemplate) {
            setError('テンプレートが見つかりませんでした');
            return;
          }
    
          setTemplate(targetTemplate.content);
          setHistory([targetTemplate.content]);
          setCurrentIndex(0);
        }
      } catch (err) {
        setError('テンプレートの読み込みに失敗しました');
        console.error('Failed to load template:', err);
      } finally {
        setLoading(false);
      }
    };
  
    loadTemplate();
  }, [params.templateId, svg]);

  const handleElementSelect = (element: SVGElement) => {
    const attributes = Array.from(element.attributes).reduce((acc, attr) => ({
      ...acc,
      [attr.name]: attr.value
    }), {} as Record<string, string>);

    setSelectedElement({
      type: element.tagName.toLowerCase() as SvgElement['type'],
      id: element.id,
      attributes,
      textContent: element.textContent || ''
    });
  };

  const handleElementChange = (elementId: string, key: string, value: string) => {
    if (!svgRef.current) return;
    
    const element = svgRef.current.querySelector(`#${elementId}`);
    if (!element) return;
  
    if (key === 'textContent' && element instanceof SVGTextElement) {
      element.textContent = value;
    } else {
      (element as SVGElement).setAttribute(key, value);
    }
  
    // 状態を更新
    setSelectedElement(prev => {
      if (!prev) return null;
      if (key === 'textContent') {
        return { ...prev, textContent: value };
      }
      return {
        ...prev,
        attributes: { ...prev.attributes, [key]: value }
      };
    });
  
    // 新しいSVGの状態を取得
    const updatedSvgData = new XMLSerializer().serializeToString(svgRef.current);

    // 履歴に追加（現在の状態以降の履歴を削除して新しい状態を追加）
    setHistory(prev => [...prev.slice(0, currentIndex + 1), updatedSvgData]);
    setCurrentIndex(prev => prev + 1);
    
    setTemplate(updatedSvgData);
  };

  const handleSvgRef = (element: SVGSVGElement | null) => {
    if (element && containerRef.current) {
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(element);
      svgRef.current = element;
    }
  };

  const handleDownload = async () => {
    if (!svgRef.current) return;
  
    try {
      const svgData = new XMLSerializer().serializeToString(svgRef.current);
      
      if (exportFormat === 'svg') {
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'diagram.svg';
        a.click();
        URL.revokeObjectURL(url);
        return;
      }
  
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = svgRef.current?.viewBox.baseVal.width || 800;
        canvas.height = svgRef.current?.viewBox.baseVal.height || 600;
        const ctx = canvas.getContext('2d');
  
        if (ctx) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
  
          const quality = exportFormat === 'jpeg' ? 0.85 : 0.9;
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const downloadUrl = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = `diagram.${exportFormat}`;
                a.click();
                URL.revokeObjectURL(downloadUrl);
              }
            },
            `image/${exportFormat}`,
            quality
          );
        }
        URL.revokeObjectURL(url);
      };
  
      img.src = url;
    } catch (error) {
      console.error('Failed to convert SVG:', error);
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(200, prev + 25));
  const handleZoomOut = () => setZoom(prev => Math.max(25, prev - 25));

  const handleUndo = () => {
    if (currentIndex <= 0) return;
    
    const previousState = history[currentIndex - 1];
    setCurrentIndex(prev => prev - 1);
    setTemplate(previousState);
  };
  
  const handleRedo = () => {
    if (currentIndex >= history.length - 1) return;
    
    const nextState = history[currentIndex + 1];
    setCurrentIndex(prev => prev + 1);
    setTemplate(nextState);
  };
  
  // Undo/Redoが可能かどうかのフラグ
  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 bg-white border-b border-blue-100 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
              <ArrowLeft className="h-6 w-6 text-blue-600" />
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              図解エディター
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="md:col-span-2">
          <Card>
            <CardContent className="p-2 md:p-4">
                <div className="flex flex-col space-y-2 md:space-y-4">
                    <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-1.5">
                        <div className="flex items-center space-x-1 bg-slate-100 rounded-lg p-1">
                        <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                            <ZoomOut className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium w-9 text-center">{zoom}%</span>
                        <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                            <ZoomIn className="h-4 w-4" />
                        </Button>
                        </div>

                        <div className="flex items-center space-x-1 bg-slate-100 rounded-lg p-1">
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={handleUndo}
                                disabled={!canUndo}
                                className="tooltip-bottom px-1"
                                data-tooltip="元に戻す"
                            >
                                <Undo className="h-4 w-4" />
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={handleRedo}
                                disabled={!canRedo}
                                className="tooltip-bottom px-1"
                                data-tooltip="やり直す"
                            >
                                <Redo className="h-4 w-4" />
                            </Button>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowGrid(!showGrid)}
                            className={`tooltip-bottom px-1 ${showGrid ? 'bg-blue-100' : ''}`}
                            data-tooltip="補助線の表示/非表示"
                            >
                            <Grid className="h-4 w-4" />
                        </Button>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="px-2"
                        >
                            <Download className="h-4 w-4" />
                            <span className="ml-1.5 hidden md:inline">エクスポート</span>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {setExportFormat('png'); handleDownload();}}>
                              PNGとして保存
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {setExportFormat('jpeg'); handleDownload();}}>
                            JPEGとして保存
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {setExportFormat('svg'); handleDownload();}}>
                              SVGとして保存
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {setExportFormat('webp'); handleDownload();}}>
                              WebPとして保存
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* キャンバス */}
                <div className="overflow-auto bg-white rounded-lg border-2 border-dashed border-slate-200">
                    <div 
                    className={`aspect-video ${showGrid ? 'bg-grid bg-opacity-10' : ''}`}
                    style={{
                        transform: `scale(${zoom/100})`,
                        transformOrigin: '0 0',
                        width: `${100 * (100/zoom)}%`,
                        height: `${100 * (100/zoom)}%`,
                        minWidth: '100%',
                        minHeight: '100%'
                    }}
                    >
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                        </div>
                    ) : template ? (
                        <div ref={containerRef} className="w-full h-full">
                        <SvgRenderer 
                            content={template} 
                            onRef={handleSvgRef}
                            onElementSelect={handleElementSelect}
                            onElementChange={handleElementChange}
                        />
                        </div>
                    ) : null}
                    </div>
                </div>
                </div>
            </CardContent>
            </Card>
          </div>
  
          {/* 右側：プロパティパネル */}
          <div className="md:col-span-1">
            <Tabs defaultValue="properties" className="sticky top-20">
              <TabsList className="w-full">
                <TabsTrigger value="properties" className="flex-1">プロパティ</TabsTrigger>
                <TabsTrigger value="style" className="flex-1">スタイル</TabsTrigger>
              </TabsList>
  
              <TabsContent value="properties">
                <Card>
                  <CardContent className="p-4">
                    {selectedElement ? (
                      <div className="space-y-4">
                        <div className="text-sm text-slate-500 pb-2 border-b">
                          選択中の要素: {selectedElement.type}
                        </div>
  
                        {selectedElement.type === 'text' && (
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              テキスト内容
                            </label>
                            <input
                              type="text"
                              value={selectedElement.textContent || ''}
                              onChange={(e) => handleElementChange(selectedElement.id, 'textContent', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                            />
                          </div>
                        )}
  
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              X座標
                            </label>
                            <input
                              type="number"
                              value={selectedElement.attributes.x || 0}
                              onChange={(e) => handleElementChange(selectedElement.id, 'x', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Y座標
                            </label>
                            <input
                              type="number"
                              value={selectedElement.attributes.y || 0}
                              onChange={(e) => handleElementChange(selectedElement.id, 'y', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                            />
                          </div>
                        </div>
  
                        {/* 特殊なプロパティのカスタム入力UI */}
                        {selectedElement.type === 'text' && (
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              テキスト配置
                            </label>
                            <select
                              value={selectedElement.attributes['text-anchor'] || 'start'}
                              onChange={(e) => handleElementChange(selectedElement.id, 'text-anchor', e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                            >
                              <option value="start">左揃え</option>
                              <option value="middle">中央揃え</option>
                              <option value="end">右揃え</option>
                            </select>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-slate-500 text-center py-8">
                        要素を選択してください
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
  
              <TabsContent value="style">
                <Card>
                  <CardContent className="p-4">
                    {selectedElement ? (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            塗りつぶし色
                          </label>
                          <div className="grid grid-cols-6 gap-2">
                            {['#ffffff', '#f0f9ff', '#60a5fa', '#1e40af', '#64748b', '#000000'].map(color => (
                              <button
                                key={color}
                                className={`w-8 h-8 rounded-full border-2 ${
                                  selectedElement.attributes.fill === color ? 'border-blue-500' : 'border-slate-200'
                                }`}
                                style={{ backgroundColor: color }}
                                onClick={() => handleElementChange(selectedElement.id, 'fill', color)}
                              />
                            ))}
                          </div>
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            線の色
                          </label>
                          <div className="grid grid-cols-6 gap-2">
                            {['#60a5fa', '#1e40af', '#64748b', '#000000'].map(color => (
                              <button
                                key={color}
                                className={`w-8 h-8 rounded-full border-2 ${
                                  selectedElement.attributes.stroke === color ? 'border-blue-500' : 'border-slate-200'
                                }`}
                                style={{ backgroundColor: color }}
                                onClick={() => handleElementChange(selectedElement.id, 'stroke', color)}
                              />
                            ))}
                          </div>
                        </div>
  
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            線の太さ
                          </label>
                          <Slider
                            value={[parseInt(selectedElement.attributes['stroke-width'] || '1')]}
                            onValueChange={([value]) => handleElementChange(selectedElement.id, 'stroke-width', value.toString())}
                            min={1}
                            max={10}
                            step={1}
                            className="w-full"
                          />
                          <div className="text-sm text-slate-500 mt-1 text-center">
                            {selectedElement.attributes['stroke-width'] || 1}px
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-slate-500 text-center py-8">
                        要素を選択してください
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
