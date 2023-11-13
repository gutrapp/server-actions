import { getStores } from "@/server/store/queries";
import Link from "next/link";

export default async function StoresPage() {
  const stores = await getStores();

  return (
    <main className="flex flex-col items-start gap-2 p-20 text-black">
      <div className=" flex items-center gap-5">
        <Link href="/store">
          <button className="rounded-md border-2 border-black px-4 py-2">
            Create Store
          </button>
        </Link>
      </div>
      {stores.map((store, idx) => {
        return (
          <Link href={`/store/${store.id}`}>
            Store #{idx + 1}: {store.name}
          </Link>
        );
      })}
    </main>
  );
}
