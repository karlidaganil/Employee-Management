import { Router } from "@vaadin/router";
import "./components/home.js";
import "./components/create.js";

const outlet = document.getElementById("outlet");

const router = new Router(outlet);
router.setRoutes([
  { path: "/", component: "home-component" },
  { path: "/create", component: "create-component" },
]);
