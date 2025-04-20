import { Router } from "@vaadin/router";
import "./components/home.js";
import "./components/create-update.js";
import "./components/not-found.js";

const outlet = document.getElementById("outlet");

const router = new Router(outlet);
router.setRoutes([
  { path: "/", component: "home-component" },
  { path: "/create", component: "create-update-component" },
  { path: "/edit/:id", component: "create-update-component" },
  { path: "(.*)", component: "not-found-component" }
]);
