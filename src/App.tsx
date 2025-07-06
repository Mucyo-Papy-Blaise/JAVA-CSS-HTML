import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { InstitutionProfile } from './components/sections/InstitutionProfile';
import { CertificateTemplates } from './components/sections/CertificateTemplates';
import { AdminUsers } from './components/sections/AdminUsers';
import { BrandingSettings } from './components/sections/BrandingSettings';
import { NotificationSettings } from './components/sections/NotificationSettings';
import { SecuritySettings } from './components/sections/SecuritySettings';
import type { 
  Institution, 
  AdminUser, 
  CertificateTemplate, 
  BrandingSettings as BrandingSettingsType,
  NotificationSettings as NotificationSettingsType,
  SecuritySettings as SecuritySettingsType
} from './types';

// Mock data
const mockInstitution: Institution = {
  id: '1',
  name: 'Sample University',
  description: 'A leading institution in higher education, committed to excellence in teaching, research, and community service.',
  logo: null,
  email: 'contact@sampleuniversity.edu',
  phone: '+1 (555) 123-4567',
  address: '123 University Ave, Education City, EC 12345',
  website: 'https://www.sampleuniversity.edu'
};

const mockAdminUsers: AdminUser[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@sampleuniversity.edu',
    role: 'super_admin',
    status: 'active',
    lastLogin: '2024-01-15 10:30 AM'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@sampleuniversity.edu',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-14 2:15 PM'
  },
  {
    id: '3',
    name: 'Mike Davis',
    email: 'mike.davis@sampleuniversity.edu',
    role: 'moderator',
    status: 'inactive',
    lastLogin: '2024-01-10 9:45 AM'
  }
];

const mockCertificateTemplates: CertificateTemplate[] = [
  {
    id: '1',
    name: 'Classic Certificate',
    preview: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400',
    isDefault: true
  },
  {
    id: '2',
    name: 'Modern Certificate',
    preview: 'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=400',
    isDefault: false
  }
];

const mockBrandingSettings: BrandingSettingsType = {
  primaryColor: '#3B82F6',
  secondaryColor: '#6B7280',
  fontFamily: 'Inter',
  socialLinks: {
    facebook: 'https://facebook.com/sampleuniversity',
    twitter: 'https://twitter.com/sampleuniversity',
    linkedin: 'https://linkedin.com/company/sampleuniversity',
    instagram: 'https://instagram.com/sampleuniversity'
  }
};

const mockNotificationSettings: NotificationSettingsType = {
  emailEnabled: true,
  smsEnabled: false,
  templates: {
    welcome: 'Welcome to {institution_name}! Your account has been created successfully. You can now access your courses and start learning.',
    courseCompletion: 'Congratulations {student_name}! You have successfully completed {course_name}. Your certificate is now available for download.',
    reminder: 'Hi {student_name}, don\'t forget to continue your course {course_name}. You\'re {progress_percentage}% complete!'
  }
};

const mockSecuritySettings: SecuritySettingsType = {
  passwordPolicy: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false
  },
  twoFactorEnabled: true,
  sessionTimeout: 60
};

function App() {
  const [activeSection, setActiveSection] = useState('profile');
  const [institution, setInstitution] = useState(mockInstitution);
  const [adminUsers, setAdminUsers] = useState(mockAdminUsers);
  const [certificateTemplates, setCertificateTemplates] = useState(mockCertificateTemplates);
  const [brandingSettings, setBrandingSettings] = useState(mockBrandingSettings);
  const [notificationSettings, setNotificationSettings] = useState(mockNotificationSettings);
  const [securitySettings, setSecuritySettings] = useState(mockSecuritySettings);

  // Dummy save handlers
  const handleSaveInstitution = (data: Partial<Institution>) => {
    setInstitution(prev => ({ ...prev, ...data }));
    console.log('Institution data saved:', data);
    // Here you would typically make an API call to save the data
  };

  const handleSaveAdminUsers = (users: AdminUser[]) => {
    setAdminUsers(users);
    console.log('Admin users saved:', users);
  };

  const handleSaveCertificateTemplates = (templates: CertificateTemplate[]) => {
    setCertificateTemplates(templates);
    console.log('Certificate templates saved:', templates);
  };

  const handleSaveBrandingSettings = (settings: BrandingSettingsType) => {
    setBrandingSettings(settings);
    console.log('Branding settings saved:', settings);
  };

  const handleSaveNotificationSettings = (settings: NotificationSettingsType) => {
    setNotificationSettings(settings);
    console.log('Notification settings saved:', settings);
  };

  const handleSaveSecuritySettings = (settings: SecuritySettingsType) => {
    setSecuritySettings(settings);
    console.log('Security settings saved:', settings);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <InstitutionProfile 
            institution={institution} 
            onSave={handleSaveInstitution} 
          />
        );
      case 'certificates':
        return (
          <CertificateTemplates 
            templates={certificateTemplates} 
            onSave={handleSaveCertificateTemplates} 
          />
        );
      case 'users':
        return (
          <AdminUsers 
            users={adminUsers} 
            onSave={handleSaveAdminUsers} 
          />
        );
      case 'branding':
        return (
          <BrandingSettings 
            settings={brandingSettings} 
            onSave={handleSaveBrandingSettings} 
          />
        );
      case 'notifications':
        return (
          <NotificationSettings 
            settings={notificationSettings} 
            onSave={handleSaveNotificationSettings} 
          />
        );
      case 'security':
        return (
          <SecuritySettings 
            settings={securitySettings} 
            onSave={handleSaveSecuritySettings} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidebar 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button className="bg-white p-2 rounded-lg shadow-md">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-4 lg:p-8">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;