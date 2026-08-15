import type { ServiceOrderStatus } from "../types";

export const serviceOrderStatus = ["open", "in_progress", "done"] as const

export const statusWithText: { [key in ServiceOrderStatus]: string } = {
  open: "aberto",
  in_progress: "em progresso",
  done: "concluído",
};