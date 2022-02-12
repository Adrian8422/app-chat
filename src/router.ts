import { Router } from "@vaadin/router";

const root = document.querySelector(".root");

const router = new Router(root);

router.setRoutes([
  { path: "/", component: "welcome-form" },
  { path: "/chat", component: "chat-page" },
]);