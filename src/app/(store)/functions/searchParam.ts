import { OrderByFilter } from "@/app/types/filtering";
import { redirect } from "next/navigation";

/**
 * ## Search Manager
 *
 * Url search param manager
 *
 * ```@example```
 *
 * This is a example of a button that changes the ordering of a search param
 *
 * ```
 * export default async function Page({ searchParams }: PageProps) {
 *   const paramsManager = new SearchParamManager(searchParams)
 *
 *   return (
 *     <Link href={paramsManager.buildUrl("/", "orderingParam")}>
 *       {paramsManager.displayArrowForOrderingParam("orderingParam")}
 *     </Link>
 *   )
 * }
 * ```
 *
 * ```@example```
 *
 * This is a example of a button that changes the ordering of a search param
 *
 * ```
 * export default async function Page({ searchParams }: PageProps) {
 *   const paramsManager = new SearchParamManager(searchParams)
 *
 *   function applyFilters(formData: FormData) {
 *      paramsManager.redirectWithFilters("/", formData.getAll())
 *   }
 *
 *   return (
 *     <form action={applyFilters}>
 *       <input id="filterParam" name="filterParam" type="text" />
 *     </form>
 *   )
 * }
 * ```
 */
export class SearchParamManager<
  T extends { [key: string]: string | OrderByFilter },
> {
  private ordering: { [key: string]: OrderByFilter } = {};
  private filtering: { [key: string]: string } = {};

  constructor(searchParams: T) {
    Object.keys(searchParams).map((param) => {
      if (searchParams[param]) {
        if (typeof searchParams[param] === "string")
          this.filtering = {
            ...this.filtering,
            [param]: searchParams[param] as string,
          };
        this.ordering = {
          ...this.ordering,
          [param]: searchParams[param] as OrderByFilter,
        };
      }
    });
  }

  private buildOrderingUrl(): string {
    return Object.keys(this.ordering)
      .map((order) => `${order}=${this.ordering[order]}`)
      .join("&");
  }

  private buildFiltersUrl(): string {
    return Object.keys(this.filtering)
      .map((filter) => `${filter}=${this.filtering[filter]}`)
      .join("&");
  }

  private invertCurrentOrdering(param: string): void {
    console.log(this.ordering);
    this.ordering = {
      ...this.ordering,
      [param]: this.ordering[param] === "asc" ? "desc" : "asc",
    };
    console.log(this.ordering);
  }

  private addFilters(filterParams: T) {
    Object.keys(filterParams).map((filterParam) => {
      if (typeof filterParams[filterParam] === "string") {
        this.filtering[filterParam] = filterParams[filterParam] as string;
      }
    });
  }

  /**
   *
   * @param {OrderByFilter} param - You should pass the value of the param you want to display
   * @returns {string} Returns "↑↓" if theres no current value, "↑" if the param current order is ascending and "↓" if the current order is descending
   *
   */
  public displayArrowForOrderingParam(param: OrderByFilter): string {
    return !param ? "↑↓" : param === "asc" ? "↑" : "↓";
  }

  /**
   *
   * @param {string} currentPath - The current path of your page
   * @param {string?} paramToChangeOrdering - If you want to change an ordering of a param, pass the ordering parameter name here
   * @returns The url with all of the current searchParams applied
   *
   */
  public buildUrl(currentPath: string, paramToChangeOrdering?: string): string {
    if (typeof paramToChangeOrdering === "string")
      this.invertCurrentOrdering(paramToChangeOrdering);

    const orderingUrl = this.buildOrderingUrl();
    const filteringUrl = this.buildFiltersUrl();

    if (orderingUrl && !filteringUrl) return `${currentPath}?${orderingUrl}`;

    if (filteringUrl && !orderingUrl) return `${currentPath}?${filteringUrl}`;

    if (!orderingUrl && !filteringUrl) return currentPath;

    return `${currentPath}?${filteringUrl}&${orderingUrl}`;
  }

  /**
   *
   * @param {string} currentPath - The current path of your page
   * @param {T} filterParams - An object off all of the filters you want to apply in the shape of ```{ [filterName]: filterValue }```
   * @returns This method automatically applies the filters and ordering filters (by doing a redirect)
   *
   */
  public async redirectWithFilters(currentPath: string, filterParams: T) {
    "use server";

    this.addFilters(filterParams);

    redirect(this.buildUrl(currentPath));
  }
}
