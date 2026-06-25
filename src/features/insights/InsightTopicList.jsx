export default function InsightTopicList({ items }) {
  if (!items.length) {
    return (
      <p className="font-sans text-base leading-6 text-[#5d5f5d]">
        No topics available yet.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li className="flex items-start gap-3" key={item.label}>
          <span className="select-none text-[#5d5f5d]">-</span>
          <span className="flex-grow font-sans text-lg leading-[1.6] text-black">
            {item.label}
          </span>
          {item.count !== undefined ? (
            <span className="font-mono text-xs font-medium leading-none tracking-[0.05em] text-[#5d5f5d]">
              {item.count}
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
