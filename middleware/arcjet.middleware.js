import aj from "../configurations/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(409).json({
                    success: false,
                    message: "Rate limit exceeded"
                });
            }
            if (decision.reason.isBot()) {
                return res.status(403).json({
                    success: false,
                    message: "Bot detected"
                });
            }

            res.status(403).json({
                success: false,
                message: "Access Denied"
            })
        }
        next();
    } catch (error) {
        console.log(`Error form arcjet: ${error}`);
        next(error);
    }
}

export default arcjetMiddleware;