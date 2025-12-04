"use client"

import { useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface BlogEditorProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

export default function BlogEditor({ value, onChange }: BlogEditorProps) {
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link'],
      [{ 'align': [] }],
      ['clean']
    ],
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'blockquote', 'code-block',
    'link',
    'align'
  ];

  // Add custom styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .ql-container {
        min-height: 400px;
        font-size: 16px;
      }
      .ql-editor {
        min-height: 400px;
      }
      .ql-editor.ql-blank::before {
        color: #9ca3af;
        font-style: normal;
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Start writing your blog post..."
        className="bg-white"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
}

