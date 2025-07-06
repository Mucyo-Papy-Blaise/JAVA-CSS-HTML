export interface Institution {
  id: string;
  name: string;
  description: string;
  logo: string | null;
  email: string;
  phone: string;
  address: string;
  website: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator';
  status: 'active' | 'inactive';
  lastLogin: string;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  preview: string;
  isDefault: boolean;
}

export interface BrandingSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface NotificationSettings {
  emailEnabled: boolean;
  smsEnabled: boolean;
  templates: {
    welcome: string;
    courseCompletion: string;
    reminder: string;
  };
}

export interface SecuritySettings {
  passwordPolicy: {
    minLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumbers: boolean;
    requireSpecialChars: boolean;
  };
  twoFactorEnabled: boolean;
  sessionTimeout: number;
}