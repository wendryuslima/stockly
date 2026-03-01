import MostSoldProductsItem from "@/app/(dashboard)/_components/most-sold-products-item";
import { getMostSoldProduct } from "@/app/_data-access/dashboard/get-most-sold-products";

const MostSoldProducts = async () => {
  const mostSoldProducts = await getMostSoldProduct();
  return (
    <div className="flex h-full flex-col gap-2 overflow-hidden rounded-xl bg-white p-6">
      <p className="text-[18px] font-semibold text-slate-900">Mais vendidos</p>
      {mostSoldProducts.map((product) => (
        <MostSoldProductsItem
          key={product.name}
          product={{
            id: product.id,
            name: product.name,
            price: product.price,
            totalSold: product.totalSold,
            status: product.status,
          }}
        />
      ))}
    </div>
  );
};

export default MostSoldProducts;
