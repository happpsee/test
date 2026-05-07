/*
 * @Author: userName userEmail
 * @Date: 2026-05-04 11:01:18
 * @LastEditors: userName userEmail
 * @LastEditTime: 2026-05-04 16:11:03
 * @FilePath: \RBAC\src\App.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { usePermissionRoute } from "./hooks/usePermission";
import router from "./routes";
import { RouterProvider} from "react-router"

const App = () => {


  const permissionRouter = usePermissionRoute(router);
  //获得过滤后的有权限的路由

  return (
    <div>
        <RouterProvider router={permissionRouter}>
        </RouterProvider>
    </div>
  );
};


export default App;