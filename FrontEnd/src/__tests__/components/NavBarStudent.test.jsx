import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavBarStudent from "../../components/NavBarStudent";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock parcial de react-router-dom, solo useNavigate
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

const navigateMock = vi.fn();

// Mock del contexto useStudent
vi.mock("../../components/StudentContext", () => {
  return {
    useStudent: () => ({
      studentInfo: { nombre: "Juan" },
    }),
  };
});

describe("NavBarStudent", () => {
  beforeEach(() => {
    navigateMock.mockClear();
    localStorage.clear();
  });

  it("muestra el nombre del estudiante", async () => {
    const { BrowserRouter } = await import("react-router-dom");
    render(
      <BrowserRouter>
        <NavBarStudent />
      </BrowserRouter>
    );
    expect(screen.getByText("Hola Juan!")).toBeInTheDocument();
  });

  it("navega a /microcredentials cuando se clickea en 'Mi perfil'", async () => {
    const { BrowserRouter } = await import("react-router-dom");
    render(
      <BrowserRouter>
        <NavBarStudent />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText("Mi perfil"));
    expect(navigateMock).toHaveBeenCalledWith("/microcredentials");
  });

  it("borra localStorage y navega a /studentLogin al cerrar sesión", async () => {
    localStorage.setItem("studentInfo", JSON.stringify({ nombre: "Juan" }));
    localStorage.setItem("token", "123abc");

    const { BrowserRouter } = await import("react-router-dom");
    render(
      <BrowserRouter>
        <NavBarStudent />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Cerrar sesion"));

    expect(localStorage.getItem("studentInfo")).toBeNull();
    expect(localStorage.getItem("token")).toBeNull();
    expect(navigateMock).toHaveBeenCalledWith("/studentLogin");
  });
});
