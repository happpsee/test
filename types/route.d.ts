/*
 * @Author: userName userEmail
 * @Date: 2026-05-04 11:05:24
 * @LastEditors: userName userEmail
 * @LastEditTime: 2026-05-04 15:38:20
 * @FilePath: \RBAC\types\route.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { MenuProps } from "antd";
import type { RouteObject as ReactRouteObject } from "react-router";


declare global {
  interface RouteItem {
    name: string;
    icon?: JSX.Element;
    path?: string;
    element?: JSX.Element;
    children?: RouteItem[];
    authority?: string[];
    menuItems?: RouteItem[];
  }

  type MenuItem = Required<MenuProps>["items"][number];

  type ExtractGroubp<T> = T extends {children: any} ? T : never
  type MenuParent = ExtractGroubp<MenuItem>;

  type RouteObject = ReactRouteObject & {
    authority?: string[];
  };
}

export {};