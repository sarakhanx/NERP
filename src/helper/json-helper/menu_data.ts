import { Store, Warehouse } from "lucide-react";

const essential = [
    {
      service: "Reports",
      subServices: [
        {
          name: "Target",
          link: "/nerp/reports/target",
        },
        {
          name: "Best Seller",
          link: "/nerp/reports/bestseller",
        },
        {
          name: "Statics",
          link: "/nerp/reports/statics",
        },
      ],
    },
    {
      service: "Products",
      subServices: [
        {
          name: "Inventory",
          link: "/nerp/products/inventory",
        },
        {
          name: "Order",
          link: "/nerp/products/ordering",
        },
        {
          name: "Preorder Listed",
          link: "/nerp/products/preorder",
        },
      ],
    },
    {
      service: "Configuration",
      subServices: [
        {
          name: "Essential",
          link: "/nerp/configuration/essential",
        },
        {
          name: "Setting Application",
          link: "/nerp/configuration/setting",
        },
      ],
    },
  ];
const authServices = [
    {
      name: "Warehouse-Services",
      icon: Warehouse,
      href: "/nerp/warehouse-services",
      label: "Warehouse",
      service: [
        {
          user_services:[
            {
              menu : "สินค้ารอรับเข้า",
              href : "/nerp/warehouse-services/products/incoming"
            },
            {
              menu : "โอนย้ายสินค้า",
              href : "/nerp/warehouse-services/products/transfer"
            },
            {
              menu : "เช็คสถานะสินค้า",
              href : "/nerp/warehouse-services/products/status"
            },
            {
              menu : "Debug",
              href : "/nerp/warehouse-services/debug"
            },
          ]
        },
        {
          admin_services:[
            {
              menu : "สร้างใบรับเข้า",
              href : "/nerp/warehouse-services/new-pr"
            },
            {
              menu : "รับสินค้า",
              href : "/nerp/warehouse-services/products/docstatus/receive"
            },
          ]
        },
      ]
    },
    {
      name: "Sales-Services",
      icon: Store,
      href: "/nerp/sales-services",
      label: "Sales",
      service: [
        {
          user_services:[
            {
              menu : "เช็คสินค้า",
              href : "/nerp/sales-services/products"
            },
            {
              menu : "รายชื่อลูกค้า",
              href : "/nerp/sales-services/customers/listed"
            },
            {
              menu : "สร้างใบขาย",
              href : "/nerp/sales-services/products/transfer"
            },
            {
              menu : "สถานะใบขาย",
              href : "/nerp/sales-services/products/status"
            },
          ]
        },
        {
          admin_services:[
            {
              menu : "อนุมัติใบขาย",
              href : "/nerp/sales-services/approve"
            },
            {
              menu : "รายงานการขาย",
              href : "/nerp/sales-services/reports/sales"
            },
            {
              menu : "ส่งออกข้อมูลต่างๆ",
              href : "/nerp/sales-services/reports/exports"
            },
          ]
        },
      ]
    },
    {
      name: "products",
      icon: Store,
      href: "/nerp/products",
      label: "PRODUCTS",
      service: [
        {
          user_services:[
            {
              menu : "สินค้าทั้งหมด",
              href : "/nerp/products/inventory"
            },
            {
              menu : "รายการสั่งซื้อ",
              href : "/nerp/products/ordering"
            },
            {
              menu : "รายการสั่งซื้อรออนุมัติ",
              href : "/nerp/products/preorder"
            },
            {
              menu : "เช็คแต่ละหน้าร้าน",
              href : "/nerp/products/check-store"
            },
          ]
        },
        {
          admin_services:[
            {
              menu : "สร้างสินค้า",
              href : "/nerp/products/new-product"
            },
            {
              menu : "สร้างหมวดหมู่สินค้า",
              href : "/nerp/products/create-category"
            },
          ]
        },
      ]
    },
  ]

  export {essential, authServices}