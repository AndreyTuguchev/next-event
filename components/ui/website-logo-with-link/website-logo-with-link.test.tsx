import { render } from "vitest-browser-react";
import { page } from "vitest/browser";
import WebsiteLogoWithLink from "./website-logo-with-link";

describe("Website Logo with link", () => {
  it("should render website logo with the homepage link", async () => {
    render(<WebsiteLogoWithLink />);

    const link = page.getByRole("link");

    await expect.element(link).toBeInTheDocument();
    await expect.element(link).toHaveAttribute("href", "/");

    const image = page.getByRole("img", { name: /logo/i });

    await expect.element(image).toBeInTheDocument();
    await expect.element(image).toBeVisible();

    await expect
      .element(image)
      .toHaveAttribute("src", expect.stringContaining("/assets/images/"));
  });

  it("renders placeholder SVG when lazyload=true", async () => {
    render(<WebsiteLogoWithLink lazyload />);

    const image = page.getByRole("img", { name: /logo/i });
    await expect.element(image).toBeInTheDocument();

    await expect
      .element(image)
      .toHaveAttribute("src", expect.stringContaining("data:image/svg+xml"));
  });
});
