import { SERVER_URL } from "../configurations/env.js";
import { workflowClient } from "../configurations/upstash.js";
import Subscription from "../models/subscription.model.js"


export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });


        // SUBSCRIPTION REMINDERS
        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                "Content-Type": "application/json"
            },
            retries: 0,
        })

        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: {
                subscription,
                workflowRunId
            }
        });
    } catch (error) {
        next(error);
    }
}

export const getSubscriptions = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            const error = new Error("You are not an authorized user for this account.");
            error.statusCode = 401;
            throw error
        }

        const subscriptions = await Subscription.find({ user: req.params.id });
        res.status(200).json({
            success: true,
            data: {
                subscriptions
            }
        })
    } catch (error) {
        next(error)
    }
}

