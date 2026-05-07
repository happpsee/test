/*
 * @Author: userName userEmail
 * @Date: 2026-05-04 13:46:20
 * @LastEditors: userName userEmail
 * @LastEditTime: 2026-05-06 22:34:41
 * @FilePath: \RBAC\src\hooks\usePermission.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useMemo } from "react";
import { checkPermission } from "../utils/checkPermission";
import { resolveRolePerm } from "../stores/selectors/resolveRole";
import {useSelector} from "react-redux";


const checkRoutes = (role: Record<string, string[]> | "*", routes: RouteObject[] = []) => {
  return routes.reduce((acc, curr) => {

    const isPass =  checkPermission(curr.authority, role);

    if (!isPass) {
      return acc;
    }

    if (curr.children) {
      const routeChildren = checkRoutes(role, curr.children);
      console.log(routeChildren, "routeChidlre");
      routeChildren.length > 0 && acc.push({...curr, children: routeChildren});
    } else {
      acc.push(curr);
    }


    return acc;

  }, [] as RouteObject[]);
};

export const usePermissionRoute = (router:Router$1) => {
  const role = useSelector(resolveRolePerm);


  const r = useMemo(() => {
    return {...router, routes: checkRoutes(role, router.routes)}
  }, [role, router]);

  console.log(r.routes, "r.routes");
  return r as Router$1;
};