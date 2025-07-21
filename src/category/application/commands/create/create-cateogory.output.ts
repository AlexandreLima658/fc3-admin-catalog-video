export type CreateCategoryOutput = {
  id: string;
  name: string;
  description?: string | null;
  isActive?: boolean;
  createdAt: Date;
};
