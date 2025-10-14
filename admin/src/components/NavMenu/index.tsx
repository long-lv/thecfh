"use client";
import { routesBotList, routesTopList } from "@/src/routes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";
interface IRoute {
  name: string;
  path: string;
  icon: React.ElementType;
}
export default function NavMenu() {
	const router = useRouter();
  const [isOpenMenuChildren, setIsOpenMenuChildren] = useState(false);
  const [isIndexMenuActive, setIsIndexMenuActive] = useState(0);
  const [isIndexMenuChilActive, setIsIndexMenuChilActive] = useState(0);
  const getMenuChildren = (routes: IRoute[], isOpen: boolean) => {
    return routes.map((route, index) => {
      const Icon = route.icon;
      return isOpen ? (
        <div
          className={`${styles["menuItem"]} ${
            isIndexMenuChilActive === index 
              ? "bg-white" 
              : "hover:bg-[var(--color-gray-border-200)]"
          } transition-colors duration-200 !mt-2`}
          key={route.name}
          onClick={() => handleClickRouteChild(index, route.path)}
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

  const handleClickRoute = (index: number, path: string | null) => {
    setIsIndexMenuActive(index);
		if (path) {
			router.push(path);
		}
  };

  const handleClickRouteChild = (index: number, path: string | null) => {
    setIsIndexMenuChilActive(index);
		if (path) {
			router.push(path);
		}
  };
  return (
    <div className={styles["wrapNavMenu"]}>
      <div className="flex flex-col justify-between gap-2.5 w-full h-full">
        <div className="menu-top flex flex-col gap-2.5">
          <div className="title-menu px-3 py-2.5 gap-2.5 flex">
            <h3 className="font-semibold text-3xl leading-[10%] text-black">
              THECFH
            </h3>
          </div>
          <div className="menu-top-content flex flex-col gap-2.5">
            {routesTopList.map((router, index) => {
              const Icon = router.icon;
              return (
                <div
                  className={`${styles["menuItem"]} ${
                    isIndexMenuActive === index
                      ? "bg-[var(--color-blue-200)]"
                      : "hover:bg-[var(--color-gray-border-200)]"
                  } transition-colors duration-200`}
                  key={router.name}
                  onClick={() => handleClickRoute(index, router.path)}
                >
                  <div className="router-item flex gap-3 items-center">
                    <Icon
                      className={`${
                        isIndexMenuActive === index
                          ? "text-white"
                          : "text-[var(--color-text-gray-1)]"
                      }  !w-[20px] !h-[20px]`}
                    ></Icon>
                    <span
                      className={`${
                        isIndexMenuActive === index
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
          {routesBotList.map((route) => {
            const Icon = route.icon;
            return (
              <div className={styles["menuItem"]} key={route.name}>
                <div className="router-item flex gap-3 items-center">
                  <Icon className="text-[var(--color-disabled-icon)] !w-[20px] !h-[20px]"></Icon>
                  <span className="font-medium text-sm leading-[100%] text-[var(--color-text-gray-1)]">
                    {route.name}
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
