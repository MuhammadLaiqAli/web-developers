import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
<<<<<<< HEAD
      className={`relative min-h-[70vh] 800px:min-h-[80vh] hero-img-aaa w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-nen-game-4k-assasin.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%]  mlllb 800px:w-[60%]`}>
=======
      className={`relative min-h-[70vh] 800px:min-h-[90vh] w-full bg-no-repeat bs ${styles.noramlFlex}`}
      style={{
        backgroundImage:
         "url(https://thuthuatnhanh.com/wp-content/uploads/2020/09/hinh-nen-game-4k-assasin.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%] ml`}>
>>>>>>> a39b01ff4eef541431aee654260e3443fc9825cb
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] cw text-[#3d3a3a] font-[600] capitalize`}
        >
          Best Collection for <br /> home Decoration
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] cw text-[#000000ba]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                 <span className="text-[#fff] font-[Poppins] text-[18px]">
                    Shop Now
                 </span>
            </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
