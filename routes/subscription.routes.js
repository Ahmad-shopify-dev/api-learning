import { Router } from "express";
import authroize from "../middleware/authorize.middleware.js";
import { createSubscription, getSubscriptions } from "../controller/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send({ title: "GET all subscriptions" }))

subscriptionRouter.get("/:id", (req, res) => res.send({ title: "GET subscription details" }))

// CREATE SUBSCRIPTION
subscriptionRouter.post("/", authroize, createSubscription)

subscriptionRouter.put("/:id", (req, res) => res.send({ title: "UPDATE subscription" }))

subscriptionRouter.delete("/:id", (req, res) => res.send({ title: "DELETE subscription" }))

// GET A SPECIFIC USER SUBSCRIPTIONS
subscriptionRouter.get("/user/:id", authroize, getSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) => res.send({ title: "CANCEL subscriptions" }))

subscriptionRouter.get("/upcoming-renewals", (req, res) => res.send({ title: "GET upcoming renewals" }))


export default subscriptionRouter;
