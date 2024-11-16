import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { SvgViewer } from '../svg/SvgViewer';
import { Link } from '@tanstack/react-router';
import { Download, Edit } from 'lucide-react';

interface TemplatePreviewProps {
  template: {
    content: string;
    title?: string;
    id?: string;
  };
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  const handleDownload = async (format: 'svg' | 'webp' | 'png') => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(template.content, 'image/svg+xml');
      const svgElement = doc.querySelector('svg');
      
      if (!svgElement) return;

      const svgData = new XMLSerializer().serializeToString(svgElement);
      
      if (format === 'svg') {
        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `template.${format}`;
        a.click();
        URL.revokeObjectURL(url);
        return;
      }

      const svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(svgBlob);
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const svgSize = svgElement.viewBox.baseVal;
        canvas.width = svgSize.width;
        canvas.height = svgSize.height;
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
                a.download = `template.${format}`;
                a.click();
                URL.revokeObjectURL(downloadUrl);
              }
            },
            `image/${format}`,
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

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="aspect-video bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <SvgViewer content={template.content} className="w-full h-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <div className="p-4">
          {template.title && (
            <h2 className="text-xl font-semibold mb-4">{template.title}</h2>
          )}
          <div className="w-full aspect-video bg-white rounded-lg border border-slate-200">
            <SvgViewer content={template.content} className="w-full h-full" />
          </div>
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="lg"
                  variant="outline" 
                  className="w-full sm:w-[160px] h-12 rounded-xl font-semibold shadow-sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  ダウンロード
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem onClick={() => handleDownload('svg')}>
                  SVGとして保存
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload('webp')}>
                  WebPとして保存
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDownload('png')}>
                  PNGとして保存
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              asChild
              size="lg"
              variant="default"
              className="w-full sm:w-[160px] h-12 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold shadow-sm"
            >
              <Link to={`/editor/${template.id}`}>
                <Edit className="h-4 w-4 mr-2" />
                編集する
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
