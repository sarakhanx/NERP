'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import decodeToken from '@/lib/auth/jwt/decodeToken';
import { useRouter } from 'next/navigation';

interface SessionContextProps {
  user: any;
  loading: boolean;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('token');
    if (!token) {
      router.push("/signin");
    } else {
      const decodedToken = decodeToken(token);
      if (!decodedToken || typeof decodedToken === 'string' || !('roles' in decodedToken)) {
        router.push("/unauthorized");
      } else {
        setUser(decodedToken);
        setLoading(false);
      }
    }
  }, []);

  console.log(user);

  return (
    <SessionContext.Provider value={{ user, loading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};