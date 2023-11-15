import { getProducts } from "@/server/product/queries";
import { getStore } from "@/server/store/queries";
import Link from "next/link";
import { TableOrders } from "../../components/TableOrders";
import { OrderByFilter } from "@/app/types/filtering";

type StorePageProps = {
  params: { storeId: string };
  searchParams: { orderFilter: string; orderOrder: OrderByFilter };
};

export default async function StorePage({
  params: { storeId },
  searchParams,
}: StorePageProps) {
  const store = await getStore(parseInt(storeId));

  const products = await getProducts(parseInt(storeId));

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
        <TableOrders searchParams={searchParams} storeId={parseInt(storeId)} />
      </div>
    </div>
  );
}
