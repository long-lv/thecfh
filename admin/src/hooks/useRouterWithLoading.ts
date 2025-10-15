"use client";

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGlobalLoading } from "./useGlobalLoading";
export const useRouterUtil = () => {
  // [Hook] Use Route
  const router = useRouter();
  // [Hook] Use loading
  const loading = useGlobalLoading();
    // [Hook] Get param URL
  const params = useParams();
  // [Hook] Get pathname URL
  const pathName = usePathname();
  // [Hook] Get searchParams URL
  const searchParams = useSearchParams();

  // [Var] Transform query to object
  const queryObject = Object.fromEntries(searchParams.entries());

  // [Var] Transform query to string
  const queryString =
    '?' +
    Array.from(searchParams.entries())
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

  const push = (path: string) => {
    loading.showLoading();
    router.push(path);
  };

  const replace = (path: string) => {
    loading.showLoading();
    router.push(path);
  };

  const back = () => {
    loading.showLoading();
    router.back();
  };

  const forward = () => {
    loading.showLoading();
    router.forward();
  };

  return {
    ...router,
    params,
    pathName,
    queryObject,
    queryString,
    push,
    replace,
    back,
    forward,
  };
};
