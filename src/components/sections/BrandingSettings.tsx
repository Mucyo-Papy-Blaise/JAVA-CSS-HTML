import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import type { BrandingSettings } from '../../types';

interface BrandingSettingsProps {
  settings: BrandingSettings;
  onSave: (settings: BrandingSettings) => void;
}

export const BrandingSettings: React.FC<BrandingSettingsProps> = ({ 
  settings, 
  onSave 
}) => {
  const [formData, setFormData] = useState(settings);

  const handleColorChange = (field: 'primaryColor' | 'secondaryColor', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialLinkChange = (platform: keyof BrandingSettings['socialLinks'], value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const fontOptions = [
    { value: 'Inter', label: 'Inter (Modern Sans-serif)' },
    { value: 'Roboto', label: 'Roboto (Clean Sans-serif)' },
    { value: 'Open Sans', label: 'Open Sans (Friendly Sans-serif)' },
    { value: 'Lato', label: 'Lato (Humanist Sans-serif)' },
    { value: 'Merriweather', label: 'Merriweather (Serif)' },
    { value: 'Playfair Display', label: 'Playfair Display (Elegant Serif)' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Branding Settings</h2>
        
        {/* Color Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
            <Palette className="h-5 w-5" />
            <span>Brand Colors</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                  className="input-field flex-1"
                  placeholder="#3B82F6"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Used for buttons, links, and accents</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={formData.secondaryColor}
                  onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.secondaryColor}
                  onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                  className="input-field flex-1"
                  placeholder="#6B7280"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Used for secondary elements and text</p>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Typography</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Font Family
            </label>
            <select
              value={formData.fontFamily}
              onChange={(e) => setFormData(prev => ({ ...prev, fontFamily: e.target.value }))}
              className="input-field"
            >
              {fontOptions.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">This font will be used throughout the platform</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facebook
              </label>
              <input
                type="url"
                value={formData.socialLinks.facebook || ''}
                onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                className="input-field"
                placeholder="https://facebook.com/yourinstitution"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Twitter
              </label>
              <input
                type="url"
                value={formData.socialLinks.twitter || ''}
                onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                className="input-field"
                placeholder="https://twitter.com/yourinstitution"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                value={formData.socialLinks.linkedin || ''}
                onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                className="input-field"
                placeholder="https://linkedin.com/company/yourinstitution"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram
              </label>
              <input
                type="url"
                value={formData.socialLinks.instagram || ''}
                onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                className="input-field"
                placeholder="https://instagram.com/yourinstitution"
              />
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
          <div className="border border-gray-200 rounded-lg p-6" style={{ fontFamily: formData.fontFamily }}>
            <div className="flex items-center space-x-4 mb-4">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: formData.primaryColor }}
              ></div>
              <span style={{ color: formData.primaryColor }} className="font-medium">
                Primary Color Sample
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: formData.secondaryColor }}
              ></div>
              <span style={{ color: formData.secondaryColor }} className="font-medium">
                Secondary Color Sample
              </span>
            </div>
            <p className="mt-4 text-gray-600">
              This is how your text will appear with the selected font: {formData.fontFamily}
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button onClick={handleSave} className="btn-primary">
            Save Branding Settings
          </button>
        </div>
      </div>
    </div>
  );
};