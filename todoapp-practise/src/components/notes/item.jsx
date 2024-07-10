import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AntdCard from "../../antd/Card";
const Item = ({ name, description }) => {
  return (
    <AntdCard
      className={"cursor-pointer"}
      width={350}
      title={name}
      description={description}
      hoverable
      actions={[<EditOutlined key="edit" />, <DeleteOutlined key="del" />]}
    />
  );
};

export default Item;
