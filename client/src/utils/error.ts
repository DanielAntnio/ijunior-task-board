export function formatError(err: unknown, message?: string) {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return message ?? "Ocorreu um erro inesperado";
}
