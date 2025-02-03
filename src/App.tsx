import React, { useState, useEffect } from 'react';
import {
  AppWindow as Window,
  Maximize2,
  Minus,
  X,
  Monitor,
  HardDrive,
  Folder,
  FileText,
  Loader2,
} from 'lucide-react';
import { InsCryptPanel } from './components/InsCryptPanel';

function App() {
  const [isFileExplorerOpen, setIsFileExplorerOpen] = useState(true);
  const [isMaximized, setIsMaximized] = useState(true);
  const [time, setTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);

  const [particles] = useState(() => 
    Array.from({ length: 30 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
      delay: `${Math.random() * 20}s`,
      duration: `${30 + Math.random() * 20}s`
    }))
  );

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMyComputerClick = () => {
    setIsFileExplorerOpen(true);
    setIsMaximized(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2A2356] via-[#4A3B78] to-[#FF6B97] relative overflow-hidden">
      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-transparent to-purple-500/10 animate-pulse"
        style={{ animationDuration: '4s' }}
      />

      {/* Scanlines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float bg-white/30 backdrop-blur-sm"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          />
        ))}
      </div>

      {/* Desktop icons */}
      <div className="p-2 sm:p-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-4">
        <div onClick={handleMyComputerClick} className="w-full">
          <DesktopIcon icon={Monitor} label="My Computer" />
        </div>
        <div className="w-full">
          <DesktopIcon icon={HardDrive} label="Local Disk (C:)" />
        </div>
        <div className="w-full">
          <DesktopIcon icon={Folder} label="Documents" />
        </div>
        <div className="w-full">
          <DesktopIcon icon={FileText} label="README.txt" />
        </div>
      </div>

      {/* Windows */}
      {isFileExplorerOpen && (
        <div
          className={`absolute ${
            isMaximized || window.innerWidth < 640
              ? 'inset-0'
              : 'top-10 left-4 right-4 sm:left-20 sm:right-auto sm:w-[800px] h-[600px]'
          } bg-[#C0C7C8] border-2 border-[#919B9C] shadow-win98 transition-all duration-200`}
        >
          {/* Title bar */}
          <div className="h-7 bg-[#000080] text-white flex items-center justify-between px-2 select-none">
            <div className="flex items-center gap-2">
              <Window size={16} className="animate-pulse" />
              <span className="text-sm truncate">Dawsh's JFF</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => {}}
                className="win98-button p-1 h-5 w-5 flex items-center justify-center hover:bg-[#D0D7D8]"
              >
                <Minus size={12} />
              </button>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="win98-button p-1 h-5 w-5 flex items-center justify-center hover:bg-[#D0D7D8] hidden sm:flex"
              >
                <Maximize2 size={12} />
              </button>
              <button
                onClick={() => setIsFileExplorerOpen(false)}
                className="win98-button p-1 h-5 w-5 flex items-center justify-center hover:bg-[#D0D7D8]"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          {/* Window content */}
          <div className="p-4 bg-white h-[calc(100%-2rem)] overflow-auto">
            <InsCryptPanel />
          </div>
        </div>
      )}

      {/* Start Menu */}
      {showStartMenu && (
        <div className="fixed bottom-10 left-0 w-64 max-w-[90vw] bg-[#C0C7C8] border-2 border-[#919B9C] shadow-win98 animate-slideUp">
          <div className="h-8 bg-[#000080] flex items-center px-2">
            <span className="text-white text-sm font-bold truncate">
              InsCrypt OS
            </span>
          </div>
          <div className="p-2 space-y-1">
            {[
              'Programs',
              'Documents',
              'Settings',
              'Find',
              'Help',
              'Run...',
              'Shut Down...',
            ].map((item) => (
              <button
                key={item}
                className="w-full text-left px-4 py-1 text-sm hover:bg-[#000080] hover:text-white transition-colors truncate"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-10 bg-[#C0C7C8] border-t-2 border-white flex items-center justify-between px-2 shadow-win98-taskbar">
        <button
          onClick={() => setShowStartMenu(!showStartMenu)}
          className="win98-button px-2 sm:px-4 py-1 flex items-center gap-2 hover:bg-[#D0D7D8] active:bg-[#B0B7B8]"
        >
          <Window size={16} className="animate-pulse" />
          <span className="text-sm hidden sm:inline">Start</span>
        </button>

        {/* Active window indicators */}
        {isFileExplorerOpen && (
          <div className="flex-1 mx-2 overflow-hidden">
            <button className="win98-button px-2 py-1 text-sm flex items-center gap-2 bg-[#B0B7B8] max-w-full">
              <Window size={14} />
              <span className="truncate">Dawsh's JFF</span>
            </button>
          </div>
        )}

        {/* Clock */}
        <div className="win98-button px-2 py-1 text-sm min-w-[60px] sm:min-w-[80px] text-center">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

function DesktopIcon({ icon: Icon, label }: { icon: any; label: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center gap-1 text-white cursor-pointer p-1 sm:p-2 hover:bg-white/10 rounded transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        size={28}
        className={`drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)] transition-transform duration-200
          sm:size-24 ${isHovered ? 'scale-110' : 'scale-100'}`}
      />
      <span
        className={`text-xs sm:text-sm text-center drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)] transition-opacity
        ${
          isHovered ? 'opacity-100' : 'opacity-90'
        } truncate w-full max-w-[80px] sm:max-w-[100px]`}
      >
        {label}
      </span>
    </div>
  );
}

export default App;