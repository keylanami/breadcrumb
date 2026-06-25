"use client";

export const CAPTURE_TYPES = [
  { id: "activity", label: "Activity" },
  { id: "decision", label: "Decision" },
  { id: "memory", label: "Memory" },
  { id: "routine", label: "Routine" },
];

export default function CaptureTypeSelector({ activeType, onChange, disabled }) {
  return (
    <nav aria-label="Capture Type">
      <ul className="flex flex-wrap gap-2">
        {CAPTURE_TYPES.map((type) => {
          const isActive = type.id === activeType;

          return (
            <li key={type.id}>
              <button
                className={`border px-4 py-2 font-mono text-xs font-medium leading-none tracking-[0.05em] transition-colors ${
                  isActive
                    ? "border-black bg-black text-white"
                    : "border-[#c4c7c7] bg-transparent text-[#444748] hover:border-black hover:text-black"
                }`}
                disabled={disabled}
                onClick={() => onChange(type.id)}
                type="button"
              >
                {type.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

