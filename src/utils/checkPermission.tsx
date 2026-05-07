/*
 * @Author: userName userEmail
 * @Date: 2026-05-04 13:41:34
 * @LastEditors: userName userEmail
 * @LastEditTime: 2026-05-06 17:49:03
 * @FilePath: \RBAC\src\utils\checkPermission.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


export const checkPermission = (needPermissions: string[] = [], current:Record<string, string[]> | "*", mode: "and" | "or" = "and") => {
  if (current === "*" || needPermissions.length === 0) { 
    return true;
  }

  let isOrPass = false;
  for (const item of needPermissions) {
    const [resourceMode, resource, ...perms] = item.split(":");
    if (!(resource in current)) {
      if (mode === "and") return false;
      continue;//如果为or,则该条目失败，但是不影响整体
    } 

    const curPerm = current[resource];

    const searchFn = resourceMode === "and" ? "every" : "some"; 
    const ans = perms[searchFn]((item) => curPerm.includes(item));

    //如果匹配失败，且mode为"and"
    if (!ans && mode === "and") {
      return false;
    }

    //如果匹配成功，且mode为"or",则判断本次鉴权不失败
    if (ans && mode === "or") {
      isOrPass = true;
    }
  }

  //如果mode === "or"且isOrPass 为false, 说明一个例子都没有过，鉴权失败
  if (!isOrPass && mode === "or") return false;

  //成功
  return true;
};



// // 用户拥有权限
// const userPerms = {
//   user: ['read', 'create'],
//   order: ['pay'],
// };

// // 1) 精确单资源 AND 模式（全满足）
// console.log(`checkPermission(
//   ["and:user:read:create"],
//   userPerms,
//   "and"
// )`, checkPermission(
//   ["and:user:read:create"],
//   userPerms,
//   "and"
// ));
// // resourceMode=and, perms=['read','create'], every 检查 → true
// // mode="and" 无短路返回 → 最终 true ✅

// // 2) 单资源 AND 模式（缺少一个）
// console.log(`checkPermission(
//   ["and:user:read:delete"],
//   userPerms,
//   "and"
// )`, checkPermission(
//   ["and:user:read:delete"],
//   userPerms,
//   "and"
// ));
// // every 检查 'delete' 不在 → ans=false → mode=and → return false ✅

// // 3) 整体 OR，两条目，第一条失败，第二条成功
// console.log(`checkPermission(
//   ["and:user:read:delete", "or:order:pay:refund"],
//   userPerms,
//   "or"
// )`, checkPermission(
//   ["and:user:read:delete", "or:order:pay:refund"],
//   userPerms,
//   "or"
// ));
// // 第一条：and:user:read:delete → every 失败 ans=false, mode=or 不返回
// // 第二条：or:order:pay:refund → some('pay') 成功 ans=true → isOrPass=true
// // 最后 true ✅

// // 4) 资源不存在 + mode=or（之前崩溃的场景）
// console.log(`checkPermission(
//   ["and:btn:create", "or:screen:create"],
//   { btn: ['create'] },
//   "or"
// )`, checkPermission(
//   ["and:btn:create", "or:screen:create"],
//   { btn: ['create'] },
//   "or"
// ));
// // 第一条 and:btn:create → 成功，isOrPass=true
// // 第二条 or:screen:create → resource "screen" 不在 current，continue 跳过
// // 最后 isOrPass=true → true ✅

// // 5) 全局超级管理员
// console.log(`checkPermission(
//   ["anything:do"],
//   "*",
//   "and"
// )`, checkPermission(
//   ["anything:do"],
//   "*",
//   "and"
// ));
// // current === "*" → 直接返回 true ✅

// // 6) 空 needPermissions，mode="or"（按修复可选改为放行）
// console.log(`checkPermission([], userPerms, "or"`, checkPermission([], userPerms, "or")); // 返回 true（如果采用空需求放行）