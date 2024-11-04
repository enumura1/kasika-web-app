import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { SvgViewer } from '../svg/SvgViewer';

interface TemplatePreviewProps {
  template: {
    content: string;
    title?: string;
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
