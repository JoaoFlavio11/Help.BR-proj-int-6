import { createLogger, format, transports } from "winston";

export const logger = createLogger({
    level: process.env.LOG_LEVEL || "info", // Permite configurar o nível via variável de ambiente
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Formato de timestamp legível
    format.errors({ stack: true }),
    format.json() // Saída em JSON para fácil análise
  ),
  transports: [
    new transports.Console({ format: format.simple() }), // Logs no console
    new transports.File({ filename: "logs/error.log", level: "error" }), // Logs de erros
    new transports.File({ filename: "logs/combined.log" }), // Todos os logs
  ],
});