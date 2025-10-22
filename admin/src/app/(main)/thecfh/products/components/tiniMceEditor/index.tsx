'use client';

import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef } from 'react';
import type { Editor as TinyMCEEditor } from 'tinymce';

interface TinyEditorProps {
  value?: string;
	height?: number;
  onChange?: (content: string) => void;
  onBlur?: () => void;
}

export default function TinyEditor({ value, height=400, onChange, onBlur }: TinyEditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  useEffect(() => {
    // Force LTR direction on mount
    const style = document.createElement('style');
    style.textContent = `
      .tox-tinymce { direction: ltr !important; }
      .tox-edit-area { direction: ltr !important; }
      .tox-edit-area iframe { direction: ltr !important; }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_API_TINYMCE || ''}
      onInit={(_evt, editor) => {
        editorRef.current = editor;
        
        // Force LTR direction after editor init
        setTimeout(() => {
          const iframe = editor.getContainer().querySelector('iframe');
          if (iframe) {
            iframe.style.direction = 'ltr';
            iframe.contentDocument?.body?.setAttribute('dir', 'ltr');
            iframe.contentDocument?.body?.style.setProperty('direction', 'ltr', 'important');
            iframe.contentDocument?.body?.style.setProperty('unicode-bidi', 'normal', 'important');
          }
        }, 100);
      }}
      initialValue={value}
      init={{
        height,
        menubar: false,
        plugins: 'lists link image table code',
        toolbar:
          'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | code',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; direction: ltr !important; text-align: left !important; unicode-bidi: normal !important; } .tinymce-ltr { direction: ltr !important; } * { direction: ltr !important; unicode-bidi: normal !important; }',
        // Image upload configuration
        images_upload_handler: async (blobInfo, progress) => {
          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            
            // Upload to your API endpoint
            fetch('/api/upload-image', {
              method: 'POST',
              body: formData,
            })
            .then(response => response.json())
            .then(result => {
              if (result.success) {
                resolve(result.url);
              } else {
                reject(result.error);
              }
            })
            .catch(error => {
              reject(error.message);
            });
          });
        },
        // Enable file picker for images
        file_picker_types: 'image',
        file_picker_callback: (callback, value, meta) => {
          if (meta.filetype === 'image') {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            
            input.onchange = function() {
              const file = (this as HTMLInputElement).files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = function() {
                  callback(reader.result as string, {
                    alt: file.name
                  });
                };
                reader.readAsDataURL(file);
              }
            };
            
            input.click();
          }
        },
        // Image options
        image_advtab: true,
        image_caption: true,
        image_title: true,
        image_description: true,
        // Text direction - Force LTR
        directionality: 'ltr',
        text_direction: 'ltr',
        // HTML configuration
        html_direction: 'ltr',
        body_class: 'tinymce-ltr',
        // Force LTR in editor
        forced_root_block: 'p',
        forced_root_block_attrs: { dir: 'ltr' },
        // Language and locale
        language: 'en',
        language_url: '',
      }}
      onEditorChange={(content: string) => onChange?.(content)}
      onBlur={onBlur}
    />
  );
}
