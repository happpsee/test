/*
 * @Author: userName userEmail
 * @Date: 2026-05-06 22:30:32
 * @LastEditors: userName userEmail
 * @LastEditTime: 2026-05-07 09:19:59
 * @FilePath: \RBAC\src\stores\selectors\resolveRole.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createSelector } from "@reduxjs/toolkit";


const collectPermision = (roles: string[], roleMap: Record<string, "*" | string[] | Record<string, string[]>>)
  : Record<string, string[]> | "*" => {
  
    let permission = {} as Record<string, string[]>;

  for (const item of roles) {
    if (!(item in roleMap)) continue;
    //然后
    if (roleMap[item] === "*") {
      return "*";
    }

    let ans = roleMap[item] as Record<string, string[]>; 
    if (Array.isArray(ans)) {
      //表示这是一个联合角色
      let result = collectPermision(ans, roleMap);

      if (result === "*") {
        return "*";
      }

      ans = result
    }

    for (const [resource, actions] of Object.entries(ans)) {
      permission[resource] = [...new Set([...(permission[resource] || []), ...actions])];
    }
  }

  return permission;
};



export const resolveRolePerm = createSelector(
  [(state: RootState) => state.role.roles, (state: RootState) => state.user.role],
  (roleMap, role) => collectPermision(role, roleMap)
);