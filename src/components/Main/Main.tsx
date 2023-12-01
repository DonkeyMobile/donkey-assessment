import Card from "../Card/Card";
import "./main.css";
import Menu from "../Menu";
import Submenu from "../Submenu";
import Footer from "../Footer";

const cardList = [
  {
    id: 1,
    name: "Dwain Olsem",
    subTitle: "Worship team 1u",
    bescrijving:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet massa eget sapien aliquet pharetra. Mauris ut lacus interdum, dignissim lorem non, dapibus ipsum.",
  },
  {
    id: 2,
    name: "Dwain Olsem",
    subTitle: "Worship team 1u",
    bescrijving:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet massa eget sapien aliquet pharetra. Mauris ut lacus interdum, dignissim lorem non, dapibus ipsum.",
  },
  {
    id: 3,
    name: "Dwain Olsem",
    subTitle: "Worship team 1u",
    bescrijving:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet massa eget sapien aliquet pharetra. Mauris ut lacus interdum, dignissim lorem non, dapibus ipsum.",
  },
  {
    id: 4,
    name: "Dwain Olsem",
    subTitle: "Worship team 1u",
    bescrijving:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet massa eget sapien aliquet pharetra. Mauris ut lacus interdum, dignissim lorem non, dapibus ipsum.",
  },
  {
    id: 5,
    name: "Dwain Olsem",
    subTitle: "Worship team 1u",
    bescrijving:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet massa eget sapien aliquet pharetra. Mauris ut lacus interdum, dignissim lorem non, dapibus ipsum.",
  },
  {
    id: 6,
    name: "Dwain Olsem",
    subTitle: "Worship team 1u",
    bescrijving:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet massa eget sapien aliquet pharetra. Mauris ut lacus interdum, dignissim lorem non, dapibus ipsum.",
  },
  {
    id: 7,
    name: "Dwain Olsem",
    subTitle: "Worship team 1u",
    bescrijving:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet massa eget sapien aliquet pharetra. Mauris ut lacus interdum, dignissim lorem non, dapibus ipsum.",
  },
  {
    id: 8,
    name: "Dwain Olsem",
    subTitle: "Worship team 1u",
    bescrijving:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet massa eget sapien aliquet pharetra. Mauris ut lacus interdum, dignissim lorem non, dapibus ipsum.",
  },
  {
    id: 9,
    name: "Dwain Olsem",
    subTitle: "Worship team 1u",
    bescrijving:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet massa eget sapien aliquet pharetra. Mauris ut lacus interdum, dignissim lorem non, dapibus ipsum.",
  },
  {
    id: 10,
    name: "Dwain Olsem",
    subTitle: "Worship team 1u",
    bescrijving:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed laoreet massa eget sapien aliquet pharetra. Mauris ut lacus interdum, dignissim lorem non, dapibus ipsum.",
  },
];

function Main() {
  return (
    <>
      <div className="parent">
        <Menu />
        <div className="main">
          <Submenu />
          {cardList.map((card) => {
            return (
              <Card
                key={card.id}
                naam={card.name}
                beschrijving={card.bescrijving}
                subtitel={card.subTitle}
              />
            );
          })}
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Main;
