import { UnitUseCase } from "../../../../shared/application/use-case.abstract";
import { Uuid } from "../../../../shared/domain/value-object/uuid.vo";
import { ICategoryRepository } from "../../../domain/category.repository";


export class DeleteCategoryUseCase extends UnitUseCase<DeleteCategoryInput> {

    constructor(private readonly repository: ICategoryRepository) { super() }
    
    async execute(input: DeleteCategoryInput): Promise<void> {
        const uuid = new Uuid(input.id);
        await this.repository.delete(uuid)
    }

}