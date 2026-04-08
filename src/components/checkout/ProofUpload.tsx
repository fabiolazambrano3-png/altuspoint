'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Upload, FileCheck, X } from 'lucide-react';

interface ProofUploadProps {
  onFileSelect: (file: File | null) => void;
}

export default function ProofUpload({ onFileSelect }: ProofUploadProps) {
  const t = useTranslations('checkout');
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (ev) => setPreview(ev.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const clearFile = () => {
    setPreview(null);
    setFileName('');
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t('upload_proof')}
      </label>

      {!fileName ? (
        <label className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue transition-colors">
          <Upload className="w-8 h-8 text-gray-400" />
          <span className="text-sm text-gray-500">{t('upload_hint')}</span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      ) : (
        <div className="border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium truncate">{fileName}</span>
            </div>
            <button onClick={clearFile} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          {preview && (
            <img src={preview} alt="Preview" className="mt-3 rounded-lg max-h-48 object-contain" />
          )}
        </div>
      )}
    </div>
  );
}
