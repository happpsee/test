import { useMemo } from "react";
import { checkPermission } from "../utils/checkPermission";
import { useSelector } from "react-redux";
import { resolveRolePerm } from "../stores/selectors/resolveRole";

const checkMenu = (role: Record<string, string[]> | "*", routes: RouteItem[]) => {
  return routes.reduce((acc, curr) => {

    let ans:MenuItem | undefined;

    if (curr.menuItems) {
      const children = checkMenu(role, curr.menuItems);

      if (children.length <= 0) return acc;

      ans = {
        label: curr.name,
        key: curr.path || curr.name,
        icon: curr.icon,
      } as MenuParent;

      children.length >= 0 && (ans["children"] = children);
    } else {
      const isPass = checkPermission(curr.authority,
      role);
      
      isPass && (ans = {
        label: curr.name,
        key: curr.path || curr.name,
        icon: curr.icon,     
      });
    }



    ans && acc.push(ans);

    return acc;
  }, [] as MenuItem[]);
};


export const usePermissionMenu = (routes: RouteItem[]) => {

  const role = useSelector(resolveRolePerm);


  const menus = useMemo(() => {
    return checkMenu(role, routes);
  }, [role, routes]);

  return menus;
};
