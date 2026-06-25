"use client";

import { useEffect, useMemo, useState } from "react";
import CaptureFormRenderer from "@/features/capture/CaptureFormRenderer";
import CaptureTypeSelector from "@/features/capture/CaptureTypeSelector";
import { activityService } from "@/services/activityService";
import { decisionService } from "@/services/decisionService";
import { memoryService } from "@/services/memoryService";
import { routineService } from "@/services/routineService";
import { useAppStore } from "@/store/appStore";
import { useAuthStore } from "@/store/authStore";

const INITIAL_VALUES = {
  activity: {
    title: "",
    description: "",
    category: "",
  },
  decision: {
    title: "",
    description: "",
    confidence: "50",
    expectedOutcome: "",
  },
  memory: {
    title: "",
    notes: "",
    tags: "",
  },
  routine: {
    title: "",
    description: "",
    intervalDays: "7",
  },
};

const CREATE_SERVICE = {
  activity: activityService,
  decision: decisionService,
  memory: memoryService,
  routine: routineService,
};

function trimValue(value) {
  return typeof value === "string" ? value.trim() : value;
}

function parseTags(value) {
  return value
    .split(",")
    .map((tag) => tag.trim().replace(/^#/, ""))
    .filter(Boolean);
}

function buildPayload(type, values) {
  if (type === "decision") {
    return {
      title: trimValue(values.title),
      description: trimValue(values.description),
      confidence: values.confidence ? Number(values.confidence) : null,
      expectedOutcome: trimValue(values.expectedOutcome),
    };
  }

  if (type === "memory") {
    return {
      title: trimValue(values.title),
      content: trimValue(values.notes),
      tags: parseTags(values.tags || ""),
    };
  }

  if (type === "routine") {
    return {
      title: trimValue(values.title),
      note: trimValue(values.description),
      intervalDays: values.intervalDays ? Number(values.intervalDays) : null,
    };
  }

  return {
    title: trimValue(values.title),
    note: trimValue(values.description),
    category: trimValue(values.category),
  };
}

function freshInitialValues() {
  return Object.fromEntries(
    Object.entries(INITIAL_VALUES).map(([type, values]) => [
      type,
      { ...values },
    ]),
  );
}

export default function CaptureDialog() {
  const currentUser = useAuthStore((state) => state.currentUser);
  const refreshAll = useAppStore((state) => state.refreshAll);
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState("activity");
  const [valuesByType, setValuesByType] = useState(freshInitialValues);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const values = valuesByType[type];
  const title = useMemo(() => trimValue(values.title || ""), [values.title]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function onKeyDown(event) {
      if (event.key === "Escape" && !isSaving) {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isSaving]);

  function updateField(name, value) {
    setValuesByType((currentValues) => ({
      ...currentValues,
      [type]: {
        ...currentValues[type],
        [name]: value,
      },
    }));
  }

  function resetDialog() {
    setType("activity");
    setValuesByType(freshInitialValues());
    setError("");
  }

  function closeDialog() {
    if (isSaving) {
      return;
    }

    setIsOpen(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    if (!title) {
      setError("Title is required.");
      return;
    }

    if (!currentUser?.uid) {
      setError("You must be signed in to create an entry.");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      await CREATE_SERVICE[type].create(currentUser.uid, buildPayload(type, values));
      await refreshAll();
      resetDialog();
      setIsOpen(false);
    } catch (saveError) {
      setError(saveError.message || "Unable to save entry.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <button
        className="flex w-full cursor-pointer items-center justify-center gap-2 border border-black bg-black px-4 py-3 font-mono text-xs font-medium leading-none tracking-[0.05em] text-white transition-opacity hover:opacity-90"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <span aria-hidden="true">+</span>
        Create Entry
      </button>

      {isOpen ? (
        <div
          aria-labelledby="capture-dialog-title"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#dbdad9]/80 p-5 backdrop-blur-sm md:p-12"
          role="dialog"
        >
          <main className="relative z-50 flex w-full max-w-[480px] flex-col gap-8 border border-[#c4c7c7] bg-white p-8">
            <header className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h1
                  className="font-serif text-2xl font-medium leading-[1.3] text-black"
                  id="capture-dialog-title"
                >
                  Create Entry
                </h1>
                <button
                  aria-label="Close"
                  className="cursor-pointer text-[#444748] transition-colors hover:text-black"
                  disabled={isSaving}
                  onClick={closeDialog}
                  type="button"
                >
                  x
                </button>
              </div>
              <div
                aria-hidden="true"
                className="select-none overflow-hidden whitespace-nowrap font-mono text-xs font-medium leading-none tracking-[0.2em] text-[#c4c7c7] opacity-50"
              >
                +--------------------------------------------------+
              </div>
            </header>

            <CaptureTypeSelector
              activeType={type}
              disabled={isSaving}
              onChange={(nextType) => {
                setType(nextType);
                setError("");
              }}
            />

            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              <div className="relative min-h-[220px]">
                <CaptureFormRenderer
                  disabled={isSaving}
                  onChange={updateField}
                  type={type}
                  values={values}
                />
              </div>

              {error ? (
                <p className="font-mono text-xs font-medium leading-none tracking-[0.05em] text-[#ba1a1a]">
                  {error}
                </p>
              ) : null}

              <footer className="flex justify-end border-t border-[#c4c7c7] pt-4">
                <button
                  className="bg-black px-6 py-3 font-mono text-xs font-medium uppercase leading-none tracking-wider text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={isSaving}
                  type="submit"
                >
                  {isSaving ? "Saving" : "Save"}
                </button>
              </footer>
            </form>
          </main>
        </div>
      ) : null}
    </>
  );
}

