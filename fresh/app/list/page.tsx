import Image from "next/image";
import food0 from "/public/food0.png";
import food1 from "/public/food1.png";
import food2 from "/public/food2.png";

interface listType {
  name: string;
  img: any;
}

export default function List() {
  let list: listType[] = [
    { name: "Tomatoes", img: food0 },
    { name: "Pasta", img: food1 },
    { name: "Coconut", img: food2 },
  ];

  return (
    <div>
      <h4 className="title">상품목록</h4>
      {list.map((data: listType, i: number) => {
        return (
          <div className="food" key={i}>
            <Image src={data.img} alt={data.img} className="food-img" />
            <h4>{data.name} $40</h4>
          </div>
        );
      })}
    </div>
  );
}
