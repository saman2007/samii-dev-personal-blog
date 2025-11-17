// environment.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      DATABASE_URL: string;
      DATABASE_SUPPORT_SSL: string;
      REFRESH_SECRET: string;
      ACCESS_SECRET: string;
      WEBSITE_URL?: string;
      NEXT_PUBLIC_WEBSITE_URL?: string;
    }
  }
}

// This line is needed to make the file a module, even if it's empty.
export {};
