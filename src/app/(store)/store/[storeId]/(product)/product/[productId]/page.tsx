import { getProduct } from "@/server/product/queries";
import { getProductOrders } from "@/server/productOrder/queries";
import Link from "next/link";

type ProductViewPageProps = {
  params: { productId: string; storeId: string };
};

export default async function ProductViewPage({
  params: { productId, storeId },
}: ProductViewPageProps) {
  const product = await getProduct(parseInt(productId));

  const orders = await getProductOrders(parseInt(productId));

  return (
    <div className="flex flex-col gap-10 p-20">
      <Link href={`/store/${storeId}`}>Return to Store</Link>
      <div className="text-2xl font-bold">
        Product
        <h1>Price: {product?.price}</h1>
      </div>
      <div className="text-2xl font-bold">
        Orders
        <ul>
          {orders.map((order, idx) => {
            return (
              <li>
                <Link href={`/store/${storeId}/order/${order.id}`}>
                  Order #{idx + 1}: {order.order.client}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
