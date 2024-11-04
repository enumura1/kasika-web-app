interface SvgViewerProps {
    content: string;
    className?: string;
  }
  
  export function SvgViewer({ content, className = "" }: SvgViewerProps) {
    return (
      <div 
        className={className}
        ref={(el) => {
          if (el) {
            el.innerHTML = content;
            // SVGのサイズを親要素に合わせる
            const svg = el.querySelector('svg');
            if (svg) {
              svg.style.width = '100%';
              svg.style.height = '100%';
            }
          }
        }}
      />
    );
  }

