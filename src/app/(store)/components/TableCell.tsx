import Link from "next/link";

type TableCellProps = {
  url: string;
  value: string | number;
};

export function TableCell({ url, value }: TableCellProps) {
  return (
    <td className="text-center">
      <Link href={url}>{value}</Link>
    </td>
  );
}
