import { useMemo, useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { PRESET_THEMES, PaletteTheme, RoleKey, ROLE_ORDER } from '@/data/themes';
import { SwatchGrid } from '@/components/SwatchGrid';
import { InterfacePreview } from '@/components/preview/InterfacePreview';
import { Button } from '@/components/ui/button';
import { Download, Moon, Sun } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomPaletteForm } from '@/components/CustomPaletteForm';
import { exportPalette } from '@/lib/export';

const createBaseColor = (role: RoleKey, mode: 'light' | 'dark') => {
  const defaults: Record<RoleKey, { hex: string; name: string; usage: string }> = {
    background: {
      hex: mode === 'dark' ? '#0f1115' : '#ffffff',
      name: 'Background',
      usage: 'Main application background',
    },
    surface: {
      hex: mode === 'dark' ? '#181b21' : '#f3f4f6',
      name: 'Surface',
      usage: 'Cards and surfaces',
    },
    primary: {
      hex: '#2563eb',
      name: 'Primary',
      usage: 'Primary buttons and highlights',
    },
    link: {
      hex: '#38bdf8',
      name: 'Link',
      usage: 'Links and interactive states',
    },
    text: {
      hex: mode === 'dark' ? '#f4f4f5' : '#0f172a',
      name: 'Text',
      usage: 'Body and heading text',
    },
    muted: {
      hex: mode === 'dark' ? '#a1a1aa' : '#6b7280',
      name: 'Muted',
      usage: 'Secondary text and placeholders',
    },
    border: {
      hex: mode === 'dark' ? '#27272a' : '#d1d5db',
      name: 'Border',
      usage: 'Dividers, outlines, inputs',
    },
  };

  return {
    role,
    ...defaults[role],
  };
};

const createCustomTheme = (): PaletteTheme => ({
  id: 'custom',
  title: 'Custom Theme',
  subtitle: 'Design your own palette from scratch',
  variants: {
    dark: {
      mode: 'dark',
      colors: ROLE_ORDER.map((role) => createBaseColor(role, 'dark')),
    },
    light: {
      mode: 'light',
      colors: ROLE_ORDER.map((role) => createBaseColor(role, 'light')),
    },
  },
});

const themeToRoles = (theme: PaletteTheme) =>
  (['dark', 'light'] as const).reduce(
    (acc, mode) => ({
      ...acc,
      [mode]: theme.variants[mode].colors.reduce(
        (inner, color) => ({
          ...inner,
          [color.role]: {
            name: color.name,
            hex: color.hex,
            usage: color.usage,
          },
        }),
        {} as Record<RoleKey, { name: string; hex: string; usage: string }>,
      ),
    }),
    {} as Record<'dark' | 'light', Record<RoleKey, { name: string; hex: string; usage: string }>>,
  );

export default function App() {
  const [library, setLibrary] = useState<PaletteTheme[]>(PRESET_THEMES);
  const [customTheme, setCustomTheme] = useState<PaletteTheme>(() => createCustomTheme());
  const [activeVariant, setActiveVariant] = useState<'light' | 'dark'>('dark');
  const [activeId, setActiveId] = useState<string>('custom');

  const themes = useMemo(() => [customTheme, ...library], [customTheme, library]);
  const activeTheme = useMemo(
    () => themes.find((theme) => theme.id === activeId) ?? themes[0],
    [themes, activeId],
  );

  const exportData = useMemo(
    () => ({
      themeId: activeTheme.id,
      name: activeTheme.title,
      description: activeTheme.subtitle,
      currentVariant: activeVariant,
      variants: themeToRoles(activeTheme),
    }),
    [activeTheme, activeVariant],
  );

  const handleExport = () => {
    const filename = `${activeTheme.id}-palette.json`;
    return exportPalette(exportData, filename);
  };

  const handleUpdateCustomMeta = (field: 'title' | 'subtitle', value: string) => {
    setCustomTheme((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateCustomColor = (
    variant: 'light' | 'dark',
    role: RoleKey,
    field: 'name' | 'hex' | 'usage',
    value: string,
  ) => {
    setCustomTheme((prev) => ({
      ...prev,
      variants: {
        ...prev.variants,
        [variant]: {
          ...prev.variants[variant],
          colors: prev.variants[variant].colors.map((color) => {
            if (color.role !== role) {
              return color;
            }

            if (field === 'hex') {
              const sanitized = value.startsWith('#') ? value : `#${value}`;
              return {
                ...color,
                hex: sanitized.toUpperCase(),
              };
            }

            return {
              ...color,
              [field]: value,
            };
          }),
        },
      },
    }));
  };

  const handleSaveCustom = () => {
    const id = `custom-${Date.now()}`;
    const snapshot: PaletteTheme = JSON.parse(JSON.stringify({ ...customTheme, id }));
    const clonedTheme: PaletteTheme = {
      ...snapshot,
      id,
    };
    setLibrary((prev) => [clonedTheme, ...prev]);
    setActiveId(id);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-950 text-zinc-100">
      <div className="grid h-full w-full grid-cols-1 md:grid-cols-[20rem_1fr]">
        <Sidebar themes={themes} activeId={activeTheme.id} onSelect={setActiveId} />

        <main className="flex h-full flex-col overflow-hidden">
          <div className="custom-scroll flex-1 space-y-8 overflow-y-auto p-6">
            <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h1 className="text-3xl font-semibold tracking-tight">{activeTheme.title}</h1>
                <p className="text-sm text-zinc-400">{activeTheme.subtitle}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setActiveVariant((mode) => (mode === 'dark' ? 'light' : 'dark'))}
                  className="border-zinc-700 text-zinc-200"
                >
                  {activeVariant === 'dark' ? (
                    <span className="inline-flex items-center gap-2">
                      <Sun className="h-4 w-4" /> Light preview
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <Moon className="h-4 w-4" /> Dark preview
                    </span>
                  )}
                </Button>
                <Button onClick={handleExport} className="gap-2">
                  <Download className="h-4 w-4" /> Export JSON
                </Button>
              </div>
            </header>

            <CustomPaletteForm
              theme={customTheme}
              onUpdateMeta={handleUpdateCustomMeta}
              onUpdateColor={handleUpdateCustomColor}
              onSave={handleSaveCustom}
            />

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Palette swatches</h2>
                <div className="flex gap-2">
                  <Button
                    variant={activeVariant === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveVariant('light')}
                  >
                    <Sun className="mr-1 h-4 w-4" /> Light
                  </Button>
                  <Button
                    variant={activeVariant === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveVariant('dark')}
                  >
                    <Moon className="mr-1 h-4 w-4" /> Dark
                  </Button>
                </div>
              </div>
              <SwatchGrid colors={activeTheme.variants[activeVariant].colors} />
            </section>

            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">UI component preview</h2>
                <p className="text-xs uppercase tracking-wide text-zinc-500">
                  Shows key elements styled with this palette
                </p>
              </div>
              <InterfacePreview theme={activeTheme} variant={activeVariant} />
            </section>

            <section>
              <Card className="border-zinc-800/80">
                <CardHeader>
                  <CardTitle className="text-base text-zinc-100">Export payload (read-only)</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="max-h-80 overflow-auto rounded-2xl border border-zinc-800/80 bg-black/50 p-4 text-xs text-zinc-200">
{JSON.stringify(exportData, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </section>

            <footer className="pb-6 text-center text-xs text-zinc-600">
              Crafted with Palette Studio · Electron + Vite
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
