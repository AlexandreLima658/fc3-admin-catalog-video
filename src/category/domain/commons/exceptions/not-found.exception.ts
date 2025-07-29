import { Entity } from "../../../../shared/domain/entity";

export class NotFoundException extends Error {

    constructor(
        id: any[] | any,
        entityClass: new (...args: any[]) => Entity,
    ) {
        const idsMessage = Array.isArray(id) ? id.join(', ') : id;
        super(`${entityClass.name} Not found using ID ${idsMessage}`);
        this.name = 'NotFoundException';
    }
}
