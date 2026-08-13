"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Pencil, Check, X } from "lucide-react";
import type { CourseModule, CourseLesson } from "@/lib/courses";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

interface CurriculumEditorProps {
  courseId: string;
  modules: CourseModule[];
}

const LESSON_TYPES: CourseLesson["type"][] = ["video", "article", "quiz"];

interface LessonFormState {
  title: string;
  type: CourseLesson["type"];
  contentUrl: string;
  durationMins: string;
  isPreview: boolean;
}

const EMPTY_LESSON_FORM: LessonFormState = {
  title: "",
  type: "video",
  contentUrl: "",
  durationMins: "",
  isPreview: false,
};

function lessonToForm(lesson: CourseLesson): LessonFormState {
  return {
    title: lesson.title,
    type: lesson.type,
    contentUrl: lesson.contentUrl ?? "",
    durationMins: lesson.durationMins?.toString() ?? "",
    isPreview: lesson.isPreview,
  };
}

export function CurriculumEditor({ courseId, modules }: CurriculumEditorProps) {
  const router = useRouter();

  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [moduleEditTitle, setModuleEditTitle] = useState("");

  const [addingLessonTo, setAddingLessonTo] = useState<string | null>(null);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [lessonForm, setLessonForm] = useState<LessonFormState>(EMPTY_LESSON_FORM);

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function closeLessonForm() {
    setAddingLessonTo(null);
    setEditingLessonId(null);
    setLessonForm(EMPTY_LESSON_FORM);
  }

  async function addModule() {
    if (!newModuleTitle.trim()) return;
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/courses/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course_id: courseId, title: newModuleTitle, sort_order: modules.length }),
      });
      if (!res.ok) throw new Error("Failed to add module");
      setNewModuleTitle("");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  }

  async function saveModuleTitle(moduleId: string) {
    if (!moduleEditTitle.trim()) return;
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/courses/modules/${moduleId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: moduleEditTitle }),
      });
      if (!res.ok) throw new Error("Failed to update module");
      setEditingModuleId(null);
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteModule(moduleId: string) {
    if (!window.confirm("Delete this module and all its lessons?")) return;
    await fetch(`/api/admin/courses/modules/${moduleId}`, { method: "DELETE" });
    router.refresh();
  }

  async function saveLesson(moduleId: string) {
    if (!lessonForm.title.trim()) return;
    setIsSaving(true);
    setError(null);
    try {
      const payload = {
        title: lessonForm.title,
        type: lessonForm.type,
        content_url: lessonForm.contentUrl || undefined,
        duration_mins: lessonForm.durationMins ? Number(lessonForm.durationMins) : undefined,
        is_preview: lessonForm.isPreview,
      };

      const res = editingLessonId
        ? await fetch(`/api/admin/courses/lessons/${editingLessonId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/admin/courses/lessons", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...payload,
              module_id: moduleId,
              sort_order: modules.find((m) => m.id === moduleId)?.lessons.length ?? 0,
            }),
          });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Failed to save lesson");
      }
      closeLessonForm();
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteLesson(lessonId: string) {
    if (!window.confirm("Delete this lesson?")) return;
    await fetch(`/api/admin/courses/lessons/${lessonId}`, { method: "DELETE" });
    router.refresh();
  }

  function renderLessonForm(moduleId: string) {
    return (
      <div className="space-y-3 rounded-lg border border-gray-200 p-4">
        <input
          type="text"
          placeholder="Lesson title"
          value={lessonForm.title}
          onChange={(e) => setLessonForm((f) => ({ ...f, title: e.target.value }))}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <div className="flex flex-wrap gap-3">
          <select
            value={lessonForm.type}
            onChange={(e) => setLessonForm((f) => ({ ...f, type: e.target.value as CourseLesson["type"] }))}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            {LESSON_TYPES.map((type) => (
              <option key={type} value={type} className="capitalize">
                {type}
              </option>
            ))}
          </select>
          <input
            type="number"
            min={0}
            placeholder="Duration (mins)"
            value={lessonForm.durationMins}
            onChange={(e) => setLessonForm((f) => ({ ...f, durationMins: e.target.value }))}
            className="w-36 rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
          <label className="flex items-center gap-2 text-sm text-brand-muted">
            <input
              type="checkbox"
              checked={lessonForm.isPreview}
              onChange={(e) => setLessonForm((f) => ({ ...f, isPreview: e.target.checked }))}
              className="h-4 w-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
            />
            Free preview
          </label>
        </div>

        {lessonForm.type === "video" && (
          <input
            type="text"
            placeholder="YouTube video URL (e.g. https://www.youtube.com/watch?v=...)"
            value={lessonForm.contentUrl}
            onChange={(e) => setLessonForm((f) => ({ ...f, contentUrl: e.target.value }))}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        )}
        {lessonForm.type === "article" && (
          <RichTextEditor
            value={lessonForm.contentUrl}
            onChange={(html) => setLessonForm((f) => ({ ...f, contentUrl: html }))}
          />
        )}
        {lessonForm.type === "quiz" && (
          <p className="text-xs text-brand-muted">
            Quiz questions aren&apos;t editable yet — you can save the lesson placeholder now and add
            questions once that&apos;s built.
          </p>
        )}

        <div className="flex gap-2">
          <button
            type="button"
            disabled={isSaving || !lessonForm.title.trim()}
            onClick={() => saveLesson(moduleId)}
            className="rounded-md bg-brand-orange px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {editingLessonId ? "Save Changes" : "Save Lesson"}
          </button>
          <button
            type="button"
            onClick={closeLessonForm}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-brand-blue"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="font-display text-lg font-semibold text-brand-blue">Curriculum</h2>
      <p className="mt-1 text-sm text-brand-muted">
        Video lessons link to a YouTube video. Article lessons use the rich text editor. Quizzes
        can be created now but aren&apos;t editable yet.
      </p>

      <div className="mt-6 space-y-6">
        {modules.map((mod) => (
          <div key={mod.id} className="overflow-hidden rounded-xl border border-gray-200">
            <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-brand-light px-4 py-3">
              {editingModuleId === mod.id ? (
                <div className="flex flex-1 items-center gap-2">
                  <input
                    type="text"
                    value={moduleEditTitle}
                    onChange={(e) => setModuleEditTitle(e.target.value)}
                    className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => saveModuleTitle(mod.id)}
                    disabled={isSaving || !moduleEditTitle.trim()}
                    aria-label="Save module title"
                    className="text-green-600 hover:text-green-700 disabled:opacity-50"
                  >
                    <Check size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingModuleId(null)}
                    aria-label="Cancel"
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <span className="font-medium text-brand-blue">{mod.title}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingModuleId(mod.id);
                        setModuleEditTitle(mod.title);
                      }}
                      aria-label="Edit module"
                      className="text-gray-400 hover:text-brand-blue"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteModule(mod.id)}
                      aria-label="Delete module"
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>

            {mod.lessons.length > 0 && (
              <ul className="divide-y divide-gray-100">
                {mod.lessons.map((lesson) =>
                  editingLessonId === lesson.id ? (
                    <li key={lesson.id} className="p-4">
                      {renderLessonForm(mod.id)}
                    </li>
                  ) : (
                    <li key={lesson.id} className="flex items-center justify-between px-4 py-3 text-sm">
                      <div>
                        <span className="font-medium text-brand-blue">{lesson.title}</span>
                        <span className="ml-2 text-xs uppercase text-brand-muted">{lesson.type}</span>
                        {lesson.isPreview && (
                          <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                            Preview
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingLessonId(lesson.id);
                            setAddingLessonTo(null);
                            setLessonForm(lessonToForm(lesson));
                          }}
                          aria-label="Edit lesson"
                          className="text-gray-400 hover:text-brand-blue"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteLesson(lesson.id)}
                          aria-label="Delete lesson"
                          className="text-gray-400 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </li>
                  )
                )}
              </ul>
            )}

            <div className="p-4">
              {addingLessonTo === mod.id ? (
                renderLessonForm(mod.id)
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setAddingLessonTo(mod.id);
                    setEditingLessonId(null);
                    setLessonForm(EMPTY_LESSON_FORM);
                  }}
                  className="flex items-center gap-1 text-sm font-medium text-brand-blue hover:underline"
                >
                  <Plus size={14} /> Add Lesson
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2">
        <input
          type="text"
          placeholder="New module title"
          value={newModuleTitle}
          onChange={(e) => setNewModuleTitle(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
        />
        <button
          type="button"
          disabled={isSaving || !newModuleTitle.trim()}
          onClick={addModule}
          className="flex items-center gap-1 rounded-md bg-brand-blue px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Plus size={14} /> Add Module
        </button>
      </div>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}
