import { RouterConfig, ServerStateConfig } from "../config";
import { NavItem } from "./NavItem";

describe("NavItem", () => {
  it("renders a nav item and when clicked move user to new route", () => {
    cy.mount(
      <ServerStateConfig>
        <RouterConfig>
          <NavItem data-cy="home_link" name="Home" path="/" />
        </RouterConfig>
      </ServerStateConfig>
    );
    cy.get("[data-cy=home_link]").should("exist").click();
    cy.location("pathname").should("eq", "/");
  });
});
