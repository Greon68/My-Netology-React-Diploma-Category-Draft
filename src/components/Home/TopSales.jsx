import { useEffect, useState } from "react";
import { CardView} from "../Catalog/CardView";
import { BASE_URL } from "../../config/api";
import { useGetFetch } from "../../hook/useGetFetch";
import { Loader } from "../Loader/Loader";

export const TopSales = ()=> {

  // const [ sales , setSales]= useState([]);

  // 1 вариант:
  // const getSales = async ()=> {
  //   const resp = await fetch('http://localhost:7070/api/top-sales');
  //   const  data = await resp.json();
  //   setSales(data)
  // }

  // // 2 вариант:
  // const getData = async ( path ='/')=> {
  //   const resp = await fetch(BASE_URL + path);
  //   const  data = await resp.json();
  //   setSales(data)
  // }

  // // useEffect(()=>{
  // //   getSales()
  // // },[])

  // useEffect(()=>{
  //   getData('/api/top-sales')
  // },[])

  // 3 вариант
 
  const [ sales , loading, error] = useGetFetch('/api/top-sales')

  console.log(" TopSales sales -", sales)
  

    // return(
    //     <div className="top-sales-block">
    //         {/* <h3>TopSales</h3> */}
    //         { sales && sales.map ( sale => < TopSalesView key={sale.id} {...sale} />)}
    //     </div>
    // )

    return(
      <div className="top-sales-block">
          {loading && <Loader/>}
          { error && <div> Ошибка...</div>}
          { sales && sales.map ( sale => < CardView key={sale.id} className="top-sales-card" {...sale} />)}
      </div>
  )


}


// import { useEffect, useState } from "react";
// import {useParams, useNavigate} from "react-router";
// import { BASE_URL } from "../../config/api";

// export const Cat =()=>{

//     const{id} = useParams();
//     const navigator = useNavigate();

//     const[url, setUrl]= useState('')

//     const getUrl = async() => {
        
//         // const resp = await fetch (`http://localhost:5553/cat/`+ id);
//         // const resp = await fetch (`${BASE_URL}/cat/`+ id);

//         const resp = await fetch (`${BASE_URL}/cat/${id}`);
//         const data = await resp.json();
//         setUrl(data.url)
//     }


//     useEffect(()=>{
//         getUrl()
//     },[id])

//     return (
//         <>
//             { !url && <h3>Картинка не найдена</h3>}
//             { url &&  <div className="cat-block">
//                             <input type="button" value="Назад" className="back-button" onClick={()=> navigator(-1)}/>
//                             <div className="cat">                                              
//                                 <img className="cat-image" src={url} />
//                             </div>
//                         </div>
//             }
        
//         </>
//     )
// }


{/* <section class="top-sales">
    <h2 class="text-center">Хиты продаж!</h2>
    <div class="row">
      <div class="col-4">
        <div class="card">
          <img src="./img/products/sandals_myer.jpg"
            class="card-img-top img-fluid" alt="Босоножки 'MYER'">
          <div class="card-body">
            <p class="card-text">Босоножки 'MYER'</p>
            <p class="card-text">34 000 руб.</p>
            <a href="/products/1.html" class="btn btn-outline-primary">Заказать</a>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <img src="./img/products/sandals_keira.jpg"
            class="card-img-top img-fluid" alt="Босоножки 'Keira'">
          <div class="card-body">
            <p class="card-text">Босоножки 'Keira'</p>
            <p class="card-text">7 600 руб.</p>
            <a href="/products/1.html" class="btn btn-outline-primary">Заказать</a>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="card">
          <img src="./img/products/superhero_sneakers.jpg"
            class="card-img-top img-fluid" alt="Супергеройские кеды">
          <div class="card-body">
            <p class="card-text">Супергеройские кеды</p>
            <p class="card-text">1 400 руб.</p>
            <a href="/products/1.html" class="btn btn-outline-primary">Заказать</a>
          </div>
        </div>
      </div>
    </div>
  </section> */}