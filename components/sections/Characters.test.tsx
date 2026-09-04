import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Characters from "./Characters";
import { ASSETS } from "@/lib/assets";

describe("Characters Component (Dossier Murid 1999)", () => {
  it("renders primary characters (Atma and Raya) properly", () => {
    render(<Characters />);

    // Check headings for Atma and Raya
    expect(screen.getByRole("heading", { name: /atma/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /raya/i })).toBeInTheDocument();

    // Check dossier cards
    expect(screen.getByTestId("character-card-atma")).toBeInTheDocument();
    expect(screen.getByTestId("character-card-raya")).toBeInTheDocument();

    // Check roles
    expect(screen.getByText(/Siswa SMA & Calon Penulis/i)).toBeInTheDocument();
    expect(screen.getByText(/Kekasih Atma & Pemilik Kekuatan Spacedive/i)).toBeInTheDocument();

    // Check initial images and default alt text
    const atmaImg = screen.getByTestId("character-image-atma");
    expect(atmaImg).toBeInTheDocument();
    expect(atmaImg).toHaveAttribute("src", ASSETS.atma.default);
    expect(atmaImg).toHaveAttribute("alt", "Atma santai meniup permen karet di halte depan sekolah");

    const rayaImg = screen.getByTestId("character-image-raya");
    expect(rayaImg).toBeInTheDocument();
    expect(rayaImg).toHaveAttribute("src", ASSETS.raya.default);
    expect(rayaImg).toHaveAttribute("alt", "Raya bersantai di pinggir rel kereta menatap senja");
  });

  it("updates pose state and image attributes when pose buttons are clicked", () => {
    render(<Characters />);

    const atmaImg = screen.getByTestId("character-image-atma");

    // Click "SENYUM" pose button for Atma
    const btnSmiling = screen.getByTestId("btn-pose-smiling");
    fireEvent.click(btnSmiling);

    expect(atmaImg).toHaveAttribute("src", ASSETS.atma.smiling);
    expect(atmaImg).toHaveAttribute("alt", "Atma tersenyum ramah di bangku kelas SMA Loka");

    // Click "TERJATUH" pose button for Atma
    const btnAction = screen.getByTestId("btn-pose-action");
    fireEvent.click(btnAction);

    expect(atmaImg).toHaveAttribute("src", ASSETS.atma.action);
    expect(atmaImg).toHaveAttribute("alt", "Atma terjatuh di dalam ruang dimensi retakan mimpi");

    // Click "SPACEDIVE" pose button for Raya
    const rayaImg = screen.getByTestId("character-image-raya");
    const btnPower = screen.getByTestId("btn-pose-power");
    fireEvent.click(btnPower);

    expect(rayaImg).toHaveAttribute("src", ASSETS.raya.power);
    expect(rayaImg).toHaveAttribute("alt", "Raya mengaktifkan kekuatan magis Spacedive berpendar");
  });

  it("displays fallback placeholder when an image triggers an onError event", () => {
    render(<Characters />);

    const atmaImg = screen.getByTestId("character-image-atma");
    expect(atmaImg).toBeInTheDocument();

    // Trigger image error
    fireEvent.error(atmaImg);

    // Verify retro paper fallback is displayed with MEMORI TIDAK DITEMUKAN text
    expect(screen.getByTestId("image-fallback")).toBeInTheDocument();
    expect(screen.getByText("MEMORI TIDAK DITEMUKAN")).toBeInTheDocument();
    expect(screen.getByText(/ARSIP KOTA LOKA/i)).toBeInTheDocument();
  });

  it("ensures all accessibility attributes (alt and aria-label) are properly set", () => {
    render(<Characters />);

    // Verify all images have non-empty alt text
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThanOrEqual(2);
    images.forEach((img) => {
      expect(img).toHaveAttribute("alt");
      expect(img.getAttribute("alt")).not.toBe("");
    });

    // Verify pose buttons have descriptive aria-labels
    const atmaBubblegumBtn = screen.getByTestId("btn-pose-bubblegum");
    expect(atmaBubblegumBtn).toHaveAttribute("aria-label", "Pilih pose SANTAI untuk Atma");

    const atmaSmilingBtn = screen.getByTestId("btn-pose-smiling");
    expect(atmaSmilingBtn).toHaveAttribute("aria-label", "Pilih pose SENYUM untuk Atma");

    const rayaChillBtn = screen.getByTestId("btn-pose-chill");
    expect(rayaChillBtn).toHaveAttribute("aria-label", "Pilih pose SANTAI untuk Raya");

    const rayaPowerBtn = screen.getByTestId("btn-pose-power");
    expect(rayaPowerBtn).toHaveAttribute("aria-label", "Pilih pose SPACEDIVE untuk Raya");

    // Verify secret buttons have descriptive aria-labels
    const atmaSecretBtn = screen.getByTestId("btn-secret-atma");
    expect(atmaSecretBtn).toHaveAttribute("aria-label", "Buka catatan rahasia batin Atma");

    const rayaSecretBtn = screen.getByTestId("btn-secret-raya");
    expect(rayaSecretBtn).toHaveAttribute("aria-label", "Buka catatan rahasia batin Raya");
  });
});
