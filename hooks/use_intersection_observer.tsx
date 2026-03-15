"use client";
import { useEffect, useRef, useState } from "react";

export default function useIntersectionObserver(
  options: IntersectionObserverInit = { threshold: 0.5 },
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref, options]);

  return { isIntersecting, ref };
}

export function useIntersectionObserverElement(
  element: HTMLElement,
  options?: IntersectionObserverInit,
) {
  const [intersectionObserverEntry, setIntersectionObserverEntry] =
    useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (!element || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === element) {
          setIntersectionObserverEntry(entry);
        }
      });
    }, options);

    if (element) {
      observer.observe(element);
    }

    return () => {
      setIntersectionObserverEntry(null);
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [element, options]);

  return intersectionObserverEntry;
}
