import { getOrders } from "@/server/order/queries";
import { getProducts } from "@/server/product/queries";
import { getStore } from "@/server/store/queries";
import Link from "next/link";

type StorePageProps = {
  params: { storeId: string };
};

export default async function StorePage({
  params: { storeId },
}: StorePageProps) {
  const store = await getStore(parseInt(storeId));

  const products = await getProducts(parseInt(storeId));

  const orders = await getOrders(parseInt(storeId));

  return (
    <div className="flex flex-col gap-5 p-10">
      <div className="flex flex-col">
        <h1>Store:</h1>
        <label>Name: {store?.name}</label>
      </div>
      <div className="flex flex-col">
        <h1>Products:</h1>
        <Link href={`/store/${storeId}/product`}>Create Product</Link>
        {products.map((product, idx) => (
          <Link href={`/store/${storeId}/product/${product.id}`}>
            Product #{idx + 1}: {product.price} R$
          </Link>
        ))}
      </div>
      <div className="flex flex-col">
        <h1>Orders:</h1>
        <Link href={`/store/${storeId}/order`}>Create Order</Link>
        {orders.map((order, idx) => (
          <Link href={`/store/${storeId}/order/${order.id}`}>
            Order #{idx + 1}: {order.client}
          </Link>
        ))}
      </div>
    </div>
  );
}
