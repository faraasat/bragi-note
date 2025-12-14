export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  tier: "FREE" | "PRO" | "TEAM" | "ENTERPRISE";
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  id: string;
  userId: string;
  defaultTone?: string;
  communicationStyle?: string;
  preferredModel?: string;
  enableLearning: boolean;
  privacyMode: boolean;
  emailNotifications: boolean;
  extensionNotifications: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsageQuota {
  id: string;
  userId: string;
  feature: "CATCH_UP" | "REWRITE" | "EXPLAIN";
  count: number;
  periodStart: Date;
  periodEnd: Date;
}
