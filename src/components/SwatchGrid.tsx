import { PaletteColor } from '@/data/themes';
import { Card, CardContent } from './ui/card';

interface SwatchGridProps {
  colors: PaletteColor[];
}

export function SwatchGrid({ colors }: SwatchGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {colors.map((color) => (
        <Card key={color.role} className="overflow-hidden border-zinc-800/80">
          <div className="h-32 w-full" style={{ backgroundColor: color.hex }} />
          <CardContent className="space-y-1">
            <div className="text-sm font-semibold text-zinc-100">{color.name}</div>
            <div className="text-xs font-mono uppercase tracking-wide text-zinc-400">{color.hex}</div>
            <div className="text-xs text-zinc-500">{color.usage}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
