/*
 * @Author: userName userEmail
 * @Date: 2026-05-04 11:01:18
 * @LastEditors: userName userEmail
 * @LastEditTime: 2026-05-07 13:00:36
 * @FilePath: \RBAC\vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:"./",
  plugins: [react()],
})
