import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import PrerequisitesPage from "../../pages/PrerequisitesPage"; 

// Mock de navigate para useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({
      state: {
        nombre: "Curso de prueba",
        descripcion: "Descripción del curso",
        duracion: "10h",
        requisitos: [{ nombre: "Requisito1" }, { nombre: "Requisito2" }],
      },
      search: "",
    }),
  };
});

describe("PrerequisitesPage", () => {
  it("debe mostrar el título correcto", () => {
    render(
      <MemoryRouter>
        <PrerequisitesPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Formulario de Solicitud")).toBeInTheDocument();
  });

  it("debe validar el email correctamente", () => {
    render(
      <MemoryRouter>
        <PrerequisitesPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "email_incorrecto" } });
    expect(emailInput.classList.contains("is-invalid")).toBe(true);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.classList.contains("is-invalid")).toBe(false);
  });

  it("debe permitir escribir en los campos de nombre y apellidos", () => {
    render(
      <MemoryRouter>
        <PrerequisitesPage />
      </MemoryRouter>
    );

    const nombreInput = screen.getByLabelText("Nombre");
    fireEvent.change(nombreInput, { target: { value: "Juan" } });
    expect(nombreInput.value).toBe("Juan");

    const primerApellidoInput = screen.getByLabelText("Primer apellido");
    fireEvent.change(primerApellidoInput, { target: { value: "Pérez" } });
    expect(primerApellidoInput.value).toBe("Pérez");

    const segundoApellidoInput = screen.getByLabelText("Segundo apellido");
    fireEvent.change(segundoApellidoInput, { target: { value: "García" } });
    expect(segundoApellidoInput.value).toBe("García");
  });

  it("deshabilita el botón enviar si el formulario no está completo", () => {
    render(
      <MemoryRouter>
        <PrerequisitesPage />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /enviar/i });
    expect(button).toBeDisabled();
  });

  // Puedes añadir más tests para la lógica de enviar, modales, etc.
});
