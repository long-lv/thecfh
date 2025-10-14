"use client";
import { routesBotList, routesConstain, routesTopList } from "@/src/routes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import styles from "./style.module.css";
import { useRouterUtil } from "@/src/hooks/useRouterWithLoading";
import { useLogout } from "@/src/hooks/useAuth";
import { useGlobalLoading } from "@/src/hooks/useGlobalLoading";
import { useGlobalToast } from "@/src/hooks/useGlobalToast";
interface IRoute {
  name: string;
  path: string;
  icon: React.ElementType;
}
export default function NavMenu() {
  /** [Hook] router */
  const router = useRouterUtil();

  /** [Hook] logout hook */
  const { mutate: logout } = useLogout();

  /** [Hook] loading state */
  const loading = useGlobalLoading();

   /** [Hook] toast messsage */
  const toast = useGlobalToast();

  /** [State] status open dropdown menu children */
  const [isOpenMenuChildren, setIsOpenMenuChildren] = useState(false);

  /** [State] status is active menu focus */
  const [activeMenuPath, setActiveMenuPath] = useState<string | null>(null);

  const handleClickRoute = (path: string | null) => {
    if (path) {
      router.push(path);
      setActiveMenuPath(path);
    }
  };

  const handleLogout = () => {
    loading.showLoading()
    logout(undefined, {
      onSettled: () => {
        toast.success('Logout success')
        router.push(routesConstain.login.path)
      }
    });
  };

  const isActiveMenu = (path: string | null, children?: IRoute[]) => {
    if (!activeMenuPath) {
      return false;
    }
    if (path && activeMenuPath.includes(path)) {
      return true;
    }
    if (!path && children && children.length > 0) {
      return children.some(
        (child) => child.path && activeMenuPath.includes(child.path)
      );
    }
  };

  const hasActiveChild = (routerChil: IRoute[]) => {
    return routerChil.some((rou) => {
      return rou.path && router.pathName.includes(rou.path);
    });
  };

  /**
   * Get menu children
   * routes: Iroute[]
   * isOpen: boolean - status open menu children
   */
  const getMenuChildren = (routes: IRoute[], isOpen: boolean) => {
    return routes.map((route) => {
      const Icon = route.icon;
      const isActive = isActiveMenu(route.path);
      return isOpen ? (
        <div
          className={`${styles["menuItem"]} ${
            isActive ? "bg-white" : "hover:bg-[var(--color-gray-border-200)]"
          } transition-colors duration-200 !mt-2`}
          key={route.name}
          onClick={() => handleClickRoute(route.path)}
        >
          <div className="router-list-children">
            <div className="router-item flex gap-3 items-center ">
              <Icon
                className={`!w-[20px] !h-[20px] text-[var(--color-disabled-icon)]`}
              ></Icon>
              <span
                className={`font-medium text-sm leading-[100%] text-[var(--color-text-gray-1)]`}
              >
                {route.name}
              </span>
            </div>
          </div>
        </div>
      ) : (
        ""
      );
    });
  };

  /** [Effect] Update active menu when pathname changes */
  useEffect(() => {
    setActiveMenuPath(router.pathName);
    routesTopList.forEach((route) => {
      if (route.children && route.children.length > 0) {
        const hasActiveChildMenu = hasActiveChild(route.children);
        if (hasActiveChildMenu) {
          setIsOpenMenuChildren(true);
        }
      }
    });
  }, [router.pathName]);

  return (
    <div className={styles["wrapNavMenu"]}>
      <div className="flex flex-col justify-between gap-2.5 w-full h-full">
        <div className="menu-top flex flex-col gap-2.5">
          <div className="title-menu px-3 py-2.5 gap-2.5 flex">
            <h3 className="font-semibold text-3xl leading-[10%] text-black !mb-2.5">
              THECFH
            </h3>
          </div>
          <div className="menu-top-content flex flex-col gap-2.5">
            {routesTopList.map((router) => {
              const Icon = router.icon;
              const isActive = isActiveMenu(router.path, router?.children);
              return (
                <div
                  className={`${styles["menuItem"]} ${
                    isActive
                      ? "bg-[var(--color-blue-200)]"
                      : "hover:bg-[var(--color-gray-border-200)]"
                  } transition-colors duration-200`}
                  key={router.name}
                  onClick={() => handleClickRoute(router.path)}
                >
                  <div className="router-item flex gap-3 items-center">
                    <Icon
                      className={`${
                        isActive
                          ? "text-white"
                          : "text-[var(--color-text-gray-1)]"
                      }  !w-[20px] !h-[20px]`}
                    ></Icon>
                    <span
                      className={`${
                        isActive
                          ? "text-white"
                          : "text-[var(--color-text-gray-1)]"
                      } font-medium text-sm leading-[100%]`}
                    >
                      {router.name}
                    </span>
                    {router.children && router.children.length ? (
                      <div
                        className="menu-list-children"
                        onClick={() =>
                          setIsOpenMenuChildren(!isOpenMenuChildren)
                        }
                      >
                        <span>
                          <ExpandMoreIcon className="text-[var(--color-disabled-icon)] !w-[15px] !h-[15px]" />
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="!mt-2">
                    {router.children && router.children.length
                      ? getMenuChildren(router.children, isOpenMenuChildren)
                      : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="menu-bot flex flex-col gap-2.5">
          {routesBotList.map((router, index) => {
            const Icon = router.icon;
            const isActive = isActiveMenu(router.path);
            return (
              <div
                className={`${styles["menuItem"]} ${
                  isActive
                    ? "bg-[var(--color-blue-200)]"
                    : "hover:bg-[var(--color-gray-border-200)]"
                } transition-colors duration-200`}
                key={router.name}
                onClick={() => {
                  if (router.name === "Logout") {
                    handleLogout();
                  } else {
                    handleClickRoute(router.path);
                  }
                }}
              >
                <div className="router-item flex gap-3 items-center">
                  <Icon
                    className={`${
                      isActive
                        ? "text-white"
                        : "text-[var(--color-text-gray-1)]"
                    }  !w-[20px] !h-[20px]`}
                  ></Icon>
                  <span
                    className={`${
                      isActive
                        ? "text-white"
                        : "text-[var(--color-text-gray-1)]"
                    } font-medium text-sm leading-[100%]`}
                  >
                    {router.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
