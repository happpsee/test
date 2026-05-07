/*
 * @Author: userName userEmail
 * @Date: 2026-05-04 16:26:30
 * @LastEditors: userName userEmail
 * @LastEditTime: 2026-05-07 08:48:25
 * @FilePath: \RBAC\src\utils\router.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export function getRoutes(routeMenuMap: RouteItem[] = []) {
  return routeMenuMap.reduce((acc, curr) => {
    
    if (curr.menuItems) {
      acc.push(...getRoutes(curr.menuItems));
      return acc;
    }

    curr.children ? acc.push({
      ...curr,
      children: getRoutes(curr.children)
    }) : acc.push({...curr});

    return acc;
  }, [] as RouteObject[]);
}