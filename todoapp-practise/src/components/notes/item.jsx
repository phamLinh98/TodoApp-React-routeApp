import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AntdCard from "../../antd/Card";
import { useNavigate } from "react-router-dom";

const Item = ({ id, name, description }) => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate(`folders/update/${id}`);
  };

  return (
    <AntdCard
      className={"cursor-pointer"}
      width={350}
      title={name}
      description={description}
      hoverable
      actions={[
        <EditOutlined key="edit" onClick={handleEditClick} />,
        <DeleteOutlined key="del" />,
      ]}
    />
  );
};

export default Item;

// gỉa sử tôi có 1 danh sách  Item với 5 phần tử id lần lượt là 1, 2 , 3
// nếu tôi đang đứng ở Item list và click vào nút edit của 1 item thì tôi muốn nó chuyển trang sang
// trang edit của bản ghi id tương ứng
// xử lý ở EditOutlined giúp tôi
