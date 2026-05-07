/*
 * @Author: userName userEmail
 * @Date: 2026-05-04 13:54:34
 * @LastEditors: userName userEmail
 * @LastEditTime: 2026-05-07 10:44:23
 * @FilePath: \RBAC\src\stores\slices\user.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createSlice } from "@reduxjs/toolkit";

const initRole = () => {
  const roles = JSON.stringify({
    "admin": "*",
    "common": {
      "role": ["scan"],
      "btn": ["scan", "edit", "create"]
    },
    "super": ["admin", "common"]//表示这是一个联合角色
  });

  localStorage.setItem("roleList", roles);
  return roles;
}



const RoleState = {
  roles: JSON.parse(localStorage.getItem("roleList") ?? initRole()) as Record<string, Record<string, string[]> | "*" | string[]>
};


export const roleSlice = createSlice({
  name: "roles",
  initialState: RoleState,
  reducers: {
    addRole(state, action: { payload: { name: string, value: Record<string, string[]> | "*" | string[] } }) {
      state.roles[action.payload.name] = action.payload.value;
      localStorage.setItem("roleList", JSON.stringify(state.roles));
    },
    removeRole(state, action) {
      delete state.roles[action.payload.name];
      localStorage.setItem("roleList", JSON.stringify(state.roles));
    }
  }
});




export const { addRole, removeRole } = roleSlice.actions;
export default roleSlice.reducer;


