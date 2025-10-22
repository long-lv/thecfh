"use client";

import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
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
    "?" +
    Array.from(searchParams.entries())
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

  const ROUTER_PREFIX = "/thecfh";
  const buildPath = (path: string) => {
    // If the path already starts with the prefix, keep it as is
    if (path.startsWith(ROUTER_PREFIX)) return path;
    // If the path starts with '/', concatenate cleanly with the prefix
    return `${ROUTER_PREFIX}${path.startsWith("/") ? "" : "/"}${path}`;
  };

  const push = (path: string) => {
    loading.showLoading();
    router.push(buildPath(path));
  };

  const replace = (path: string) => {
    loading.showLoading();
    router.push(buildPath(path));
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
