export type RoleKey =
  | 'background'
  | 'surface'
  | 'primary'
  | 'link'
  | 'text'
  | 'muted'
  | 'border';

export interface PaletteColor {
  role: RoleKey;
  name: string;
  hex: string;
  usage: string;
}

export interface PaletteVariant {
  mode: 'light' | 'dark';
  colors: PaletteColor[];
}

export interface PaletteTheme {
  id: string;
  title: string;
  subtitle: string;
  variants: {
    light: PaletteVariant;
    dark: PaletteVariant;
  };
}

export const ROLE_ORDER: RoleKey[] = [
  'background',
  'surface',
  'primary',
  'link',
  'text',
  'muted',
  'border',
];

const createVariant = (mode: 'light' | 'dark', colors: Omit<PaletteColor, 'role'>[]): PaletteVariant => ({
  mode,
  colors: colors.map((c, index) => ({ ...c, role: ROLE_ORDER[index] })),
});

const theme = (
  id: string,
  title: string,
  subtitle: string,
  dark: Omit<PaletteColor, 'role'>[],
  light: Omit<PaletteColor, 'role'>[],
): PaletteTheme => ({
  id,
  title,
  subtitle,
  variants: {
    dark: createVariant('dark', dark),
    light: createVariant('light', light),
  },
});

export const PRESET_THEMES: PaletteTheme[] = [
  theme(
    'modern',
    'Modern Theme',
    'Sleek interface with azure accents',
    [
      { name: 'Jet Black', hex: '#181A1B', usage: 'Main background' },
      { name: 'Charcoal Gray', hex: '#212325', usage: 'Surfaces' },
      { name: 'Azure Blue', hex: '#0099FF', usage: 'Primary actions' },
      { name: 'Cyan Blue', hex: '#38B6FF', usage: 'Links and toggles' },
      { name: 'Soft White', hex: '#F1F1F1', usage: 'Main text' },
      { name: 'Light Gray', hex: '#B3BAC2', usage: 'Muted text' },
      { name: 'Slate Gray', hex: '#2C2F32', usage: 'Borders' },
    ],
    [
      { name: 'Paper White', hex: '#FFFFFF', usage: 'Main background' },
      { name: 'Card Gray', hex: '#F4F6F8', usage: 'Surfaces' },
      { name: 'Action Blue', hex: '#2563EB', usage: 'Primary actions' },
      { name: 'Link Blue', hex: '#3B82F6', usage: 'Links' },
      { name: 'Text Dark', hex: '#0F172A', usage: 'Primary text' },
      { name: 'Muted Text', hex: '#6B7280', usage: 'Secondary text' },
      { name: 'Border Gray', hex: '#E5E7EB', usage: 'Borders' },
    ],
  ),
  theme(
    'blue-professional',
    'Blue Professional',
    'Business palette with navy base',
    [
      { name: 'Navy', hex: '#0B1220', usage: 'Main background' },
      { name: 'Panel Blue', hex: '#101A2C', usage: 'Surfaces' },
      { name: 'Primary Blue', hex: '#1D4ED8', usage: 'Primary actions' },
      { name: 'Sky', hex: '#38BDF8', usage: 'Links and highlights' },
      { name: 'Off White', hex: '#F8FAFC', usage: 'Headings' },
      { name: 'Muted', hex: '#94A3B8', usage: 'Muted text' },
      { name: 'Divider', hex: '#1F2937', usage: 'Borders' },
    ],
    [
      { name: 'Porcelain', hex: '#FAFBFF', usage: 'Main background' },
      { name: 'Sheet', hex: '#EEF2FF', usage: 'Surfaces' },
      { name: 'Royal Blue', hex: '#1D4ED8', usage: 'Primary actions' },
      { name: 'Sky', hex: '#38BDF8', usage: 'Links' },
      { name: 'Charcoal', hex: '#0B1220', usage: 'Headings' },
      { name: 'Muted', hex: '#475569', usage: 'Muted text' },
      { name: 'Divider', hex: '#CBD5E1', usage: 'Borders' },
    ],
  ),
  theme(
    'emerald-luxury',
    'Luxury Emerald',
    'Deep emerald with warm neutrals',
    [
      { name: 'Carbon', hex: '#121414', usage: 'Main background' },
      { name: 'Obsidian', hex: '#1B1F1E', usage: 'Surfaces' },
      { name: 'Emerald', hex: '#10B981', usage: 'Primary actions' },
      { name: 'Mint', hex: '#34D399', usage: 'Links' },
      { name: 'Ivory', hex: '#F5F5F4', usage: 'Text' },
      { name: 'Greige', hex: '#A8A29E', usage: 'Muted text' },
      { name: 'Basalt', hex: '#2A2E2C', usage: 'Borders' },
    ],
    [
      { name: 'Ivory', hex: '#FFFFFB', usage: 'Main background' },
      { name: 'Parchment', hex: '#F3F2ED', usage: 'Surfaces' },
      { name: 'Emerald', hex: '#10B981', usage: 'Primary actions' },
      { name: 'Mint', hex: '#34D399', usage: 'Links' },
      { name: 'Ink', hex: '#111827', usage: 'Text' },
      { name: 'Stone', hex: '#6B7280', usage: 'Muted text' },
      { name: 'Divider', hex: '#E5E7EB', usage: 'Borders' },
    ],
  ),
  theme(
    'soft-sand-champagne',
    'Soft Sand & Champagne',
    'Warm neutrals with soft gold accents',
    [
      { name: 'Night Sand', hex: '#141414', usage: 'Main background' },
      { name: 'Taupe', hex: '#2A2A2A', usage: 'Surfaces' },
      { name: 'Champagne', hex: '#F4DAB3', usage: 'Primary actions' },
      { name: 'Gold', hex: '#E6C07B', usage: 'Links' },
      { name: 'Ivory', hex: '#F7F7F5', usage: 'Text' },
      { name: 'Warm Gray', hex: '#B8B4AE', usage: 'Muted text' },
      { name: 'Drift', hex: '#3A3A3A', usage: 'Borders' },
    ],
    [
      { name: 'Sand', hex: '#FFFBF5', usage: 'Main background' },
      { name: 'Shell', hex: '#F5EFE6', usage: 'Surfaces' },
      { name: 'Champagne', hex: '#E7CBA9', usage: 'Primary actions' },
      { name: 'Gold', hex: '#D6AE6A', usage: 'Links' },
      { name: 'Ink', hex: '#1F2937', usage: 'Text' },
      { name: 'Mushroom', hex: '#8B8680', usage: 'Muted text' },
      { name: 'Border', hex: '#E6E2DC', usage: 'Borders' },
    ],
  ),
  theme(
    'aqua-fresh',
    'Aqua Fresh Modern',
    'Cool aqua with crisp whites',
    [
      { name: 'Deep Sea', hex: '#0E1A1E', usage: 'Main background' },
      { name: 'Reef', hex: '#142329', usage: 'Surfaces' },
      { name: 'Aqua', hex: '#04C8C8', usage: 'Primary actions' },
      { name: 'Teal', hex: '#2DD4BF', usage: 'Links' },
      { name: 'Foam', hex: '#E6FFFB', usage: 'Text' },
      { name: 'Mist', hex: '#93C5C5', usage: 'Muted text' },
      { name: 'Kelp', hex: '#1F3A3A', usage: 'Borders' },
    ],
    [
      { name: 'Foam', hex: '#F8FFFF', usage: 'Main background' },
      { name: 'Shore', hex: '#E8F8F8', usage: 'Surfaces' },
      { name: 'Aqua', hex: '#06B6D4', usage: 'Primary actions' },
      { name: 'Teal', hex: '#14B8A6', usage: 'Links' },
      { name: 'Slate', hex: '#0F172A', usage: 'Text' },
      { name: 'Sea Smoke', hex: '#64748B', usage: 'Muted text' },
      { name: 'Border', hex: '#D1FAF5', usage: 'Borders' },
    ],
  ),
  theme(
    'burgundy-wine',
    'Burgundy Wine',
    'Rich reds with deep accents',
    [
      { name: 'Cellar', hex: '#16080B', usage: 'Main background' },
      { name: 'Barrel', hex: '#241016', usage: 'Surfaces' },
      { name: 'Burgundy', hex: '#7A1E2C', usage: 'Primary actions' },
      { name: 'Rose', hex: '#E11D48', usage: 'Links' },
      { name: 'Cream', hex: '#FEF2F2', usage: 'Text' },
      { name: 'Blush', hex: '#F9A8D4', usage: 'Muted text' },
      { name: 'Grape Skin', hex: '#3A0D16', usage: 'Borders' },
    ],
    [
      { name: 'Linen', hex: '#FFF5F7', usage: 'Main background' },
      { name: 'Porcelain', hex: '#FFE9EE', usage: 'Surfaces' },
      { name: 'Burgundy', hex: '#881337', usage: 'Primary actions' },
      { name: 'Rose', hex: '#DB2777', usage: 'Links' },
      { name: 'Ink', hex: '#1F2937', usage: 'Text' },
      { name: 'Ash', hex: '#64748B', usage: 'Muted text' },
      { name: 'Border', hex: '#FAD1E8', usage: 'Borders' },
    ],
  ),
  theme(
    'coral-sunset',
    'Coral Sunset',
    'Warm coral and peach tones',
    [
      { name: 'Dusk', hex: '#1A1412', usage: 'Main background' },
      { name: 'Clay', hex: '#2A1F1C', usage: 'Surfaces' },
      { name: 'Coral', hex: '#FB7185', usage: 'Primary actions' },
      { name: 'Peach', hex: '#FCA5A5', usage: 'Links' },
      { name: 'Lace', hex: '#FFF1F2', usage: 'Text' },
      { name: 'Blush', hex: '#FBCFE8', usage: 'Muted text' },
      { name: 'Terracotta', hex: '#3B2A28', usage: 'Borders' },
    ],
    [
      { name: 'Lace', hex: '#FFF7F7', usage: 'Main background' },
      { name: 'Shell', hex: '#FFECEC', usage: 'Surfaces' },
      { name: 'Coral', hex: '#F97316', usage: 'Primary actions' },
      { name: 'Peach', hex: '#FDA4AF', usage: 'Links' },
      { name: 'Ink', hex: '#111827', usage: 'Text' },
      { name: 'Mauve', hex: '#6B7280', usage: 'Muted text' },
      { name: 'Border', hex: '#FED7D7', usage: 'Borders' },
    ],
  ),
  theme(
    'deep-purple-royalty',
    'Deep Purple Royalty',
    'Royal purples with cool contrasts',
    [
      { name: 'Midnight', hex: '#0E0A1A', usage: 'Main background' },
      { name: 'Plum', hex: '#1A1226', usage: 'Surfaces' },
      { name: 'Royal', hex: '#6D28D9', usage: 'Primary actions' },
      { name: 'Amethyst', hex: '#A78BFA', usage: 'Links' },
      { name: 'Snow', hex: '#F5F3FF', usage: 'Text' },
      { name: 'Lilac', hex: '#C4B5FD', usage: 'Muted text' },
      { name: 'Grape', hex: '#2D1B49', usage: 'Borders' },
    ],
    [
      { name: 'Snow', hex: '#FCFAFF', usage: 'Main background' },
      { name: 'Lavender', hex: '#F3E8FF', usage: 'Surfaces' },
      { name: 'Royal', hex: '#7C3AED', usage: 'Primary actions' },
      { name: 'Amethyst', hex: '#A78BFA', usage: 'Links' },
      { name: 'Ink', hex: '#111827', usage: 'Text' },
      { name: 'Slate', hex: '#6B7280', usage: 'Muted text' },
      { name: 'Border', hex: '#E9D5FF', usage: 'Borders' },
    ],
  ),
  theme(
    'mocha-warmth',
    'Mocha Warmth',
    'Cozy browns with cream contrasts',
    [
      { name: 'Espresso', hex: '#14100C', usage: 'Main background' },
      { name: 'Mocha', hex: '#231A14', usage: 'Surfaces' },
      { name: 'Caramel', hex: '#D97706', usage: 'Primary actions' },
      { name: 'Amber', hex: '#F59E0B', usage: 'Links' },
      { name: 'Cream', hex: '#FAF7F2', usage: 'Text' },
      { name: 'Latte', hex: '#D6CCC2', usage: 'Muted text' },
      { name: 'Bean', hex: '#3B2F2F', usage: 'Borders' },
    ],
    [
      { name: 'Cream', hex: '#FFFCF7', usage: 'Main background' },
      { name: 'Oat', hex: '#F4ECE3', usage: 'Surfaces' },
      { name: 'Caramel', hex: '#D97706', usage: 'Primary actions' },
      { name: 'Amber', hex: '#F59E0B', usage: 'Links' },
      { name: 'Cocoa', hex: '#1F2937', usage: 'Text' },
      { name: 'Latte', hex: '#7D6F67', usage: 'Muted text' },
      { name: 'Border', hex: '#E9E1D9', usage: 'Borders' },
    ],
  ),
  theme(
    'ethereal-gradient',
    'Ethereal Gradient',
    'Soft gradient-inspired blues and violets',
    [
      { name: 'Cosmos', hex: '#0B1020', usage: 'Main background' },
      { name: 'Nebula', hex: '#151A2E', usage: 'Surfaces' },
      { name: 'Iris', hex: '#6366F1', usage: 'Primary actions' },
      { name: 'Aqua Glow', hex: '#22D3EE', usage: 'Links' },
      { name: 'Starlight', hex: '#E2E8F0', usage: 'Text' },
      { name: 'Mist', hex: '#94A3B8', usage: 'Muted text' },
      { name: 'Orbit', hex: '#27324A', usage: 'Borders' },
    ],
    [
      { name: 'Starlight', hex: '#F5F7FF', usage: 'Main background' },
      { name: 'Cloud', hex: '#EEF2FF', usage: 'Surfaces' },
      { name: 'Iris', hex: '#6366F1', usage: 'Primary actions' },
      { name: 'Aqua Glow', hex: '#06B6D4', usage: 'Links' },
      { name: 'Ink', hex: '#0F172A', usage: 'Text' },
      { name: 'Ash', hex: '#64748B', usage: 'Muted text' },
      { name: 'Border', hex: '#E2E8F0', usage: 'Borders' },
    ],
  ),
  theme(
    'green-modern',
    'Green Modern',
    'Modern UI with vivid green accents',
    [
      { name: 'Graphite', hex: '#111315', usage: 'Main background' },
      { name: 'Charcoal', hex: '#1B1F22', usage: 'Surfaces' },
      { name: 'Lime', hex: '#22C55E', usage: 'Primary actions' },
      { name: 'Mint', hex: '#34D399', usage: 'Links' },
      { name: 'Snow', hex: '#F3F4F6', usage: 'Text' },
      { name: 'Dust', hex: '#9CA3AF', usage: 'Muted text' },
      { name: 'Steel', hex: '#2F3439', usage: 'Borders' },
    ],
    [
      { name: 'White', hex: '#FFFFFF', usage: 'Main background' },
      { name: 'Panel', hex: '#F5F7F9', usage: 'Surfaces' },
      { name: 'Lime', hex: '#22C55E', usage: 'Primary actions' },
      { name: 'Mint', hex: '#10B981', usage: 'Links' },
      { name: 'Ink', hex: '#0F172A', usage: 'Text' },
      { name: 'Muted', hex: '#6B7280', usage: 'Muted text' },
      { name: 'Border', hex: '#E5E7EB', usage: 'Borders' },
    ],
  ),
  theme(
    'pink-trendy',
    'Pink Trendy',
    'Trendy pinks with soft neutrals',
    [
      { name: 'Char', hex: '#141216', usage: 'Main background' },
      { name: 'Smoky', hex: '#1E1A21', usage: 'Surfaces' },
      { name: 'Hot Pink', hex: '#EC4899', usage: 'Primary actions' },
      { name: 'Candy', hex: '#F472B6', usage: 'Links' },
      { name: 'Porcelain', hex: '#FDF2F8', usage: 'Text' },
      { name: 'Rose Dust', hex: '#F5A6C9', usage: 'Muted text' },
      { name: 'Border', hex: '#3A2A35', usage: 'Borders' },
    ],
    [
      { name: 'Blush', hex: '#FFF7FB', usage: 'Main background' },
      { name: 'Shell', hex: '#FCE7F3', usage: 'Surfaces' },
      { name: 'Hot Pink', hex: '#DB2777', usage: 'Primary actions' },
      { name: 'Candy', hex: '#F472B6', usage: 'Links' },
      { name: 'Ink', hex: '#111827', usage: 'Text' },
      { name: 'Muted', hex: '#6B7280', usage: 'Muted text' },
      { name: 'Border', hex: '#FBCFE8', usage: 'Borders' },
    ],
  ),
  theme(
    'enterprise-neutral',
    'Enterprise Neutral',
    'Corporate friendly neutral palette',
    [
      { name: 'Pitch', hex: '#0F1113', usage: 'Main background' },
      { name: 'Panel', hex: '#171A1E', usage: 'Surfaces' },
      { name: 'Blue Accent', hex: '#3B82F6', usage: 'Primary actions' },
      { name: 'Cyan', hex: '#22D3EE', usage: 'Links' },
      { name: 'Silver', hex: '#E5E7EB', usage: 'Text' },
      { name: 'Slate', hex: '#94A3B8', usage: 'Muted text' },
      { name: 'Divider', hex: '#2B3138', usage: 'Borders' },
    ],
    [
      { name: 'Paper', hex: '#FFFFFF', usage: 'Main background' },
      { name: 'Sheet', hex: '#F3F4F6', usage: 'Surfaces' },
      { name: 'Blue Accent', hex: '#2563EB', usage: 'Primary actions' },
      { name: 'Cyan', hex: '#06B6D4', usage: 'Links' },
      { name: 'Charcoal', hex: '#0F172A', usage: 'Text' },
      { name: 'Muted', hex: '#6B7280', usage: 'Muted text' },
      { name: 'Border', hex: '#E5E7EB', usage: 'Borders' },
    ],
  ),
  theme(
    'professional-slate',
    'Professional Slate',
    'Serious slate grays with blue highlights',
    [
      { name: 'Coal', hex: '#0E0F12', usage: 'Main background' },
      { name: 'Slate', hex: '#171A20', usage: 'Surfaces' },
      { name: 'Steel Blue', hex: '#3B82F6', usage: 'Primary actions' },
      { name: 'Sky', hex: '#60A5FA', usage: 'Links' },
      { name: 'Frost', hex: '#E5E7EB', usage: 'Text' },
      { name: 'Ash', hex: '#9CA3AF', usage: 'Muted text' },
      { name: 'Divider', hex: '#2A2F38', usage: 'Borders' },
    ],
    [
      { name: 'Porcelain', hex: '#F8FAFC', usage: 'Main background' },
      { name: 'Panel', hex: '#EEF2F7', usage: 'Surfaces' },
      { name: 'Steel Blue', hex: '#2563EB', usage: 'Primary actions' },
      { name: 'Sky', hex: '#60A5FA', usage: 'Links' },
      { name: 'Charcoal', hex: '#0B1220', usage: 'Text' },
      { name: 'Muted', hex: '#64748B', usage: 'Muted text' },
      { name: 'Border', hex: '#D1D5DB', usage: 'Borders' },
    ],
  ),
];
