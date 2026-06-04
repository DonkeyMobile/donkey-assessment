import { toNodeHandler } from "better-auth/node";
import { makeApp } from "./app/index.js";
import { auth, makeLogoutHandler } from "./features/auth/index.js";
import { makeItemsReadRouter } from "./features/view-store/index.js";
import { makeItemsAdminRouter } from "./features/manage-items/index.js";
import { createPrismaInspirationItemRepository } from "./entities/inspiration-item/index.js";
import { createRequireAdmin } from "./shared/middleware/index.js";
import { prisma } from "./shared/db/index.js";
import { env } from "./shared/config/index.js";

// Compose the application from its slices.
const repo = createPrismaInspirationItemRepository(prisma);
const requireAdmin = createRequireAdmin((headers) => auth.api.getSession({ headers }));

const logoutHandler = makeLogoutHandler({
  auth,
  prisma,
  keycloakPublicUrl: env.keycloak.publicUrl,
  clientId: env.keycloak.clientId,
  postLogoutRedirectUri: `${env.betterAuthUrl}/`,
});

const app = makeApp({
  authHandler: toNodeHandler(auth),
  logoutHandler,
  readRouter: makeItemsReadRouter(repo),
  adminRouter: makeItemsAdminRouter({ repo, requireAdmin }),
});

app.listen(env.port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${env.port}`);
});
