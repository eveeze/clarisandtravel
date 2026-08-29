// @vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/Button";

describe("Button component", () => {
  it("renders label and links to href", () => {
    render(<Button href="/tours-pricing">Lihat Paket</Button>);
    const link = screen.getByRole("link", { name: /Lihat Paket/i });
    expect(link).toHaveAttribute("href", "/tours-pricing");
  });

  it("renders arrow icon by default", () => {
    render(<Button href="/tours-pricing">Lihat Paket</Button>);
    expect(screen.getByText("Lihat Paket")).toBeInTheDocument();
  });

  it("renders ghost variant with border class", () => {
    render(
      <Button href="/profile" variant="ghost">
        Tentang
      </Button>,
    );
    const link = screen.getByRole("link", { name: /Tentang/i });
    expect(link.className).toContain("border");
  });

  it("is interactive on click", async () => {
    const user = userEvent.setup();
    render(<Button href="/tours-pricing">Lihat Paket</Button>);
    const link = screen.getByRole("link", { name: /Lihat Paket/i });
    await user.click(link);
    expect(link).toHaveAttribute("href", "/tours-pricing");
  });
});
