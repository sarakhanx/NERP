export interface Department {
    id: number;
    name: string;
    position: string;
    member: {
      Int64: number;
      Valid: boolean;
    };
    created_date: {
      [x: string]: ReactNode;
      Time: string;
      Valid: boolean;
    };
    updated_date: {
      [x: string]: ReactNode;
      Time: string;
      Valid: boolean;
    };
  }
  export interface Product {
    product_name: string
    cost: number
    price: number
    category: string
    branch_qty: number
    action: string
    sale_order_discount: number
    sale_order_price: number
    sale_order_price_total: number
  }
  
  export interface FormData {
    doc_id: number
    doc_status_id: number
    ex_vat: number
    vat: number
    in_vat: number
    doc_discount: number
    doc_note: string
    branch_id: number
    user_id: number
    department_id: number
    vendor_data: string
    doc_prefix_id: number
    products: Product[]
    doc_log_action: string
    doc_log_qty: number
  }