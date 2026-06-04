import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ContentForm } from "@/features/manage-items";

describe("ContentForm", () => {
  it("blocks submit and shows a Zod error when the quote is empty", async () => {
    const onSave = vi.fn();
    render(<ContentForm initial={null} onClose={vi.fn()} onSave={onSave} />);

    fireEvent.click(screen.getByRole("button", { name: /publiceren/i }));

    expect(await screen.findByText("Quote is verplicht")).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("calls onSave with validated data for a valid quote", async () => {
    const onSave = vi.fn();
    render(<ContentForm initial={null} onClose={vi.fn()} onSave={onSave} />);

    fireEvent.change(screen.getByLabelText("Quote"), { target: { value: "Hoop doet leven" } });
    fireEvent.click(screen.getByRole("button", { name: /publiceren/i }));

    await waitFor(() => expect(onSave).toHaveBeenCalledTimes(1));
    expect(onSave.mock.calls[0][0]).toMatchObject({
      type: "quote",
      quote: "Hoop doet leven",
      author: "Donkey Inspire",
    });
    expect(onSave.mock.calls[0][1]).toBeNull();
  });
});
