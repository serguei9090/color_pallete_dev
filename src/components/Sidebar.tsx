import { useMemo, useState } from 'react';
import { Search, Palette } from 'lucide-react';
import { Input } from './ui/input';
import { PaletteTheme } from '@/data/themes';

interface SidebarProps {
  themes: PaletteTheme[];
  activeId: string;
  onSelect: (id: string) => void;
}

export function Sidebar({ themes, activeId, onSelect }: SidebarProps) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    if (!query) return themes;
    const lower = query.toLowerCase();
    return themes.filter((theme) =>
      `${theme.title} ${theme.subtitle}`.toLowerCase().includes(lower),
    );
  }, [query, themes]);

  return (
    <aside className="flex h-full w-full flex-col gap-4 border-r border-zinc-800/70 bg-zinc-950/70 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-zinc-400">
        <Palette className="h-4 w-4" /> Palettes
      </div>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search palettes"
          className="pl-10"
        />
      </div>
      <div className="custom-scroll grow space-y-1 overflow-y-auto pr-1">
        {filtered.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => onSelect(theme.id)}
            className={`w-full rounded-2xl border px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
              theme.id === activeId
                ? 'border-zinc-700 bg-zinc-900/70 text-zinc-100'
                : 'border-transparent bg-zinc-900/30 text-zinc-400 hover:bg-zinc-900/60'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">{theme.title}</div>
                <div className="text-xs text-zinc-500">{theme.subtitle}</div>
              </div>
              <div className="flex gap-1">
                {theme.variants.dark.colors.slice(0, 3).map((color) => (
                  <span
                    key={`${theme.id}-${color.role}`}
                    className="h-2 w-5 rounded-full"
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
