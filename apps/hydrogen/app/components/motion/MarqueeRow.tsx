export default function MarqueeRow({
  children,
  speed = 38,
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max animate-[kumachi-marquee_linear_infinite]"
        style={{animationDuration: `${speed}s`}}
      >
        {children}
      </div>
    </div>
  );
}
