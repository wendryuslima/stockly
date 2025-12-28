import Image from "next/image";

const SidebarMenu = () => {
  const menuItems = [
    {
      label: "Dashboard",
      icon: "dashboard",
      href: "/dashboard",
    },
    {
      label: "Produtos",
      icon: "dashboard",
      href: "/dashboard",
    },
    {
      label: "Vendas",
      icon: "dashboard",
      href: "/dashboard",
    },
  ];
  return (
    <div className="w-64 bg-white">
      <div className=""></div>

      <div className="flex flex-col gap-2 p-2">
        <Image src="/STOCKLY.png" alt="Stockly" width={100} height={100} />
        {menuItems.map((menuItem) => (
          <a className="px" key={menuItem.label}>
            {menuItem.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SidebarMenu;
