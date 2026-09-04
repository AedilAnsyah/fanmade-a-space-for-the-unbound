import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import AmbientPlayer from "./AmbientPlayer";

describe("AmbientPlayer Component (Mini Walkman Sony TPS-L2)", () => {
  it("renders Walkman player with 4 corner screws, cassette window, and diegetic labels", () => {
    render(<AmbientPlayer />);

    // Container
    expect(screen.getByTestId("walkman-player")).toBeInTheDocument();

    // 4 Screws
    expect(screen.getByTestId("screw-tl")).toBeInTheDocument();
    expect(screen.getByTestId("screw-tr")).toBeInTheDocument();
    expect(screen.getByTestId("screw-bl")).toBeInTheDocument();
    expect(screen.getByTestId("screw-br")).toBeInTheDocument();

    // Cassette Window & Spool Gears
    expect(screen.getByTestId("cassette-window")).toBeInTheDocument();
    expect(screen.getByTestId("spool-left")).toBeInTheDocument();
    expect(screen.getByTestId("spool-right")).toBeInTheDocument();

    // Labels
    expect(screen.getByText("WALKMAN AUTO-REVERSE")).toBeInTheDocument();
    expect(screen.getByText("SIDE A: ITTOU BACHTIAR - THEME")).toBeInTheDocument();

    // LED initially inactive
    const led = screen.getByTestId("led-indicator");
    expect(led.className).toContain("bg-[#4B5563]");
  });

  it("toggles audio play/pause, LED indicator, and spool gear animation", async () => {
    render(<AmbientPlayer />);

    const playBtn = screen.getByTestId("walkman-play-btn");
    const led = screen.getByTestId("led-indicator");
    const spoolLeft = screen.getByTestId("spool-left");
    const spoolRight = screen.getByTestId("spool-right");

    // Initially paused: no spin animation
    expect(spoolLeft.className).not.toContain("animate-[spin_4s_linear_infinite]");
    expect(spoolRight.className).not.toContain("animate-[spin_4s_linear_infinite]");

    // Click to Play
    await act(async () => {
      fireEvent.click(playBtn);
    });

    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
    expect(led.className).toContain("bg-[#F4C95D]");
    expect(spoolLeft.className).toContain("animate-[spin_4s_linear_infinite]");
    expect(spoolRight.className).toContain("animate-[spin_4s_linear_infinite]");

    // Click to Pause
    await act(async () => {
      fireEvent.click(playBtn);
    });

    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(led.className).toContain("bg-[#4B5563]");
    expect(spoolLeft.className).not.toContain("animate-[spin_4s_linear_infinite]");
    expect(spoolRight.className).not.toContain("animate-[spin_4s_linear_infinite]");
  });

  it("has proper accessibility attributes", () => {
    render(<AmbientPlayer />);

    const playBtn = screen.getByTestId("walkman-play-btn");
    expect(playBtn).toHaveAttribute(
      "aria-label",
      "Putar kaset Walkman: Ittou Bachtiar - Theme"
    );
  });
});
