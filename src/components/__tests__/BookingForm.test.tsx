// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingForm from "@/components/BookingForm";
import { createBooking } from "@/app/actions/booking";

vi.mock("@/app/actions/booking", () => ({
  createBooking: vi.fn(),
}));

describe("BookingForm (frontend)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.open = vi.fn();
  });

  it("menampilkan field wajib", () => {
    render(<BookingForm packageSlug="jogja" vehicleOptions={[{ name: "Sigra" }]} />);
    expect(screen.getByPlaceholderText("Nama Anda")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("08xxxxxxxxxx")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Booking via WhatsApp/i })).toBeInTheDocument();
  });

  it("menampilkan armada dari props", () => {
    render(<BookingForm packageSlug="jogja" vehicleOptions={[{ name: "Sigra" }, { name: "Avanza" }]} />);
    expect(screen.getByRole("option", { name: "Sigra" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Avanza" })).toBeInTheDocument();
  });

  it("action error → menampilkan pesan error", async () => {
    vi.mocked(createBooking).mockResolvedValueOnce({
      error: "Nama dan nomor WhatsApp wajib diisi.",
    });
    const user = userEvent.setup();
    render(<BookingForm packageSlug="jogja" vehicleOptions={[]} />);

    await user.type(screen.getByPlaceholderText("Nama Anda"), "Budi");
    await user.type(screen.getByPlaceholderText("08xxxxxxxxxx"), "08123456789");
    await user.click(screen.getByRole("button", { name: /Booking via WhatsApp/i }));

    await waitFor(() => {
      expect(screen.getByText(/Nama dan nomor WhatsApp wajib diisi/i)).toBeInTheDocument();
    });
  });

  it("submit sukses → membuka WhatsApp dengan pesan terformat", async () => {
    vi.mocked(createBooking).mockResolvedValueOnce({ success: true, id: 1 });
    const user = userEvent.setup();
    render(<BookingForm packageSlug="jogja" packageName="Jogja Explore" vehicleOptions={[]} />);

    await user.type(screen.getByPlaceholderText("Nama Anda"), "Budi");
    await user.type(screen.getByPlaceholderText("08xxxxxxxxxx"), "08123456789");
    await user.click(screen.getByRole("button", { name: /Booking via WhatsApp/i }));

    await waitFor(() => {
      expect(window.open).toHaveBeenCalledTimes(1);
      const url = vi.mocked(window.open).mock.calls[0][0] as string;
      expect(url).toContain("wa.me");
      expect(url).toContain(encodeURIComponent("Budi"));
      expect(url).toContain(encodeURIComponent("Jogja Explore"));
    });
  });
});
