import React, { useState } from 'react';
import { Shield, Lock, Clock } from 'lucide-react';
import type { SecuritySettings } from '../../types';

interface SecuritySettingsProps {
  settings: SecuritySettings;
  onSave: (settings: SecuritySettings) => void;
}

export const SecuritySettings: React.FC<SecuritySettingsProps> = ({ 
  settings, 
  onSave 
}) => {
  const [formData, setFormData] = useState(settings);

  const handlePasswordPolicyChange = (field: keyof SecuritySettings['passwordPolicy'], value: boolean | number) => {
    setFormData(prev => ({
      ...prev,
      passwordPolicy: {
        ...prev.passwordPolicy,
        [field]: value
      }
    }));
  };

  const handleToggle2FA = () => {
    setFormData(prev => ({ ...prev, twoFactorEnabled: !prev.twoFactorEnabled }));
  };

  const handleSessionTimeoutChange = (value: number) => {
    setFormData(prev => ({ ...prev, sessionTimeout: value }));
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
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
        
        {/* Password Policy */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Password Policy</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Password Length
              </label>
              <input
                type="number"
                min="6"
                max="32"
                value={formData.passwordPolicy.minLength}
                onChange={(e) => handlePasswordPolicyChange('minLength', parseInt(e.target.value))}
                className="input-field w-32"
              />
              <p className="text-xs text-gray-500 mt-1">Recommended: 8 or more characters</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Require Uppercase Letters</h4>
                  <p className="text-sm text-gray-500">At least one uppercase letter (A-Z)</p>
                </div>
                <ToggleSwitch 
                  enabled={formData.passwordPolicy.requireUppercase} 
                  onChange={() => handlePasswordPolicyChange('requireUppercase', !formData.passwordPolicy.requireUppercase)} 
                />
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Require Lowercase Letters</h4>
                  <p className="text-sm text-gray-500">At least one lowercase letter (a-z)</p>
                </div>
                <ToggleSwitch 
                  enabled={formData.passwordPolicy.requireLowercase} 
                  onChange={() => handlePasswordPolicyChange('requireLowercase', !formData.passwordPolicy.requireLowercase)} 
                />
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Require Numbers</h4>
                  <p className="text-sm text-gray-500">At least one number (0-9)</p>
                </div>
                <ToggleSwitch 
                  enabled={formData.passwordPolicy.requireNumbers} 
                  onChange={() => handlePasswordPolicyChange('requireNumbers', !formData.passwordPolicy.requireNumbers)} 
                />
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Require Special Characters</h4>
                  <p className="text-sm text-gray-500">At least one special character (!@#$%)</p>
                </div>
                <ToggleSwitch 
                  enabled={formData.passwordPolicy.requireSpecialChars} 
                  onChange={() => handlePasswordPolicyChange('requireSpecialChars', !formData.passwordPolicy.requireSpecialChars)} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Two-Factor Authentication</span>
          </h3>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Enable Two-Factor Authentication</h4>
              <p className="text-sm text-gray-500">
                Require users to verify their identity with a second factor (SMS, authenticator app)
              </p>
            </div>
            <ToggleSwitch 
              enabled={formData.twoFactorEnabled} 
              onChange={handleToggle2FA} 
            />
          </div>
          
          {formData.twoFactorEnabled && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> Two-factor authentication will be required for all admin users. 
                Students can optionally enable it in their account settings.
              </p>
            </div>
          )}
        </div>

        {/* Session Management */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Session Management</span>
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <select
              value={formData.sessionTimeout}
              onChange={(e) => handleSessionTimeoutChange(parseInt(e.target.value))}
              className="input-field w-48"
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
              <option value={240}>4 hours</option>
              <option value={480}>8 hours</option>
              <option value={1440}>24 hours</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Users will be automatically logged out after this period of inactivity
            </p>
          </div>
        </div>

        {/* Security Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Security Summary</h3>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-900">Password Strength:</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  [
                    formData.passwordPolicy.requireUppercase,
                    formData.passwordPolicy.requireLowercase,
                    formData.passwordPolicy.requireNumbers,
                    formData.passwordPolicy.requireSpecialChars
                  ].filter(Boolean).length >= 3 && formData.passwordPolicy.minLength >= 8
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {[
                    formData.passwordPolicy.requireUppercase,
                    formData.passwordPolicy.requireLowercase,
                    formData.passwordPolicy.requireNumbers,
                    formData.passwordPolicy.requireSpecialChars
                  ].filter(Boolean).length >= 3 && formData.passwordPolicy.minLength >= 8
                    ? 'Strong'
                    : 'Medium'
                  }
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900">2FA Status:</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  formData.twoFactorEnabled 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {formData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Session Timeout:</span>
                <span className="ml-2 text-gray-600">
                  {formData.sessionTimeout >= 60 
                    ? `${formData.sessionTimeout / 60}h`
                    : `${formData.sessionTimeout}m`
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button onClick={handleSave} className="btn-primary">
            Save Security Settings
          </button>
        </div>
      </div>
    </div>
  );
};