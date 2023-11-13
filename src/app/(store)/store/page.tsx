import { newStore } from "@/server/store/mutation";

export default async function NewStore() {
  return (
    <form action={newStore} className="flex flex-col items-start p-10">
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" name="name" className="mb-10" />
      <button type="submit">Save Store</button>
    </form>
  );
}
