import React, { useState } from 'react';
import { Upload, Eye, Trash2, Star } from 'lucide-react';
import type { CertificateTemplate } from '../../types';

interface CertificateTemplatesProps {
  templates: CertificateTemplate[];
  onSave: (templates: CertificateTemplate[]) => void;
}

export const CertificateTemplates: React.FC<CertificateTemplatesProps> = ({ 
  templates, 
  onSave 
}) => {
  const [templateList, setTemplateList] = useState(templates);
  const [previewTemplate, setPreviewTemplate] = useState<CertificateTemplate | null>(null);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const newTemplate: CertificateTemplate = {
          id: Date.now().toString(),
          name: file.name.replace(/\.[^/.]+$/, ""),
          preview: result,
          isDefault: templateList.length === 0
        };
        const updatedTemplates = [...templateList, newTemplate];
        setTemplateList(updatedTemplates);
        onSave(updatedTemplates);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id: string) => {
    const updatedTemplates = templateList.filter(t => t.id !== id);
    setTemplateList(updatedTemplates);
    onSave(updatedTemplates);
  };

  const handleSetDefault = (id: string) => {
    const updatedTemplates = templateList.map(t => ({
      ...t,
      isDefault: t.id === id
    }));
    setTemplateList(updatedTemplates);
    onSave(updatedTemplates);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Certificate Templates</h2>
          <div>
            <input
              type="file"
              id="template-upload"
              accept="image/*,.pdf"
              onChange={handleUpload}
              className="hidden"
            />
            <label
              htmlFor="template-upload"
              className="inline-flex items-center space-x-2 btn-primary cursor-pointer"
            >
              <Upload className="h-4 w-4" />
              <span>Upload Template</span>
            </label>
          </div>
        </div>

        {templateList.length === 0 ? (
          <div className="text-center py-12">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates uploaded</h3>
            <p className="text-gray-500">Upload your first certificate template to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templateList.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-4">
                <div className="aspect-[4/3] bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 truncate">{template.name}</h3>
                  {template.isDefault && (
                    <span className="inline-flex items-center space-x-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      <Star className="h-3 w-3" />
                      <span>Default</span>
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPreviewTemplate(template)}
                    className="flex-1 inline-flex items-center justify-center space-x-1 text-sm btn-secondary"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Preview</span>
                  </button>
                  
                  {!template.isDefault && (
                    <button
                      onClick={() => handleSetDefault(template.id)}
                      className="px-3 py-2 text-sm text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                      title="Set as default"
                    >
                      <Star className="h-4 w-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete template"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">{previewTemplate.name}</h3>
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <img
                src={previewTemplate.preview}
                alt={previewTemplate.name}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};