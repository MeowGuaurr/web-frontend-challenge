'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// UserContext handles the authenticated user's basic profile and the
// currently-selected account id. Both values are persisted to localStorage
// so the app restores state on reload. Use `setUser` / `setAccountId` to
// update the values and keep storage in sync.

type User = {
  id: string;
  full_name?: string;
  products?: Array<{ type: string; id: string }>;
  profile_photo?: string | null;
};

type UserContextValue = {
  user?: User | null;
  accountId?: string | null;
  products?: Array<{ type: string; id: string }>;
  setUser: (u: User | null) => void;
  setAccountId: (id: string | null) => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null | undefined>(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('app_user') : null;
      return raw ? (JSON.parse(raw) as User) : undefined;
    } catch {
      return undefined;
    }
  });

  const [accountId, setAccountIdState] = useState<string | null>(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem('app_accountId') : null;
      return raw ? raw : null;
    } catch {
      return null;
    }
  });

  const setUser = (u: User | null) => {
    setUserState(u);
    try {
      if (typeof window !== 'undefined') {
        if (u) localStorage.setItem('app_user', JSON.stringify(u));
        else localStorage.removeItem('app_user');
      }
    } catch {}
  };

  const setAccountId = (id: string | null) => {
    setAccountIdState(id);
    try {
      if (typeof window !== 'undefined') {
        if (id) localStorage.setItem('app_accountId', id);
        else localStorage.removeItem('app_accountId');
      }
    } catch {}
  };

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'app_user') {
        try {
          setUserState(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          setUserState(null);
        }
      }
      if (e.key === 'app_accountId') {
        setAccountIdState(e.newValue || null);
      }
    };
    if (typeof window !== 'undefined') window.addEventListener('storage', onStorage);
    return () => {
      if (typeof window !== 'undefined') window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, accountId, setUser, setAccountId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside a UserProvider');
  return ctx;
};

export default UserContext;
