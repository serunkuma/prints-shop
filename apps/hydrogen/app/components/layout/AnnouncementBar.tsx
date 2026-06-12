interface AnnouncementBarProps {
  text?: string;
  link?: string;
}

export function AnnouncementBar({text, link}: AnnouncementBarProps) {
  if (!text) return null;

  const inner = (
    <div className="bg-gold text-void text-body-small text-center py-2 px-4 font-medium">
      {text}
    </div>
  );

  if (link) {
    return <a href={link} target="_blank" rel="noopener noreferrer" className="block">{inner}</a>;
  }

  return inner;
}
