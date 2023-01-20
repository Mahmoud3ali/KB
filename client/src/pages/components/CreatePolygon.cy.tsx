import { ServerStateConfig } from "../../config";
import { CreatePolygon } from "./CreatePolygon";

const Component = () => {
  return (
    <ServerStateConfig>
      <CreatePolygon />
    </ServerStateConfig>
  );
};

describe("CreatePolygonForm", () => {
  it("should render Add Polygon button", () => {
    cy.mount(<Component />);
    cy.get("[data-cy=create_polygon_btn]")
      .should("exist")
      .contains("Add Polygon");
  });

  it("on Add Polygon click, form should pop up", () => {
    cy.mount(<Component />);
    cy.get("[data-cy=create_polygon_btn]").should("exist").click();
    cy.get("[data-cy=polygon-form]")
      .should("exist")
      .within(() => {
        cy.get("[data-cy=update-polygon-title]")
          .should("exist")
          .contains("Create Polygon");
        cy.get("[data-cy=title_input]").should("exist").contains("Title");
        cy.get("[data-cy=apply_mutation_btn]")
          .should("exist")
          .contains("Create")
          .should("be.disabled");
      });
  });

  it("on Add Polygon click, user can create polygon after filling title", () => {
    cy.intercept("POST", "/polygon", { statusCode: 200, body: {} }).as(
      "createPolygon"
    );
    const title = "test title";
    cy.mount(<Component />);
    cy.get("[data-cy=create_polygon_btn]").should("exist").click();
    cy.get("[data-cy=polygon-form]")
      .should("exist")
      .within(() => {
        cy.get("[data-cy=title_input]").should("exist").type(title);
        cy.get("[data-cy=apply_mutation_btn]")
          .should("exist")
          .contains("Create")
          .should("be.enabled")
          .click();
        cy.wait("@createPolygon");
      });
  });

  it("on Add Polygon click, user will be prompted with error if polygon title has length < 2", () => {
    const title = "t";
    cy.mount(<Component />);
    cy.get("[data-cy=create_polygon_btn]").should("exist").click();
    cy.get("[data-cy=polygon-form]")
      .should("exist")
      .within(() => {
        cy.get("[data-cy=title_input]").should("exist").type(title);
        cy.get("[data-cy=apply_mutation_btn]")
          .should("exist")
          .contains("Create")
          .should("be.disabled");
        cy.get("[data-cy=error_text]")
          .should("exist")
          .contains("String must contain at least 2 character(s)");
      });
  });
});
