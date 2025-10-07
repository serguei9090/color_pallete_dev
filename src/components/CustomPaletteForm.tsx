import { Fragment } from 'react';
import { PaletteTheme, RoleKey, ROLE_ORDER } from '@/data/themes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CustomPaletteFormProps {
  theme: PaletteTheme;
  onUpdateMeta: (field: 'title' | 'subtitle', value: string) => void;
  onUpdateColor: (
    variant: 'light' | 'dark',
    role: RoleKey,
    field: 'name' | 'hex' | 'usage',
    value: string,
  ) => void;
  onSave: () => void;
}

export function CustomPaletteForm({ theme, onUpdateMeta, onUpdateColor, onSave }: CustomPaletteFormProps) {
  return (
    <Card className="border-zinc-800/80">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base text-zinc-100">Custom Palette Builder</CardTitle>
            <p className="text-xs text-zinc-500">
              Personalize both light and dark variants, then add them to your library.
            </p>
          </div>
          <Button onClick={onSave} className="whitespace-nowrap">
            Save Palette to Library
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm text-zinc-300">
            <span className="text-xs uppercase tracking-wide text-zinc-400">Palette name</span>
            <Input value={theme.title} onChange={(event) => onUpdateMeta('title', event.target.value)} />
          </label>
          <label className="space-y-2 text-sm text-zinc-300">
            <span className="text-xs uppercase tracking-wide text-zinc-400">Description</span>
            <Input value={theme.subtitle} onChange={(event) => onUpdateMeta('subtitle', event.target.value)} />
          </label>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {(['dark', 'light'] as const).map((variant) => (
            <Card key={variant} className="border-zinc-800/80 bg-zinc-950/60">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-sm text-zinc-100">
                  <span className="capitalize">{variant} variant</span>
                  <span className="text-xs font-normal text-zinc-500">{theme.variants[variant].mode}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ROLE_ORDER.map((role) => {
                  const color = theme.variants[variant].colors.find((item) => item.role === role)!;
                  return (
                    <Fragment key={`${variant}-${role}`}>
                      <div className="grid gap-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-medium uppercase tracking-wide text-zinc-500">
                            <span>{role}</span>
                            <input
                              type="color"
                              value={color.hex.toLowerCase()}
                              onChange={(event) => onUpdateColor(variant, role, 'hex', event.target.value)}
                              className="h-8 w-10 cursor-pointer rounded border border-zinc-800 bg-transparent"
                              aria-label={`${variant} ${role} color swatch`}
                            />
                          </div>
                          <Input
                            value={color.hex}
                            onChange={(event) => onUpdateColor(variant, role, 'hex', event.target.value)}
                            className="font-mono uppercase"
                          />
                        </div>
                        <div className="space-y-3">
                          <div className="grid gap-2 sm:grid-cols-2">
                            <label className="text-xs uppercase tracking-wide text-zinc-500">
                              Name
                              <Input
                                value={color.name}
                                className="mt-1"
                                onChange={(event) => onUpdateColor(variant, role, 'name', event.target.value)}
                              />
                            </label>
                            <label className="text-xs uppercase tracking-wide text-zinc-500">
                              Usage
                              <Input
                                value={color.usage}
                                className="mt-1"
                                onChange={(event) => onUpdateColor(variant, role, 'usage', event.target.value)}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  );
                })}
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
