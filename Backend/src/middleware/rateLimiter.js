import ratelimit from "../config/upstash.js";


const rateLimiter = async (req, res, next) => {
    try {
        const {success} = await ratelimit.limit("my-rate-limit-key");
        if(!success){
            return res.status(429).json({message: "Too many requests, please try again later."});
        }
        next();
    } catch (error) {
        console.error("Error in rate limiter:", error);
        return res.status(500).json({message: "Internal server error."});
    }
}

export default rateLimiter;