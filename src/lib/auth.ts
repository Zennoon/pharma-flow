import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthMiddleware, APIError } from "better-auth/api";

import { prisma } from "@/lib/prisma";
import { getValidDomains, normalizeName } from "@/lib/utils";
import { UserRole } from "@/generated/prisma";
import { ac, roles } from "@/lib/permissions";
import { admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { sendVerificationEmailAction } from "@/actions/send-verification-email-action";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      disableSignUp: true,
    },
    discord: {
      clientId: String(process.env.DISCORD_CLIENT_ID),
      clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
      disableSignUp: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");

      await sendVerificationEmailAction({
        to: user.email,
        meta: {
          username: user.name,
          link: String(url)
        }
      });
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/social") {
      }
      if (ctx.path === "/sign-up/email") {
        const email = String(ctx.body.email);
        const domain = email.split("@")[1];
        const VALID_DOMAINS = getValidDomains();

        if (!VALID_DOMAINS.includes(domain)) {
          throw new APIError("BAD_REQUEST", {
            message: "Invalid domain, Please use a valid email.",
          });
        }

        const name = normalizeName(ctx.body.name);

        return {
          context: {
            ...ctx,
            body: {
              ...ctx.body,
              name,
            },
          },
        };
      }
    }),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(";") ?? [];

          if (ADMIN_EMAILS.includes(user.email)) {
            return { data: { ...user, role: UserRole.ADMIN } };
          }

          return { data: user };
        },
      },
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN"] as Array<UserRole>,
        input: false,
      },
      phoneNumber: {
        type: "string"
      },
      hasSetPassword: {
        type: "boolean"
      }
    },
  },

  session: {
    expiresIn: 24 * 60 * 60,
  },

  plugins: [
    admin({
      defaultRole: UserRole.USER,
      adminRoles: [UserRole.ADMIN],
      ac,
      roles,
    }),
    nextCookies(),
  ],
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
