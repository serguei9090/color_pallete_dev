import { PaletteTheme, RoleKey } from '@/data/themes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, CheckCircle2, Mail, Star } from 'lucide-react';

interface InterfacePreviewProps {
  theme: PaletteTheme;
  variant: 'light' | 'dark';
}

const fallbackByRole: Record<'light' | 'dark', Record<RoleKey, string>> = {
  light: {
    background: '#ffffff',
    surface: '#f4f4f5',
    primary: '#2563eb',
    link: '#3b82f6',
    text: '#0f172a',
    muted: '#6b7280',
    border: '#e5e7eb',
  },
  dark: {
    background: '#09090b',
    surface: '#18181b',
    primary: '#38bdf8',
    link: '#22d3ee',
    text: '#f4f4f5',
    muted: '#a1a1aa',
    border: '#27272a',
  },
};

export function InterfacePreview({ theme, variant }: InterfacePreviewProps) {
  const palette = theme.variants[variant].colors;
  const roleMap = palette.reduce((acc, color) => {
    acc[color.role] = color.hex;
    return acc;
  }, {} as Record<RoleKey, string>);
  const colors = { ...fallbackByRole[variant], ...roleMap };

  return (
    <div
      className="space-y-6 rounded-3xl border border-zinc-800/80"
      style={{ backgroundColor: colors.background, borderColor: colors.border }}
    >
      <header
        className="flex flex-col gap-4 border-b px-6 py-4 md:flex-row md:items-center md:justify-between"
        style={{ backgroundColor: colors.surface, borderColor: colors.border }}
      >
        <div className="flex items-center gap-2">
          <div
            className="h-10 w-10 rounded-full"
            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.link})` }}
          />
          <div>
            <p className="text-xs uppercase tracking-wider" style={{ color: colors.muted }}>
              Palette Studio
            </p>
            <p className="text-lg font-semibold" style={{ color: colors.text }}>
              Brand Kit Dashboard
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" style={{ color: colors.link }}>
            <Star className="h-4 w-4" /> Favorite
          </Button>
          <Button style={{ backgroundColor: colors.primary }}>Create Brief</Button>
        </div>
      </header>

      <section className="grid gap-6 px-6 pb-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <Card style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: colors.text }}>Marketing Snapshot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    title: 'Campaigns',
                    value: '12 Active',
                    icon: <CalendarDays className="h-4 w-4" />,
                  },
                  {
                    title: 'Deliverables',
                    value: '48 Tasks',
                    icon: <CheckCircle2 className="h-4 w-4" />,
                  },
                  {
                    title: 'Review Score',
                    value: '4.8 / 5',
                    icon: <Star className="h-4 w-4" />,
                  },
                ].map((stat) => (
                  <div
                    key={stat.title}
                    className="rounded-2xl border p-4"
                    style={{ borderColor: colors.border, backgroundColor: colors.background }}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide" style={{ color: colors.muted }}>
                      {stat.icon}
                      {stat.title}
                    </div>
                    <div className="mt-3 text-xl font-semibold" style={{ color: colors.text }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 space-y-2">
                <p className="text-sm font-medium" style={{ color: colors.text }}>
                  Team Notes
                </p>
                <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>
                  Keep typography, border, and background usage consistent with this palette. Use the
                  primary color for dominant actions and the link color for navigation states.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle style={{ color: colors.text }}>Component Inventory</CardTitle>
              <Badge style={{ borderColor: colors.border, color: colors.link }}>Live</Badge>
            </CardHeader>
            <CardContent>
              <table className="w-full table-fixed border-collapse text-left text-sm">
                <thead>
                  <tr style={{ color: colors.muted }}>
                    <th className="pb-2">Component</th>
                    <th className="pb-2">Usage</th>
                    <th className="pb-2">Color</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Primary Button', usage: 'Actions', color: colors.primary },
                    { name: 'Surface Card', usage: 'Backgrounds', color: colors.surface },
                    { name: 'Text', usage: 'Typography', color: colors.text },
                    { name: 'Border', usage: 'Dividers', color: colors.border },
                  ].map((row) => (
                    <tr key={row.name} className="border-t" style={{ borderColor: colors.border, color: colors.text }}>
                      <td className="py-2">
                        <div className="font-medium">{row.name}</div>
                      </td>
                      <td className="py-2 text-sm" style={{ color: colors.muted }}>
                        {row.usage}
                      </td>
                      <td className="py-2">
                        <span className="inline-flex items-center gap-2">
                          <span className="h-4 w-4 rounded-full border" style={{ backgroundColor: row.color, borderColor: colors.border }} />
                          <span className="font-mono text-xs uppercase" style={{ color: colors.muted }}>
                            {row.color}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: colors.text }}>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" style={{ backgroundColor: colors.primary }}>
                  Publish Update
                </Button>
                <Button className="w-full" variant="outline" style={{ borderColor: colors.border, color: colors.text }}>
                  Share Palette
                </Button>
                <Button className="w-full" variant="ghost" style={{ color: colors.link }}>
                  View Guidelines
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: colors.surface, borderColor: colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: colors.text }}>Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    author: 'Abby Mills',
                    role: 'Design Director',
                    message: 'Love the balance between action and neutral colors. Works well for accessibility.',
                  },
                  {
                    author: 'Jon Hsu',
                    role: 'Product Manager',
                    message: 'Table zebra stripes look great against the surface background, keep them consistent.',
                  },
                ].map((feedback) => (
                  <div key={feedback.author} className="rounded-2xl border p-4" style={{ borderColor: colors.border }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold" style={{ color: colors.text }}>
                          {feedback.author}
                        </p>
                        <p className="text-xs" style={{ color: colors.muted }}>
                          {feedback.role}
                        </p>
                      </div>
                      <Mail className="h-4 w-4" style={{ color: colors.link }} />
                    </div>
                    <p className="mt-3 text-sm" style={{ color: colors.muted }}>
                      {feedback.message}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
