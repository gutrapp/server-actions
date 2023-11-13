import { createOrder } from "@/server/order/mutations";
import { getProducts } from "@/server/product/queries";

type NewOrderProps = {
  params: { storeId: string };
};

export default async function NewOrder({ params: { storeId } }: NewOrderProps) {
  const products = await getProducts(parseInt(storeId));

  return (
    <form action={createOrder} className="flex flex-col items-start p-20">
      <select name="productId" id="productId">
        {products.map((product, idx) => (
          <option key={idx} value={product.id}>
            Product #{idx + 1}
          </option>
        ))}
      </select>
      <label htmlFor="client">Client:</label>
      <input
        className="mb-10 rounded-md ring-2 ring-black"
        id="client"
        type="text"
        name="client"
        required
      />
      <input
        className="mb-10 rounded-md ring-2 ring-black"
        id="storeId"
        type="text"
        name="storeId"
        value={storeId}
        hidden
      />
      <button
        className="rounded-md border-2 border-black px-4 py-2"
        type="submit"
      >
        Create
      </button>
    </form>
  );
}
