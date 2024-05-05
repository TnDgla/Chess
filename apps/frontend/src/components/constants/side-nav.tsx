import { logout } from '@/services/auth';
import { PuzzleIcon, LogInIcon, LogOutIcon, SettingsIcon } from 'lucide-react';

export const UpperNavItems = [
  {
    title: 'Play',
    icon: PuzzleIcon,
    href: '/game/random',
    color: 'text-green-500',
  },
];

export const LowerNavItems = [
  {
    title: 'Login',
    icon: LogInIcon,
    href: '/login',
    color: 'text-green-500',
  },
  {
    title: 'Logout',
    icon: LogOutIcon,
    href: '/logout',
    color: 'text-green-500',
    action: 'logout',
  },
  {
    title: 'Settings',
    icon: SettingsIcon,
    href: '/',
    color: 'text-green-500',
  },
];
