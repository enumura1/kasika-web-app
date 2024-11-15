import { ArrowLeft, Download, ZoomIn, ZoomOut, Grid } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
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

export function EditorPage() {
  const params = { templateId: window.location.pathname.split('/').pop() } as RouteParams;
  const [selectedElement, setSelectedElement] = useState<SvgElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null) as React.MutableRefObject<SVGSVGElement | null>;
  const containerRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(false);
  const [exportFormat, setExportFormat] = useState<'svg'|'webp'|'png'>('webp');

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        setLoading(true);
        const response = await fetch('/templates.json');
        const data = await response.json();
        const targetTemplate = data.templates.find((t: Template) => t.id === params.templateId);
        
        if (!targetTemplate) {
          setError('テンプレートが見つかりませんでした');
          return;
        }

        setTemplate(targetTemplate.content);
      } catch (err) {
        setError('テンプレートの読み込みに失敗しました');
        console.error('Failed to load template:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTemplate();
  }, [params.templateId]);

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
  
    const updatedSvgData = new XMLSerializer().serializeToString(svgRef.current);
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
            0.9
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
            <Link 
              to="/"
              className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-blue-600" />
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              図解エディター
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
              <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">{zoom}%</span>
              <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowGrid(!showGrid)}
              className={showGrid ? 'bg-blue-100' : ''}
            >
              <Grid className="h-4 w-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-blue-600 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  エクスポート
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => {setExportFormat('svg'); handleDownload();}}>
                  SVG形式
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {setExportFormat('webp'); handleDownload();}}>
                  WebP形式
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => {setExportFormat('png'); handleDownload();}}>
                  PNG形式
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <Card>
              <CardContent className="p-4 overflow-hidden">
                <div 
                  className={`aspect-video bg-white rounded-lg border-2 border-dashed border-slate-200 relative overflow-auto ${
                    showGrid ? 'bg-grid bg-opacity-10' : ''
                  }`}
                  style={{
                    transform: `scale(${zoom/100})`,
                    transformOrigin: 'top left'
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
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1">
            <Tabs defaultValue="properties">
              <TabsList className="w-full">
                <TabsTrigger value="properties" className="flex-1">プロパティ</TabsTrigger>
                <TabsTrigger value="style" className="flex-1">スタイル</TabsTrigger>
              </TabsList>

              <TabsContent value="properties">
                <Card>
                  <CardContent className="p-4">
                    {selectedElement ? (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            要素の種類
                          </label>
                          <div className="text-slate-600">
                            {selectedElement.type}
                          </div>
                        </div>

                        {selectedElement.type === 'text' && (
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              テキスト
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

                        {Object.entries(selectedElement.attributes)
                          .filter(([key]) => !['x', 'y', 'id'].includes(key))
                          .map(([key, value]) => (
                            <div key={key}>
                              <label className="block text-sm font-medium text-slate-700 mb-1">
                                {key}
                              </label>
                              <input
                                type={['width', 'height'].includes(key) ? 'number' : 'text'}
                                value={value}
                                onChange={(e) => handleElementChange(selectedElement.id, key, e.target.value)}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                              />
                            </div>
                          ))}
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
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            塗りつぶし色
                          </label>
                          <div className="flex space-x-2">
                            {['#f0f9ff', '#60a5fa', '#1e40af', '#ffffff'].map(color => (
                              <button
                                key={color}
                                className="w-8 h-8 rounded-full border-2 border-slate-200"
                                style={{ backgroundColor: color }}
                                onClick={() => handleElementChange(selectedElement.id, 'fill', color)}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            線の色
                          </label>
                          <div className="flex space-x-2">
                            {['#60a5fa', '#1e40af', '#000000'].map(color => (
                              <button
                                key={color}
                                className="w-8 h-8 rounded-full border-2 border-slate-200"
                                style={{ backgroundColor: color }}
                                onClick={() => handleElementChange(selectedElement.id, 'stroke', color)}
                              />
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">
                            線の太さ
                          </label>
                          <Slider
                            value={[parseInt(selectedElement.attributes['stroke-width'] || '1')]}
                            onValueChange={([value]) => handleElementChange(selectedElement.id, 'stroke-width', value.toString())}
                            min={1}
                            max={10}
                            step={1}
                          />
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
