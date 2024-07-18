import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AntdCard from "../../antd/Card";
import { useRef } from "react";

const Item = ({
  name,
  description,
  id,
  showClick = () => console.log("showClick", id),
  editClick = () => console.log("editClick", id),
  deleteClick = () => console.log("deleteClick", id),
  ...props
}) => {
  const onClickState = useRef("showClick");

  const handleClick = () => {
    if (onClickState.current === "editClick") {
      editClick(id);
    } else if (onClickState.current === "deleteClick") {
      deleteClick(id);
    } else showClick(id);
  };

  return (
    <AntdCard
      onClick={handleClick}
      className={"cursor-pointer"}
      title={name}
      description={description}
      actions={[
        <EditOutlined
          key="edit"
          onClick={() => (onClickState.current = "editClick")}
        />,
        <DeleteOutlined
          key="del"
          onClick={() => (onClickState.current = "deleteClick")}
        />,
      ]}
      {...props}
    />
  );
};
export default Item;

// gỉa sử tôi có 1 danh sách  Item với 5 phần tử id lần lượt là 1, 2 , 3
// nếu tôi đang đứng ở Item list và click vào nút edit của 1 item thì tôi muốn nó chuyển trang sang
// trang edit của bản ghi id tương ứng
// xử lý ở EditOutlined giúp tôi
