import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "vitest";
import { StudyProvider, useStudy } from "./StudyContext";

function TestConsumer() {
  const { subjects, addSubject } = useStudy();

  return (
    <div>
      <button onClick={() => addSubject({ name: "Math", description: "test", color: "#000000" })}>
        add
      </button>
      <span data-testid="subject-count">{subjects.length}</span>
    </div>
  );
}

describe("StudyContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds a subject to context state", () => {
    render(
      <StudyProvider>
        <TestConsumer />
      </StudyProvider>
    );

    fireEvent.click(screen.getByText("add"));
    expect(screen.getByTestId("subject-count")).toHaveTextContent("1");
  });
});
