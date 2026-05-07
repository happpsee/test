/*
 * @Author: userName userEmail
 * @Date: 2026-05-04 13:54:34
 * @LastEditors: userName userEmail
 * @LastEditTime: 2026-05-06 22:46:56
 * @FilePath: \RBAC\src\stores\slices\user.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createSlice } from "@reduxjs/toolkit";


const initUser = () => {
  const role = JSON.stringify(["admin"]);
  localStorage.setItem("user", role);
  return role;
};

const UserState = {
  //可以有多个角色
  role: JSON.parse(localStorage.getItem("user") ?? initUser()) as string[]
};




export const userSlice = createSlice({
  name: "user",
  initialState: UserState,
  reducers: {
    switchRole(state, action: {payload: string[]}) {
      state.role = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.role = [];
      localStorage.removeItem("user");
    }
  }
});


export const { logout, switchRole } = userSlice.actions;
export default userSlice.reducer;