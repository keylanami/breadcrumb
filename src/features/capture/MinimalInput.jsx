"use client";

export default function MinimalInput({ id, label, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="font-mono text-xs font-medium uppercase leading-none tracking-[0.05em] text-[#444748]"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`w-full border-0 border-b border-[#c4c7c7] bg-transparent px-0 py-2 font-sans text-base leading-6 text-black outline-none transition-all duration-200 focus:border-b-2 focus:border-black ${className}`}
        id={id}
        {...props}
      />
    </div>
  );
}

