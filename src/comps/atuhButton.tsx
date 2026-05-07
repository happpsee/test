import { useSelector } from "react-redux";
import { resolveRolePerm } from "../stores/selectors/resolveRole";
import { checkPermission } from "../utils/checkPermission";


interface AuthProps {
  needPermissions: string[]
  mode?: "and" | "or",
  fallback?: React.ReactNode; //鉴权失败显示的
  children?: React.ReactNode;
}

const AuthComp:React.FC<AuthProps> = ({
  needPermissions,
  mode,
  fallback,
  children
}) => {

  const userRole = useSelector(resolveRolePerm);

  if (userRole === "*") {
    return <>{children}</>;
  }

  const ok = checkPermission(needPermissions, userRole, mode ?? "and");
  
  return <>
  {ok ? children : fallback}
  </>
};

export default AuthComp;