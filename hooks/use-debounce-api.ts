import { debounce } from "@/utils/debounce";
import { useEffect, useRef } from "react";

interface UseDebouncedApiProps {
  handler: () => void | Promise<void>;
  deps: any[];
  delay?: number;
}

/**
 * A centralized hook to debounce any effect-driven API call
 */
export function useDebouncedApi({
  handler,
  deps,
  delay = 500,
}: UseDebouncedApiProps) {
  const debouncedHandler = useRef(debounce(handler, delay)).current;

  useEffect(() => {
    debouncedHandler();
  }, [...deps]);
}
