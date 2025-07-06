import React, { useState } from 'react';
import { Bell, Mail, MessageSquare } from 'lucide-react';
import type { NotificationSettings } from '../../types';

interface NotificationSettingsProps {
  settings: NotificationSettings;
  onSave: (settings: NotificationSettings) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ 
  settings, 
  onSave 
}) => {
  const [formData, setFormData] = useState(settings);

  const handleToggle = (field: 'emailEnabled' | 'smsEnabled') => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleTemplateChange = (template: keyof NotificationSettings['templates'], value: string) => {
    setFormData(prev => ({
      ...prev,
      templates: {
        ...prev.templates,
        [template]: value
      }
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const ToggleSwitch: React.FC<{ enabled: boolean; onChange: () => void }> = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`toggle-switch ${enabled ? 'bg-primary-600' : 'bg-gray-200'}`}
    >
      <span className={`toggle-switch-handle ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Settings</h2>
        
        {/* Notification Channels */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notification Channels</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Send notifications via email</p>
                </div>
              </div>
              <ToggleSwitch 
                enabled={formData.emailEnabled} 
                onChange={() => handleToggle('emailEnabled')} 
              />
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                  <p className="text-sm text-gray-500">Send notifications via SMS</p>
                </div>
              </div>
              <ToggleSwitch 
                enabled={formData.smsEnabled} 
                onChange={() => handleToggle('smsEnabled')} 
              />
            </div>
          </div>
        </div>

        {/* Email Templates */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Templates</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Welcome Email Template
              </label>
              <textarea
                value={formData.templates.welcome}
                onChange={(e) => handleTemplateChange('welcome', e.target.value)}
                rows={4}
                className="input-field resize-none"
                placeholder="Welcome to {institution_name}! Your account has been created successfully..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Available variables: {'{student_name}'}, {'{institution_name}'}, {'{login_url}'}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Completion Template
              </label>
              <textarea
                value={formData.templates.courseCompletion}
                onChange={(e) => handleTemplateChange('courseCompletion', e.target.value)}
                rows={4}
                className="input-field resize-none"
                placeholder="Congratulations {student_name}! You have successfully completed {course_name}..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Available variables: {'{student_name}'}, {'{course_name}'}, {'{certificate_url}'}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reminder Template
              </label>
              <textarea
                value={formData.templates.reminder}
                onChange={(e) => handleTemplateChange('reminder', e.target.value)}
                rows={4}
                className="input-field resize-none"
                placeholder="Hi {student_name}, don't forget to continue your course {course_name}..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Available variables: {'{student_name}'}, {'{course_name}'}, {'{progress_percentage}'}
              </p>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Template Preview</h3>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="bg-white rounded p-4 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">Welcome Email Preview</h4>
              <div className="text-sm text-gray-600 whitespace-pre-wrap">
                {formData.templates.welcome
                  .replace('{student_name}', 'John Doe')
                  .replace('{institution_name}', 'Sample University')
                  .replace('{login_url}', 'https://platform.university.edu/login')
                }
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button onClick={handleSave} className="btn-primary">
            Save Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
};