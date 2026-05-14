interface ScrollTickerProps {
  items: string[];
  direction?: 'left' | 'right';
  className?: string;
  itemClassName?: string;
  separator?: string;
}

export function ScrollTicker({
  items,
  direction = 'left',
  className = '',
  itemClassName = '',
}: ScrollTickerProps) {
  // Duplicate items for seamless loop
  const doubledItems = [...items, ...items];

  return (
    <div className={`ticker-wrap ${className}`}>
      <div
        className={`ticker-row ${direction === 'right' ? 'ticker-row-reverse' : ''}`}
        style={{ animationDuration: `${30}s` }}
      >
        {doubledItems.map((item, i) => (
          <span
            key={i}
            className={`ticker-item font-display text-[28px] md:text-[42px] ${itemClassName}`}
          >
            {item}
            <span className="inline-block w-2 h-2 rounded-full bg-dark-gray mx-6 align-middle" />
          </span>
        ))}
      </div>
    </div>
  );
}
