/*
 * @Author: userName userEmail
 * @Date: 2026-05-04 11:23:05
 * @LastEditors: userName userEmail
 * @LastEditTime: 2026-05-07 12:43:13
 * @FilePath: \RBAC\src\routes\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getRoutes } from "../utils/router";
import { routeMenuMap } from "./menuRoutes";
import Layout from "../Layout";
import { createBrowserRouter} from "react-router";
import { NotFound } from "../comps/404";


export const baseRoutes = [
  {
    path: "/login",
    element: <div>Login</div>
  },
  {
    path: "/",
    element: <Layout/>,
    children: [
      ...getRoutes(routeMenuMap),
      {
        path: "*",
        element: <NotFound/>
      }
    ]
  }
] as RouteItem[];



const router = createBrowserRouter(baseRoutes);
export default router;


declare global {
  type Router$1 = typeof router;
}


