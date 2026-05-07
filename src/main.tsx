/*
 * @Author: userName userEmail
 * @Date: 2026-05-04 11:01:18
 * @LastEditors: userName userEmail
 * @LastEditTime: 2026-05-04 15:52:50
 * @FilePath: \RBAC\src\main.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./stores";

createRoot(document.getElementById('root')!).render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>

)
