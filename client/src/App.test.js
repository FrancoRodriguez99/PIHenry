import { render, fireEvent, screen } from "@testing-library/react";
import App from "./App";
import ActivityCreate from "./components/ActivityCreate/ActivityCreate";
import { Provider } from "react-redux";
import store from "./redux/store";

test("NavBar Redirije correctamente", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  fireEvent.click(screen.getByText("Iniciar"));
  fireEvent.click(screen.getByText("Formulario crear Actividad"));
  const linkElement = screen.getByText("Formulario Para Crear Actividad");
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(screen.getByText("Paises"));
  const linkElement2 = screen.getByText("Anterior");
  expect(linkElement2).toBeInTheDocument();
});

test("Podes ir del inicio al Formulario de Creacion", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  fireEvent.click(screen.getByText("Formulario crear Actividad"));
  const linkElement = screen.getByText("Formulario Para Crear Actividad");
  expect(linkElement).toBeInTheDocument();
});

test("Podes Rellenar el formulario con Datos", () => {
  render(
    <Provider store={store}>
      <ActivityCreate />
    </Provider>
  );
  fireEvent.change(screen.getByLabelText("Nombre de la Actividad:"), {
    persist: jest.fn(),
    target: { id: "name", value: "Snowboarding" },
  });
  fireEvent.change(screen.getByLabelText("Duracion:"), {
    persist: jest.fn(),
    target: { id: "duracion", value: "01-30" },
  });
  fireEvent.change(screen.getByLabelText("Temporada:"), {
    persist: jest.fn(),
    target: { id: "temporada", value: "Invierno" },
  });
  fireEvent.change(screen.getByLabelText("Dificultad:"), {
    persist: jest.fn(),
    target: { id: "dificultad", value: "3" },
  });

  expect(screen.getByLabelText("Nombre de la Actividad:").value).toEqual(
    "Snowboarding"
  );
  expect(screen.getByLabelText("Duracion:").value).toEqual("01-30");
  expect(screen.getByLabelText("Temporada:").value).toEqual("Invierno");
  expect(screen.getByLabelText("Dificultad:").value).toEqual("3");
});

test("Podes Incluir Multiples Paises en simultaneo", async () => {
  render(
    <Provider store={store}>
      <ActivityCreate />
    </Provider>
  );
  fireEvent.change(screen.getByLabelText("Nombre de la Actividad:"), {
    persist: jest.fn(),
    target: { id: "name", value: "Snowboarding" },
  });
  fireEvent.change(screen.getByLabelText("Duracion:"), {
    persist: jest.fn(),
    target: { id: "duracion", value: "01-30" },
  });
  fireEvent.change(screen.getByLabelText("Temporada:"), {
    persist: jest.fn(),
    target: { id: "temporada", value: "Invierno" },
  });
  fireEvent.change(screen.getByLabelText("Dificultad:"), {
    persist: jest.fn(),
    target: { id: "dificultad", value: "3" },
  });
  fireEvent.change(screen.getByLabelText("Buscar Pais"), {
    persist: jest.fn(),
    target: { id: "buscarpais", value: "Argentina" },
  });
  fireEvent.click(screen.getByText("Agregar Este Pais a la Actividad"));

  expect(screen.getByLabelText("Nombre de la Actividad:").value).toEqual(
    "Snowboarding"
  );
  expect(screen.getByLabelText("Duracion:").value).toEqual("01-30");
  expect(screen.getByLabelText("Temporada:").value).toEqual("Invierno");
  expect(screen.getByLabelText("Dificultad:").value).toEqual("3");
});
