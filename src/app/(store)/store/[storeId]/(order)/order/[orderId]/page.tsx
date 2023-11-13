import { createOrder } from "@/server/order/mutations";
import { getOrder } from "@/server/order/queries";
import { getProduct } from "@/server/product/queries";
import {
  getProductOrders,
  getProductsOrder,
} from "@/server/productOrder/queries";
import Link from "next/link";

type OrderViewPage = {
  params: { orderId: string; storeId: string };
};

export default async function OrderViewPage({
  params: { orderId, storeId },
}: OrderViewPage) {
  const order = await getOrder(parseInt(orderId));

  const products = await getProductsOrder(parseInt(orderId));

  return (
    <div className="flex flex-col gap-10 p-20">
      <Link href={`/store/${storeId}`}>Return to Store</Link>
      <div className="text-2xl font-bold">
        Order
        <h1>Client: {order?.client}</h1>
      </div>
      <div className="text-2xl font-bold">
        Products
        <ul>
          {products.map((product, idx) => {
            return (
              <li>
                <Link href={`/store/${storeId}/product/${product.id}`}>
                  Product #{idx + 1}: {product.product.price}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
