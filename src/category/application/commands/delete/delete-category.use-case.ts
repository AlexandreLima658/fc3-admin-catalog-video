import { UnitUseCase } from "../../../../shared/application/use-case.abstract";
import { Uuid } from "../../../../shared/domain/value-object/uuid.vo";
import { ICategoryRepository } from "../../../domain/category.repository";


export class DeleteCategoryUseCase extends UnitUseCase<string> {

    constructor(private readonly repository: ICategoryRepository) { super() }
    
    async execute(id: string): Promise<void> {
        const uuid = new Uuid(id);
        await this.repository.delete(uuid)
    }

}