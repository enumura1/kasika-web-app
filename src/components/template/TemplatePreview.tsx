import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { SvgViewer } from '../svg/SvgViewer';
import { Link } from '@tanstack/react-router';

interface TemplatePreviewProps {
  template: {
    content: string;
    title?: string;
    id?: string;
  };
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="aspect-video bg-blue-50 rounded-lg">
          <SvgViewer content={template.content} className="w-full h-full" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
      <div className="p-4">
          {template.title && (
            <h2 className="text-xl font-semibold mb-4">{template.title}</h2>
          )}
          <div className="w-full aspect-video bg-white rounded-lg">
            <SvgViewer content={template.content} className="w-full h-full" />
          </div>
          <div className="mt-6 text-center">
            <Link
              to={`/editor/${template.id}`}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              テンプレートを編集する
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
