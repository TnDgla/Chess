import { THEMES_DATA } from '@/constants/themes';
import { ThemeContext } from '@/context/themeContext';
import { useContext, useEffect, useState } from 'react';

export const Button = ({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) => {
  const [buttonColor, setButtonColor] = useState<string>('');
  const themeContext = useContext(ThemeContext);
  useEffect(() => {
    if (themeContext) {
      const currTheme = themeContext.theme;
      const theme = THEMES_DATA.find((theme) => theme.name === currTheme);
      if (theme) {
        switch (theme.name) {
          case 'Blue':
            setButtonColor(theme.buttonColor);
            break;
          case 'Red':
            setButtonColor(theme.buttonColor);
            break;
          case 'Violet':
            setButtonColor(theme.buttonColor);
            break;
          case 'bubblegum':
            setButtonColor(theme.buttonColor);
            break;
          case 'default':
            setButtonColor(theme.buttonColor);
        }
      }
    }
  }, []);
  return (
    <button
      style={{ backgroundColor: buttonColor }}
      onClick={onClick}
      className={`px-8 py-4 text-2xl text-white font-bold rounded ${className}`}
    >
      {children}
    </button>
  );
};

// Define the atom with the correct type
