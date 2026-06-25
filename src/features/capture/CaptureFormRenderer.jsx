"use client";

import MinimalInput from "@/features/capture/MinimalInput";
import MinimalSelect from "@/features/capture/MinimalSelect";
import MinimalTextarea from "@/features/capture/MinimalTextarea";

const ACTIVITY_CATEGORIES = [
  { value: "work", label: "Work" },
  { value: "health", label: "Health" },
  { value: "social", label: "Social" },
  { value: "learning", label: "Learning" },
];

const ROUTINE_INTERVALS = [
  { value: "1", label: "Daily" },
  { value: "7", label: "Weekly" },
  { value: "30", label: "Monthly" },
];

export default function CaptureFormRenderer({
  type,
  values,
  onChange,
  disabled,
}) {
  const fieldProps = (name) => ({
    disabled,
    name,
    onChange: (event) => onChange(name, event.target.value),
    value: values[name] || "",
  });

  if (type === "decision") {
    return (
      <div className="flex flex-col gap-6">
        <MinimalInput
          id="decision-title"
          label="Decision"
          placeholder="e.g., Invest in new tool"
          type="text"
          {...fieldProps("title")}
        />
        <MinimalTextarea
          id="decision-description"
          label="Description"
          placeholder="Why this matters..."
          rows={2}
          {...fieldProps("description")}
        />
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label
              className="font-mono text-xs font-medium uppercase leading-none tracking-[0.05em] text-[#444748]"
              htmlFor="decision-confidence"
            >
              Confidence
            </label>
            <span className="font-mono text-xs font-medium leading-none tracking-[0.05em] text-black">
              {values.confidence || "50"}%
            </span>
          </div>
          <input
            className="my-2 h-px w-full cursor-pointer appearance-none bg-[#c4c7c7] accent-black"
            disabled={disabled}
            id="decision-confidence"
            max="100"
            min="0"
            onChange={(event) => onChange("confidence", event.target.value)}
            step="10"
            type="range"
            value={values.confidence || "50"}
          />
        </div>
        <MinimalInput
          id="decision-expected-outcome"
          label="Expected Outcome"
          placeholder="In 3 months..."
          type="text"
          {...fieldProps("expectedOutcome")}
        />
      </div>
    );
  }

  if (type === "memory") {
    return (
      <div className="flex flex-col gap-6">
        <MinimalInput
          id="memory-title"
          label="Title"
          placeholder="A vivid detail..."
          type="text"
          {...fieldProps("title")}
        />
        <MinimalTextarea
          id="memory-notes"
          label="Notes"
          placeholder="Elaborate briefly..."
          rows={2}
          {...fieldProps("notes")}
        />
        <MinimalInput
          className="font-mono text-xs font-medium leading-none tracking-[0.05em]"
          id="memory-tags"
          label="Tags"
          placeholder="e.g., #milestone, #insight"
          type="text"
          {...fieldProps("tags")}
        />
      </div>
    );
  }

  if (type === "routine") {
    return (
      <div className="flex flex-col gap-6">
        <MinimalInput
          id="routine-title"
          label="Routine Name"
          placeholder="e.g., Morning Review"
          type="text"
          {...fieldProps("title")}
        />
        <MinimalTextarea
          id="routine-description"
          label="Description"
          placeholder="What needs maintaining..."
          rows={2}
          {...fieldProps("description")}
        />
        <MinimalSelect
          id="routine-interval"
          label="Repeat Interval"
          options={ROUTINE_INTERVALS}
          {...fieldProps("intervalDays")}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <MinimalInput
        autoFocus
        id="activity-title"
        label="What did you do?"
        placeholder="Brief title..."
        type="text"
        {...fieldProps("title")}
      />
      <MinimalTextarea
        id="activity-description"
        label="Description"
        placeholder="Add a little context..."
        rows={2}
        {...fieldProps("description")}
      />
      <MinimalSelect
        id="activity-category"
        label="Category"
        options={ACTIVITY_CATEGORIES}
        placeholder="Select category"
        {...fieldProps("category")}
      />
    </div>
  );
}

