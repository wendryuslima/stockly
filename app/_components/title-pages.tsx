import AddProductsButton from "../products/_components/add-products-buttont";

interface TitlePagesProps {
  title?: string;
  description?: string;
}

const TitlePages = ({ title, description }: TitlePagesProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="text-primary">{title}</h1>
        <h2 className="text-2xl font-semibold">{description}</h2>
      </div>

      <AddProductsButton title="Adicionar produto" />
    </div>
  );
};

export default TitlePages;
