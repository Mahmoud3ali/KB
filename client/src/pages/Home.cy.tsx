import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from ".";
import { ServerStateConfig } from "../config";

import POLYGONS from "../../cypress/fixtures/polygons.json";

describe("Users page", () => {
  it("should list all polygons fetched", () => {
    cy.intercept("GET", "/polygons", { statusCode: 200, body: POLYGONS }).as(
      "fetchPolygons"
    );

    cy.mount(
      <BrowserRouter>
        <ServerStateConfig>
          <Routes>
            <Route path="*" element={<HomePage />} />
          </Routes>
        </ServerStateConfig>
      </BrowserRouter>
    );

    cy.get("[data-cy=polygons_page]").should("exist");
    cy.wait("@fetchPolygons");
    Object.entries(POLYGONS.data).forEach(([_, polygon]) => {
      cy.contains(polygon.title).should("exist");
      cy.contains(polygon._id).should("exist");
    });
  });

  it("should display Add Polygon Button", () => {
    cy.intercept("GET", "/polygons", { statusCode: 200, body: POLYGONS }).as(
      "fetchPolygons"
    );

    cy.mount(
      <BrowserRouter>
        <ServerStateConfig>
          <Routes>
            <Route path="*" element={<HomePage />} />
          </Routes>
        </ServerStateConfig>
      </BrowserRouter>
    );

    cy.wait("@fetchPolygons");
    cy.get("[data-cy=polygons_page]").should("exist");
    cy.get("[data-cy=create_polygon_btn]").should("exist").should("be.enabled");
  });

  it("should display open create polygon form when add polygon button is clicked", () => {
    cy.intercept("GET", "/polygons", { statusCode: 200, body: POLYGONS }).as(
      "fetchPolygons"
    );

    cy.mount(
      <BrowserRouter>
        <ServerStateConfig>
          <Routes>
            <Route path="*" element={<HomePage />} />
          </Routes>
        </ServerStateConfig>
      </BrowserRouter>
    );

    cy.wait("@fetchPolygons");
    cy.get("[data-cy=polygons_page]").should("exist");
    cy.get("[data-cy=create_polygon_btn]")
      .should("exist")
      .should("be.enabled")
      .click();
    cy.get("[data-cy=polygon-form]").should("exist");
  });
});
