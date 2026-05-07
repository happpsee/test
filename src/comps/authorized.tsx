/*
//  * @Author: userName userEmail
//  * @Date: 2026-05-04 16:56:09
 * @LastEditors: userName userEmail
 * @LastEditTime: 2026-05-06 22:47:47
//  * @FilePath: \RBAC\src\comps\authorized.tsx
//  * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
//  */
// import { useSelector } from "react-redux";
// import { checkPermission } from "../utils/checkPermission";

// interface AuthCompProps {
//   authority?: string[];
//   children?: React.ReactNode;
// }


// export const Authorized = <P extends object>(Component: React.FC<P>) => {
//   const AuthComp = (props: P & AuthCompProps) => {
//     const user = useSelector((state: RootState) => state.user);
//     const {authority, children, ...rest} = props;

//     if (checkPermission(authority, user.role)) {
//       return <Component {...rest as P}>{children}</Component>
//     }
//     return <p>无权访问</p>;
//   }

//   return AuthComp;
// }


