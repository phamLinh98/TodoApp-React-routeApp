import { Modal } from "antd";

const AntdModal = ({ children, ...props }) => {
  return <Modal {...props}>{children}</Modal>;
};

export default AntdModal;
