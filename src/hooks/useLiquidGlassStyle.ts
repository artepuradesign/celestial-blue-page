import { useLiquidGlass } from '@/contexts/LiquidGlassContext';
import { useMemo } from 'react';
import { useTheme } from '@/components/ThemeProvider';

/**
 * Returns inline CSS style object with liquid glass effect based on global config.
 * Use on any container to apply the liquid glass look.
 */
export function useLiquidGlassStyle(overrides?: { backgroundAlpha?: number; cornerRadius?: number }) {
  const { config } = useLiquidGlass();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const style = useMemo(() => {
    if (!config.enabled) return {} as React.CSSProperties;
    
    const alpha = overrides?.backgroundAlpha ?? config.backgroundAlpha;
    const radius = overrides?.cornerRadius ?? config.cornerRadius;
    const filter = `blur(${config.strength + config.extraBlur}px) saturate(${config.tintSaturation}%) contrast(${config.contrast}%) brightness(${config.brightness}%) invert(${config.invert}%) hue-rotate(${config.tintHue}deg)`;
    const base = isDark ? '255,255,255' : '0,0,0';

    return {
      borderRadius: `${radius}px`,
      backdropFilter: filter,
      WebkitBackdropFilter: filter,
      background: `rgba(${base},${alpha / 100})`,
      boxShadow: `0 0 ${config.softness}px rgba(${base},${config.edgeSpecularity / 200}), inset 0 1px 0 rgba(${base},${config.edgeSpecularity / 300})`,
      opacity: config.opacity / 100,
      border: `1px solid rgba(${base},${alpha / 200})`,
    } as React.CSSProperties;
  }, [config, overrides?.backgroundAlpha, overrides?.cornerRadius, isDark]);

  return style;
}
