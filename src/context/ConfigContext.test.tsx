import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfigProvider, useConfig } from './ConfigContext';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

// A mock component to consume the context
const TestComponent = () => {
  const { isDarkMode, toggleDarkMode, loading } = useConfig();
  
  if (loading) return <div data-testid="loading">Loading...</div>;
  
  return (
    <div>
      <div data-testid="theme-status">{isDarkMode ? 'dark' : 'light'}</div>
      <button data-testid="toggle-btn" onClick={toggleDarkMode}>Toggle</button>
    </div>
  );
};

describe('ConfigContext Theme Toggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    document.documentElement.style.cssText = '';
    
    // Mock fetch for siteConfig.json
    window.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          theme: {
            colors: {
              light: { primary: '#111', secondary: '#222', surface: '#fff' },
              dark: { primary: '#fff', secondary: '#eee', surface: '#000' },
              accent: '#333',
              darkAccent: '#444'
            }
          }
        })
      })
    ) as any;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with dark mode based on prefers-color-scheme if localStorage is empty', async () => {
    // Mock prefers-color-scheme: dark
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    render(
      <ConfigProvider>
        <TestComponent />
      </ConfigProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.style.getPropertyValue('--color-primary')).toBe('#fff');
  });

  it('should initialize from localStorage if available', async () => {
    localStorage.setItem('theme', 'light');

    render(
      <ConfigProvider>
        <TestComponent />
      </ConfigProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.style.getPropertyValue('--color-primary')).toBe('#111');
  });

  it('should toggle theme and persist to localStorage', async () => {
    localStorage.setItem('theme', 'light');
    const user = userEvent.setup();

    render(
      <ConfigProvider>
        <TestComponent />
      </ConfigProvider>
    );

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    // Initial state is light
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Click toggle
    const toggleBtn = screen.getByTestId('toggle-btn');
    await user.click(toggleBtn);

    // Should be dark now
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
    
    // CSS variables should update
    expect(document.documentElement.style.getPropertyValue('--color-primary')).toBe('#fff');
    expect(document.documentElement.style.getPropertyValue('--color-surface')).toBe('#000');
  });
});
