"use client";
import FilterPLP from "@/components/product-query/filter";
import { PLPPagination } from "@/components/product-query/pagination";
import ProductsResultListing, {
  CardPlaceHolderSkeleton,
} from "@/components/products-listing/product-listing";
import { SelectSortByPLP } from "@/components/select/plp-sort-by";
import { OrderBy, SortBy } from "@/enum/sort.enum";
import { fetchCategories } from "@/services/category.service";
import { fetchProducts } from "@/services/product.service";
import { fetchVariationNames } from "@/services/variation.service";
import { Category } from "@/types/category.type";
import { useEffect, useState } from "react";

export type FilterAndSortProductsType = {
  name?: string;
  categories?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string;
  sortBy?: SortBy;
  orderBy?: OrderBy;
  page?: number;
  totalPage?: number;
  totalDocs?: number;
};

export default function ProductsListing() {
  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [filterProductsPage, setFilterProductsPage] =
    useState<FilterAndSortProductsType>({
      page: 1,
    });
  const [categoriesData, setCategoriesData] = useState<{
    categories: Category[];
    page?: number;
  }>({ categories: [], page: 1 });

  const [variationNames, setVariationNames] = useState<string[]>([]);
  useEffect(() => {
    const fetchAllVariationNames = async () => {
      const data = await fetchVariationNames();
      setVariationNames(data as string[]);
    };
    fetchAllVariationNames();
  }, []);
  useEffect(() => {
    const fetchAllCategories = async () => {
      const data = await fetchCategories({
        page: categoriesData.page,
        limit: 10,
      });

      if (categoriesData.page === 1) {
        // Nếu đang ở trang 1, chỉ cần gán mảng mới cho categories
        setCategoriesData((prev) => ({
          ...prev,
          categories: data.categories ? data.categories : [],
        }));
      } else {
        setCategoriesData((prev) => ({
          ...prev,
          categories: [
            ...prev.categories,
            ...(data.categories ? data.categories : []),
          ],
        }));
      }
    };

    fetchAllCategories();
  }, [categoriesData.page]);

  useEffect(() => {
    setIsLoadingProducts(true);

    let timer: any;

    const fetchAllProducts = async () => {
      const fetchProductsParams = { ...filterProductsPage };
      delete fetchProductsParams.totalDocs;
      delete fetchProductsParams.totalPage;
      const data = await fetchProducts(fetchProductsParams);
      setProducts(data.products);
      setFilterProductsPage({
        ...filterProductsPage,
        totalPage: data.totalPage,
        totalDocs: data.totalDocs,
      });

      timer = setTimeout(() => {
        setIsLoadingProducts(false);
      }, 200);
    };

    fetchAllProducts();

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterProductsPage.page,
    filterProductsPage.name,
    filterProductsPage.categories,
    filterProductsPage.minPrice,
    filterProductsPage.maxPrice,
    filterProductsPage.sizes,
    filterProductsPage.sortBy,
    filterProductsPage.orderBy,
  ]);

  return (
    <div className="mt-20">
      <div className="grid grid-cols-4 gap-8">
        <div>
          <div className="lg:mb-10 min-h-10 ml-2">
            <span className="font-medium">Kết quả</span> (
            {filterProductsPage.totalDocs ?? 0})
          </div>

          <FilterPLP
            setIsLoadingProducts={setIsLoadingProducts}
            setFilterProductsPage={setFilterProductsPage}
            variationNames={variationNames}
            categoriesData={categoriesData as any}
            setCategoriesData={setCategoriesData as any}
          />
        </div>
        <div className="col-span-3">
          <div className="lg:mb-10 min-h-10 flex justify-end">
            <SelectSortByPLP
              setFilterProductsPage={setFilterProductsPage}
              setIsLoadingProducts={setIsLoadingProducts}
            />
          </div>
          {isLoadingProducts ? (
            <CardPlaceHolderSkeleton />
          ) : (
            <ProductsResultListing productsList={products} />
          )}
          {products?.length > 0 && (
            <PLPPagination
              filterProductsPage={filterProductsPage}
              setFilterProductsPage={setFilterProductsPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
