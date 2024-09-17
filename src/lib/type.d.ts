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
  