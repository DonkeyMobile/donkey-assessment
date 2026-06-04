"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CATEGORIES,
  CONTENT_TYPES,
  PHOTO_RATIOS,
  contentInputSchema,
  type ContentInput,
  type ContentType,
  type InspirationItem,
} from "@donkey/shared";
import { Button, Field, Icon, Input, Select, Textarea } from "@/shared/ui";
import { cn } from "@/shared/lib";
import { emptyItem, fromItem, type DraftItem } from "../model/draft";

/**
 * Form body for the content dialog. Uses react-hook-form with the shared Zod
 * schema as resolver. Mounted fresh per open (the parent keys it on the edit
 * target), so default values come straight from props.
 */
export function ContentForm({
  initial,
  onClose,
  onSave,
  busy = false,
}: {
  initial: InspirationItem | null;
  onClose: () => void;
  onSave: (data: ContentInput, id: string | null) => void;
  busy?: boolean;
}) {
  const isEdit = !!initial;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<DraftItem>({
    // The schema output (ContentInput) is a narrowed subset of the flat form
    // values, so the resolver is cast to the form shape.
    resolver: zodResolver(contentInputSchema) as unknown as Resolver<DraftItem>,
    defaultValues: initial ? fromItem(initial) : emptyItem("quote"),
  });

  const type = watch("type");

  const changeType = (nextType: ContentType) => {
    const currentValues = getValues();
    reset({
      ...emptyItem(nextType),
      category: currentValues.category,
      status: currentValues.status,
      title: currentValues.title,
    });
  };

  // zodResolver has already validated and parsed (stripped to the matched
  // variant), so the values are a valid ContentInput at runtime.
  const onValid = (values: DraftItem) => {
    onSave(values as unknown as ContentInput, initial?.id ?? null);
  };

  const iconForType = (contentType: ContentType) =>
    contentType === "quote" ? Icon.quote : contentType === "article" ? Icon.article : Icon.image;

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="sticky top-0 bg-surface/95 backdrop-blur border-b border-line px-6 py-4 flex items-center justify-between z-10">
        <h2 className="font-sans font-bold text-lg text-ink">
          {isEdit ? "Content bewerken" : "Nieuwe content"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Sluiten"
          className="h-9 w-9 grid place-items-center rounded-full hover:bg-ink/[0.06] text-ink-soft transition"
        >
          <Icon.x size={18} />
        </button>
      </div>

      <div className="px-6 py-5 space-y-5">
        <div>
          <span className="block text-[13px] font-semibold text-ink mb-1.5">Type content</span>
          <div className="grid grid-cols-3 gap-2">
            {CONTENT_TYPES.map((contentTypeOption) => {
              const IconComponent = iconForType(contentTypeOption.id);
              const isActive = type === contentTypeOption.id;
              return (
                <button
                  key={contentTypeOption.id}
                  type="button"
                  onClick={() => changeType(contentTypeOption.id)}
                  disabled={isEdit}
                  className={cn(
                    "flex flex-col items-center gap-1.5 py-3 rounded-xl border text-[13px] font-semibold transition",
                    isActive
                      ? "border-accent bg-accent-soft text-accent"
                      : "border-line text-ink-soft hover:border-ink/25",
                    isEdit && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <IconComponent size={19} /> {contentTypeOption.singular}
                </button>
              );
            })}
          </div>
        </div>

        {type === "quote" && (
          <Field label="Quote" error={errors.quote?.message}>
            <Textarea
              rows={3}
              invalid={!!errors.quote}
              placeholder="Een korte, inspirerende tekst…"
              {...register("quote")}
            />
          </Field>
        )}
        {type !== "quote" && (
          <Field label="Titel" error={errors.title?.message}>
            <Input
              invalid={!!errors.title}
              placeholder="Titel van de content"
              {...register("title")}
            />
          </Field>
        )}
        {type === "article" && (
          <>
            <Field label="Samenvatting" hint="Korte intro op de overzichtskaart.">
              <Textarea rows={2} placeholder="Korte samenvatting…" {...register("excerpt")} />
            </Field>
            <Field
              label="Tekst"
              error={errors.body?.message}
              hint="Gebruik een lege regel voor een nieuwe alinea."
            >
              <Textarea
                rows={6}
                invalid={!!errors.body}
                placeholder="De volledige tekst…"
                {...register("body")}
              />
            </Field>
          </>
        )}
        {type === "photo" && (
          <Field label="Bijschrift" error={errors.caption?.message}>
            <Textarea
              rows={2}
              invalid={!!errors.caption}
              placeholder="Korte beschrijving bij de foto…"
              {...register("caption")}
            />
          </Field>
        )}

        {(type === "article" || type === "photo") && (
          <Field
            label="Afbeelding-URL"
            error={errors.imageUrl?.message}
            hint="Optioneel — laat leeg voor een placeholder."
          >
            <Input invalid={!!errors.imageUrl} placeholder="https://…" {...register("imageUrl")} />
          </Field>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Auteur / bron" error={errors.author?.message}>
            <Input invalid={!!errors.author} {...register("author")} />
          </Field>
          <Field label="Categorie">
            <Select {...register("category")}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Field>
          {type === "article" && (
            <Field label="Leestijd (min)">
              <Input
                type="number"
                min="1"
                max="60"
                {...register("readingTime", { valueAsNumber: true })}
              />
            </Field>
          )}
          {type === "photo" && (
            <Field label="Verhouding">
              <Select {...register("ratio")}>
                {PHOTO_RATIOS.map((ratio) => (
                  <option key={ratio.id} value={ratio.id}>
                    {ratio.label}
                  </option>
                ))}
              </Select>
            </Field>
          )}
          <Field label="Status">
            <Select {...register("status")}>
              <option value="published">Gepubliceerd</option>
              <option value="draft">Concept</option>
            </Select>
          </Field>
        </div>
      </div>

      <div className="sticky bottom-0 bg-surface/95 backdrop-blur border-t border-line px-6 py-4 flex items-center justify-end gap-3">
        <Button type="button" variant="ghost" onClick={onClose}>
          Annuleren
        </Button>
        <Button type="submit" variant="default" disabled={busy}>
          <Icon.check size={16} /> {isEdit ? "Wijzigingen opslaan" : "Publiceren"}
        </Button>
      </div>
    </form>
  );
}
