// Simple localStorage-based authentication
// In production, replace with proper backend authentication

export interface User {
  name: string;
  email: string;
}

interface StoredUser {
  name: string;
  email: string;
  password: string;
}

export const auth = {
  // Register a new user
  signup: (name: string, email: string, password: string): { success: boolean; error?: string } => {
    try {
      // Check if user already exists
      const users: StoredUser[] = JSON.parse(localStorage.getItem('bragi_users') || '[]');
      const existingUser = users.find((u) => u.email === email);
      
      if (existingUser) {
        return { success: false, error: 'User with this email already exists' };
      }

      // Add new user
      users.push({ name, email, password });
      localStorage.setItem('bragi_users', JSON.stringify(users));
      
      // Set current user
      const user: User = { name, email };
      localStorage.setItem('bragi_current_user', JSON.stringify(user));
      
      return { success: true };
    } catch {
      return { success: false, error: 'Failed to create account' };
    }
  },

  // Login existing user
  login: (email: string, password: string): { success: boolean; error?: string } => {
    try {
      const users: StoredUser[] = JSON.parse(localStorage.getItem('bragi_users') || '[]');
      const user = users.find((u) => u.email === email && u.password === password);
      
      if (!user) {
        return { success: false, error: 'Invalid email or password' };
      }

      // Set current user (without password)
      const currentUser: User = { name: user.name, email: user.email };
      localStorage.setItem('bragi_current_user', JSON.stringify(currentUser));
      
      return { success: true };
    } catch {
      return { success: false, error: 'Login failed' };
    }
  },

  // Logout current user
  logout: () => {
    localStorage.removeItem('bragi_current_user');
  },

  // Get current user
  getCurrentUser: (): User | null => {
    try {
      const userStr = localStorage.getItem('bragi_current_user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!auth.getCurrentUser();
  }
};
