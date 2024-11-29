import { createClient } from "redis";

export const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis Client Error:", err));

export const connectToRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Conectado ao Redis com sucesso!");
    } catch (error) {
        console.error("Erro ao conectar ao Redis:", error);
    }
};