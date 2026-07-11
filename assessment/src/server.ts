import { createApp } from "./app";
import { connectToDatabase } from "./db/connection";
import { config } from "./config";

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
