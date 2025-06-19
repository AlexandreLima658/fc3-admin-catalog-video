import { ErrorInfo } from "./error.info";

export class DomainException extends Error {

  private readonly errorInfo: ErrorInfo;

  constructor(errorInfo: ErrorInfo) {
    super(errorInfo.message)
    this.errorInfo = errorInfo;
    this.name = "DomainException"
  }

  // sobrecarga (assinatura de paramentros)
  static with(errorInfo: ErrorInfo): DomainException;
  static with(message: string): DomainException;

  // implementação única
  static with(param: string | ErrorInfo): DomainException {

    if (typeof param == 'string') {
        return new DomainException(new ErrorInfo(param))
    }

    return new DomainException(param)
  }

  info(): ErrorInfo {
    return this.errorInfo
  }
  
}




