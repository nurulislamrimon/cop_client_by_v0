"use server";

import { envConfig } from "@/config/envConfig";
import { revalidateTag, revalidatePath } from "next/cache";

type FetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: HeadersInit;
  body?: any;
  timeout?: number; // in milliseconds
  authToken?: string;
  nextCache?: RequestCache;
  nextTags?: string[];

  // Revalidation after mutation
  revalidateTags?: string[];
  revalidatePaths?: string[];
};

export async function fetcher<T = any>(
  url: string,
  options: FetcherOptions = {}
): Promise<{ success?: boolean; error?: unknown; data: unknown } | T> {
  const {
    method = "GET",
    headers = {},
    body,
    timeout = 10000,
    authToken,
    nextCache = "default",
    nextTags,
    revalidateTags,
    revalidatePaths,
  } = options;

  if (!envConfig.server_url || !envConfig.api || !envConfig.version1) {
    throw new Error("Missing environment configuration for fetcher.");
  }

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(
      envConfig.server_url + envConfig.api + envConfig.version1 + url,
      {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
        cache: nextCache,
        ...(nextTags ? { next: { tags: nextTags } } : {}),
      }
    );

    if (!res.ok) {
      const errorDetails = await res.json().catch(() => ({}));
      return { success: false, error: errorDetails, data: null };
    }

    let data: T;
    try {
      const result = await res.json();
      data = result;
    } catch {
      const text = await res.text();
      data = text as T;
    }

    // Perform revalidation only after mutation (not GET)
    if (method !== "GET") {
      if (revalidateTags) {
        for (const tag of revalidateTags) {
          revalidateTag(tag);
        }
      }
      if (revalidatePaths) {
        for (const path of revalidatePaths) {
          revalidatePath(path);
        }
      }
    }

    return data;
  } catch (err: any) {
    if (err.name === "AbortError") {
      console.log("Request timeout: The request took too long to complete.");
    }

    return { success: false, error: err, data: null };
  } finally {
    clearTimeout(id);
  }
}
