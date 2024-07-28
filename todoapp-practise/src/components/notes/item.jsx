import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AntdCard from "../../antd/Card";

const Item = ({
  name,
  description,
  id,
  showClick,
  editClick,
  deleteClick,
  ...props
}) => {
  let onClickState = "showClick";

  const handleClick = () => {
    if (onClickState === "editClick") {
      editClick(id);
    } else if (onClickState === "deleteClick") {
      deleteClick(id);
    } else showClick(id);
  };

  return (
    <AntdCard
      onClick={handleClick}
      className={"cursor-pointer"}
      title={name}
      description={
        <div
          dangerouslySetInnerHTML={{
            __html: description.split(/<\/?h[1-2]>/)[1],
          }}
        />
      }
      //NOTE: see this actions
      actions={[
        <EditOutlined
          key="edit"
          onClick={() => (onClickState = "editClick")}
        />,
        <DeleteOutlined
          key="del"
          onClick={() => (onClickState = "deleteClick")}
        />,
      ]}
      {...props}
    />
  );
};
export default Item;
