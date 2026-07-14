import type { ChangeEvent, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label: string;
  error?: string;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    multiline?: false;
    onValueChange: (value: string) => void;
  };

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    multiline: true;
    onValueChange: (value: string) => void;
  };

export function Field(props: InputProps | TextareaProps) {
  const { label, error, multiline, onValueChange, className, ...fieldProps } =
    props;
  const id =
    fieldProps.id ??
    `${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${String(fieldProps.name ?? "")}`;

  return (
    <label className={`block ${className ?? ""}`} htmlFor={id}>
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </span>
      {multiline ? (
        <textarea
          {...(fieldProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          id={id}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            onValueChange(event.target.value)
          }
          className="min-h-28 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm leading-6 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
        />
      ) : (
        <input
          {...(fieldProps as InputHTMLAttributes<HTMLInputElement>)}
          id={id}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onValueChange(event.target.value)
          }
          className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200"
        />
      )}
      {error ? (
        <span className="mt-1.5 block text-sm text-red-600">{error}</span>
      ) : null}
    </label>
  );
}
