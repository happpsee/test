
import { Result, Button } from "antd"
import { useNavigate } from "react-router";


export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (<Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" onClick={() => navigate("/")}>Back Home</Button>}
  />)
}
