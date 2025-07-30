export abstract class IUseCase<Input, Output> {
    abstract execute(input: Input): Promise<Output>
}

export abstract class UnitUseCase<Input> {
    abstract execute(input: Input): Promise<void>;
}