import { debounce } from "@/utils/debounce";
import { useEffect, useRef } from "react";

interface UseDebouncedApiProps {
  handler: () => void | Promise<void>;
  deps: any[];
  delay?: number;
}

export function useDebouncedApi({
  handler,
  deps,
  delay = 500,
}: UseDebouncedApiProps) {
  const handlerRef = useRef(handler);

  // Always update handler ref
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  const debounced = useRef(
    debounce(() => {
      handlerRef.current();
    }, delay)
  ).current;

  useEffect(() => {
    debounced();
  }, deps);
}
