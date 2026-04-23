import "../../../css/homePage/collection/Collection.css";
import CollectionItem from "./CollectionItem";
import pateMeo1 from "../../../assets/img/collection-item/pateMeo.webp";
import pateMeo2 from "../../../assets/img/collection-item/pateMeo2.webp";
import catVeSinh from "../../../assets/img/collection-item/catVeSinh.webp";
import doChoiMeo from "../../../assets/img/collection-item/doChoiMeo.webp";
import nhaChoMeo from "../../../assets/img/collection-item/nhaChoMeo.webp";
import suaTam from "../../../assets/img/collection-item/suaTam.webp";
// import thucAnCho from "../../../assets/img/collection-item/thucAnCho.webp";

export const collectionData = [
  { name: "Thức Ăn Cho Mèo", slug:"thuc-an-cho-meo", image: pateMeo1 },
  { name: "Thức Ăn Cho Chó", slug:"thuc-an-cho-cho", image: pateMeo2 },
  { name: "Cát Vệ Sinh Cho Mèo", slug:"cat-ve-sinh-cho-meo", image: catVeSinh },
  { name: "Đồ Chơi Cho Mèo", slug:"do-choi-cho-meo", image: doChoiMeo },
  { name: "Nhà Cho Mèo Sang Xịn", slug:"nha-cho-meo", image: nhaChoMeo },
  { name: "Sữa Tắm Cho Mèo", slug:"sua-tam-cho-meo", image: suaTam },
];

const Collection = () => {

  return (
    <div className="collection">
      <div className="container">
        <div className="title-collection">
          <h3>Bộ Sưu Tập Cho Mèo Con</h3>
        </div>

        <div className="block-collection">
          {collectionData.map((item, index) => (
            <CollectionItem key={index} slug={item.slug} name={item.name} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
