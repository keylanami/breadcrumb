"use client";

export default function MinimalSelect({
  id,
  label,
  options,
  placeholder,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="font-mono text-xs font-medium uppercase leading-none tracking-[0.05em] text-[#444748]"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <select
          className={`w-full appearance-none border-0 border-b border-[#c4c7c7] bg-transparent px-0 py-2 pr-8 font-sans text-base leading-6 text-black outline-none transition-all duration-200 focus:border-b-2 focus:border-black ${className}`}
          id={id}
          {...props}
        >
          {placeholder ? (
            <option disabled value="">
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[#444748]"
        >
          v
        </span>
      </div>
    </div>
  );
}

