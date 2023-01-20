import { useLocation, useNavigate } from "react-router-dom";
import { RouterConfig } from "./Router";
import { ServerStateConfig } from "./ServerState";

describe("RouterConfig", () => {
  it("give children access to router api and can navigate user to different routes", () => {
    const Component = () => {
      const location = useLocation();
      const navigate = useNavigate();
      return (
        <div
          data-cy={location ? "connected_component" : "disconnected_component"}
          onClick={() => navigate("/")}
        >
          Test
        </div>
      );
    };
    cy.mount(
      <ServerStateConfig>
        <RouterConfig>
          <Component />
        </RouterConfig>
      </ServerStateConfig>
    );
    cy.get("[data-cy=connected_component]").should("exist").click();
    cy.location("pathname").should("eq", "/");
  });

  it("renders not found page if user accessed a wrong url", () => {
    const Component = () => {
      const navigate = useNavigate();

      return (
        <>
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/hello_world")}>Hello World</button>
        </>
      );
    };

    cy.mount(
      <ServerStateConfig>
        <RouterConfig>
          <Component />
        </RouterConfig>
      </ServerStateConfig>
    );

    cy.get("button").contains("Home").click();
    cy.location("pathname").should("eq", "/");
    cy.get("[data-cy='notfound_page']").should("not.exist");
    cy.get("button").contains("Hello World").click();
    cy.get("[data-cy='notfound_page']").should("exist");
    cy.get("[data-cy='back_home_btn']").click();
    cy.location("pathname").should("eq", "/");
  });
});
