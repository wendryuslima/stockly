interface TitlePagesProps {
  title?: string;
  description?: string;
}

const TitlePages = ({ title, description }: TitlePagesProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-primary">{title}</h1>
      <h2 className="text-2xl font-semibold">{description}</h2>
    </div>
  );
};

export default TitlePages;
