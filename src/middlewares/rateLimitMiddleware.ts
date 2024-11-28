import rateLimit from "express-rate-limit";

export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200, //limite de requisições por IP
  message:
    "Muitas requisições vindas deste IP. Por favor, tente novamente mais tarde.",
});
