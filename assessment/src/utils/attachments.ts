import { AttachmentType } from "../models/Post";

export function attachmentTypeFromMime(mimeType: string): AttachmentType | null {
  if (mimeType.startsWith("image/")) return AttachmentType.PHOTO;
  if (mimeType.startsWith("video/")) return AttachmentType.VIDEO;
  if (mimeType === "application/pdf") return AttachmentType.PDF;
  return null;
}
