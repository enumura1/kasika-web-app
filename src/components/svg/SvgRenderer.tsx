import { useEffect, useRef } from 'react';

interface SvgRendererProps {
  content: string;
  onRef: (el: SVGSVGElement | null) => void;
  onElementSelect?: (element: SVGElement) => void;
  onElementChange?: (elementId: string, key: string, value: string) => void;
}

export function SvgRenderer({ content, onRef, onElementSelect }: SvgRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');

    if (!(svgElement instanceof SVGSVGElement)) {
      onRef(null);
      return;
    }

    // クリーンアップと新しいSVGの追加
    container.innerHTML = '';
    container.appendChild(svgElement);
    svgRef.current = svgElement;

    // SVG要素のスタイル設定
    svgElement.style.width = '100%';
    svgElement.style.height = '100%';
    svgElement.style.display = 'block';

    // 要素へのイベントリスナー追加
    const elements = svgElement.getElementsByTagName('*');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element instanceof SVGElement) {
        if (!element.id) {
          element.id = `element-${i}`;
        }
        element.style.cursor = 'pointer';
        element.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          onElementSelect?.(element);
        });
      }
    }

    onRef(svgElement);

    return () => {
      container.innerHTML = '';
    };
  }, [content, onRef, onElementSelect]);

  return <div ref={containerRef} className="w-full h-full" />;
}