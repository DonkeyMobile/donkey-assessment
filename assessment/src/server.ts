import { createApp } from "./app";
import { connectToDatabase } from "./db/connection";
import { config } from "./config";
import { disconnectFromDatabase } from "./db/connection";

async function bootstrap(): Promise<void> {
  await connectToDatabase();
  const app = createApp();
  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${config.port}`);
  });
}

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server", error);
  process.exit(1);
});

const shutdown = async () => {
  console.log("Shutting down gracefully...");
  try {
    await disconnectFromDatabase();
    process.exit(0);
  } catch (error) {
    console.error("Error during shutdown", error);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
