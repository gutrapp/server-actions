import { createProduct } from "@/server/product/mutations";

type NewProductProps = {
  params: { storeId: string };
};

export default async function NewProduct({
  params: { storeId },
}: NewProductProps) {
  return (
    <form action={createProduct} className="flex flex-col items-start p-20">
      <label htmlFor="price">Price:</label>
      <input
        className="mb-10 rounded-md ring-2 ring-black"
        id="price"
        type="text"
        name="price"
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
