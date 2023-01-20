import { ServerStateConfig } from "../../config";
import { EditPolygon } from "./EditPolygon";

const polygon = {
  _id: "60f9b1f1b9b1b8a0b0b1b1b1",
  title: "test title",
  area: [],
};
const Component = () => {
  return (
    <ServerStateConfig>
      <EditPolygon polygon={polygon} />
    </ServerStateConfig>
  );
};

describe("EditPolygon Component", () => {
  it("should render Edit Polygon button", () => {
    cy.mount(<Component />);
    cy.get("[data-cy=edit_polygon_btn]").should("exist");
  });

  it("on Edit Polygon click, edit form should pop up", () => {
    cy.mount(<Component />);
    cy.get("[data-cy=edit_polygon_btn]").should("exist").click();
    cy.get("[data-cy=polygon-form]")
      .should("exist")
      .within(() => {
        cy.get("#title")
          .should("exist")
          .invoke("val")
          .should("eq", polygon.title);
        cy.get("[data-cy=apply_mutation_btn]")
          .should("exist")
          .contains("Update")
          .should("be.enabled")
          .click();
      });
  });

  it("On confirm update API should be called", () => {
    cy.intercept("PUT", `/polygon/${polygon._id}`, {
      statusCode: 200,
      body: {},
    }).as("updatePolygon");

    cy.mount(<Component />);
    cy.get("[data-cy=edit_polygon_btn]").should("exist").click();
    cy.get("[data-cy=polygon-form]")
      .should("exist")
      .within(() => {
        cy.get("[data-cy=apply_mutation_btn]").should("be.enabled").click();
      });

    // make sure the API is called with correct data
    cy.wait("@updatePolygon").should((interception) => {
      expect(interception.request.body).to.deep.equal({
        title: polygon.title,
      });
    });
  });
});
