"use client";

import { useRef, useState } from "react";
import { CloudUpload, FileText, X } from "lucide-react";

interface FileItem {
  id: string;
  name: string;
  size: string;
}

export function FileUploadZone() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileItem[]>([
    { id: "1", name: "error-log.png", size: "245 KB" },
    { id: "2", name: "checkout-flow.pdf", size: "1.2 MB" },
  ]);

  function handleFiles(list: FileList | null) {
    if (!list) return;
    const next = Array.from(list).map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      size: file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.max(1, Math.round(file.size / 1024))} KB`,
    }));
    setFiles((prev) => [...prev, ...next]);
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Attachments</h3>
        <span className="text-xs text-muted">Max 50MB per file</span>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFiles(e.dataTransfer.files);
        }}
        className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-gray-50 px-4 py-10 text-center transition hover:border-primary/40 hover:bg-primary-soft/40"
      >
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-primary shadow-sm">
          <CloudUpload size={20} />
        </div>
        <p className="text-sm font-semibold text-primary">
          Click to upload or drag and drop
        </p>
        <p className="mt-1 text-xs text-muted">
          SVG, PNG, JPG, PDF or ZIP
        </p>
      </button>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".svg,.png,.jpg,.jpeg,.pdf,.zip"
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {files.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {files.map((file) => (
            <li
              key={file.id}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-3 py-2 text-sm"
            >
              <FileText size={14} className="text-primary" />
              <span className="max-w-[140px] truncate font-medium text-gray-800">
                {file.name}
              </span>
              <span className="text-xs text-muted">{file.size}</span>
              <button
                type="button"
                onClick={() => removeFile(file.id)}
                className="ml-1 rounded p-0.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label={`Remove ${file.name}`}
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
