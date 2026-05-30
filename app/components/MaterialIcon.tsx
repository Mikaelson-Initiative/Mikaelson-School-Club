interface MaterialIconProps {
  icon: string;
  className?: string;
  fill?: boolean;
}

export default function MaterialIcon({
  icon,
  className = '',
  fill = false,
}: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={fill ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {icon}
    </span>
  );
}
