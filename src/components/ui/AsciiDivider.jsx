export default function AsciiDivider({
  children = "+----------------------------------------------------------------------+",
  className = "",
}) {
  return (
    <div
      className={`my-8 block w-full overflow-hidden whitespace-nowrap font-mono text-[10px] leading-none text-[#c4c7c7] ${className}`}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
