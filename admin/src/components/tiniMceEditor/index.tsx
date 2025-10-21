'use client';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import type { Editor as TinyMCEEditor } from 'tinymce';

interface TinyEditorProps {
  value?: string;
  height?: number;
  onChange?: (content: string) => void;
  onBlur?: () => void;
}

export default function TinyEditor({ value, height = 400, onChange, onBlur }: TinyEditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_API_TINYMCE || ''}
      value={value}
      onInit={(_, editor) => (editorRef.current = editor)}
      init={{
        height,
        menubar: false,
        plugins: 'lists link image table code',
        toolbar:
          'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | code',
        directionality: 'ltr', 
        forced_root_block_attrs: { dir: 'ltr' },
        content_style: `
          body { direction: ltr; text-align: left; font-family: Helvetica, Arial, sans-serif; }
          p, div, span { direction: ltr; text-align: left; }
        `,
      }}
      onEditorChange={(content: string) => onChange?.(content)}
      onBlur={onBlur}
    />
  );
}
