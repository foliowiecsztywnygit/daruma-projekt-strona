import React, { createContext, useContext, useEffect, useState } from 'react';

export interface TeamMember {
  id: string;
  name: string;
  position: { pl: string; en: string };
  photo: string;
  shortDescription: { pl: string; en: string };
  bio: { pl: string; en: string };
  email?: string;
  phone?: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: {
    line1: string;
    line2: string;
    city: string;
  };
  companyDetails: {
    name: string;
    krs: string;
    nip: string;
    regon: string;
  };
}

export interface SiteConfig {
  theme: {
    colors: {
      light: {
        primary: string;
        secondary: string;
        surface: string;
      };
      dark: {
        primary: string;
        secondary: string;
        surface: string;
      };
      accent: string;
      darkAccent: string;
    };
    typography: {
      fontFamilySans: string;
      fontFamilySerif: string;
      headingLetterSpacing: string;
    };
    spacing: {
      sectionPaddingY: string;
    };
    hero: {
      videoUrl: string;
      overlayOpacity: number;
    };
  };
  contact: ContactInfo;
  team: TeamMember[];
}

interface ConfigContextType {
  config: SiteConfig | null;
  loading: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ConfigContext = createContext<ConfigContextType>({ 
  config: null, 
  loading: true,
  isDarkMode: true,
  toggleDarkMode: () => {}
});

export const useConfig = () => useContext(ConfigContext);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Initialize dark mode from localStorage, defaulting to dark mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    // Default to dark mode if no saved theme exists, regardless of system preference
    const initialDarkMode = savedTheme ? savedTheme === 'dark' : true;
    setIsDarkMode(initialDarkMode);
    
    if (initialDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Update CSS variables when config or theme changes
  useEffect(() => {
    if (!config) return;
    
    const root = document.documentElement;
    const { theme } = config;
    
    if (theme.colors) {
      const modeColors = isDarkMode ? theme.colors.dark : theme.colors.light;
      root.style.setProperty('--color-primary', modeColors.primary);
      root.style.setProperty('--color-secondary', modeColors.secondary);
      root.style.setProperty('--color-surface', modeColors.surface);
      
      root.style.setProperty('--color-accent', theme.colors.accent);
      root.style.setProperty('--color-dark-accent', theme.colors.darkAccent);
    }
    
    if (theme.typography) {
      root.style.setProperty('--font-sans', theme.typography.fontFamilySans);
      root.style.setProperty('--font-serif', theme.typography.fontFamilySerif);
    }
    
    if (theme.spacing) {
      root.style.setProperty('--spacing-section-y', theme.spacing.sectionPaddingY);
    }
  }, [config, isDarkMode]);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/siteConfig.json');
        const data: SiteConfig = await response.json();
        setConfig(data);
      } catch (error) {
        console.error('Failed to load site configuration:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, loading, isDarkMode, toggleDarkMode }}>
      {children}
    </ConfigContext.Provider>
  );
};
