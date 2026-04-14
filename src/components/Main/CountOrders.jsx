import { useLocalStorage } from "@uidotdev/usehooks";

export const CountOrders =()=>{
    // Достаём из localStorage массив заказов orders:
  const [orders, setOrders] = useLocalStorage("orders", []);

  return (
    <>
     { orders.length>0 && 
        <div className="header-controls-cart-full">{orders.length}</div>
     }
    </>
    
  )

}