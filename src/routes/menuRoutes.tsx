/*
 * @Author: userName userEmail
 * @Date: 2026-05-04 11:23:00
 * @LastEditors: userName userEmail
 * @LastEditTime: 2026-05-07 09:28:19
 * @FilePath: \RBAC\src\routes\menuRoutes.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEim
 */
import { HomeOutlined, UserAddOutlined, ControlOutlined, DatabaseOutlined ,ContactsOutlined  } from "@ant-design/icons";
import RoleManage from "../views/roleManage";

export const routeMenuMap = [
  {
    name: "首页",
    icon: <HomeOutlined />,
    menuItems: [
      {
        name: "home",
        icon: <HomeOutlined />,
        index: true,
        path: "/home",
        element: <div>home</div>
      },
      {
        name: "个人中心",
        icon: <UserAddOutlined />,
        path: "/profile",
        element: <div>个人中心</div>
      }
    ]
  },
  {
    name: "权限管理",
    icon: <ControlOutlined />,
    menuItems: [
      {
        name: "用户管理",
        icon: <DatabaseOutlined />,
        path: "/users",
        element: <div>用户管理</div>,
        authority: ["and:user:scan"]
      },
      {
        name: "角色管理",
        icon: <ContactsOutlined />,
        path: "/role",
        element: <RoleManage />,
        authority: ["and:role:scan"]
      }
    ]
  }
] as RouteItem[];