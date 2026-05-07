/*
 * @Author: userName userEmail
 * @Date: 2026-05-04 16:31:30
 * @LastEditors: userName userEmail
 * @LastEditTime: 2026-05-06 22:47:53
 * @FilePath: \RBAC\src\comps\routerBeforeEach.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router";
// import { logout } from "../stores/slices/user";

// interface RouterBeforeEachProps {
//   children?: React.ReactNode;
// }

// export const RouterBeforeEach = <T extends object>(Comp: React.FC<T>) => {
//   const Component = (props: T & RouterBeforeEachProps) => {
//     const { children, ...rest } = props;
//     const location = useLocation();
//     const navigate = useNavigate();

//     useEffect(() => {
//       const isLogin = useSelector((state:RootState) => state.user.isLogin);
//       if (!isLogin) {
//         logout();
//         navigate("/login");
//       }
//     }, [location.pathname]);

//     return <Comp {...(rest as T)}>{children}</Comp>
//   };

//   return Component;
// };