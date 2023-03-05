class HttpErrors extends Error {
    constructor(massage?:string){
        super(massage);
        this.name = this.constructor.name;
    }
}

/**
 * Status code: 401
 */
export class UnauthorizedError extends HttpErrors {

}


/**
 * Status code 409
 */
export class ConflictError extends HttpErrors {

}

/**
 * Status 400
 */
export class AccessError extends HttpErrors {

}

/**
 * Status code 402
 */
export class InvalidId extends HttpErrors{

}
/**
 * Status code 404
 */
export class NotFoundError extends HttpErrors{

}
//add more error classes 