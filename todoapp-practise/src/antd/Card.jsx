import { Avatar, Card } from "antd";
const { Meta } = Card;

const AntdCard = ({
  width = 300,
  cardCover,
  imgAlt = "example",
  avatar,
  title = "Card Title",
  description = "This is the Description",
  actions,
  className,
  ...props
}) => (
  <Card
    style={{ width }}
    cover={cardCover && <img alt={imgAlt} src={cardCover} />}
    actions={actions}
    className={className}
    {...props}
  >
    <Meta
      avatar={avatar && <Avatar src={avatar} />}
      title={title}
      description={description}
    />
  </Card>
);
export default AntdCard;
