import { ServerStateConfig } from "../../config";
import { DeletePolygon } from "./DeletePolygon";

const polygon = {
  _id: "60f9b1f1b9b1b8a0b0b1b1b1",
  title: "test title",
  area: [],
};
const Component = () => {
  return (
    <ServerStateConfig>
      <DeletePolygon polygon={polygon} />
    </ServerStateConfig>
  );
};

describe("DeletePolygon Component", () => {
  it("should render Delete Polygon button", () => {
    cy.mount(<Component />);
    cy.get("[data-cy=delete_polygon_btn]").should("exist");
  });

  it("on Delete Polygon click, confirmation dialog should pop up", () => {
    cy.mount(<Component />);
    cy.get("[data-cy=delete_polygon_btn]").should("exist").click();
    cy.get("[data-cy=confirmation-dialog]")
      .should("exist")
      .within(() => {
        cy.get("[data-cy=confirmation-dialog-title]")
          .should("exist")
          .contains(`Delete polygon "${polygon.title}"`);
        cy.contains("Are you sure you want to delete this polygon?");
        cy.get("[data-cy=cancel-btn]")
          .should("exist")
          .contains("Cancel")
          .should("be.enabled");
        cy.get("[data-cy=confirm-btn]")
          .should("exist")
          .contains("Delete")
          .should("be.enabled");
      });
  });

  it("Confirmation dialog can be cancelled", () => {
    cy.mount(<Component />);
    cy.get("[data-cy=delete_polygon_btn]").should("exist").click();
    cy.get("[data-cy=confirmation-dialog]")
      .should("exist")
      .within(() => {
        cy.get("[data-cy=cancel-btn]").should("exist").click();
      });
    cy.get("[data-cy=confirmation-dialog]").should("not.exist");
  });

  it("On confirm delete API is called", () => {
    cy.intercept("DELETE", `/polygon/${polygon._id}`, {
      statusCode: 200,
      body: {},
    }).as("deletePolygon");
    cy.mount(<Component />);
    cy.get("[data-cy=delete_polygon_btn]").should("exist").click();
    cy.get("[data-cy=confirmation-dialog]")
      .should("exist")
      .within(() => {
        cy.get("[data-cy=confirm-btn]").should("exist").click();
        cy.wait("@deletePolygon");
      });
    cy.get("[data-cy=confirmation-dialog]").should("not.exist");
  });
});
