import { Uuid } from "../../../../shared/domain/value-object/uuid.vo";
import { InMemoryRepository } from "../../../../shared/infra/db/in-memory/in-memory.repository";
import { Category } from "../../category.entity";

export class CategoryInMemoryRepository extends InMemoryRepository<Category, Uuid>{
    
    getEntity(): new (...args: any[]) => Category {
       return Category;
    }
}