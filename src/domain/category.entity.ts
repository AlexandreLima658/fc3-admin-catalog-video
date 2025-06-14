

export type CategoryConstructorProps = {
    categoryId?: string;
    name: string;
    description?: string | null;
    isActive?: boolean;
    createdAt?: Date;

}

export type CategoryCreateCommand = {
    name: string;
    description?: string | null;
    isActive?: boolean;
}

export class Category {
    categoryId: string;
    name: string;
    description: string | null;
    isActive: boolean;
    createdAt: Date;

    constructor(props:CategoryConstructorProps){
        this.categoryId = props.categoryId;
        this.name = props.name;
        this.description = props.description ?? null;
        this.isActive = props.isActive ?? true;
        this.createdAt = props.createdAt ?? new Date();
    }

    //factory method
    static create(props: CategoryCreateCommand): Category {
        return new Category(props);
    }



}