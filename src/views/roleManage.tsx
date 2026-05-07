
//显示，角色名称， 角色权限， action操作
import type { GetProps } from "antd";
import { Flex, Table, Tag, Button } from "antd";
import { useSelector } from "react-redux";
import AuthComp from "../comps/atuhButton";

const { Column } = Table;

interface DataType {
  name: string;
  permission: string[] | "*" | Record<string, string[]>;
}




type CheckableTagGroupProps = GetProps<typeof Tag.CheckableTagGroup>;
const groupStyles: CheckableTagGroupProps['styles'] = {
  root: {
    gap: 12,
    padding: '8px 12px',
    backgroundColor: 'rgba(82, 196, 26, 0.08)',
    borderRadius: 8,
  },
  item: {
    backgroundColor: 'rgba(82, 196, 26, 0.1)',
    borderColor: 'rgba(82, 196, 26, 0.3)',
    color: '#52c41a',
  },
};



const RoleManage: React.FC = () => {
  const roles = useSelector((state: RootState) => state.role.roles);

  const dataResource = Object.entries(roles).map(([name, permission], key) => ({ name, permission, key }));

  return (
    <div>
      <div style={{margin: "10px", display: "flex", columnGap: "10px"}}>
        
        <AuthComp 
        needPermissions={["and:role:add"]}
        fallback={<Button disabled>新增复合角色</Button>}
        >
           <Button>新增复合角色</Button>
        </AuthComp>
       
        <AuthComp 
        needPermissions={["and:role:add"]}
        fallback={<Button disabled>新增角色</Button>}>
          <Button>新增角色</Button>
        </AuthComp>
        
      </div>

      <Table<DataType> dataSource={dataResource}>
        <Column title="name" dataIndex="name"></Column>

        <Column title="permission" dataIndex="permission" render={(permission: Record<string, string[]> | "*" | string[]) => {

          if (permission === "*") {
            return (<span>*</span>)
          } else if (Array.isArray(permission)) {
            const colors = ["geekblue", "green", "volcano"];
            return (<Flex gap="small" align="center" wrap>
              {permission.map((item, index) => {
                let color = colors[index % colors.length];
                return (
                  <Tag color={color} key={item}>
                    {item}
                  </Tag>
                );
              })}
            </Flex>);
          }

          const permissions = Object.entries(permission).map(([key, value]) => [key, ...value]);
          console.log(permission, "看看permissions是啥", permissions);

          return (<Flex gap="small" align="center" wrap>

            {permissions.map((item) => (
              <Tag.CheckableTagGroup
                key={JSON.stringify(item)}
                styles={groupStyles}
                options={item}
              />
            ))}
          </Flex>);
        }}></Column>
      </Table>
    </div>);

};


export default RoleManage;