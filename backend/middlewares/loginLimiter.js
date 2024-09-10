import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: {
    error: "Debe esperar 60 segundos antes de intentar de nuevo",
  },
});

export default loginLimiter;
