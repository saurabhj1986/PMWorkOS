import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const envName = (process.env.PLAID_ENV || "sandbox").toLowerCase();
const basePath =
  envName === "production"
    ? PlaidEnvironments.production
    : envName === "development"
      ? PlaidEnvironments.development
      : PlaidEnvironments.sandbox;

export function makePlaidClient() {
  const clientId = process.env.PLAID_CLIENT_ID;
  const secret = process.env.PLAID_SECRET;
  if (!clientId || !secret) {
    throw new Error(
      "Missing PLAID_CLIENT_ID or PLAID_SECRET in environment (.env)"
    );
  }
  const config = new Configuration({
    basePath,
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": clientId,
        "PLAID-SECRET": secret,
      },
    },
  });
  return new PlaidApi(config);
}
