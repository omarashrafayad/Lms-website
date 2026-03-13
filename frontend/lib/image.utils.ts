export const getImageUrl = (path: string, type: 'blogs' | 'courses' | 'users' | 'categories' = 'blogs') => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1/', '')}/uploads/${type}/${path}`;
};
