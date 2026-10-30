export const navigation = [
  { key: 'home', path: '' },
  { key: 'story', path: '/about' },
  { key: 'cats', path: '/cats' },
  { key: 'rescue', path: '/rescue' },
  { key: 'adopt', path: '/adopt' },
  { key: 'join', path: '/get-involved' },
  { key: 'support', path: '/support' },
  { key: 'news', path: '/news' },
  { key: 'contact', path: '/contact' },
] as const;

export const staticPaths = [
  '', '/about', '/cats', '/rescue', '/adopt', '/get-involved',
  '/support', '/transparency', '/news', '/contact',
] as const;
