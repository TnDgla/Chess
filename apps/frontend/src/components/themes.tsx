import { THEMES_DATA } from '@/constants/themes';
import { useThemeContext } from '@/hooks/useThemes';
import { useState } from 'react';
import { THEME } from '@/context/themeContext';

export function Themes() {
  const { theme, updateTheme } = useThemeContext();
  const [selectedTheme, setSelectedTheme] = useState<THEME>(theme);

  const handleThemeClick = (themeName: THEME) => {
    setSelectedTheme(themeName);
    updateTheme(themeName);
  };

  return (
    <div className="flex-1 bg-bgAuxiliary1 py-12 px-10">
      <div className="grid grid-cols-1 gap-8">
        {THEMES_DATA.map((themeData) => {
          const isActive = themeData.name === selectedTheme;
          return (
            <div
              key={themeData.id}
              className={`p-4 flex items-start justify-between cursor-pointer border-2 ${
                isActive ? 'border-blue-500' : 'border-transparent'
              } rounded-md`}
              style={{ backgroundColor: themeData.background }}
              onClick={() => handleThemeClick(themeData.name)}
            >
              <div>
                <h2 className="text-lg capitalize">{themeData.name}</h2>
              </div>
              <div className="grid grid-cols-2">
                <img
                  src="/bk.png"
                  className="w-16 h-16"
                  alt="chess-piece"
                  style={{ backgroundColor: themeData['board-dark'] }}
                />
                <img
                  src="/wn.png"
                  className="w-16 h-16"
                  alt="chess-piece"
                  style={{ backgroundColor: themeData['board-light'] }}
                />
                <img
                  src="/br.png"
                  className="w-16 h-16"
                  alt="chess-piece"
                  style={{ backgroundColor: themeData['board-light'] }}
                />
                <img
                  src="/wp.png"
                  className="w-16 h-16"
                  alt="chess-piece"
                  style={{ backgroundColor: themeData['board-dark'] }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
