import { ThemeProvider } from 'next-themes';

// Define the prop types for ThemeProviderWrapper
type ThemeProviderWrapperProps = {
  children: React.ReactNode;  // Define children as React.ReactNode
};

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
