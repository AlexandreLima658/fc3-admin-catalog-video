import  isEqual  from "lodash/isEqual";

export abstract class ValueObject {

    public equals(object: this): boolean {
        if (object == null || object == undefined) {
            return false;
        }
        if(object.constructor.name !== this.constructor.name) {
            return false;
        }

        return isEqual(object, this);
    }
}