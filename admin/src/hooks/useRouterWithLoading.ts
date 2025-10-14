"use client";

import { useRouter } from "next/navigation";
import { useGlobalLoading } from "./useGlobalLoading";
export const useRouterWithLoading = () => {
  const router = useRouter();
  const loading = useGlobalLoading();

  const push = (path: string) => {
    loading.showLoading();
		console.log(path, 'aaaaa');
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
    push,
    replace,
    back,
    forward,
  };
};
