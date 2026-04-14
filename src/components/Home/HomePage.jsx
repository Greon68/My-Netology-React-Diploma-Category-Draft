import { useEffect, useState } from "react";
import { Image } from "../../../img/Image"
import { Loader } from "../Loader/Loader"
import { HomeCatalog } from "./HomeCatalog";
import { CatalogData } from "./CatalogData";
import { TopSales } from "./TopSales";

export const HomePage = ()=> {

    return(
        <>      
         <div className="container">         
            {/* <div className="banner">
                <img  src="../../../img/banner.jpg" className="img-fluid" alt="К весне готовы!"/>
                <h2 className="banner-header">К весне готовы!</h2>
            </div> */}
            <section className="top-sales">
                <h2 className="text-center">Хиты продаж!</h2>
                {/* <Loader/> */}
                <TopSales/>
                
            </section>
            <section className="catalog">
                <h2 className="text-center">Каталог</h2>
                {/* <Loader/> */}
                <CatalogData/>
                
            </section>
           
        </div>


    </>
    )
}


// import { CatsItem } from "./CatsItem";
// import { BASE_URL } from "../../config/api";

// export const Cats =()=>{
//     const[count, setCount]= useState(0);
//     const[cats, setCats]=useState([]);

//     const getCount = async() => {
//         // const resp = await fetch (`http://localhost:5553/getcount`);
//         const resp = await fetch (`${BASE_URL}/getcount`);
//         // console.log("getCount resp - ", resp);
//         const data = await resp.json();
//         // console.log("getCount data - ", data);
//         setCount(data.count)
//     };

 
//     const itemsList = ()=> {
//         const arr =[];
//         for (let index = 1; index < count+1; index++) {
//             arr.push(<CatsItem key={index} id={index}/>)
            
//         };
//         setCats(arr)
//     }

//     useEffect(()=>{
//         getCount();
//         if(count>0) itemsList();

       
//     },[count])

//     // console.log("Cats count - ", count);
//     // console.log("Cats catsList - ", cats)

//     return (
//         <div className="cats-container">
//             <ul className="cats-list">
//                 { cats && cats.map( (cat, ind) =>                     
//                         <li className="cats-list-item " key={ind}>{cat}</li>                  
//                 ) }
//             </ul>
//         </div>
//     )
// }