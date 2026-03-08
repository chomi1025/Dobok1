
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model ProductOption
 * 
 */
export type ProductOption = $Result.DefaultSelection<Prisma.$ProductOptionPayload>
/**
 * Model CartItem
 * 
 */
export type CartItem = $Result.DefaultSelection<Prisma.$CartItemPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model Claim
 * 
 */
export type Claim = $Result.DefaultSelection<Prisma.$ClaimPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model ReviewReply
 * 
 */
export type ReviewReply = $Result.DefaultSelection<Prisma.$ReviewReplyPayload>
/**
 * Model Inquiry
 * 
 */
export type Inquiry = $Result.DefaultSelection<Prisma.$InquiryPayload>
/**
 * Model InquiryReply
 * 
 */
export type InquiryReply = $Result.DefaultSelection<Prisma.$InquiryReplyPayload>
/**
 * Model ProductQna
 * 
 */
export type ProductQna = $Result.DefaultSelection<Prisma.$ProductQnaPayload>
/**
 * Model ProductQnaReply
 * 
 */
export type ProductQnaReply = $Result.DefaultSelection<Prisma.$ProductQnaReplyPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OrderStatus: {
  PAYMENT_COMPLETE: 'PAYMENT_COMPLETE',
  PREPARING: 'PREPARING',
  SHIPPING: 'SHIPPING',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const ClaimType: {
  CANCEL: 'CANCEL',
  RETURN: 'RETURN',
  EXCHANGE: 'EXCHANGE'
};

export type ClaimType = (typeof ClaimType)[keyof typeof ClaimType]


export const ClaimStatus: {
  REQUESTED: 'REQUESTED',
  APPROVED: 'APPROVED',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED'
};

export type ClaimStatus = (typeof ClaimStatus)[keyof typeof ClaimStatus]

}

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type ClaimType = $Enums.ClaimType

export const ClaimType: typeof $Enums.ClaimType

export type ClaimStatus = $Enums.ClaimStatus

export const ClaimStatus: typeof $Enums.ClaimStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.productOption`: Exposes CRUD operations for the **ProductOption** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductOptions
    * const productOptions = await prisma.productOption.findMany()
    * ```
    */
  get productOption(): Prisma.ProductOptionDelegate<ExtArgs>;

  /**
   * `prisma.cartItem`: Exposes CRUD operations for the **CartItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CartItems
    * const cartItems = await prisma.cartItem.findMany()
    * ```
    */
  get cartItem(): Prisma.CartItemDelegate<ExtArgs>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs>;

  /**
   * `prisma.claim`: Exposes CRUD operations for the **Claim** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Claims
    * const claims = await prisma.claim.findMany()
    * ```
    */
  get claim(): Prisma.ClaimDelegate<ExtArgs>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs>;

  /**
   * `prisma.reviewReply`: Exposes CRUD operations for the **ReviewReply** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReviewReplies
    * const reviewReplies = await prisma.reviewReply.findMany()
    * ```
    */
  get reviewReply(): Prisma.ReviewReplyDelegate<ExtArgs>;

  /**
   * `prisma.inquiry`: Exposes CRUD operations for the **Inquiry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Inquiries
    * const inquiries = await prisma.inquiry.findMany()
    * ```
    */
  get inquiry(): Prisma.InquiryDelegate<ExtArgs>;

  /**
   * `prisma.inquiryReply`: Exposes CRUD operations for the **InquiryReply** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InquiryReplies
    * const inquiryReplies = await prisma.inquiryReply.findMany()
    * ```
    */
  get inquiryReply(): Prisma.InquiryReplyDelegate<ExtArgs>;

  /**
   * `prisma.productQna`: Exposes CRUD operations for the **ProductQna** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductQnas
    * const productQnas = await prisma.productQna.findMany()
    * ```
    */
  get productQna(): Prisma.ProductQnaDelegate<ExtArgs>;

  /**
   * `prisma.productQnaReply`: Exposes CRUD operations for the **ProductQnaReply** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductQnaReplies
    * const productQnaReplies = await prisma.productQnaReply.findMany()
    * ```
    */
  get productQnaReply(): Prisma.ProductQnaReplyDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.14.0
   * Query Engine version: e9771e62de70f79a5e1c604a2d7c8e2a0a874b48
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Category: 'Category',
    Product: 'Product',
    ProductOption: 'ProductOption',
    CartItem: 'CartItem',
    Order: 'Order',
    OrderItem: 'OrderItem',
    Claim: 'Claim',
    Review: 'Review',
    ReviewReply: 'ReviewReply',
    Inquiry: 'Inquiry',
    InquiryReply: 'InquiryReply',
    ProductQna: 'ProductQna',
    ProductQnaReply: 'ProductQnaReply'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'user' | 'category' | 'product' | 'productOption' | 'cartItem' | 'order' | 'orderItem' | 'claim' | 'review' | 'reviewReply' | 'inquiry' | 'inquiryReply' | 'productQna' | 'productQnaReply'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>,
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>,
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>,
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      ProductOption: {
        payload: Prisma.$ProductOptionPayload<ExtArgs>
        fields: Prisma.ProductOptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductOptionFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductOptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductOptionFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductOptionPayload>
          }
          findFirst: {
            args: Prisma.ProductOptionFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductOptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductOptionFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductOptionPayload>
          }
          findMany: {
            args: Prisma.ProductOptionFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductOptionPayload>[]
          }
          create: {
            args: Prisma.ProductOptionCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductOptionPayload>
          }
          createMany: {
            args: Prisma.ProductOptionCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductOptionCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductOptionPayload>[]
          }
          delete: {
            args: Prisma.ProductOptionDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductOptionPayload>
          }
          update: {
            args: Prisma.ProductOptionUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductOptionPayload>
          }
          deleteMany: {
            args: Prisma.ProductOptionDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ProductOptionUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ProductOptionUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductOptionPayload>
          }
          aggregate: {
            args: Prisma.ProductOptionAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateProductOption>
          }
          groupBy: {
            args: Prisma.ProductOptionGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ProductOptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductOptionCountArgs<ExtArgs>,
            result: $Utils.Optional<ProductOptionCountAggregateOutputType> | number
          }
        }
      }
      CartItem: {
        payload: Prisma.$CartItemPayload<ExtArgs>
        fields: Prisma.CartItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CartItemFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CartItemFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          findFirst: {
            args: Prisma.CartItemFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CartItemFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          findMany: {
            args: Prisma.CartItemFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>[]
          }
          create: {
            args: Prisma.CartItemCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          createMany: {
            args: Prisma.CartItemCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CartItemCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>[]
          }
          delete: {
            args: Prisma.CartItemDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          update: {
            args: Prisma.CartItemUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          deleteMany: {
            args: Prisma.CartItemDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.CartItemUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.CartItemUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CartItemPayload>
          }
          aggregate: {
            args: Prisma.CartItemAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateCartItem>
          }
          groupBy: {
            args: Prisma.CartItemGroupByArgs<ExtArgs>,
            result: $Utils.Optional<CartItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.CartItemCountArgs<ExtArgs>,
            result: $Utils.Optional<CartItemCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>,
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>,
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>,
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>,
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      Claim: {
        payload: Prisma.$ClaimPayload<ExtArgs>
        fields: Prisma.ClaimFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClaimFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClaimFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          findFirst: {
            args: Prisma.ClaimFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClaimFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          findMany: {
            args: Prisma.ClaimFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>[]
          }
          create: {
            args: Prisma.ClaimCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          createMany: {
            args: Prisma.ClaimCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClaimCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>[]
          }
          delete: {
            args: Prisma.ClaimDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          update: {
            args: Prisma.ClaimUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          deleteMany: {
            args: Prisma.ClaimDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ClaimUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ClaimUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClaimPayload>
          }
          aggregate: {
            args: Prisma.ClaimAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateClaim>
          }
          groupBy: {
            args: Prisma.ClaimGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ClaimGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClaimCountArgs<ExtArgs>,
            result: $Utils.Optional<ClaimCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>,
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      ReviewReply: {
        payload: Prisma.$ReviewReplyPayload<ExtArgs>
        fields: Prisma.ReviewReplyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewReplyFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewReplyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewReplyFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewReplyPayload>
          }
          findFirst: {
            args: Prisma.ReviewReplyFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewReplyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewReplyFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewReplyPayload>
          }
          findMany: {
            args: Prisma.ReviewReplyFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewReplyPayload>[]
          }
          create: {
            args: Prisma.ReviewReplyCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewReplyPayload>
          }
          createMany: {
            args: Prisma.ReviewReplyCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReviewReplyCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewReplyPayload>[]
          }
          delete: {
            args: Prisma.ReviewReplyDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewReplyPayload>
          }
          update: {
            args: Prisma.ReviewReplyUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewReplyPayload>
          }
          deleteMany: {
            args: Prisma.ReviewReplyDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewReplyUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ReviewReplyUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ReviewReplyPayload>
          }
          aggregate: {
            args: Prisma.ReviewReplyAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateReviewReply>
          }
          groupBy: {
            args: Prisma.ReviewReplyGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ReviewReplyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReviewReplyCountArgs<ExtArgs>,
            result: $Utils.Optional<ReviewReplyCountAggregateOutputType> | number
          }
        }
      }
      Inquiry: {
        payload: Prisma.$InquiryPayload<ExtArgs>
        fields: Prisma.InquiryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InquiryFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InquiryFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          findFirst: {
            args: Prisma.InquiryFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InquiryFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          findMany: {
            args: Prisma.InquiryFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>[]
          }
          create: {
            args: Prisma.InquiryCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          createMany: {
            args: Prisma.InquiryCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InquiryCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>[]
          }
          delete: {
            args: Prisma.InquiryDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          update: {
            args: Prisma.InquiryUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          deleteMany: {
            args: Prisma.InquiryDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.InquiryUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.InquiryUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          aggregate: {
            args: Prisma.InquiryAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateInquiry>
          }
          groupBy: {
            args: Prisma.InquiryGroupByArgs<ExtArgs>,
            result: $Utils.Optional<InquiryGroupByOutputType>[]
          }
          count: {
            args: Prisma.InquiryCountArgs<ExtArgs>,
            result: $Utils.Optional<InquiryCountAggregateOutputType> | number
          }
        }
      }
      InquiryReply: {
        payload: Prisma.$InquiryReplyPayload<ExtArgs>
        fields: Prisma.InquiryReplyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InquiryReplyFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryReplyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InquiryReplyFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryReplyPayload>
          }
          findFirst: {
            args: Prisma.InquiryReplyFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryReplyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InquiryReplyFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryReplyPayload>
          }
          findMany: {
            args: Prisma.InquiryReplyFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryReplyPayload>[]
          }
          create: {
            args: Prisma.InquiryReplyCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryReplyPayload>
          }
          createMany: {
            args: Prisma.InquiryReplyCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InquiryReplyCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryReplyPayload>[]
          }
          delete: {
            args: Prisma.InquiryReplyDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryReplyPayload>
          }
          update: {
            args: Prisma.InquiryReplyUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryReplyPayload>
          }
          deleteMany: {
            args: Prisma.InquiryReplyDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.InquiryReplyUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.InquiryReplyUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$InquiryReplyPayload>
          }
          aggregate: {
            args: Prisma.InquiryReplyAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateInquiryReply>
          }
          groupBy: {
            args: Prisma.InquiryReplyGroupByArgs<ExtArgs>,
            result: $Utils.Optional<InquiryReplyGroupByOutputType>[]
          }
          count: {
            args: Prisma.InquiryReplyCountArgs<ExtArgs>,
            result: $Utils.Optional<InquiryReplyCountAggregateOutputType> | number
          }
        }
      }
      ProductQna: {
        payload: Prisma.$ProductQnaPayload<ExtArgs>
        fields: Prisma.ProductQnaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductQnaFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductQnaFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaPayload>
          }
          findFirst: {
            args: Prisma.ProductQnaFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductQnaFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaPayload>
          }
          findMany: {
            args: Prisma.ProductQnaFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaPayload>[]
          }
          create: {
            args: Prisma.ProductQnaCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaPayload>
          }
          createMany: {
            args: Prisma.ProductQnaCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductQnaCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaPayload>[]
          }
          delete: {
            args: Prisma.ProductQnaDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaPayload>
          }
          update: {
            args: Prisma.ProductQnaUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaPayload>
          }
          deleteMany: {
            args: Prisma.ProductQnaDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ProductQnaUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ProductQnaUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaPayload>
          }
          aggregate: {
            args: Prisma.ProductQnaAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateProductQna>
          }
          groupBy: {
            args: Prisma.ProductQnaGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ProductQnaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductQnaCountArgs<ExtArgs>,
            result: $Utils.Optional<ProductQnaCountAggregateOutputType> | number
          }
        }
      }
      ProductQnaReply: {
        payload: Prisma.$ProductQnaReplyPayload<ExtArgs>
        fields: Prisma.ProductQnaReplyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductQnaReplyFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaReplyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductQnaReplyFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaReplyPayload>
          }
          findFirst: {
            args: Prisma.ProductQnaReplyFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaReplyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductQnaReplyFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaReplyPayload>
          }
          findMany: {
            args: Prisma.ProductQnaReplyFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaReplyPayload>[]
          }
          create: {
            args: Prisma.ProductQnaReplyCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaReplyPayload>
          }
          createMany: {
            args: Prisma.ProductQnaReplyCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductQnaReplyCreateManyAndReturnArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaReplyPayload>[]
          }
          delete: {
            args: Prisma.ProductQnaReplyDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaReplyPayload>
          }
          update: {
            args: Prisma.ProductQnaReplyUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaReplyPayload>
          }
          deleteMany: {
            args: Prisma.ProductQnaReplyDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ProductQnaReplyUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ProductQnaReplyUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ProductQnaReplyPayload>
          }
          aggregate: {
            args: Prisma.ProductQnaReplyAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateProductQnaReply>
          }
          groupBy: {
            args: Prisma.ProductQnaReplyGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ProductQnaReplyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductQnaReplyCountArgs<ExtArgs>,
            result: $Utils.Optional<ProductQnaReplyCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    orders: number
    reviews: number
    reviewReplies: number
    inquiries: number
    inquiryReplies: number
    productQnas: number
    productQnaReplies: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | UserCountOutputTypeCountOrdersArgs
    reviews?: boolean | UserCountOutputTypeCountReviewsArgs
    reviewReplies?: boolean | UserCountOutputTypeCountReviewRepliesArgs
    inquiries?: boolean | UserCountOutputTypeCountInquiriesArgs
    inquiryReplies?: boolean | UserCountOutputTypeCountInquiryRepliesArgs
    productQnas?: boolean | UserCountOutputTypeCountProductQnasArgs
    productQnaReplies?: boolean | UserCountOutputTypeCountProductQnaRepliesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewReplyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInquiriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInquiryRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryReplyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProductQnasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductQnaWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProductQnaRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductQnaReplyWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    children: number
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | CategoryCountOutputTypeCountChildrenArgs
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    options: number
    cartItems: number
    orderItems: number
    productQnas: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    options?: boolean | ProductCountOutputTypeCountOptionsArgs
    cartItems?: boolean | ProductCountOutputTypeCountCartItemsArgs
    orderItems?: boolean | ProductCountOutputTypeCountOrderItemsArgs
    productQnas?: boolean | ProductCountOutputTypeCountProductQnasArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductOptionWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountCartItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartItemWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountProductQnasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductQnaWhereInput
  }


  /**
   * Count Type ProductOptionCountOutputType
   */

  export type ProductOptionCountOutputType = {
    cartItems: number
  }

  export type ProductOptionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cartItems?: boolean | ProductOptionCountOutputTypeCountCartItemsArgs
  }

  // Custom InputTypes
  /**
   * ProductOptionCountOutputType without action
   */
  export type ProductOptionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOptionCountOutputType
     */
    select?: ProductOptionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductOptionCountOutputType without action
   */
  export type ProductOptionCountOutputTypeCountCartItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartItemWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Count Type OrderItemCountOutputType
   */

  export type OrderItemCountOutputType = {
    reviews: number
    claims: number
  }

  export type OrderItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reviews?: boolean | OrderItemCountOutputTypeCountReviewsArgs
    claims?: boolean | OrderItemCountOutputTypeCountClaimsArgs
  }

  // Custom InputTypes
  /**
   * OrderItemCountOutputType without action
   */
  export type OrderItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItemCountOutputType
     */
    select?: OrderItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderItemCountOutputType without action
   */
  export type OrderItemCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * OrderItemCountOutputType without action
   */
  export type OrderItemCountOutputTypeCountClaimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimWhereInput
  }


  /**
   * Count Type InquiryCountOutputType
   */

  export type InquiryCountOutputType = {
    replies: number
  }

  export type InquiryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    replies?: boolean | InquiryCountOutputTypeCountRepliesArgs
  }

  // Custom InputTypes
  /**
   * InquiryCountOutputType without action
   */
  export type InquiryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryCountOutputType
     */
    select?: InquiryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InquiryCountOutputType without action
   */
  export type InquiryCountOutputTypeCountRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryReplyWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    username: string | null
    role: string | null
    phone: string | null
    birthDate: Date | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    username: string | null
    role: string | null
    phone: string | null
    birthDate: Date | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    username: number
    role: number
    phone: number
    birthDate: number
    address: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    username?: true
    role?: true
    phone?: true
    birthDate?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    username?: true
    role?: true
    phone?: true
    birthDate?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    username?: true
    role?: true
    phone?: true
    birthDate?: true
    address?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    name: string
    username: string
    role: string
    phone: string | null
    birthDate: Date
    address: JsonValue | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    username?: boolean
    role?: boolean
    phone?: boolean
    birthDate?: boolean
    address?: boolean
    createdAt?: boolean
    orders?: boolean | User$ordersArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    reviewReplies?: boolean | User$reviewRepliesArgs<ExtArgs>
    inquiries?: boolean | User$inquiriesArgs<ExtArgs>
    inquiryReplies?: boolean | User$inquiryRepliesArgs<ExtArgs>
    productQnas?: boolean | User$productQnasArgs<ExtArgs>
    productQnaReplies?: boolean | User$productQnaRepliesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    username?: boolean
    role?: boolean
    phone?: boolean
    birthDate?: boolean
    address?: boolean
    createdAt?: boolean
  }


  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | User$ordersArgs<ExtArgs>
    reviews?: boolean | User$reviewsArgs<ExtArgs>
    reviewReplies?: boolean | User$reviewRepliesArgs<ExtArgs>
    inquiries?: boolean | User$inquiriesArgs<ExtArgs>
    inquiryReplies?: boolean | User$inquiryRepliesArgs<ExtArgs>
    productQnas?: boolean | User$productQnasArgs<ExtArgs>
    productQnaReplies?: boolean | User$productQnaRepliesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      orders: Prisma.$OrderPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      reviewReplies: Prisma.$ReviewReplyPayload<ExtArgs>[]
      inquiries: Prisma.$InquiryPayload<ExtArgs>[]
      inquiryReplies: Prisma.$InquiryReplyPayload<ExtArgs>[]
      productQnas: Prisma.$ProductQnaPayload<ExtArgs>[]
      productQnaReplies: Prisma.$ProductQnaReplyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      name: string
      username: string
      role: string
      phone: string | null
      birthDate: Date
      address: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }


  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends UserCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    orders<T extends User$ordersArgs<ExtArgs> = {}>(args?: Subset<T, User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findMany'> | Null>;

    reviews<T extends User$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'findMany'> | Null>;

    reviewReplies<T extends User$reviewRepliesArgs<ExtArgs> = {}>(args?: Subset<T, User$reviewRepliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewReplyPayload<ExtArgs>, T, 'findMany'> | Null>;

    inquiries<T extends User$inquiriesArgs<ExtArgs> = {}>(args?: Subset<T, User$inquiriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, 'findMany'> | Null>;

    inquiryReplies<T extends User$inquiryRepliesArgs<ExtArgs> = {}>(args?: Subset<T, User$inquiryRepliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryReplyPayload<ExtArgs>, T, 'findMany'> | Null>;

    productQnas<T extends User$productQnasArgs<ExtArgs> = {}>(args?: Subset<T, User$productQnasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductQnaPayload<ExtArgs>, T, 'findMany'> | Null>;

    productQnaReplies<T extends User$productQnaRepliesArgs<ExtArgs> = {}>(args?: Subset<T, User$productQnaRepliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductQnaReplyPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly birthDate: FieldRef<"User", 'DateTime'>
    readonly address: FieldRef<"User", 'Json'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.orders
   */
  export type User$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User.reviews
   */
  export type User$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * User.reviewReplies
   */
  export type User$reviewRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewReply
     */
    select?: ReviewReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewReplyInclude<ExtArgs> | null
    where?: ReviewReplyWhereInput
    orderBy?: ReviewReplyOrderByWithRelationInput | ReviewReplyOrderByWithRelationInput[]
    cursor?: ReviewReplyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewReplyScalarFieldEnum | ReviewReplyScalarFieldEnum[]
  }

  /**
   * User.inquiries
   */
  export type User$inquiriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    where?: InquiryWhereInput
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    cursor?: InquiryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InquiryScalarFieldEnum | InquiryScalarFieldEnum[]
  }

  /**
   * User.inquiryReplies
   */
  export type User$inquiryRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryReply
     */
    select?: InquiryReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryReplyInclude<ExtArgs> | null
    where?: InquiryReplyWhereInput
    orderBy?: InquiryReplyOrderByWithRelationInput | InquiryReplyOrderByWithRelationInput[]
    cursor?: InquiryReplyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InquiryReplyScalarFieldEnum | InquiryReplyScalarFieldEnum[]
  }

  /**
   * User.productQnas
   */
  export type User$productQnasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQna
     */
    select?: ProductQnaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaInclude<ExtArgs> | null
    where?: ProductQnaWhereInput
    orderBy?: ProductQnaOrderByWithRelationInput | ProductQnaOrderByWithRelationInput[]
    cursor?: ProductQnaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductQnaScalarFieldEnum | ProductQnaScalarFieldEnum[]
  }

  /**
   * User.productQnaReplies
   */
  export type User$productQnaRepliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQnaReply
     */
    select?: ProductQnaReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaReplyInclude<ExtArgs> | null
    where?: ProductQnaReplyWhereInput
    orderBy?: ProductQnaReplyOrderByWithRelationInput | ProductQnaReplyOrderByWithRelationInput[]
    cursor?: ProductQnaReplyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductQnaReplyScalarFieldEnum | ProductQnaReplyScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
    parentId: number | null
    sortOrder: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
    parentId: number | null
    sortOrder: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    parentId: number | null
    slug: string | null
    sortOrder: number | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    parentId: number | null
    slug: string | null
    sortOrder: number | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    parentId: number
    slug: number
    sortOrder: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
    parentId?: true
    sortOrder?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
    parentId?: true
    sortOrder?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    slug?: true
    sortOrder?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    slug?: true
    sortOrder?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    parentId?: true
    slug?: true
    sortOrder?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    name: string
    parentId: number | null
    slug: string
    sortOrder: number | null
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    parentId?: boolean
    slug?: boolean
    sortOrder?: boolean
    parent?: boolean | Category$parentArgs<ExtArgs>
    children?: boolean | Category$childrenArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    parentId?: boolean
    slug?: boolean
    sortOrder?: boolean
  }


  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Category$parentArgs<ExtArgs>
    children?: boolean | Category$childrenArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      parent: Prisma.$CategoryPayload<ExtArgs> | null
      children: Prisma.$CategoryPayload<ExtArgs>[]
      products: Prisma.$ProductPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      parentId: number | null
      slug: string
      sortOrder: number | null
    }, ExtArgs["result"]["category"]>
    composites: {}
  }


  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CategoryFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CategoryFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CategoryFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
    **/
    create<T extends CategoryCreateArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends CategoryCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
    **/
    delete<T extends CategoryDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CategoryUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CategoryDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CategoryUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
    **/
    upsert<T extends CategoryUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>
    ): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    parent<T extends Category$parentArgs<ExtArgs> = {}>(args?: Subset<T, Category$parentArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    children<T extends Category$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Category$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'findMany'> | Null>;

    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
    readonly name: FieldRef<"Category", 'String'>
    readonly parentId: FieldRef<"Category", 'Int'>
    readonly slug: FieldRef<"Category", 'String'>
    readonly sortOrder: FieldRef<"Category", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }

  /**
   * Category.parent
   */
  export type Category$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Category.children
   */
  export type Category$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    cursor?: ProductWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    id: number | null
    categoryId: number | null
  }

  export type ProductSumAggregateOutputType = {
    id: number | null
    categoryId: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    thumbnail: string | null
    material: string | null
    origin: string | null
    createdAt: Date | null
    categoryId: number | null
  }

  export type ProductMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    thumbnail: string | null
    material: string | null
    origin: string | null
    createdAt: Date | null
    categoryId: number | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    description: number
    thumbnail: number
    images: number
    material: number
    origin: number
    createdAt: number
    categoryId: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    id?: true
    categoryId?: true
  }

  export type ProductSumAggregateInputType = {
    id?: true
    categoryId?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    thumbnail?: true
    material?: true
    origin?: true
    createdAt?: true
    categoryId?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    thumbnail?: true
    material?: true
    origin?: true
    createdAt?: true
    categoryId?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    thumbnail?: true
    images?: true
    material?: true
    origin?: true
    createdAt?: true
    categoryId?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: number
    name: string
    description: string | null
    thumbnail: string | null
    images: string[]
    material: string
    origin: string
    createdAt: Date
    categoryId: number
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    thumbnail?: boolean
    images?: boolean
    material?: boolean
    origin?: boolean
    createdAt?: boolean
    categoryId?: boolean
    options?: boolean | Product$optionsArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    cartItems?: boolean | Product$cartItemsArgs<ExtArgs>
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    productQnas?: boolean | Product$productQnasArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    thumbnail?: boolean
    images?: boolean
    material?: boolean
    origin?: boolean
    createdAt?: boolean
    categoryId?: boolean
  }


  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    options?: boolean | Product$optionsArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    cartItems?: boolean | Product$cartItemsArgs<ExtArgs>
    orderItems?: boolean | Product$orderItemsArgs<ExtArgs>
    productQnas?: boolean | Product$productQnasArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      options: Prisma.$ProductOptionPayload<ExtArgs>[]
      category: Prisma.$CategoryPayload<ExtArgs>
      cartItems: Prisma.$CartItemPayload<ExtArgs>[]
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[]
      productQnas: Prisma.$ProductQnaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      thumbnail: string | null
      images: string[]
      material: string
      origin: string
      createdAt: Date
      categoryId: number
    }, ExtArgs["result"]["product"]>
    composites: {}
  }


  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProductFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>
    ): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProductFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>
    ): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProductFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
    **/
    create<T extends ProductCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ProductCreateArgs<ExtArgs>>
    ): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends ProductCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
    **/
    delete<T extends ProductDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>
    ): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProductUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>
    ): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProductDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProductUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
    **/
    upsert<T extends ProductUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>
    ): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    options<T extends Product$optionsArgs<ExtArgs> = {}>(args?: Subset<T, Product$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductOptionPayload<ExtArgs>, T, 'findMany'> | Null>;

    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    cartItems<T extends Product$cartItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$cartItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, 'findMany'> | Null>;

    orderItems<T extends Product$orderItemsArgs<ExtArgs> = {}>(args?: Subset<T, Product$orderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'findMany'> | Null>;

    productQnas<T extends Product$productQnasArgs<ExtArgs> = {}>(args?: Subset<T, Product$productQnasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductQnaPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Product model
   */ 
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'Int'>
    readonly name: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly thumbnail: FieldRef<"Product", 'String'>
    readonly images: FieldRef<"Product", 'String[]'>
    readonly material: FieldRef<"Product", 'String'>
    readonly origin: FieldRef<"Product", 'String'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly categoryId: FieldRef<"Product", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
  }

  /**
   * Product.options
   */
  export type Product$optionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOption
     */
    select?: ProductOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOptionInclude<ExtArgs> | null
    where?: ProductOptionWhereInput
    orderBy?: ProductOptionOrderByWithRelationInput | ProductOptionOrderByWithRelationInput[]
    cursor?: ProductOptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductOptionScalarFieldEnum | ProductOptionScalarFieldEnum[]
  }

  /**
   * Product.cartItems
   */
  export type Product$cartItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    where?: CartItemWhereInput
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    cursor?: CartItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * Product.orderItems
   */
  export type Product$orderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Product.productQnas
   */
  export type Product$productQnasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQna
     */
    select?: ProductQnaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaInclude<ExtArgs> | null
    where?: ProductQnaWhereInput
    orderBy?: ProductQnaOrderByWithRelationInput | ProductQnaOrderByWithRelationInput[]
    cursor?: ProductQnaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductQnaScalarFieldEnum | ProductQnaScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model ProductOption
   */

  export type AggregateProductOption = {
    _count: ProductOptionCountAggregateOutputType | null
    _avg: ProductOptionAvgAggregateOutputType | null
    _sum: ProductOptionSumAggregateOutputType | null
    _min: ProductOptionMinAggregateOutputType | null
    _max: ProductOptionMaxAggregateOutputType | null
  }

  export type ProductOptionAvgAggregateOutputType = {
    id: number | null
    price: number | null
    stock: number | null
    sale: number | null
    productId: number | null
  }

  export type ProductOptionSumAggregateOutputType = {
    id: number | null
    price: number | null
    stock: number | null
    sale: number | null
    productId: number | null
  }

  export type ProductOptionMinAggregateOutputType = {
    id: number | null
    color: string | null
    size: string | null
    price: number | null
    stock: number | null
    status: string | null
    sale: number | null
    productId: number | null
  }

  export type ProductOptionMaxAggregateOutputType = {
    id: number | null
    color: string | null
    size: string | null
    price: number | null
    stock: number | null
    status: string | null
    sale: number | null
    productId: number | null
  }

  export type ProductOptionCountAggregateOutputType = {
    id: number
    color: number
    size: number
    price: number
    stock: number
    status: number
    sale: number
    productId: number
    _all: number
  }


  export type ProductOptionAvgAggregateInputType = {
    id?: true
    price?: true
    stock?: true
    sale?: true
    productId?: true
  }

  export type ProductOptionSumAggregateInputType = {
    id?: true
    price?: true
    stock?: true
    sale?: true
    productId?: true
  }

  export type ProductOptionMinAggregateInputType = {
    id?: true
    color?: true
    size?: true
    price?: true
    stock?: true
    status?: true
    sale?: true
    productId?: true
  }

  export type ProductOptionMaxAggregateInputType = {
    id?: true
    color?: true
    size?: true
    price?: true
    stock?: true
    status?: true
    sale?: true
    productId?: true
  }

  export type ProductOptionCountAggregateInputType = {
    id?: true
    color?: true
    size?: true
    price?: true
    stock?: true
    status?: true
    sale?: true
    productId?: true
    _all?: true
  }

  export type ProductOptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductOption to aggregate.
     */
    where?: ProductOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductOptions to fetch.
     */
    orderBy?: ProductOptionOrderByWithRelationInput | ProductOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductOptions
    **/
    _count?: true | ProductOptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductOptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductOptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductOptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductOptionMaxAggregateInputType
  }

  export type GetProductOptionAggregateType<T extends ProductOptionAggregateArgs> = {
        [P in keyof T & keyof AggregateProductOption]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductOption[P]>
      : GetScalarType<T[P], AggregateProductOption[P]>
  }




  export type ProductOptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductOptionWhereInput
    orderBy?: ProductOptionOrderByWithAggregationInput | ProductOptionOrderByWithAggregationInput[]
    by: ProductOptionScalarFieldEnum[] | ProductOptionScalarFieldEnum
    having?: ProductOptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductOptionCountAggregateInputType | true
    _avg?: ProductOptionAvgAggregateInputType
    _sum?: ProductOptionSumAggregateInputType
    _min?: ProductOptionMinAggregateInputType
    _max?: ProductOptionMaxAggregateInputType
  }

  export type ProductOptionGroupByOutputType = {
    id: number
    color: string | null
    size: string | null
    price: number
    stock: number
    status: string
    sale: number | null
    productId: number
    _count: ProductOptionCountAggregateOutputType | null
    _avg: ProductOptionAvgAggregateOutputType | null
    _sum: ProductOptionSumAggregateOutputType | null
    _min: ProductOptionMinAggregateOutputType | null
    _max: ProductOptionMaxAggregateOutputType | null
  }

  type GetProductOptionGroupByPayload<T extends ProductOptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductOptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductOptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductOptionGroupByOutputType[P]>
            : GetScalarType<T[P], ProductOptionGroupByOutputType[P]>
        }
      >
    >


  export type ProductOptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    color?: boolean
    size?: boolean
    price?: boolean
    stock?: boolean
    status?: boolean
    sale?: boolean
    productId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    cartItems?: boolean | ProductOption$cartItemsArgs<ExtArgs>
    _count?: boolean | ProductOptionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productOption"]>

  export type ProductOptionSelectScalar = {
    id?: boolean
    color?: boolean
    size?: boolean
    price?: boolean
    stock?: boolean
    status?: boolean
    sale?: boolean
    productId?: boolean
  }


  export type ProductOptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    cartItems?: boolean | ProductOption$cartItemsArgs<ExtArgs>
    _count?: boolean | ProductOptionCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $ProductOptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductOption"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      cartItems: Prisma.$CartItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      color: string | null
      size: string | null
      price: number
      stock: number
      status: string
      sale: number | null
      productId: number
    }, ExtArgs["result"]["productOption"]>
    composites: {}
  }


  type ProductOptionGetPayload<S extends boolean | null | undefined | ProductOptionDefaultArgs> = $Result.GetResult<Prisma.$ProductOptionPayload, S>

  type ProductOptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductOptionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductOptionCountAggregateInputType | true
    }

  export interface ProductOptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductOption'], meta: { name: 'ProductOption' } }
    /**
     * Find zero or one ProductOption that matches the filter.
     * @param {ProductOptionFindUniqueArgs} args - Arguments to find a ProductOption
     * @example
     * // Get one ProductOption
     * const productOption = await prisma.productOption.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProductOptionFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ProductOptionFindUniqueArgs<ExtArgs>>
    ): Prisma__ProductOptionClient<$Result.GetResult<Prisma.$ProductOptionPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ProductOption that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductOptionFindUniqueOrThrowArgs} args - Arguments to find a ProductOption
     * @example
     * // Get one ProductOption
     * const productOption = await prisma.productOption.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProductOptionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductOptionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ProductOptionClient<$Result.GetResult<Prisma.$ProductOptionPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ProductOption that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductOptionFindFirstArgs} args - Arguments to find a ProductOption
     * @example
     * // Get one ProductOption
     * const productOption = await prisma.productOption.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProductOptionFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductOptionFindFirstArgs<ExtArgs>>
    ): Prisma__ProductOptionClient<$Result.GetResult<Prisma.$ProductOptionPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ProductOption that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductOptionFindFirstOrThrowArgs} args - Arguments to find a ProductOption
     * @example
     * // Get one ProductOption
     * const productOption = await prisma.productOption.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProductOptionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductOptionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ProductOptionClient<$Result.GetResult<Prisma.$ProductOptionPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ProductOptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductOptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductOptions
     * const productOptions = await prisma.productOption.findMany()
     * 
     * // Get first 10 ProductOptions
     * const productOptions = await prisma.productOption.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productOptionWithIdOnly = await prisma.productOption.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProductOptionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductOptionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductOptionPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ProductOption.
     * @param {ProductOptionCreateArgs} args - Arguments to create a ProductOption.
     * @example
     * // Create one ProductOption
     * const ProductOption = await prisma.productOption.create({
     *   data: {
     *     // ... data to create a ProductOption
     *   }
     * })
     * 
    **/
    create<T extends ProductOptionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ProductOptionCreateArgs<ExtArgs>>
    ): Prisma__ProductOptionClient<$Result.GetResult<Prisma.$ProductOptionPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ProductOptions.
     * @param {ProductOptionCreateManyArgs} args - Arguments to create many ProductOptions.
     * @example
     * // Create many ProductOptions
     * const productOption = await prisma.productOption.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends ProductOptionCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductOptionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductOptions and returns the data saved in the database.
     * @param {ProductOptionCreateManyAndReturnArgs} args - Arguments to create many ProductOptions.
     * @example
     * // Create many ProductOptions
     * const productOption = await prisma.productOption.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductOptions and only return the `id`
     * const productOptionWithIdOnly = await prisma.productOption.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends ProductOptionCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductOptionCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductOptionPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a ProductOption.
     * @param {ProductOptionDeleteArgs} args - Arguments to delete one ProductOption.
     * @example
     * // Delete one ProductOption
     * const ProductOption = await prisma.productOption.delete({
     *   where: {
     *     // ... filter to delete one ProductOption
     *   }
     * })
     * 
    **/
    delete<T extends ProductOptionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ProductOptionDeleteArgs<ExtArgs>>
    ): Prisma__ProductOptionClient<$Result.GetResult<Prisma.$ProductOptionPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ProductOption.
     * @param {ProductOptionUpdateArgs} args - Arguments to update one ProductOption.
     * @example
     * // Update one ProductOption
     * const productOption = await prisma.productOption.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProductOptionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ProductOptionUpdateArgs<ExtArgs>>
    ): Prisma__ProductOptionClient<$Result.GetResult<Prisma.$ProductOptionPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ProductOptions.
     * @param {ProductOptionDeleteManyArgs} args - Arguments to filter ProductOptions to delete.
     * @example
     * // Delete a few ProductOptions
     * const { count } = await prisma.productOption.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProductOptionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductOptionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductOptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductOptions
     * const productOption = await prisma.productOption.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProductOptionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ProductOptionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductOption.
     * @param {ProductOptionUpsertArgs} args - Arguments to update or create a ProductOption.
     * @example
     * // Update or create a ProductOption
     * const productOption = await prisma.productOption.upsert({
     *   create: {
     *     // ... data to create a ProductOption
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductOption we want to update
     *   }
     * })
    **/
    upsert<T extends ProductOptionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ProductOptionUpsertArgs<ExtArgs>>
    ): Prisma__ProductOptionClient<$Result.GetResult<Prisma.$ProductOptionPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ProductOptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductOptionCountArgs} args - Arguments to filter ProductOptions to count.
     * @example
     * // Count the number of ProductOptions
     * const count = await prisma.productOption.count({
     *   where: {
     *     // ... the filter for the ProductOptions we want to count
     *   }
     * })
    **/
    count<T extends ProductOptionCountArgs>(
      args?: Subset<T, ProductOptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductOptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductOption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductOptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductOptionAggregateArgs>(args: Subset<T, ProductOptionAggregateArgs>): Prisma.PrismaPromise<GetProductOptionAggregateType<T>>

    /**
     * Group by ProductOption.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductOptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductOptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductOptionGroupByArgs['orderBy'] }
        : { orderBy?: ProductOptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductOptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductOptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductOption model
   */
  readonly fields: ProductOptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductOption.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductOptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    cartItems<T extends ProductOption$cartItemsArgs<ExtArgs> = {}>(args?: Subset<T, ProductOption$cartItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ProductOption model
   */ 
  interface ProductOptionFieldRefs {
    readonly id: FieldRef<"ProductOption", 'Int'>
    readonly color: FieldRef<"ProductOption", 'String'>
    readonly size: FieldRef<"ProductOption", 'String'>
    readonly price: FieldRef<"ProductOption", 'Int'>
    readonly stock: FieldRef<"ProductOption", 'Int'>
    readonly status: FieldRef<"ProductOption", 'String'>
    readonly sale: FieldRef<"ProductOption", 'Int'>
    readonly productId: FieldRef<"ProductOption", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * ProductOption findUnique
   */
  export type ProductOptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOption
     */
    select?: ProductOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOptionInclude<ExtArgs> | null
    /**
     * Filter, which ProductOption to fetch.
     */
    where: ProductOptionWhereUniqueInput
  }

  /**
   * ProductOption findUniqueOrThrow
   */
  export type ProductOptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOption
     */
    select?: ProductOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOptionInclude<ExtArgs> | null
    /**
     * Filter, which ProductOption to fetch.
     */
    where: ProductOptionWhereUniqueInput
  }

  /**
   * ProductOption findFirst
   */
  export type ProductOptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOption
     */
    select?: ProductOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOptionInclude<ExtArgs> | null
    /**
     * Filter, which ProductOption to fetch.
     */
    where?: ProductOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductOptions to fetch.
     */
    orderBy?: ProductOptionOrderByWithRelationInput | ProductOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductOptions.
     */
    cursor?: ProductOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductOptions.
     */
    distinct?: ProductOptionScalarFieldEnum | ProductOptionScalarFieldEnum[]
  }

  /**
   * ProductOption findFirstOrThrow
   */
  export type ProductOptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOption
     */
    select?: ProductOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOptionInclude<ExtArgs> | null
    /**
     * Filter, which ProductOption to fetch.
     */
    where?: ProductOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductOptions to fetch.
     */
    orderBy?: ProductOptionOrderByWithRelationInput | ProductOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductOptions.
     */
    cursor?: ProductOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductOptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductOptions.
     */
    distinct?: ProductOptionScalarFieldEnum | ProductOptionScalarFieldEnum[]
  }

  /**
   * ProductOption findMany
   */
  export type ProductOptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOption
     */
    select?: ProductOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOptionInclude<ExtArgs> | null
    /**
     * Filter, which ProductOptions to fetch.
     */
    where?: ProductOptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductOptions to fetch.
     */
    orderBy?: ProductOptionOrderByWithRelationInput | ProductOptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductOptions.
     */
    cursor?: ProductOptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductOptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductOptions.
     */
    skip?: number
    distinct?: ProductOptionScalarFieldEnum | ProductOptionScalarFieldEnum[]
  }

  /**
   * ProductOption create
   */
  export type ProductOptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOption
     */
    select?: ProductOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOptionInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductOption.
     */
    data: XOR<ProductOptionCreateInput, ProductOptionUncheckedCreateInput>
  }

  /**
   * ProductOption createMany
   */
  export type ProductOptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductOptions.
     */
    data: ProductOptionCreateManyInput | ProductOptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductOption createManyAndReturn
   */
  export type ProductOptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOption
     */
    select?: ProductOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOptionInclude<ExtArgs> | null
    /**
     * The data used to create many ProductOptions.
     */
    data: ProductOptionCreateManyInput | ProductOptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductOption update
   */
  export type ProductOptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOption
     */
    select?: ProductOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOptionInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductOption.
     */
    data: XOR<ProductOptionUpdateInput, ProductOptionUncheckedUpdateInput>
    /**
     * Choose, which ProductOption to update.
     */
    where: ProductOptionWhereUniqueInput
  }

  /**
   * ProductOption updateMany
   */
  export type ProductOptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductOptions.
     */
    data: XOR<ProductOptionUpdateManyMutationInput, ProductOptionUncheckedUpdateManyInput>
    /**
     * Filter which ProductOptions to update
     */
    where?: ProductOptionWhereInput
  }

  /**
   * ProductOption upsert
   */
  export type ProductOptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOption
     */
    select?: ProductOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOptionInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductOption to update in case it exists.
     */
    where: ProductOptionWhereUniqueInput
    /**
     * In case the ProductOption found by the `where` argument doesn't exist, create a new ProductOption with this data.
     */
    create: XOR<ProductOptionCreateInput, ProductOptionUncheckedCreateInput>
    /**
     * In case the ProductOption was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductOptionUpdateInput, ProductOptionUncheckedUpdateInput>
  }

  /**
   * ProductOption delete
   */
  export type ProductOptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOption
     */
    select?: ProductOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOptionInclude<ExtArgs> | null
    /**
     * Filter which ProductOption to delete.
     */
    where: ProductOptionWhereUniqueInput
  }

  /**
   * ProductOption deleteMany
   */
  export type ProductOptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductOptions to delete
     */
    where?: ProductOptionWhereInput
  }

  /**
   * ProductOption.cartItems
   */
  export type ProductOption$cartItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    where?: CartItemWhereInput
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    cursor?: CartItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * ProductOption without action
   */
  export type ProductOptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductOption
     */
    select?: ProductOptionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductOptionInclude<ExtArgs> | null
  }


  /**
   * Model CartItem
   */

  export type AggregateCartItem = {
    _count: CartItemCountAggregateOutputType | null
    _avg: CartItemAvgAggregateOutputType | null
    _sum: CartItemSumAggregateOutputType | null
    _min: CartItemMinAggregateOutputType | null
    _max: CartItemMaxAggregateOutputType | null
  }

  export type CartItemAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    productId: number | null
    productOptionId: number | null
    quantity: number | null
  }

  export type CartItemSumAggregateOutputType = {
    id: number | null
    userId: number | null
    productId: number | null
    productOptionId: number | null
    quantity: number | null
  }

  export type CartItemMinAggregateOutputType = {
    id: number | null
    userId: number | null
    productId: number | null
    productOptionId: number | null
    quantity: number | null
    createdAt: Date | null
  }

  export type CartItemMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    productId: number | null
    productOptionId: number | null
    quantity: number | null
    createdAt: Date | null
  }

  export type CartItemCountAggregateOutputType = {
    id: number
    userId: number
    productId: number
    productOptionId: number
    quantity: number
    createdAt: number
    _all: number
  }


  export type CartItemAvgAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    productOptionId?: true
    quantity?: true
  }

  export type CartItemSumAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    productOptionId?: true
    quantity?: true
  }

  export type CartItemMinAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    productOptionId?: true
    quantity?: true
    createdAt?: true
  }

  export type CartItemMaxAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    productOptionId?: true
    quantity?: true
    createdAt?: true
  }

  export type CartItemCountAggregateInputType = {
    id?: true
    userId?: true
    productId?: true
    productOptionId?: true
    quantity?: true
    createdAt?: true
    _all?: true
  }

  export type CartItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CartItem to aggregate.
     */
    where?: CartItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartItems to fetch.
     */
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CartItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CartItems
    **/
    _count?: true | CartItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CartItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CartItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CartItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CartItemMaxAggregateInputType
  }

  export type GetCartItemAggregateType<T extends CartItemAggregateArgs> = {
        [P in keyof T & keyof AggregateCartItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCartItem[P]>
      : GetScalarType<T[P], AggregateCartItem[P]>
  }




  export type CartItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CartItemWhereInput
    orderBy?: CartItemOrderByWithAggregationInput | CartItemOrderByWithAggregationInput[]
    by: CartItemScalarFieldEnum[] | CartItemScalarFieldEnum
    having?: CartItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CartItemCountAggregateInputType | true
    _avg?: CartItemAvgAggregateInputType
    _sum?: CartItemSumAggregateInputType
    _min?: CartItemMinAggregateInputType
    _max?: CartItemMaxAggregateInputType
  }

  export type CartItemGroupByOutputType = {
    id: number
    userId: number
    productId: number
    productOptionId: number
    quantity: number
    createdAt: Date
    _count: CartItemCountAggregateOutputType | null
    _avg: CartItemAvgAggregateOutputType | null
    _sum: CartItemSumAggregateOutputType | null
    _min: CartItemMinAggregateOutputType | null
    _max: CartItemMaxAggregateOutputType | null
  }

  type GetCartItemGroupByPayload<T extends CartItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CartItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CartItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CartItemGroupByOutputType[P]>
            : GetScalarType<T[P], CartItemGroupByOutputType[P]>
        }
      >
    >


  export type CartItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productId?: boolean
    productOptionId?: boolean
    quantity?: boolean
    createdAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    option?: boolean | ProductOptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cartItem"]>

  export type CartItemSelectScalar = {
    id?: boolean
    userId?: boolean
    productId?: boolean
    productOptionId?: boolean
    quantity?: boolean
    createdAt?: boolean
  }


  export type CartItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    option?: boolean | ProductOptionDefaultArgs<ExtArgs>
  }


  export type $CartItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CartItem"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      option: Prisma.$ProductOptionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      productId: number
      productOptionId: number
      quantity: number
      createdAt: Date
    }, ExtArgs["result"]["cartItem"]>
    composites: {}
  }


  type CartItemGetPayload<S extends boolean | null | undefined | CartItemDefaultArgs> = $Result.GetResult<Prisma.$CartItemPayload, S>

  type CartItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CartItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CartItemCountAggregateInputType | true
    }

  export interface CartItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CartItem'], meta: { name: 'CartItem' } }
    /**
     * Find zero or one CartItem that matches the filter.
     * @param {CartItemFindUniqueArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CartItemFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, CartItemFindUniqueArgs<ExtArgs>>
    ): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one CartItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CartItemFindUniqueOrThrowArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CartItemFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CartItemFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first CartItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemFindFirstArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CartItemFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, CartItemFindFirstArgs<ExtArgs>>
    ): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first CartItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemFindFirstOrThrowArgs} args - Arguments to find a CartItem
     * @example
     * // Get one CartItem
     * const cartItem = await prisma.cartItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CartItemFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CartItemFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more CartItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CartItems
     * const cartItems = await prisma.cartItem.findMany()
     * 
     * // Get first 10 CartItems
     * const cartItems = await prisma.cartItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cartItemWithIdOnly = await prisma.cartItem.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CartItemFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CartItemFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a CartItem.
     * @param {CartItemCreateArgs} args - Arguments to create a CartItem.
     * @example
     * // Create one CartItem
     * const CartItem = await prisma.cartItem.create({
     *   data: {
     *     // ... data to create a CartItem
     *   }
     * })
     * 
    **/
    create<T extends CartItemCreateArgs<ExtArgs>>(
      args: SelectSubset<T, CartItemCreateArgs<ExtArgs>>
    ): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many CartItems.
     * @param {CartItemCreateManyArgs} args - Arguments to create many CartItems.
     * @example
     * // Create many CartItems
     * const cartItem = await prisma.cartItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends CartItemCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CartItemCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CartItems and returns the data saved in the database.
     * @param {CartItemCreateManyAndReturnArgs} args - Arguments to create many CartItems.
     * @example
     * // Create many CartItems
     * const cartItem = await prisma.cartItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CartItems and only return the `id`
     * const cartItemWithIdOnly = await prisma.cartItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends CartItemCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, CartItemCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a CartItem.
     * @param {CartItemDeleteArgs} args - Arguments to delete one CartItem.
     * @example
     * // Delete one CartItem
     * const CartItem = await prisma.cartItem.delete({
     *   where: {
     *     // ... filter to delete one CartItem
     *   }
     * })
     * 
    **/
    delete<T extends CartItemDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, CartItemDeleteArgs<ExtArgs>>
    ): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one CartItem.
     * @param {CartItemUpdateArgs} args - Arguments to update one CartItem.
     * @example
     * // Update one CartItem
     * const cartItem = await prisma.cartItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CartItemUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, CartItemUpdateArgs<ExtArgs>>
    ): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more CartItems.
     * @param {CartItemDeleteManyArgs} args - Arguments to filter CartItems to delete.
     * @example
     * // Delete a few CartItems
     * const { count } = await prisma.cartItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CartItemDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CartItemDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CartItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CartItems
     * const cartItem = await prisma.cartItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CartItemUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, CartItemUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CartItem.
     * @param {CartItemUpsertArgs} args - Arguments to update or create a CartItem.
     * @example
     * // Update or create a CartItem
     * const cartItem = await prisma.cartItem.upsert({
     *   create: {
     *     // ... data to create a CartItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CartItem we want to update
     *   }
     * })
    **/
    upsert<T extends CartItemUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, CartItemUpsertArgs<ExtArgs>>
    ): Prisma__CartItemClient<$Result.GetResult<Prisma.$CartItemPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of CartItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemCountArgs} args - Arguments to filter CartItems to count.
     * @example
     * // Count the number of CartItems
     * const count = await prisma.cartItem.count({
     *   where: {
     *     // ... the filter for the CartItems we want to count
     *   }
     * })
    **/
    count<T extends CartItemCountArgs>(
      args?: Subset<T, CartItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CartItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CartItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CartItemAggregateArgs>(args: Subset<T, CartItemAggregateArgs>): Prisma.PrismaPromise<GetCartItemAggregateType<T>>

    /**
     * Group by CartItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CartItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CartItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CartItemGroupByArgs['orderBy'] }
        : { orderBy?: CartItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CartItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCartItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CartItem model
   */
  readonly fields: CartItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CartItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CartItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    option<T extends ProductOptionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductOptionDefaultArgs<ExtArgs>>): Prisma__ProductOptionClient<$Result.GetResult<Prisma.$ProductOptionPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the CartItem model
   */ 
  interface CartItemFieldRefs {
    readonly id: FieldRef<"CartItem", 'Int'>
    readonly userId: FieldRef<"CartItem", 'Int'>
    readonly productId: FieldRef<"CartItem", 'Int'>
    readonly productOptionId: FieldRef<"CartItem", 'Int'>
    readonly quantity: FieldRef<"CartItem", 'Int'>
    readonly createdAt: FieldRef<"CartItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CartItem findUnique
   */
  export type CartItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItem to fetch.
     */
    where: CartItemWhereUniqueInput
  }

  /**
   * CartItem findUniqueOrThrow
   */
  export type CartItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItem to fetch.
     */
    where: CartItemWhereUniqueInput
  }

  /**
   * CartItem findFirst
   */
  export type CartItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItem to fetch.
     */
    where?: CartItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartItems to fetch.
     */
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CartItems.
     */
    cursor?: CartItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartItems.
     */
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * CartItem findFirstOrThrow
   */
  export type CartItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItem to fetch.
     */
    where?: CartItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartItems to fetch.
     */
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CartItems.
     */
    cursor?: CartItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CartItems.
     */
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * CartItem findMany
   */
  export type CartItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter, which CartItems to fetch.
     */
    where?: CartItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CartItems to fetch.
     */
    orderBy?: CartItemOrderByWithRelationInput | CartItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CartItems.
     */
    cursor?: CartItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CartItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CartItems.
     */
    skip?: number
    distinct?: CartItemScalarFieldEnum | CartItemScalarFieldEnum[]
  }

  /**
   * CartItem create
   */
  export type CartItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * The data needed to create a CartItem.
     */
    data: XOR<CartItemCreateInput, CartItemUncheckedCreateInput>
  }

  /**
   * CartItem createMany
   */
  export type CartItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CartItems.
     */
    data: CartItemCreateManyInput | CartItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CartItem createManyAndReturn
   */
  export type CartItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * The data used to create many CartItems.
     */
    data: CartItemCreateManyInput | CartItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CartItem update
   */
  export type CartItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * The data needed to update a CartItem.
     */
    data: XOR<CartItemUpdateInput, CartItemUncheckedUpdateInput>
    /**
     * Choose, which CartItem to update.
     */
    where: CartItemWhereUniqueInput
  }

  /**
   * CartItem updateMany
   */
  export type CartItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CartItems.
     */
    data: XOR<CartItemUpdateManyMutationInput, CartItemUncheckedUpdateManyInput>
    /**
     * Filter which CartItems to update
     */
    where?: CartItemWhereInput
  }

  /**
   * CartItem upsert
   */
  export type CartItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * The filter to search for the CartItem to update in case it exists.
     */
    where: CartItemWhereUniqueInput
    /**
     * In case the CartItem found by the `where` argument doesn't exist, create a new CartItem with this data.
     */
    create: XOR<CartItemCreateInput, CartItemUncheckedCreateInput>
    /**
     * In case the CartItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CartItemUpdateInput, CartItemUncheckedUpdateInput>
  }

  /**
   * CartItem delete
   */
  export type CartItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
    /**
     * Filter which CartItem to delete.
     */
    where: CartItemWhereUniqueInput
  }

  /**
   * CartItem deleteMany
   */
  export type CartItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CartItems to delete
     */
    where?: CartItemWhereInput
  }

  /**
   * CartItem without action
   */
  export type CartItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CartItem
     */
    select?: CartItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CartItemInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    id: number | null
    total: number | null
    userId: number | null
  }

  export type OrderSumAggregateOutputType = {
    id: number | null
    total: number | null
    userId: number | null
  }

  export type OrderMinAggregateOutputType = {
    id: number | null
    orderNumber: string | null
    createdAt: Date | null
    total: number | null
    status: $Enums.OrderStatus | null
    userId: number | null
  }

  export type OrderMaxAggregateOutputType = {
    id: number | null
    orderNumber: string | null
    createdAt: Date | null
    total: number | null
    status: $Enums.OrderStatus | null
    userId: number | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    orderNumber: number
    createdAt: number
    total: number
    status: number
    userId: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    id?: true
    total?: true
    userId?: true
  }

  export type OrderSumAggregateInputType = {
    id?: true
    total?: true
    userId?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    orderNumber?: true
    createdAt?: true
    total?: true
    status?: true
    userId?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    orderNumber?: true
    createdAt?: true
    total?: true
    status?: true
    userId?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    orderNumber?: true
    createdAt?: true
    total?: true
    status?: true
    userId?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: number
    orderNumber: string
    createdAt: Date
    total: number
    status: $Enums.OrderStatus
    userId: number
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderNumber?: boolean
    createdAt?: boolean
    total?: boolean
    status?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    orderNumber?: boolean
    createdAt?: boolean
    total?: boolean
    status?: boolean
    userId?: boolean
  }


  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    items?: boolean | Order$itemsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      items: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderNumber: string
      createdAt: Date
      total: number
      status: $Enums.OrderStatus
      userId: number
    }, ExtArgs["result"]["order"]>
    composites: {}
  }


  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends OrderFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends OrderFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends OrderFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
    **/
    create<T extends OrderCreateArgs<ExtArgs>>(
      args: SelectSubset<T, OrderCreateArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends OrderCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
    **/
    delete<T extends OrderDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends OrderUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends OrderDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends OrderUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
    **/
    upsert<T extends OrderUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>
    ): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Order model
   */ 
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'Int'>
    readonly orderNumber: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly total: FieldRef<"Order", 'Int'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly userId: FieldRef<"Order", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    id: number | null
    orderId: number | null
    productId: number | null
    unitPrice: number | null
    quantity: number | null
    totalPrice: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    id: number | null
    orderId: number | null
    productId: number | null
    unitPrice: number | null
    quantity: number | null
    totalPrice: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: number | null
    orderId: number | null
    productId: number | null
    productName: string | null
    productImage: string | null
    optionText: string | null
    unitPrice: number | null
    quantity: number | null
    totalPrice: number | null
    createdAt: Date | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: number | null
    orderId: number | null
    productId: number | null
    productName: string | null
    productImage: string | null
    optionText: string | null
    unitPrice: number | null
    quantity: number | null
    totalPrice: number | null
    createdAt: Date | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    productId: number
    productName: number
    productImage: number
    optionText: number
    unitPrice: number
    quantity: number
    totalPrice: number
    createdAt: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    unitPrice?: true
    quantity?: true
    totalPrice?: true
  }

  export type OrderItemSumAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    unitPrice?: true
    quantity?: true
    totalPrice?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    productName?: true
    productImage?: true
    optionText?: true
    unitPrice?: true
    quantity?: true
    totalPrice?: true
    createdAt?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    productName?: true
    productImage?: true
    optionText?: true
    unitPrice?: true
    quantity?: true
    totalPrice?: true
    createdAt?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    productName?: true
    productImage?: true
    optionText?: true
    unitPrice?: true
    quantity?: true
    totalPrice?: true
    createdAt?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: number
    orderId: number
    productId: number
    productName: string
    productImage: string | null
    optionText: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    createdAt: Date
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    productName?: boolean
    productImage?: boolean
    optionText?: boolean
    unitPrice?: boolean
    quantity?: boolean
    totalPrice?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    reviews?: boolean | OrderItem$reviewsArgs<ExtArgs>
    claims?: boolean | OrderItem$claimsArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    _count?: boolean | OrderItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    productId?: boolean
    productName?: boolean
    productImage?: boolean
    optionText?: boolean
    unitPrice?: boolean
    quantity?: boolean
    totalPrice?: boolean
    createdAt?: boolean
  }


  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    reviews?: boolean | OrderItem$reviewsArgs<ExtArgs>
    claims?: boolean | OrderItem$claimsArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
    _count?: boolean | OrderItemCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      claims: Prisma.$ClaimPayload<ExtArgs>[]
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderId: number
      productId: number
      productName: string
      productImage: string | null
      optionText: string | null
      unitPrice: number
      quantity: number
      totalPrice: number
      createdAt: Date
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }


  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends OrderItemFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>
    ): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends OrderItemFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>
    ): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends OrderItemFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
    **/
    create<T extends OrderItemCreateArgs<ExtArgs>>(
      args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>
    ): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends OrderItemCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
    **/
    delete<T extends OrderItemDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>
    ): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends OrderItemUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>
    ): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends OrderItemDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends OrderItemUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
    **/
    upsert<T extends OrderItemUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>
    ): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    reviews<T extends OrderItem$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, OrderItem$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'findMany'> | Null>;

    claims<T extends OrderItem$claimsArgs<ExtArgs> = {}>(args?: Subset<T, OrderItem$claimsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'findMany'> | Null>;

    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the OrderItem model
   */ 
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'Int'>
    readonly orderId: FieldRef<"OrderItem", 'Int'>
    readonly productId: FieldRef<"OrderItem", 'Int'>
    readonly productName: FieldRef<"OrderItem", 'String'>
    readonly productImage: FieldRef<"OrderItem", 'String'>
    readonly optionText: FieldRef<"OrderItem", 'String'>
    readonly unitPrice: FieldRef<"OrderItem", 'Int'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly totalPrice: FieldRef<"OrderItem", 'Int'>
    readonly createdAt: FieldRef<"OrderItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
  }

  /**
   * OrderItem.reviews
   */
  export type OrderItem$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * OrderItem.claims
   */
  export type OrderItem$claimsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    where?: ClaimWhereInput
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    cursor?: ClaimWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model Claim
   */

  export type AggregateClaim = {
    _count: ClaimCountAggregateOutputType | null
    _avg: ClaimAvgAggregateOutputType | null
    _sum: ClaimSumAggregateOutputType | null
    _min: ClaimMinAggregateOutputType | null
    _max: ClaimMaxAggregateOutputType | null
  }

  export type ClaimAvgAggregateOutputType = {
    id: number | null
    orderItemId: number | null
  }

  export type ClaimSumAggregateOutputType = {
    id: number | null
    orderItemId: number | null
  }

  export type ClaimMinAggregateOutputType = {
    id: number | null
    claimNumber: string | null
    claimType: $Enums.ClaimType | null
    status: $Enums.ClaimStatus | null
    requestedAt: Date | null
    detail: string | null
    orderItemId: number | null
    reason: string | null
    processedAt: Date | null
  }

  export type ClaimMaxAggregateOutputType = {
    id: number | null
    claimNumber: string | null
    claimType: $Enums.ClaimType | null
    status: $Enums.ClaimStatus | null
    requestedAt: Date | null
    detail: string | null
    orderItemId: number | null
    reason: string | null
    processedAt: Date | null
  }

  export type ClaimCountAggregateOutputType = {
    id: number
    claimNumber: number
    claimType: number
    status: number
    requestedAt: number
    detail: number
    orderItemId: number
    reason: number
    processedAt: number
    _all: number
  }


  export type ClaimAvgAggregateInputType = {
    id?: true
    orderItemId?: true
  }

  export type ClaimSumAggregateInputType = {
    id?: true
    orderItemId?: true
  }

  export type ClaimMinAggregateInputType = {
    id?: true
    claimNumber?: true
    claimType?: true
    status?: true
    requestedAt?: true
    detail?: true
    orderItemId?: true
    reason?: true
    processedAt?: true
  }

  export type ClaimMaxAggregateInputType = {
    id?: true
    claimNumber?: true
    claimType?: true
    status?: true
    requestedAt?: true
    detail?: true
    orderItemId?: true
    reason?: true
    processedAt?: true
  }

  export type ClaimCountAggregateInputType = {
    id?: true
    claimNumber?: true
    claimType?: true
    status?: true
    requestedAt?: true
    detail?: true
    orderItemId?: true
    reason?: true
    processedAt?: true
    _all?: true
  }

  export type ClaimAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Claim to aggregate.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Claims
    **/
    _count?: true | ClaimCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClaimAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClaimSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClaimMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClaimMaxAggregateInputType
  }

  export type GetClaimAggregateType<T extends ClaimAggregateArgs> = {
        [P in keyof T & keyof AggregateClaim]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClaim[P]>
      : GetScalarType<T[P], AggregateClaim[P]>
  }




  export type ClaimGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClaimWhereInput
    orderBy?: ClaimOrderByWithAggregationInput | ClaimOrderByWithAggregationInput[]
    by: ClaimScalarFieldEnum[] | ClaimScalarFieldEnum
    having?: ClaimScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClaimCountAggregateInputType | true
    _avg?: ClaimAvgAggregateInputType
    _sum?: ClaimSumAggregateInputType
    _min?: ClaimMinAggregateInputType
    _max?: ClaimMaxAggregateInputType
  }

  export type ClaimGroupByOutputType = {
    id: number
    claimNumber: string
    claimType: $Enums.ClaimType
    status: $Enums.ClaimStatus
    requestedAt: Date
    detail: string
    orderItemId: number | null
    reason: string | null
    processedAt: Date | null
    _count: ClaimCountAggregateOutputType | null
    _avg: ClaimAvgAggregateOutputType | null
    _sum: ClaimSumAggregateOutputType | null
    _min: ClaimMinAggregateOutputType | null
    _max: ClaimMaxAggregateOutputType | null
  }

  type GetClaimGroupByPayload<T extends ClaimGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClaimGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClaimGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClaimGroupByOutputType[P]>
            : GetScalarType<T[P], ClaimGroupByOutputType[P]>
        }
      >
    >


  export type ClaimSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    claimNumber?: boolean
    claimType?: boolean
    status?: boolean
    requestedAt?: boolean
    detail?: boolean
    orderItemId?: boolean
    reason?: boolean
    processedAt?: boolean
    orderItem?: boolean | Claim$orderItemArgs<ExtArgs>
  }, ExtArgs["result"]["claim"]>

  export type ClaimSelectScalar = {
    id?: boolean
    claimNumber?: boolean
    claimType?: boolean
    status?: boolean
    requestedAt?: boolean
    detail?: boolean
    orderItemId?: boolean
    reason?: boolean
    processedAt?: boolean
  }


  export type ClaimInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderItem?: boolean | Claim$orderItemArgs<ExtArgs>
  }


  export type $ClaimPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Claim"
    objects: {
      orderItem: Prisma.$OrderItemPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      claimNumber: string
      claimType: $Enums.ClaimType
      status: $Enums.ClaimStatus
      requestedAt: Date
      detail: string
      orderItemId: number | null
      reason: string | null
      processedAt: Date | null
    }, ExtArgs["result"]["claim"]>
    composites: {}
  }


  type ClaimGetPayload<S extends boolean | null | undefined | ClaimDefaultArgs> = $Result.GetResult<Prisma.$ClaimPayload, S>

  type ClaimCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClaimFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClaimCountAggregateInputType | true
    }

  export interface ClaimDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Claim'], meta: { name: 'Claim' } }
    /**
     * Find zero or one Claim that matches the filter.
     * @param {ClaimFindUniqueArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ClaimFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ClaimFindUniqueArgs<ExtArgs>>
    ): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Claim that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClaimFindUniqueOrThrowArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ClaimFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ClaimFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Claim that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimFindFirstArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ClaimFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ClaimFindFirstArgs<ExtArgs>>
    ): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Claim that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimFindFirstOrThrowArgs} args - Arguments to find a Claim
     * @example
     * // Get one Claim
     * const claim = await prisma.claim.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ClaimFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ClaimFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Claims that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Claims
     * const claims = await prisma.claim.findMany()
     * 
     * // Get first 10 Claims
     * const claims = await prisma.claim.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const claimWithIdOnly = await prisma.claim.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ClaimFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ClaimFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Claim.
     * @param {ClaimCreateArgs} args - Arguments to create a Claim.
     * @example
     * // Create one Claim
     * const Claim = await prisma.claim.create({
     *   data: {
     *     // ... data to create a Claim
     *   }
     * })
     * 
    **/
    create<T extends ClaimCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ClaimCreateArgs<ExtArgs>>
    ): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Claims.
     * @param {ClaimCreateManyArgs} args - Arguments to create many Claims.
     * @example
     * // Create many Claims
     * const claim = await prisma.claim.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends ClaimCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ClaimCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Claims and returns the data saved in the database.
     * @param {ClaimCreateManyAndReturnArgs} args - Arguments to create many Claims.
     * @example
     * // Create many Claims
     * const claim = await prisma.claim.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Claims and only return the `id`
     * const claimWithIdOnly = await prisma.claim.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends ClaimCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, ClaimCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a Claim.
     * @param {ClaimDeleteArgs} args - Arguments to delete one Claim.
     * @example
     * // Delete one Claim
     * const Claim = await prisma.claim.delete({
     *   where: {
     *     // ... filter to delete one Claim
     *   }
     * })
     * 
    **/
    delete<T extends ClaimDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ClaimDeleteArgs<ExtArgs>>
    ): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Claim.
     * @param {ClaimUpdateArgs} args - Arguments to update one Claim.
     * @example
     * // Update one Claim
     * const claim = await prisma.claim.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ClaimUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ClaimUpdateArgs<ExtArgs>>
    ): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Claims.
     * @param {ClaimDeleteManyArgs} args - Arguments to filter Claims to delete.
     * @example
     * // Delete a few Claims
     * const { count } = await prisma.claim.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ClaimDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ClaimDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Claims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Claims
     * const claim = await prisma.claim.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ClaimUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ClaimUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Claim.
     * @param {ClaimUpsertArgs} args - Arguments to update or create a Claim.
     * @example
     * // Update or create a Claim
     * const claim = await prisma.claim.upsert({
     *   create: {
     *     // ... data to create a Claim
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Claim we want to update
     *   }
     * })
    **/
    upsert<T extends ClaimUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ClaimUpsertArgs<ExtArgs>>
    ): Prisma__ClaimClient<$Result.GetResult<Prisma.$ClaimPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Claims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimCountArgs} args - Arguments to filter Claims to count.
     * @example
     * // Count the number of Claims
     * const count = await prisma.claim.count({
     *   where: {
     *     // ... the filter for the Claims we want to count
     *   }
     * })
    **/
    count<T extends ClaimCountArgs>(
      args?: Subset<T, ClaimCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClaimCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Claim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClaimAggregateArgs>(args: Subset<T, ClaimAggregateArgs>): Prisma.PrismaPromise<GetClaimAggregateType<T>>

    /**
     * Group by Claim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClaimGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClaimGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClaimGroupByArgs['orderBy'] }
        : { orderBy?: ClaimGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClaimGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClaimGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Claim model
   */
  readonly fields: ClaimFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Claim.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClaimClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    orderItem<T extends Claim$orderItemArgs<ExtArgs> = {}>(args?: Subset<T, Claim$orderItemArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Claim model
   */ 
  interface ClaimFieldRefs {
    readonly id: FieldRef<"Claim", 'Int'>
    readonly claimNumber: FieldRef<"Claim", 'String'>
    readonly claimType: FieldRef<"Claim", 'ClaimType'>
    readonly status: FieldRef<"Claim", 'ClaimStatus'>
    readonly requestedAt: FieldRef<"Claim", 'DateTime'>
    readonly detail: FieldRef<"Claim", 'String'>
    readonly orderItemId: FieldRef<"Claim", 'Int'>
    readonly reason: FieldRef<"Claim", 'String'>
    readonly processedAt: FieldRef<"Claim", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Claim findUnique
   */
  export type ClaimFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where: ClaimWhereUniqueInput
  }

  /**
   * Claim findUniqueOrThrow
   */
  export type ClaimFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where: ClaimWhereUniqueInput
  }

  /**
   * Claim findFirst
   */
  export type ClaimFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Claims.
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Claims.
     */
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * Claim findFirstOrThrow
   */
  export type ClaimFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claim to fetch.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Claims.
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Claims.
     */
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * Claim findMany
   */
  export type ClaimFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter, which Claims to fetch.
     */
    where?: ClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Claims to fetch.
     */
    orderBy?: ClaimOrderByWithRelationInput | ClaimOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Claims.
     */
    cursor?: ClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Claims from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Claims.
     */
    skip?: number
    distinct?: ClaimScalarFieldEnum | ClaimScalarFieldEnum[]
  }

  /**
   * Claim create
   */
  export type ClaimCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * The data needed to create a Claim.
     */
    data: XOR<ClaimCreateInput, ClaimUncheckedCreateInput>
  }

  /**
   * Claim createMany
   */
  export type ClaimCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Claims.
     */
    data: ClaimCreateManyInput | ClaimCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Claim createManyAndReturn
   */
  export type ClaimCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * The data used to create many Claims.
     */
    data: ClaimCreateManyInput | ClaimCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Claim update
   */
  export type ClaimUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * The data needed to update a Claim.
     */
    data: XOR<ClaimUpdateInput, ClaimUncheckedUpdateInput>
    /**
     * Choose, which Claim to update.
     */
    where: ClaimWhereUniqueInput
  }

  /**
   * Claim updateMany
   */
  export type ClaimUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Claims.
     */
    data: XOR<ClaimUpdateManyMutationInput, ClaimUncheckedUpdateManyInput>
    /**
     * Filter which Claims to update
     */
    where?: ClaimWhereInput
  }

  /**
   * Claim upsert
   */
  export type ClaimUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * The filter to search for the Claim to update in case it exists.
     */
    where: ClaimWhereUniqueInput
    /**
     * In case the Claim found by the `where` argument doesn't exist, create a new Claim with this data.
     */
    create: XOR<ClaimCreateInput, ClaimUncheckedCreateInput>
    /**
     * In case the Claim was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClaimUpdateInput, ClaimUncheckedUpdateInput>
  }

  /**
   * Claim delete
   */
  export type ClaimDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
    /**
     * Filter which Claim to delete.
     */
    where: ClaimWhereUniqueInput
  }

  /**
   * Claim deleteMany
   */
  export type ClaimDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Claims to delete
     */
    where?: ClaimWhereInput
  }

  /**
   * Claim.orderItem
   */
  export type Claim$orderItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
  }

  /**
   * Claim without action
   */
  export type ClaimDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Claim
     */
    select?: ClaimSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClaimInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    id: number | null
    orderItemId: number | null
    userId: number | null
    rating: number | null
  }

  export type ReviewSumAggregateOutputType = {
    id: number | null
    orderItemId: number | null
    userId: number | null
    rating: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: number | null
    orderItemId: number | null
    userId: number | null
    rating: number | null
    content: string | null
    createdAt: Date | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: number | null
    orderItemId: number | null
    userId: number | null
    rating: number | null
    content: string | null
    createdAt: Date | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    orderItemId: number
    userId: number
    rating: number
    content: number
    createdAt: number
    images: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    id?: true
    orderItemId?: true
    userId?: true
    rating?: true
  }

  export type ReviewSumAggregateInputType = {
    id?: true
    orderItemId?: true
    userId?: true
    rating?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    orderItemId?: true
    userId?: true
    rating?: true
    content?: true
    createdAt?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    orderItemId?: true
    userId?: true
    rating?: true
    content?: true
    createdAt?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    orderItemId?: true
    userId?: true
    rating?: true
    content?: true
    createdAt?: true
    images?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: number
    orderItemId: number
    userId: number
    rating: number
    content: string
    createdAt: Date
    images: string[]
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderItemId?: boolean
    userId?: boolean
    rating?: boolean
    content?: boolean
    createdAt?: boolean
    images?: boolean
    orderItem?: boolean | OrderItemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    reply?: boolean | Review$replyArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>

  export type ReviewSelectScalar = {
    id?: boolean
    orderItemId?: boolean
    userId?: boolean
    rating?: boolean
    content?: boolean
    createdAt?: boolean
    images?: boolean
  }


  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderItem?: boolean | OrderItemDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    reply?: boolean | Review$replyArgs<ExtArgs>
  }


  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      orderItem: Prisma.$OrderItemPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      reply: Prisma.$ReviewReplyPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderItemId: number
      userId: number
      rating: number
      content: string
      createdAt: Date
      images: string[]
    }, ExtArgs["result"]["review"]>
    composites: {}
  }


  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ReviewFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>
    ): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ReviewFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>
    ): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ReviewFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
    **/
    create<T extends ReviewCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>
    ): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends ReviewCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reviews and returns the data saved in the database.
     * @param {ReviewCreateManyAndReturnArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reviews and only return the `id`
     * const reviewWithIdOnly = await prisma.review.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends ReviewCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
    **/
    delete<T extends ReviewDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>
    ): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ReviewUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>
    ): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ReviewDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ReviewUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
    **/
    upsert<T extends ReviewUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>
    ): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    orderItem<T extends OrderItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderItemDefaultArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    reply<T extends Review$replyArgs<ExtArgs> = {}>(args?: Subset<T, Review$replyArgs<ExtArgs>>): Prisma__ReviewReplyClient<$Result.GetResult<Prisma.$ReviewReplyPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Review model
   */ 
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'Int'>
    readonly orderItemId: FieldRef<"Review", 'Int'>
    readonly userId: FieldRef<"Review", 'Int'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly content: FieldRef<"Review", 'String'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
    readonly images: FieldRef<"Review", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review createManyAndReturn
   */
  export type ReviewCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
  }

  /**
   * Review.reply
   */
  export type Review$replyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewReply
     */
    select?: ReviewReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewReplyInclude<ExtArgs> | null
    where?: ReviewReplyWhereInput
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model ReviewReply
   */

  export type AggregateReviewReply = {
    _count: ReviewReplyCountAggregateOutputType | null
    _avg: ReviewReplyAvgAggregateOutputType | null
    _sum: ReviewReplySumAggregateOutputType | null
    _min: ReviewReplyMinAggregateOutputType | null
    _max: ReviewReplyMaxAggregateOutputType | null
  }

  export type ReviewReplyAvgAggregateOutputType = {
    id: number | null
    reviewId: number | null
    adminId: number | null
  }

  export type ReviewReplySumAggregateOutputType = {
    id: number | null
    reviewId: number | null
    adminId: number | null
  }

  export type ReviewReplyMinAggregateOutputType = {
    id: number | null
    reviewId: number | null
    adminId: number | null
    content: string | null
    createdAt: Date | null
  }

  export type ReviewReplyMaxAggregateOutputType = {
    id: number | null
    reviewId: number | null
    adminId: number | null
    content: string | null
    createdAt: Date | null
  }

  export type ReviewReplyCountAggregateOutputType = {
    id: number
    reviewId: number
    adminId: number
    content: number
    createdAt: number
    _all: number
  }


  export type ReviewReplyAvgAggregateInputType = {
    id?: true
    reviewId?: true
    adminId?: true
  }

  export type ReviewReplySumAggregateInputType = {
    id?: true
    reviewId?: true
    adminId?: true
  }

  export type ReviewReplyMinAggregateInputType = {
    id?: true
    reviewId?: true
    adminId?: true
    content?: true
    createdAt?: true
  }

  export type ReviewReplyMaxAggregateInputType = {
    id?: true
    reviewId?: true
    adminId?: true
    content?: true
    createdAt?: true
  }

  export type ReviewReplyCountAggregateInputType = {
    id?: true
    reviewId?: true
    adminId?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type ReviewReplyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReviewReply to aggregate.
     */
    where?: ReviewReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewReplies to fetch.
     */
    orderBy?: ReviewReplyOrderByWithRelationInput | ReviewReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewReplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReviewReplies
    **/
    _count?: true | ReviewReplyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewReplyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewReplySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewReplyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewReplyMaxAggregateInputType
  }

  export type GetReviewReplyAggregateType<T extends ReviewReplyAggregateArgs> = {
        [P in keyof T & keyof AggregateReviewReply]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReviewReply[P]>
      : GetScalarType<T[P], AggregateReviewReply[P]>
  }




  export type ReviewReplyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewReplyWhereInput
    orderBy?: ReviewReplyOrderByWithAggregationInput | ReviewReplyOrderByWithAggregationInput[]
    by: ReviewReplyScalarFieldEnum[] | ReviewReplyScalarFieldEnum
    having?: ReviewReplyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewReplyCountAggregateInputType | true
    _avg?: ReviewReplyAvgAggregateInputType
    _sum?: ReviewReplySumAggregateInputType
    _min?: ReviewReplyMinAggregateInputType
    _max?: ReviewReplyMaxAggregateInputType
  }

  export type ReviewReplyGroupByOutputType = {
    id: number
    reviewId: number
    adminId: number
    content: string
    createdAt: Date
    _count: ReviewReplyCountAggregateOutputType | null
    _avg: ReviewReplyAvgAggregateOutputType | null
    _sum: ReviewReplySumAggregateOutputType | null
    _min: ReviewReplyMinAggregateOutputType | null
    _max: ReviewReplyMaxAggregateOutputType | null
  }

  type GetReviewReplyGroupByPayload<T extends ReviewReplyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewReplyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewReplyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewReplyGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewReplyGroupByOutputType[P]>
        }
      >
    >


  export type ReviewReplySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reviewId?: boolean
    adminId?: boolean
    content?: boolean
    createdAt?: boolean
    review?: boolean | ReviewDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reviewReply"]>

  export type ReviewReplySelectScalar = {
    id?: boolean
    reviewId?: boolean
    adminId?: boolean
    content?: boolean
    createdAt?: boolean
  }


  export type ReviewReplyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    review?: boolean | ReviewDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $ReviewReplyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReviewReply"
    objects: {
      review: Prisma.$ReviewPayload<ExtArgs>
      admin: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      reviewId: number
      adminId: number
      content: string
      createdAt: Date
    }, ExtArgs["result"]["reviewReply"]>
    composites: {}
  }


  type ReviewReplyGetPayload<S extends boolean | null | undefined | ReviewReplyDefaultArgs> = $Result.GetResult<Prisma.$ReviewReplyPayload, S>

  type ReviewReplyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReviewReplyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReviewReplyCountAggregateInputType | true
    }

  export interface ReviewReplyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReviewReply'], meta: { name: 'ReviewReply' } }
    /**
     * Find zero or one ReviewReply that matches the filter.
     * @param {ReviewReplyFindUniqueArgs} args - Arguments to find a ReviewReply
     * @example
     * // Get one ReviewReply
     * const reviewReply = await prisma.reviewReply.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ReviewReplyFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewReplyFindUniqueArgs<ExtArgs>>
    ): Prisma__ReviewReplyClient<$Result.GetResult<Prisma.$ReviewReplyPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ReviewReply that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReviewReplyFindUniqueOrThrowArgs} args - Arguments to find a ReviewReply
     * @example
     * // Get one ReviewReply
     * const reviewReply = await prisma.reviewReply.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ReviewReplyFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewReplyFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ReviewReplyClient<$Result.GetResult<Prisma.$ReviewReplyPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ReviewReply that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewReplyFindFirstArgs} args - Arguments to find a ReviewReply
     * @example
     * // Get one ReviewReply
     * const reviewReply = await prisma.reviewReply.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ReviewReplyFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewReplyFindFirstArgs<ExtArgs>>
    ): Prisma__ReviewReplyClient<$Result.GetResult<Prisma.$ReviewReplyPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ReviewReply that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewReplyFindFirstOrThrowArgs} args - Arguments to find a ReviewReply
     * @example
     * // Get one ReviewReply
     * const reviewReply = await prisma.reviewReply.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ReviewReplyFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewReplyFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ReviewReplyClient<$Result.GetResult<Prisma.$ReviewReplyPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ReviewReplies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewReplyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReviewReplies
     * const reviewReplies = await prisma.reviewReply.findMany()
     * 
     * // Get first 10 ReviewReplies
     * const reviewReplies = await prisma.reviewReply.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewReplyWithIdOnly = await prisma.reviewReply.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ReviewReplyFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewReplyFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewReplyPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ReviewReply.
     * @param {ReviewReplyCreateArgs} args - Arguments to create a ReviewReply.
     * @example
     * // Create one ReviewReply
     * const ReviewReply = await prisma.reviewReply.create({
     *   data: {
     *     // ... data to create a ReviewReply
     *   }
     * })
     * 
    **/
    create<T extends ReviewReplyCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewReplyCreateArgs<ExtArgs>>
    ): Prisma__ReviewReplyClient<$Result.GetResult<Prisma.$ReviewReplyPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ReviewReplies.
     * @param {ReviewReplyCreateManyArgs} args - Arguments to create many ReviewReplies.
     * @example
     * // Create many ReviewReplies
     * const reviewReply = await prisma.reviewReply.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends ReviewReplyCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewReplyCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReviewReplies and returns the data saved in the database.
     * @param {ReviewReplyCreateManyAndReturnArgs} args - Arguments to create many ReviewReplies.
     * @example
     * // Create many ReviewReplies
     * const reviewReply = await prisma.reviewReply.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReviewReplies and only return the `id`
     * const reviewReplyWithIdOnly = await prisma.reviewReply.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends ReviewReplyCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewReplyCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewReplyPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a ReviewReply.
     * @param {ReviewReplyDeleteArgs} args - Arguments to delete one ReviewReply.
     * @example
     * // Delete one ReviewReply
     * const ReviewReply = await prisma.reviewReply.delete({
     *   where: {
     *     // ... filter to delete one ReviewReply
     *   }
     * })
     * 
    **/
    delete<T extends ReviewReplyDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewReplyDeleteArgs<ExtArgs>>
    ): Prisma__ReviewReplyClient<$Result.GetResult<Prisma.$ReviewReplyPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ReviewReply.
     * @param {ReviewReplyUpdateArgs} args - Arguments to update one ReviewReply.
     * @example
     * // Update one ReviewReply
     * const reviewReply = await prisma.reviewReply.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ReviewReplyUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewReplyUpdateArgs<ExtArgs>>
    ): Prisma__ReviewReplyClient<$Result.GetResult<Prisma.$ReviewReplyPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ReviewReplies.
     * @param {ReviewReplyDeleteManyArgs} args - Arguments to filter ReviewReplies to delete.
     * @example
     * // Delete a few ReviewReplies
     * const { count } = await prisma.reviewReply.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ReviewReplyDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReviewReplyDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReviewReplies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewReplyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReviewReplies
     * const reviewReply = await prisma.reviewReply.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ReviewReplyUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewReplyUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ReviewReply.
     * @param {ReviewReplyUpsertArgs} args - Arguments to update or create a ReviewReply.
     * @example
     * // Update or create a ReviewReply
     * const reviewReply = await prisma.reviewReply.upsert({
     *   create: {
     *     // ... data to create a ReviewReply
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReviewReply we want to update
     *   }
     * })
    **/
    upsert<T extends ReviewReplyUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ReviewReplyUpsertArgs<ExtArgs>>
    ): Prisma__ReviewReplyClient<$Result.GetResult<Prisma.$ReviewReplyPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ReviewReplies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewReplyCountArgs} args - Arguments to filter ReviewReplies to count.
     * @example
     * // Count the number of ReviewReplies
     * const count = await prisma.reviewReply.count({
     *   where: {
     *     // ... the filter for the ReviewReplies we want to count
     *   }
     * })
    **/
    count<T extends ReviewReplyCountArgs>(
      args?: Subset<T, ReviewReplyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewReplyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReviewReply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewReplyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewReplyAggregateArgs>(args: Subset<T, ReviewReplyAggregateArgs>): Prisma.PrismaPromise<GetReviewReplyAggregateType<T>>

    /**
     * Group by ReviewReply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewReplyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewReplyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewReplyGroupByArgs['orderBy'] }
        : { orderBy?: ReviewReplyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewReplyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewReplyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReviewReply model
   */
  readonly fields: ReviewReplyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReviewReply.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewReplyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    review<T extends ReviewDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReviewDefaultArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    admin<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ReviewReply model
   */ 
  interface ReviewReplyFieldRefs {
    readonly id: FieldRef<"ReviewReply", 'Int'>
    readonly reviewId: FieldRef<"ReviewReply", 'Int'>
    readonly adminId: FieldRef<"ReviewReply", 'Int'>
    readonly content: FieldRef<"ReviewReply", 'String'>
    readonly createdAt: FieldRef<"ReviewReply", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReviewReply findUnique
   */
  export type ReviewReplyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewReply
     */
    select?: ReviewReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewReplyInclude<ExtArgs> | null
    /**
     * Filter, which ReviewReply to fetch.
     */
    where: ReviewReplyWhereUniqueInput
  }

  /**
   * ReviewReply findUniqueOrThrow
   */
  export type ReviewReplyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewReply
     */
    select?: ReviewReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewReplyInclude<ExtArgs> | null
    /**
     * Filter, which ReviewReply to fetch.
     */
    where: ReviewReplyWhereUniqueInput
  }

  /**
   * ReviewReply findFirst
   */
  export type ReviewReplyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewReply
     */
    select?: ReviewReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewReplyInclude<ExtArgs> | null
    /**
     * Filter, which ReviewReply to fetch.
     */
    where?: ReviewReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewReplies to fetch.
     */
    orderBy?: ReviewReplyOrderByWithRelationInput | ReviewReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReviewReplies.
     */
    cursor?: ReviewReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewReplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReviewReplies.
     */
    distinct?: ReviewReplyScalarFieldEnum | ReviewReplyScalarFieldEnum[]
  }

  /**
   * ReviewReply findFirstOrThrow
   */
  export type ReviewReplyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewReply
     */
    select?: ReviewReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewReplyInclude<ExtArgs> | null
    /**
     * Filter, which ReviewReply to fetch.
     */
    where?: ReviewReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewReplies to fetch.
     */
    orderBy?: ReviewReplyOrderByWithRelationInput | ReviewReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReviewReplies.
     */
    cursor?: ReviewReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewReplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReviewReplies.
     */
    distinct?: ReviewReplyScalarFieldEnum | ReviewReplyScalarFieldEnum[]
  }

  /**
   * ReviewReply findMany
   */
  export type ReviewReplyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewReply
     */
    select?: ReviewReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewReplyInclude<ExtArgs> | null
    /**
     * Filter, which ReviewReplies to fetch.
     */
    where?: ReviewReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReviewReplies to fetch.
     */
    orderBy?: ReviewReplyOrderByWithRelationInput | ReviewReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReviewReplies.
     */
    cursor?: ReviewReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReviewReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReviewReplies.
     */
    skip?: number
    distinct?: ReviewReplyScalarFieldEnum | ReviewReplyScalarFieldEnum[]
  }

  /**
   * ReviewReply create
   */
  export type ReviewReplyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewReply
     */
    select?: ReviewReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewReplyInclude<ExtArgs> | null
    /**
     * The data needed to create a ReviewReply.
     */
    data: XOR<ReviewReplyCreateInput, ReviewReplyUncheckedCreateInput>
  }

  /**
   * ReviewReply createMany
   */
  export type ReviewReplyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReviewReplies.
     */
    data: ReviewReplyCreateManyInput | ReviewReplyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReviewReply createManyAndReturn
   */
  export type ReviewReplyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewReply
     */
    select?: ReviewReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewReplyInclude<ExtArgs> | null
    /**
     * The data used to create many ReviewReplies.
     */
    data: ReviewReplyCreateManyInput | ReviewReplyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReviewReply update
   */
  export type ReviewReplyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewReply
     */
    select?: ReviewReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewReplyInclude<ExtArgs> | null
    /**
     * The data needed to update a ReviewReply.
     */
    data: XOR<ReviewReplyUpdateInput, ReviewReplyUncheckedUpdateInput>
    /**
     * Choose, which ReviewReply to update.
     */
    where: ReviewReplyWhereUniqueInput
  }

  /**
   * ReviewReply updateMany
   */
  export type ReviewReplyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReviewReplies.
     */
    data: XOR<ReviewReplyUpdateManyMutationInput, ReviewReplyUncheckedUpdateManyInput>
    /**
     * Filter which ReviewReplies to update
     */
    where?: ReviewReplyWhereInput
  }

  /**
   * ReviewReply upsert
   */
  export type ReviewReplyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewReply
     */
    select?: ReviewReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewReplyInclude<ExtArgs> | null
    /**
     * The filter to search for the ReviewReply to update in case it exists.
     */
    where: ReviewReplyWhereUniqueInput
    /**
     * In case the ReviewReply found by the `where` argument doesn't exist, create a new ReviewReply with this data.
     */
    create: XOR<ReviewReplyCreateInput, ReviewReplyUncheckedCreateInput>
    /**
     * In case the ReviewReply was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewReplyUpdateInput, ReviewReplyUncheckedUpdateInput>
  }

  /**
   * ReviewReply delete
   */
  export type ReviewReplyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewReply
     */
    select?: ReviewReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewReplyInclude<ExtArgs> | null
    /**
     * Filter which ReviewReply to delete.
     */
    where: ReviewReplyWhereUniqueInput
  }

  /**
   * ReviewReply deleteMany
   */
  export type ReviewReplyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReviewReplies to delete
     */
    where?: ReviewReplyWhereInput
  }

  /**
   * ReviewReply without action
   */
  export type ReviewReplyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReviewReply
     */
    select?: ReviewReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewReplyInclude<ExtArgs> | null
  }


  /**
   * Model Inquiry
   */

  export type AggregateInquiry = {
    _count: InquiryCountAggregateOutputType | null
    _avg: InquiryAvgAggregateOutputType | null
    _sum: InquirySumAggregateOutputType | null
    _min: InquiryMinAggregateOutputType | null
    _max: InquiryMaxAggregateOutputType | null
  }

  export type InquiryAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type InquirySumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type InquiryMinAggregateOutputType = {
    id: number | null
    userId: number | null
    content: string | null
    createdAt: Date | null
  }

  export type InquiryMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    content: string | null
    createdAt: Date | null
  }

  export type InquiryCountAggregateOutputType = {
    id: number
    userId: number
    content: number
    createdAt: number
    _all: number
  }


  export type InquiryAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type InquirySumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type InquiryMinAggregateInputType = {
    id?: true
    userId?: true
    content?: true
    createdAt?: true
  }

  export type InquiryMaxAggregateInputType = {
    id?: true
    userId?: true
    content?: true
    createdAt?: true
  }

  export type InquiryCountAggregateInputType = {
    id?: true
    userId?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type InquiryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inquiry to aggregate.
     */
    where?: InquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquiries to fetch.
     */
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Inquiries
    **/
    _count?: true | InquiryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InquiryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InquirySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InquiryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InquiryMaxAggregateInputType
  }

  export type GetInquiryAggregateType<T extends InquiryAggregateArgs> = {
        [P in keyof T & keyof AggregateInquiry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInquiry[P]>
      : GetScalarType<T[P], AggregateInquiry[P]>
  }




  export type InquiryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryWhereInput
    orderBy?: InquiryOrderByWithAggregationInput | InquiryOrderByWithAggregationInput[]
    by: InquiryScalarFieldEnum[] | InquiryScalarFieldEnum
    having?: InquiryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InquiryCountAggregateInputType | true
    _avg?: InquiryAvgAggregateInputType
    _sum?: InquirySumAggregateInputType
    _min?: InquiryMinAggregateInputType
    _max?: InquiryMaxAggregateInputType
  }

  export type InquiryGroupByOutputType = {
    id: number
    userId: number
    content: string
    createdAt: Date
    _count: InquiryCountAggregateOutputType | null
    _avg: InquiryAvgAggregateOutputType | null
    _sum: InquirySumAggregateOutputType | null
    _min: InquiryMinAggregateOutputType | null
    _max: InquiryMaxAggregateOutputType | null
  }

  type GetInquiryGroupByPayload<T extends InquiryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InquiryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InquiryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InquiryGroupByOutputType[P]>
            : GetScalarType<T[P], InquiryGroupByOutputType[P]>
        }
      >
    >


  export type InquirySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    content?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    replies?: boolean | Inquiry$repliesArgs<ExtArgs>
    _count?: boolean | InquiryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inquiry"]>

  export type InquirySelectScalar = {
    id?: boolean
    userId?: boolean
    content?: boolean
    createdAt?: boolean
  }


  export type InquiryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    replies?: boolean | Inquiry$repliesArgs<ExtArgs>
    _count?: boolean | InquiryCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $InquiryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Inquiry"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      replies: Prisma.$InquiryReplyPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      content: string
      createdAt: Date
    }, ExtArgs["result"]["inquiry"]>
    composites: {}
  }


  type InquiryGetPayload<S extends boolean | null | undefined | InquiryDefaultArgs> = $Result.GetResult<Prisma.$InquiryPayload, S>

  type InquiryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InquiryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InquiryCountAggregateInputType | true
    }

  export interface InquiryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Inquiry'], meta: { name: 'Inquiry' } }
    /**
     * Find zero or one Inquiry that matches the filter.
     * @param {InquiryFindUniqueArgs} args - Arguments to find a Inquiry
     * @example
     * // Get one Inquiry
     * const inquiry = await prisma.inquiry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends InquiryFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, InquiryFindUniqueArgs<ExtArgs>>
    ): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Inquiry that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InquiryFindUniqueOrThrowArgs} args - Arguments to find a Inquiry
     * @example
     * // Get one Inquiry
     * const inquiry = await prisma.inquiry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends InquiryFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, InquiryFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Inquiry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryFindFirstArgs} args - Arguments to find a Inquiry
     * @example
     * // Get one Inquiry
     * const inquiry = await prisma.inquiry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends InquiryFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, InquiryFindFirstArgs<ExtArgs>>
    ): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Inquiry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryFindFirstOrThrowArgs} args - Arguments to find a Inquiry
     * @example
     * // Get one Inquiry
     * const inquiry = await prisma.inquiry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends InquiryFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, InquiryFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Inquiries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Inquiries
     * const inquiries = await prisma.inquiry.findMany()
     * 
     * // Get first 10 Inquiries
     * const inquiries = await prisma.inquiry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inquiryWithIdOnly = await prisma.inquiry.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends InquiryFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, InquiryFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Inquiry.
     * @param {InquiryCreateArgs} args - Arguments to create a Inquiry.
     * @example
     * // Create one Inquiry
     * const Inquiry = await prisma.inquiry.create({
     *   data: {
     *     // ... data to create a Inquiry
     *   }
     * })
     * 
    **/
    create<T extends InquiryCreateArgs<ExtArgs>>(
      args: SelectSubset<T, InquiryCreateArgs<ExtArgs>>
    ): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Inquiries.
     * @param {InquiryCreateManyArgs} args - Arguments to create many Inquiries.
     * @example
     * // Create many Inquiries
     * const inquiry = await prisma.inquiry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends InquiryCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, InquiryCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Inquiries and returns the data saved in the database.
     * @param {InquiryCreateManyAndReturnArgs} args - Arguments to create many Inquiries.
     * @example
     * // Create many Inquiries
     * const inquiry = await prisma.inquiry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Inquiries and only return the `id`
     * const inquiryWithIdOnly = await prisma.inquiry.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends InquiryCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, InquiryCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a Inquiry.
     * @param {InquiryDeleteArgs} args - Arguments to delete one Inquiry.
     * @example
     * // Delete one Inquiry
     * const Inquiry = await prisma.inquiry.delete({
     *   where: {
     *     // ... filter to delete one Inquiry
     *   }
     * })
     * 
    **/
    delete<T extends InquiryDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, InquiryDeleteArgs<ExtArgs>>
    ): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Inquiry.
     * @param {InquiryUpdateArgs} args - Arguments to update one Inquiry.
     * @example
     * // Update one Inquiry
     * const inquiry = await prisma.inquiry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends InquiryUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, InquiryUpdateArgs<ExtArgs>>
    ): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Inquiries.
     * @param {InquiryDeleteManyArgs} args - Arguments to filter Inquiries to delete.
     * @example
     * // Delete a few Inquiries
     * const { count } = await prisma.inquiry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends InquiryDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, InquiryDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inquiries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Inquiries
     * const inquiry = await prisma.inquiry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends InquiryUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, InquiryUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Inquiry.
     * @param {InquiryUpsertArgs} args - Arguments to update or create a Inquiry.
     * @example
     * // Update or create a Inquiry
     * const inquiry = await prisma.inquiry.upsert({
     *   create: {
     *     // ... data to create a Inquiry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Inquiry we want to update
     *   }
     * })
    **/
    upsert<T extends InquiryUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, InquiryUpsertArgs<ExtArgs>>
    ): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Inquiries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryCountArgs} args - Arguments to filter Inquiries to count.
     * @example
     * // Count the number of Inquiries
     * const count = await prisma.inquiry.count({
     *   where: {
     *     // ... the filter for the Inquiries we want to count
     *   }
     * })
    **/
    count<T extends InquiryCountArgs>(
      args?: Subset<T, InquiryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InquiryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Inquiry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InquiryAggregateArgs>(args: Subset<T, InquiryAggregateArgs>): Prisma.PrismaPromise<GetInquiryAggregateType<T>>

    /**
     * Group by Inquiry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InquiryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InquiryGroupByArgs['orderBy'] }
        : { orderBy?: InquiryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InquiryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInquiryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Inquiry model
   */
  readonly fields: InquiryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Inquiry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InquiryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    replies<T extends Inquiry$repliesArgs<ExtArgs> = {}>(args?: Subset<T, Inquiry$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryReplyPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Inquiry model
   */ 
  interface InquiryFieldRefs {
    readonly id: FieldRef<"Inquiry", 'Int'>
    readonly userId: FieldRef<"Inquiry", 'Int'>
    readonly content: FieldRef<"Inquiry", 'String'>
    readonly createdAt: FieldRef<"Inquiry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Inquiry findUnique
   */
  export type InquiryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter, which Inquiry to fetch.
     */
    where: InquiryWhereUniqueInput
  }

  /**
   * Inquiry findUniqueOrThrow
   */
  export type InquiryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter, which Inquiry to fetch.
     */
    where: InquiryWhereUniqueInput
  }

  /**
   * Inquiry findFirst
   */
  export type InquiryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter, which Inquiry to fetch.
     */
    where?: InquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquiries to fetch.
     */
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inquiries.
     */
    cursor?: InquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inquiries.
     */
    distinct?: InquiryScalarFieldEnum | InquiryScalarFieldEnum[]
  }

  /**
   * Inquiry findFirstOrThrow
   */
  export type InquiryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter, which Inquiry to fetch.
     */
    where?: InquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquiries to fetch.
     */
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inquiries.
     */
    cursor?: InquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inquiries.
     */
    distinct?: InquiryScalarFieldEnum | InquiryScalarFieldEnum[]
  }

  /**
   * Inquiry findMany
   */
  export type InquiryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter, which Inquiries to fetch.
     */
    where?: InquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquiries to fetch.
     */
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Inquiries.
     */
    cursor?: InquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquiries.
     */
    skip?: number
    distinct?: InquiryScalarFieldEnum | InquiryScalarFieldEnum[]
  }

  /**
   * Inquiry create
   */
  export type InquiryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * The data needed to create a Inquiry.
     */
    data: XOR<InquiryCreateInput, InquiryUncheckedCreateInput>
  }

  /**
   * Inquiry createMany
   */
  export type InquiryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Inquiries.
     */
    data: InquiryCreateManyInput | InquiryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Inquiry createManyAndReturn
   */
  export type InquiryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * The data used to create many Inquiries.
     */
    data: InquiryCreateManyInput | InquiryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Inquiry update
   */
  export type InquiryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * The data needed to update a Inquiry.
     */
    data: XOR<InquiryUpdateInput, InquiryUncheckedUpdateInput>
    /**
     * Choose, which Inquiry to update.
     */
    where: InquiryWhereUniqueInput
  }

  /**
   * Inquiry updateMany
   */
  export type InquiryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Inquiries.
     */
    data: XOR<InquiryUpdateManyMutationInput, InquiryUncheckedUpdateManyInput>
    /**
     * Filter which Inquiries to update
     */
    where?: InquiryWhereInput
  }

  /**
   * Inquiry upsert
   */
  export type InquiryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * The filter to search for the Inquiry to update in case it exists.
     */
    where: InquiryWhereUniqueInput
    /**
     * In case the Inquiry found by the `where` argument doesn't exist, create a new Inquiry with this data.
     */
    create: XOR<InquiryCreateInput, InquiryUncheckedCreateInput>
    /**
     * In case the Inquiry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InquiryUpdateInput, InquiryUncheckedUpdateInput>
  }

  /**
   * Inquiry delete
   */
  export type InquiryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter which Inquiry to delete.
     */
    where: InquiryWhereUniqueInput
  }

  /**
   * Inquiry deleteMany
   */
  export type InquiryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inquiries to delete
     */
    where?: InquiryWhereInput
  }

  /**
   * Inquiry.replies
   */
  export type Inquiry$repliesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryReply
     */
    select?: InquiryReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryReplyInclude<ExtArgs> | null
    where?: InquiryReplyWhereInput
    orderBy?: InquiryReplyOrderByWithRelationInput | InquiryReplyOrderByWithRelationInput[]
    cursor?: InquiryReplyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InquiryReplyScalarFieldEnum | InquiryReplyScalarFieldEnum[]
  }

  /**
   * Inquiry without action
   */
  export type InquiryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
  }


  /**
   * Model InquiryReply
   */

  export type AggregateInquiryReply = {
    _count: InquiryReplyCountAggregateOutputType | null
    _avg: InquiryReplyAvgAggregateOutputType | null
    _sum: InquiryReplySumAggregateOutputType | null
    _min: InquiryReplyMinAggregateOutputType | null
    _max: InquiryReplyMaxAggregateOutputType | null
  }

  export type InquiryReplyAvgAggregateOutputType = {
    id: number | null
    inquiryId: number | null
    adminId: number | null
  }

  export type InquiryReplySumAggregateOutputType = {
    id: number | null
    inquiryId: number | null
    adminId: number | null
  }

  export type InquiryReplyMinAggregateOutputType = {
    id: number | null
    inquiryId: number | null
    adminId: number | null
    content: string | null
    createdAt: Date | null
  }

  export type InquiryReplyMaxAggregateOutputType = {
    id: number | null
    inquiryId: number | null
    adminId: number | null
    content: string | null
    createdAt: Date | null
  }

  export type InquiryReplyCountAggregateOutputType = {
    id: number
    inquiryId: number
    adminId: number
    content: number
    createdAt: number
    _all: number
  }


  export type InquiryReplyAvgAggregateInputType = {
    id?: true
    inquiryId?: true
    adminId?: true
  }

  export type InquiryReplySumAggregateInputType = {
    id?: true
    inquiryId?: true
    adminId?: true
  }

  export type InquiryReplyMinAggregateInputType = {
    id?: true
    inquiryId?: true
    adminId?: true
    content?: true
    createdAt?: true
  }

  export type InquiryReplyMaxAggregateInputType = {
    id?: true
    inquiryId?: true
    adminId?: true
    content?: true
    createdAt?: true
  }

  export type InquiryReplyCountAggregateInputType = {
    id?: true
    inquiryId?: true
    adminId?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type InquiryReplyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InquiryReply to aggregate.
     */
    where?: InquiryReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InquiryReplies to fetch.
     */
    orderBy?: InquiryReplyOrderByWithRelationInput | InquiryReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InquiryReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InquiryReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InquiryReplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InquiryReplies
    **/
    _count?: true | InquiryReplyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InquiryReplyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InquiryReplySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InquiryReplyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InquiryReplyMaxAggregateInputType
  }

  export type GetInquiryReplyAggregateType<T extends InquiryReplyAggregateArgs> = {
        [P in keyof T & keyof AggregateInquiryReply]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInquiryReply[P]>
      : GetScalarType<T[P], AggregateInquiryReply[P]>
  }




  export type InquiryReplyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryReplyWhereInput
    orderBy?: InquiryReplyOrderByWithAggregationInput | InquiryReplyOrderByWithAggregationInput[]
    by: InquiryReplyScalarFieldEnum[] | InquiryReplyScalarFieldEnum
    having?: InquiryReplyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InquiryReplyCountAggregateInputType | true
    _avg?: InquiryReplyAvgAggregateInputType
    _sum?: InquiryReplySumAggregateInputType
    _min?: InquiryReplyMinAggregateInputType
    _max?: InquiryReplyMaxAggregateInputType
  }

  export type InquiryReplyGroupByOutputType = {
    id: number
    inquiryId: number
    adminId: number
    content: string
    createdAt: Date
    _count: InquiryReplyCountAggregateOutputType | null
    _avg: InquiryReplyAvgAggregateOutputType | null
    _sum: InquiryReplySumAggregateOutputType | null
    _min: InquiryReplyMinAggregateOutputType | null
    _max: InquiryReplyMaxAggregateOutputType | null
  }

  type GetInquiryReplyGroupByPayload<T extends InquiryReplyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InquiryReplyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InquiryReplyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InquiryReplyGroupByOutputType[P]>
            : GetScalarType<T[P], InquiryReplyGroupByOutputType[P]>
        }
      >
    >


  export type InquiryReplySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inquiryId?: boolean
    adminId?: boolean
    content?: boolean
    createdAt?: boolean
    inquiry?: boolean | InquiryDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inquiryReply"]>

  export type InquiryReplySelectScalar = {
    id?: boolean
    inquiryId?: boolean
    adminId?: boolean
    content?: boolean
    createdAt?: boolean
  }


  export type InquiryReplyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inquiry?: boolean | InquiryDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $InquiryReplyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InquiryReply"
    objects: {
      inquiry: Prisma.$InquiryPayload<ExtArgs>
      admin: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      inquiryId: number
      adminId: number
      content: string
      createdAt: Date
    }, ExtArgs["result"]["inquiryReply"]>
    composites: {}
  }


  type InquiryReplyGetPayload<S extends boolean | null | undefined | InquiryReplyDefaultArgs> = $Result.GetResult<Prisma.$InquiryReplyPayload, S>

  type InquiryReplyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<InquiryReplyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: InquiryReplyCountAggregateInputType | true
    }

  export interface InquiryReplyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InquiryReply'], meta: { name: 'InquiryReply' } }
    /**
     * Find zero or one InquiryReply that matches the filter.
     * @param {InquiryReplyFindUniqueArgs} args - Arguments to find a InquiryReply
     * @example
     * // Get one InquiryReply
     * const inquiryReply = await prisma.inquiryReply.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends InquiryReplyFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, InquiryReplyFindUniqueArgs<ExtArgs>>
    ): Prisma__InquiryReplyClient<$Result.GetResult<Prisma.$InquiryReplyPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one InquiryReply that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {InquiryReplyFindUniqueOrThrowArgs} args - Arguments to find a InquiryReply
     * @example
     * // Get one InquiryReply
     * const inquiryReply = await prisma.inquiryReply.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends InquiryReplyFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, InquiryReplyFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__InquiryReplyClient<$Result.GetResult<Prisma.$InquiryReplyPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first InquiryReply that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryReplyFindFirstArgs} args - Arguments to find a InquiryReply
     * @example
     * // Get one InquiryReply
     * const inquiryReply = await prisma.inquiryReply.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends InquiryReplyFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, InquiryReplyFindFirstArgs<ExtArgs>>
    ): Prisma__InquiryReplyClient<$Result.GetResult<Prisma.$InquiryReplyPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first InquiryReply that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryReplyFindFirstOrThrowArgs} args - Arguments to find a InquiryReply
     * @example
     * // Get one InquiryReply
     * const inquiryReply = await prisma.inquiryReply.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends InquiryReplyFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, InquiryReplyFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__InquiryReplyClient<$Result.GetResult<Prisma.$InquiryReplyPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more InquiryReplies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryReplyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InquiryReplies
     * const inquiryReplies = await prisma.inquiryReply.findMany()
     * 
     * // Get first 10 InquiryReplies
     * const inquiryReplies = await prisma.inquiryReply.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inquiryReplyWithIdOnly = await prisma.inquiryReply.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends InquiryReplyFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, InquiryReplyFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryReplyPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a InquiryReply.
     * @param {InquiryReplyCreateArgs} args - Arguments to create a InquiryReply.
     * @example
     * // Create one InquiryReply
     * const InquiryReply = await prisma.inquiryReply.create({
     *   data: {
     *     // ... data to create a InquiryReply
     *   }
     * })
     * 
    **/
    create<T extends InquiryReplyCreateArgs<ExtArgs>>(
      args: SelectSubset<T, InquiryReplyCreateArgs<ExtArgs>>
    ): Prisma__InquiryReplyClient<$Result.GetResult<Prisma.$InquiryReplyPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many InquiryReplies.
     * @param {InquiryReplyCreateManyArgs} args - Arguments to create many InquiryReplies.
     * @example
     * // Create many InquiryReplies
     * const inquiryReply = await prisma.inquiryReply.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends InquiryReplyCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, InquiryReplyCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InquiryReplies and returns the data saved in the database.
     * @param {InquiryReplyCreateManyAndReturnArgs} args - Arguments to create many InquiryReplies.
     * @example
     * // Create many InquiryReplies
     * const inquiryReply = await prisma.inquiryReply.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InquiryReplies and only return the `id`
     * const inquiryReplyWithIdOnly = await prisma.inquiryReply.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends InquiryReplyCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, InquiryReplyCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryReplyPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a InquiryReply.
     * @param {InquiryReplyDeleteArgs} args - Arguments to delete one InquiryReply.
     * @example
     * // Delete one InquiryReply
     * const InquiryReply = await prisma.inquiryReply.delete({
     *   where: {
     *     // ... filter to delete one InquiryReply
     *   }
     * })
     * 
    **/
    delete<T extends InquiryReplyDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, InquiryReplyDeleteArgs<ExtArgs>>
    ): Prisma__InquiryReplyClient<$Result.GetResult<Prisma.$InquiryReplyPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one InquiryReply.
     * @param {InquiryReplyUpdateArgs} args - Arguments to update one InquiryReply.
     * @example
     * // Update one InquiryReply
     * const inquiryReply = await prisma.inquiryReply.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends InquiryReplyUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, InquiryReplyUpdateArgs<ExtArgs>>
    ): Prisma__InquiryReplyClient<$Result.GetResult<Prisma.$InquiryReplyPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more InquiryReplies.
     * @param {InquiryReplyDeleteManyArgs} args - Arguments to filter InquiryReplies to delete.
     * @example
     * // Delete a few InquiryReplies
     * const { count } = await prisma.inquiryReply.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends InquiryReplyDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, InquiryReplyDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InquiryReplies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryReplyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InquiryReplies
     * const inquiryReply = await prisma.inquiryReply.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends InquiryReplyUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, InquiryReplyUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InquiryReply.
     * @param {InquiryReplyUpsertArgs} args - Arguments to update or create a InquiryReply.
     * @example
     * // Update or create a InquiryReply
     * const inquiryReply = await prisma.inquiryReply.upsert({
     *   create: {
     *     // ... data to create a InquiryReply
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InquiryReply we want to update
     *   }
     * })
    **/
    upsert<T extends InquiryReplyUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, InquiryReplyUpsertArgs<ExtArgs>>
    ): Prisma__InquiryReplyClient<$Result.GetResult<Prisma.$InquiryReplyPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of InquiryReplies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryReplyCountArgs} args - Arguments to filter InquiryReplies to count.
     * @example
     * // Count the number of InquiryReplies
     * const count = await prisma.inquiryReply.count({
     *   where: {
     *     // ... the filter for the InquiryReplies we want to count
     *   }
     * })
    **/
    count<T extends InquiryReplyCountArgs>(
      args?: Subset<T, InquiryReplyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InquiryReplyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InquiryReply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryReplyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InquiryReplyAggregateArgs>(args: Subset<T, InquiryReplyAggregateArgs>): Prisma.PrismaPromise<GetInquiryReplyAggregateType<T>>

    /**
     * Group by InquiryReply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryReplyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InquiryReplyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InquiryReplyGroupByArgs['orderBy'] }
        : { orderBy?: InquiryReplyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InquiryReplyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInquiryReplyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InquiryReply model
   */
  readonly fields: InquiryReplyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InquiryReply.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InquiryReplyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    inquiry<T extends InquiryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InquiryDefaultArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    admin<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the InquiryReply model
   */ 
  interface InquiryReplyFieldRefs {
    readonly id: FieldRef<"InquiryReply", 'Int'>
    readonly inquiryId: FieldRef<"InquiryReply", 'Int'>
    readonly adminId: FieldRef<"InquiryReply", 'Int'>
    readonly content: FieldRef<"InquiryReply", 'String'>
    readonly createdAt: FieldRef<"InquiryReply", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InquiryReply findUnique
   */
  export type InquiryReplyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryReply
     */
    select?: InquiryReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryReplyInclude<ExtArgs> | null
    /**
     * Filter, which InquiryReply to fetch.
     */
    where: InquiryReplyWhereUniqueInput
  }

  /**
   * InquiryReply findUniqueOrThrow
   */
  export type InquiryReplyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryReply
     */
    select?: InquiryReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryReplyInclude<ExtArgs> | null
    /**
     * Filter, which InquiryReply to fetch.
     */
    where: InquiryReplyWhereUniqueInput
  }

  /**
   * InquiryReply findFirst
   */
  export type InquiryReplyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryReply
     */
    select?: InquiryReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryReplyInclude<ExtArgs> | null
    /**
     * Filter, which InquiryReply to fetch.
     */
    where?: InquiryReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InquiryReplies to fetch.
     */
    orderBy?: InquiryReplyOrderByWithRelationInput | InquiryReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InquiryReplies.
     */
    cursor?: InquiryReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InquiryReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InquiryReplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InquiryReplies.
     */
    distinct?: InquiryReplyScalarFieldEnum | InquiryReplyScalarFieldEnum[]
  }

  /**
   * InquiryReply findFirstOrThrow
   */
  export type InquiryReplyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryReply
     */
    select?: InquiryReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryReplyInclude<ExtArgs> | null
    /**
     * Filter, which InquiryReply to fetch.
     */
    where?: InquiryReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InquiryReplies to fetch.
     */
    orderBy?: InquiryReplyOrderByWithRelationInput | InquiryReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InquiryReplies.
     */
    cursor?: InquiryReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InquiryReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InquiryReplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InquiryReplies.
     */
    distinct?: InquiryReplyScalarFieldEnum | InquiryReplyScalarFieldEnum[]
  }

  /**
   * InquiryReply findMany
   */
  export type InquiryReplyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryReply
     */
    select?: InquiryReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryReplyInclude<ExtArgs> | null
    /**
     * Filter, which InquiryReplies to fetch.
     */
    where?: InquiryReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InquiryReplies to fetch.
     */
    orderBy?: InquiryReplyOrderByWithRelationInput | InquiryReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InquiryReplies.
     */
    cursor?: InquiryReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InquiryReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InquiryReplies.
     */
    skip?: number
    distinct?: InquiryReplyScalarFieldEnum | InquiryReplyScalarFieldEnum[]
  }

  /**
   * InquiryReply create
   */
  export type InquiryReplyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryReply
     */
    select?: InquiryReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryReplyInclude<ExtArgs> | null
    /**
     * The data needed to create a InquiryReply.
     */
    data: XOR<InquiryReplyCreateInput, InquiryReplyUncheckedCreateInput>
  }

  /**
   * InquiryReply createMany
   */
  export type InquiryReplyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InquiryReplies.
     */
    data: InquiryReplyCreateManyInput | InquiryReplyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InquiryReply createManyAndReturn
   */
  export type InquiryReplyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryReply
     */
    select?: InquiryReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryReplyInclude<ExtArgs> | null
    /**
     * The data used to create many InquiryReplies.
     */
    data: InquiryReplyCreateManyInput | InquiryReplyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InquiryReply update
   */
  export type InquiryReplyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryReply
     */
    select?: InquiryReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryReplyInclude<ExtArgs> | null
    /**
     * The data needed to update a InquiryReply.
     */
    data: XOR<InquiryReplyUpdateInput, InquiryReplyUncheckedUpdateInput>
    /**
     * Choose, which InquiryReply to update.
     */
    where: InquiryReplyWhereUniqueInput
  }

  /**
   * InquiryReply updateMany
   */
  export type InquiryReplyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InquiryReplies.
     */
    data: XOR<InquiryReplyUpdateManyMutationInput, InquiryReplyUncheckedUpdateManyInput>
    /**
     * Filter which InquiryReplies to update
     */
    where?: InquiryReplyWhereInput
  }

  /**
   * InquiryReply upsert
   */
  export type InquiryReplyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryReply
     */
    select?: InquiryReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryReplyInclude<ExtArgs> | null
    /**
     * The filter to search for the InquiryReply to update in case it exists.
     */
    where: InquiryReplyWhereUniqueInput
    /**
     * In case the InquiryReply found by the `where` argument doesn't exist, create a new InquiryReply with this data.
     */
    create: XOR<InquiryReplyCreateInput, InquiryReplyUncheckedCreateInput>
    /**
     * In case the InquiryReply was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InquiryReplyUpdateInput, InquiryReplyUncheckedUpdateInput>
  }

  /**
   * InquiryReply delete
   */
  export type InquiryReplyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryReply
     */
    select?: InquiryReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryReplyInclude<ExtArgs> | null
    /**
     * Filter which InquiryReply to delete.
     */
    where: InquiryReplyWhereUniqueInput
  }

  /**
   * InquiryReply deleteMany
   */
  export type InquiryReplyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InquiryReplies to delete
     */
    where?: InquiryReplyWhereInput
  }

  /**
   * InquiryReply without action
   */
  export type InquiryReplyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryReply
     */
    select?: InquiryReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryReplyInclude<ExtArgs> | null
  }


  /**
   * Model ProductQna
   */

  export type AggregateProductQna = {
    _count: ProductQnaCountAggregateOutputType | null
    _avg: ProductQnaAvgAggregateOutputType | null
    _sum: ProductQnaSumAggregateOutputType | null
    _min: ProductQnaMinAggregateOutputType | null
    _max: ProductQnaMaxAggregateOutputType | null
  }

  export type ProductQnaAvgAggregateOutputType = {
    id: number | null
    productId: number | null
    userId: number | null
  }

  export type ProductQnaSumAggregateOutputType = {
    id: number | null
    productId: number | null
    userId: number | null
  }

  export type ProductQnaMinAggregateOutputType = {
    id: number | null
    content: string | null
    isSecret: boolean | null
    productId: number | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductQnaMaxAggregateOutputType = {
    id: number | null
    content: string | null
    isSecret: boolean | null
    productId: number | null
    userId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductQnaCountAggregateOutputType = {
    id: number
    content: number
    isSecret: number
    productId: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductQnaAvgAggregateInputType = {
    id?: true
    productId?: true
    userId?: true
  }

  export type ProductQnaSumAggregateInputType = {
    id?: true
    productId?: true
    userId?: true
  }

  export type ProductQnaMinAggregateInputType = {
    id?: true
    content?: true
    isSecret?: true
    productId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductQnaMaxAggregateInputType = {
    id?: true
    content?: true
    isSecret?: true
    productId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductQnaCountAggregateInputType = {
    id?: true
    content?: true
    isSecret?: true
    productId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductQnaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductQna to aggregate.
     */
    where?: ProductQnaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductQnas to fetch.
     */
    orderBy?: ProductQnaOrderByWithRelationInput | ProductQnaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductQnaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductQnas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductQnas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductQnas
    **/
    _count?: true | ProductQnaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductQnaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductQnaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductQnaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductQnaMaxAggregateInputType
  }

  export type GetProductQnaAggregateType<T extends ProductQnaAggregateArgs> = {
        [P in keyof T & keyof AggregateProductQna]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductQna[P]>
      : GetScalarType<T[P], AggregateProductQna[P]>
  }




  export type ProductQnaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductQnaWhereInput
    orderBy?: ProductQnaOrderByWithAggregationInput | ProductQnaOrderByWithAggregationInput[]
    by: ProductQnaScalarFieldEnum[] | ProductQnaScalarFieldEnum
    having?: ProductQnaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductQnaCountAggregateInputType | true
    _avg?: ProductQnaAvgAggregateInputType
    _sum?: ProductQnaSumAggregateInputType
    _min?: ProductQnaMinAggregateInputType
    _max?: ProductQnaMaxAggregateInputType
  }

  export type ProductQnaGroupByOutputType = {
    id: number
    content: string
    isSecret: boolean
    productId: number
    userId: number
    createdAt: Date
    updatedAt: Date
    _count: ProductQnaCountAggregateOutputType | null
    _avg: ProductQnaAvgAggregateOutputType | null
    _sum: ProductQnaSumAggregateOutputType | null
    _min: ProductQnaMinAggregateOutputType | null
    _max: ProductQnaMaxAggregateOutputType | null
  }

  type GetProductQnaGroupByPayload<T extends ProductQnaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductQnaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductQnaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductQnaGroupByOutputType[P]>
            : GetScalarType<T[P], ProductQnaGroupByOutputType[P]>
        }
      >
    >


  export type ProductQnaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    isSecret?: boolean
    productId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    reply?: boolean | ProductQna$replyArgs<ExtArgs>
  }, ExtArgs["result"]["productQna"]>

  export type ProductQnaSelectScalar = {
    id?: boolean
    content?: boolean
    isSecret?: boolean
    productId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type ProductQnaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    reply?: boolean | ProductQna$replyArgs<ExtArgs>
  }


  export type $ProductQnaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductQna"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
      reply: Prisma.$ProductQnaReplyPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      content: string
      isSecret: boolean
      productId: number
      userId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productQna"]>
    composites: {}
  }


  type ProductQnaGetPayload<S extends boolean | null | undefined | ProductQnaDefaultArgs> = $Result.GetResult<Prisma.$ProductQnaPayload, S>

  type ProductQnaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductQnaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductQnaCountAggregateInputType | true
    }

  export interface ProductQnaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductQna'], meta: { name: 'ProductQna' } }
    /**
     * Find zero or one ProductQna that matches the filter.
     * @param {ProductQnaFindUniqueArgs} args - Arguments to find a ProductQna
     * @example
     * // Get one ProductQna
     * const productQna = await prisma.productQna.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProductQnaFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ProductQnaFindUniqueArgs<ExtArgs>>
    ): Prisma__ProductQnaClient<$Result.GetResult<Prisma.$ProductQnaPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ProductQna that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductQnaFindUniqueOrThrowArgs} args - Arguments to find a ProductQna
     * @example
     * // Get one ProductQna
     * const productQna = await prisma.productQna.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProductQnaFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductQnaFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ProductQnaClient<$Result.GetResult<Prisma.$ProductQnaPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ProductQna that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductQnaFindFirstArgs} args - Arguments to find a ProductQna
     * @example
     * // Get one ProductQna
     * const productQna = await prisma.productQna.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProductQnaFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductQnaFindFirstArgs<ExtArgs>>
    ): Prisma__ProductQnaClient<$Result.GetResult<Prisma.$ProductQnaPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ProductQna that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductQnaFindFirstOrThrowArgs} args - Arguments to find a ProductQna
     * @example
     * // Get one ProductQna
     * const productQna = await prisma.productQna.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProductQnaFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductQnaFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ProductQnaClient<$Result.GetResult<Prisma.$ProductQnaPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ProductQnas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductQnaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductQnas
     * const productQnas = await prisma.productQna.findMany()
     * 
     * // Get first 10 ProductQnas
     * const productQnas = await prisma.productQna.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productQnaWithIdOnly = await prisma.productQna.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProductQnaFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductQnaFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductQnaPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ProductQna.
     * @param {ProductQnaCreateArgs} args - Arguments to create a ProductQna.
     * @example
     * // Create one ProductQna
     * const ProductQna = await prisma.productQna.create({
     *   data: {
     *     // ... data to create a ProductQna
     *   }
     * })
     * 
    **/
    create<T extends ProductQnaCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ProductQnaCreateArgs<ExtArgs>>
    ): Prisma__ProductQnaClient<$Result.GetResult<Prisma.$ProductQnaPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ProductQnas.
     * @param {ProductQnaCreateManyArgs} args - Arguments to create many ProductQnas.
     * @example
     * // Create many ProductQnas
     * const productQna = await prisma.productQna.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends ProductQnaCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductQnaCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductQnas and returns the data saved in the database.
     * @param {ProductQnaCreateManyAndReturnArgs} args - Arguments to create many ProductQnas.
     * @example
     * // Create many ProductQnas
     * const productQna = await prisma.productQna.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductQnas and only return the `id`
     * const productQnaWithIdOnly = await prisma.productQna.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends ProductQnaCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductQnaCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductQnaPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a ProductQna.
     * @param {ProductQnaDeleteArgs} args - Arguments to delete one ProductQna.
     * @example
     * // Delete one ProductQna
     * const ProductQna = await prisma.productQna.delete({
     *   where: {
     *     // ... filter to delete one ProductQna
     *   }
     * })
     * 
    **/
    delete<T extends ProductQnaDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ProductQnaDeleteArgs<ExtArgs>>
    ): Prisma__ProductQnaClient<$Result.GetResult<Prisma.$ProductQnaPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ProductQna.
     * @param {ProductQnaUpdateArgs} args - Arguments to update one ProductQna.
     * @example
     * // Update one ProductQna
     * const productQna = await prisma.productQna.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProductQnaUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ProductQnaUpdateArgs<ExtArgs>>
    ): Prisma__ProductQnaClient<$Result.GetResult<Prisma.$ProductQnaPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ProductQnas.
     * @param {ProductQnaDeleteManyArgs} args - Arguments to filter ProductQnas to delete.
     * @example
     * // Delete a few ProductQnas
     * const { count } = await prisma.productQna.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProductQnaDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductQnaDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductQnas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductQnaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductQnas
     * const productQna = await prisma.productQna.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProductQnaUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ProductQnaUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductQna.
     * @param {ProductQnaUpsertArgs} args - Arguments to update or create a ProductQna.
     * @example
     * // Update or create a ProductQna
     * const productQna = await prisma.productQna.upsert({
     *   create: {
     *     // ... data to create a ProductQna
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductQna we want to update
     *   }
     * })
    **/
    upsert<T extends ProductQnaUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ProductQnaUpsertArgs<ExtArgs>>
    ): Prisma__ProductQnaClient<$Result.GetResult<Prisma.$ProductQnaPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ProductQnas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductQnaCountArgs} args - Arguments to filter ProductQnas to count.
     * @example
     * // Count the number of ProductQnas
     * const count = await prisma.productQna.count({
     *   where: {
     *     // ... the filter for the ProductQnas we want to count
     *   }
     * })
    **/
    count<T extends ProductQnaCountArgs>(
      args?: Subset<T, ProductQnaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductQnaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductQna.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductQnaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductQnaAggregateArgs>(args: Subset<T, ProductQnaAggregateArgs>): Prisma.PrismaPromise<GetProductQnaAggregateType<T>>

    /**
     * Group by ProductQna.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductQnaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductQnaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductQnaGroupByArgs['orderBy'] }
        : { orderBy?: ProductQnaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductQnaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductQnaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductQna model
   */
  readonly fields: ProductQnaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductQna.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductQnaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    reply<T extends ProductQna$replyArgs<ExtArgs> = {}>(args?: Subset<T, ProductQna$replyArgs<ExtArgs>>): Prisma__ProductQnaReplyClient<$Result.GetResult<Prisma.$ProductQnaReplyPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ProductQna model
   */ 
  interface ProductQnaFieldRefs {
    readonly id: FieldRef<"ProductQna", 'Int'>
    readonly content: FieldRef<"ProductQna", 'String'>
    readonly isSecret: FieldRef<"ProductQna", 'Boolean'>
    readonly productId: FieldRef<"ProductQna", 'Int'>
    readonly userId: FieldRef<"ProductQna", 'Int'>
    readonly createdAt: FieldRef<"ProductQna", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductQna", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductQna findUnique
   */
  export type ProductQnaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQna
     */
    select?: ProductQnaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaInclude<ExtArgs> | null
    /**
     * Filter, which ProductQna to fetch.
     */
    where: ProductQnaWhereUniqueInput
  }

  /**
   * ProductQna findUniqueOrThrow
   */
  export type ProductQnaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQna
     */
    select?: ProductQnaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaInclude<ExtArgs> | null
    /**
     * Filter, which ProductQna to fetch.
     */
    where: ProductQnaWhereUniqueInput
  }

  /**
   * ProductQna findFirst
   */
  export type ProductQnaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQna
     */
    select?: ProductQnaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaInclude<ExtArgs> | null
    /**
     * Filter, which ProductQna to fetch.
     */
    where?: ProductQnaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductQnas to fetch.
     */
    orderBy?: ProductQnaOrderByWithRelationInput | ProductQnaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductQnas.
     */
    cursor?: ProductQnaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductQnas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductQnas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductQnas.
     */
    distinct?: ProductQnaScalarFieldEnum | ProductQnaScalarFieldEnum[]
  }

  /**
   * ProductQna findFirstOrThrow
   */
  export type ProductQnaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQna
     */
    select?: ProductQnaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaInclude<ExtArgs> | null
    /**
     * Filter, which ProductQna to fetch.
     */
    where?: ProductQnaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductQnas to fetch.
     */
    orderBy?: ProductQnaOrderByWithRelationInput | ProductQnaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductQnas.
     */
    cursor?: ProductQnaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductQnas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductQnas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductQnas.
     */
    distinct?: ProductQnaScalarFieldEnum | ProductQnaScalarFieldEnum[]
  }

  /**
   * ProductQna findMany
   */
  export type ProductQnaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQna
     */
    select?: ProductQnaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaInclude<ExtArgs> | null
    /**
     * Filter, which ProductQnas to fetch.
     */
    where?: ProductQnaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductQnas to fetch.
     */
    orderBy?: ProductQnaOrderByWithRelationInput | ProductQnaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductQnas.
     */
    cursor?: ProductQnaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductQnas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductQnas.
     */
    skip?: number
    distinct?: ProductQnaScalarFieldEnum | ProductQnaScalarFieldEnum[]
  }

  /**
   * ProductQna create
   */
  export type ProductQnaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQna
     */
    select?: ProductQnaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductQna.
     */
    data: XOR<ProductQnaCreateInput, ProductQnaUncheckedCreateInput>
  }

  /**
   * ProductQna createMany
   */
  export type ProductQnaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductQnas.
     */
    data: ProductQnaCreateManyInput | ProductQnaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductQna createManyAndReturn
   */
  export type ProductQnaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQna
     */
    select?: ProductQnaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaInclude<ExtArgs> | null
    /**
     * The data used to create many ProductQnas.
     */
    data: ProductQnaCreateManyInput | ProductQnaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductQna update
   */
  export type ProductQnaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQna
     */
    select?: ProductQnaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductQna.
     */
    data: XOR<ProductQnaUpdateInput, ProductQnaUncheckedUpdateInput>
    /**
     * Choose, which ProductQna to update.
     */
    where: ProductQnaWhereUniqueInput
  }

  /**
   * ProductQna updateMany
   */
  export type ProductQnaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductQnas.
     */
    data: XOR<ProductQnaUpdateManyMutationInput, ProductQnaUncheckedUpdateManyInput>
    /**
     * Filter which ProductQnas to update
     */
    where?: ProductQnaWhereInput
  }

  /**
   * ProductQna upsert
   */
  export type ProductQnaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQna
     */
    select?: ProductQnaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductQna to update in case it exists.
     */
    where: ProductQnaWhereUniqueInput
    /**
     * In case the ProductQna found by the `where` argument doesn't exist, create a new ProductQna with this data.
     */
    create: XOR<ProductQnaCreateInput, ProductQnaUncheckedCreateInput>
    /**
     * In case the ProductQna was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductQnaUpdateInput, ProductQnaUncheckedUpdateInput>
  }

  /**
   * ProductQna delete
   */
  export type ProductQnaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQna
     */
    select?: ProductQnaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaInclude<ExtArgs> | null
    /**
     * Filter which ProductQna to delete.
     */
    where: ProductQnaWhereUniqueInput
  }

  /**
   * ProductQna deleteMany
   */
  export type ProductQnaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductQnas to delete
     */
    where?: ProductQnaWhereInput
  }

  /**
   * ProductQna.reply
   */
  export type ProductQna$replyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQnaReply
     */
    select?: ProductQnaReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaReplyInclude<ExtArgs> | null
    where?: ProductQnaReplyWhereInput
  }

  /**
   * ProductQna without action
   */
  export type ProductQnaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQna
     */
    select?: ProductQnaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaInclude<ExtArgs> | null
  }


  /**
   * Model ProductQnaReply
   */

  export type AggregateProductQnaReply = {
    _count: ProductQnaReplyCountAggregateOutputType | null
    _avg: ProductQnaReplyAvgAggregateOutputType | null
    _sum: ProductQnaReplySumAggregateOutputType | null
    _min: ProductQnaReplyMinAggregateOutputType | null
    _max: ProductQnaReplyMaxAggregateOutputType | null
  }

  export type ProductQnaReplyAvgAggregateOutputType = {
    id: number | null
    productQnaId: number | null
    adminId: number | null
  }

  export type ProductQnaReplySumAggregateOutputType = {
    id: number | null
    productQnaId: number | null
    adminId: number | null
  }

  export type ProductQnaReplyMinAggregateOutputType = {
    id: number | null
    content: string | null
    productQnaId: number | null
    adminId: number | null
    createdAt: Date | null
  }

  export type ProductQnaReplyMaxAggregateOutputType = {
    id: number | null
    content: string | null
    productQnaId: number | null
    adminId: number | null
    createdAt: Date | null
  }

  export type ProductQnaReplyCountAggregateOutputType = {
    id: number
    content: number
    productQnaId: number
    adminId: number
    createdAt: number
    _all: number
  }


  export type ProductQnaReplyAvgAggregateInputType = {
    id?: true
    productQnaId?: true
    adminId?: true
  }

  export type ProductQnaReplySumAggregateInputType = {
    id?: true
    productQnaId?: true
    adminId?: true
  }

  export type ProductQnaReplyMinAggregateInputType = {
    id?: true
    content?: true
    productQnaId?: true
    adminId?: true
    createdAt?: true
  }

  export type ProductQnaReplyMaxAggregateInputType = {
    id?: true
    content?: true
    productQnaId?: true
    adminId?: true
    createdAt?: true
  }

  export type ProductQnaReplyCountAggregateInputType = {
    id?: true
    content?: true
    productQnaId?: true
    adminId?: true
    createdAt?: true
    _all?: true
  }

  export type ProductQnaReplyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductQnaReply to aggregate.
     */
    where?: ProductQnaReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductQnaReplies to fetch.
     */
    orderBy?: ProductQnaReplyOrderByWithRelationInput | ProductQnaReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductQnaReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductQnaReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductQnaReplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductQnaReplies
    **/
    _count?: true | ProductQnaReplyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductQnaReplyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductQnaReplySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductQnaReplyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductQnaReplyMaxAggregateInputType
  }

  export type GetProductQnaReplyAggregateType<T extends ProductQnaReplyAggregateArgs> = {
        [P in keyof T & keyof AggregateProductQnaReply]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductQnaReply[P]>
      : GetScalarType<T[P], AggregateProductQnaReply[P]>
  }




  export type ProductQnaReplyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductQnaReplyWhereInput
    orderBy?: ProductQnaReplyOrderByWithAggregationInput | ProductQnaReplyOrderByWithAggregationInput[]
    by: ProductQnaReplyScalarFieldEnum[] | ProductQnaReplyScalarFieldEnum
    having?: ProductQnaReplyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductQnaReplyCountAggregateInputType | true
    _avg?: ProductQnaReplyAvgAggregateInputType
    _sum?: ProductQnaReplySumAggregateInputType
    _min?: ProductQnaReplyMinAggregateInputType
    _max?: ProductQnaReplyMaxAggregateInputType
  }

  export type ProductQnaReplyGroupByOutputType = {
    id: number
    content: string
    productQnaId: number
    adminId: number
    createdAt: Date
    _count: ProductQnaReplyCountAggregateOutputType | null
    _avg: ProductQnaReplyAvgAggregateOutputType | null
    _sum: ProductQnaReplySumAggregateOutputType | null
    _min: ProductQnaReplyMinAggregateOutputType | null
    _max: ProductQnaReplyMaxAggregateOutputType | null
  }

  type GetProductQnaReplyGroupByPayload<T extends ProductQnaReplyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductQnaReplyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductQnaReplyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductQnaReplyGroupByOutputType[P]>
            : GetScalarType<T[P], ProductQnaReplyGroupByOutputType[P]>
        }
      >
    >


  export type ProductQnaReplySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    productQnaId?: boolean
    adminId?: boolean
    createdAt?: boolean
    productQna?: boolean | ProductQnaDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productQnaReply"]>

  export type ProductQnaReplySelectScalar = {
    id?: boolean
    content?: boolean
    productQnaId?: boolean
    adminId?: boolean
    createdAt?: boolean
  }


  export type ProductQnaReplyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productQna?: boolean | ProductQnaDefaultArgs<ExtArgs>
    admin?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $ProductQnaReplyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductQnaReply"
    objects: {
      productQna: Prisma.$ProductQnaPayload<ExtArgs>
      admin: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      content: string
      productQnaId: number
      adminId: number
      createdAt: Date
    }, ExtArgs["result"]["productQnaReply"]>
    composites: {}
  }


  type ProductQnaReplyGetPayload<S extends boolean | null | undefined | ProductQnaReplyDefaultArgs> = $Result.GetResult<Prisma.$ProductQnaReplyPayload, S>

  type ProductQnaReplyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductQnaReplyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductQnaReplyCountAggregateInputType | true
    }

  export interface ProductQnaReplyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductQnaReply'], meta: { name: 'ProductQnaReply' } }
    /**
     * Find zero or one ProductQnaReply that matches the filter.
     * @param {ProductQnaReplyFindUniqueArgs} args - Arguments to find a ProductQnaReply
     * @example
     * // Get one ProductQnaReply
     * const productQnaReply = await prisma.productQnaReply.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProductQnaReplyFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ProductQnaReplyFindUniqueArgs<ExtArgs>>
    ): Prisma__ProductQnaReplyClient<$Result.GetResult<Prisma.$ProductQnaReplyPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ProductQnaReply that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductQnaReplyFindUniqueOrThrowArgs} args - Arguments to find a ProductQnaReply
     * @example
     * // Get one ProductQnaReply
     * const productQnaReply = await prisma.productQnaReply.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProductQnaReplyFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductQnaReplyFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ProductQnaReplyClient<$Result.GetResult<Prisma.$ProductQnaReplyPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ProductQnaReply that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductQnaReplyFindFirstArgs} args - Arguments to find a ProductQnaReply
     * @example
     * // Get one ProductQnaReply
     * const productQnaReply = await prisma.productQnaReply.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProductQnaReplyFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductQnaReplyFindFirstArgs<ExtArgs>>
    ): Prisma__ProductQnaReplyClient<$Result.GetResult<Prisma.$ProductQnaReplyPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ProductQnaReply that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductQnaReplyFindFirstOrThrowArgs} args - Arguments to find a ProductQnaReply
     * @example
     * // Get one ProductQnaReply
     * const productQnaReply = await prisma.productQnaReply.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProductQnaReplyFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductQnaReplyFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ProductQnaReplyClient<$Result.GetResult<Prisma.$ProductQnaReplyPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ProductQnaReplies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductQnaReplyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductQnaReplies
     * const productQnaReplies = await prisma.productQnaReply.findMany()
     * 
     * // Get first 10 ProductQnaReplies
     * const productQnaReplies = await prisma.productQnaReply.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productQnaReplyWithIdOnly = await prisma.productQnaReply.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProductQnaReplyFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductQnaReplyFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductQnaReplyPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ProductQnaReply.
     * @param {ProductQnaReplyCreateArgs} args - Arguments to create a ProductQnaReply.
     * @example
     * // Create one ProductQnaReply
     * const ProductQnaReply = await prisma.productQnaReply.create({
     *   data: {
     *     // ... data to create a ProductQnaReply
     *   }
     * })
     * 
    **/
    create<T extends ProductQnaReplyCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ProductQnaReplyCreateArgs<ExtArgs>>
    ): Prisma__ProductQnaReplyClient<$Result.GetResult<Prisma.$ProductQnaReplyPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ProductQnaReplies.
     * @param {ProductQnaReplyCreateManyArgs} args - Arguments to create many ProductQnaReplies.
     * @example
     * // Create many ProductQnaReplies
     * const productQnaReply = await prisma.productQnaReply.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
    **/
    createMany<T extends ProductQnaReplyCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductQnaReplyCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductQnaReplies and returns the data saved in the database.
     * @param {ProductQnaReplyCreateManyAndReturnArgs} args - Arguments to create many ProductQnaReplies.
     * @example
     * // Create many ProductQnaReplies
     * const productQnaReply = await prisma.productQnaReply.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductQnaReplies and only return the `id`
     * const productQnaReplyWithIdOnly = await prisma.productQnaReply.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
    **/
    createManyAndReturn<T extends ProductQnaReplyCreateManyAndReturnArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductQnaReplyCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductQnaReplyPayload<ExtArgs>, T, 'createManyAndReturn'>>

    /**
     * Delete a ProductQnaReply.
     * @param {ProductQnaReplyDeleteArgs} args - Arguments to delete one ProductQnaReply.
     * @example
     * // Delete one ProductQnaReply
     * const ProductQnaReply = await prisma.productQnaReply.delete({
     *   where: {
     *     // ... filter to delete one ProductQnaReply
     *   }
     * })
     * 
    **/
    delete<T extends ProductQnaReplyDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ProductQnaReplyDeleteArgs<ExtArgs>>
    ): Prisma__ProductQnaReplyClient<$Result.GetResult<Prisma.$ProductQnaReplyPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ProductQnaReply.
     * @param {ProductQnaReplyUpdateArgs} args - Arguments to update one ProductQnaReply.
     * @example
     * // Update one ProductQnaReply
     * const productQnaReply = await prisma.productQnaReply.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProductQnaReplyUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ProductQnaReplyUpdateArgs<ExtArgs>>
    ): Prisma__ProductQnaReplyClient<$Result.GetResult<Prisma.$ProductQnaReplyPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ProductQnaReplies.
     * @param {ProductQnaReplyDeleteManyArgs} args - Arguments to filter ProductQnaReplies to delete.
     * @example
     * // Delete a few ProductQnaReplies
     * const { count } = await prisma.productQnaReply.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProductQnaReplyDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ProductQnaReplyDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductQnaReplies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductQnaReplyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductQnaReplies
     * const productQnaReply = await prisma.productQnaReply.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProductQnaReplyUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ProductQnaReplyUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProductQnaReply.
     * @param {ProductQnaReplyUpsertArgs} args - Arguments to update or create a ProductQnaReply.
     * @example
     * // Update or create a ProductQnaReply
     * const productQnaReply = await prisma.productQnaReply.upsert({
     *   create: {
     *     // ... data to create a ProductQnaReply
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductQnaReply we want to update
     *   }
     * })
    **/
    upsert<T extends ProductQnaReplyUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ProductQnaReplyUpsertArgs<ExtArgs>>
    ): Prisma__ProductQnaReplyClient<$Result.GetResult<Prisma.$ProductQnaReplyPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ProductQnaReplies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductQnaReplyCountArgs} args - Arguments to filter ProductQnaReplies to count.
     * @example
     * // Count the number of ProductQnaReplies
     * const count = await prisma.productQnaReply.count({
     *   where: {
     *     // ... the filter for the ProductQnaReplies we want to count
     *   }
     * })
    **/
    count<T extends ProductQnaReplyCountArgs>(
      args?: Subset<T, ProductQnaReplyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductQnaReplyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductQnaReply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductQnaReplyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductQnaReplyAggregateArgs>(args: Subset<T, ProductQnaReplyAggregateArgs>): Prisma.PrismaPromise<GetProductQnaReplyAggregateType<T>>

    /**
     * Group by ProductQnaReply.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductQnaReplyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductQnaReplyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductQnaReplyGroupByArgs['orderBy'] }
        : { orderBy?: ProductQnaReplyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductQnaReplyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductQnaReplyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductQnaReply model
   */
  readonly fields: ProductQnaReplyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductQnaReply.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductQnaReplyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    productQna<T extends ProductQnaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductQnaDefaultArgs<ExtArgs>>): Prisma__ProductQnaClient<$Result.GetResult<Prisma.$ProductQnaPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    admin<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ProductQnaReply model
   */ 
  interface ProductQnaReplyFieldRefs {
    readonly id: FieldRef<"ProductQnaReply", 'Int'>
    readonly content: FieldRef<"ProductQnaReply", 'String'>
    readonly productQnaId: FieldRef<"ProductQnaReply", 'Int'>
    readonly adminId: FieldRef<"ProductQnaReply", 'Int'>
    readonly createdAt: FieldRef<"ProductQnaReply", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductQnaReply findUnique
   */
  export type ProductQnaReplyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQnaReply
     */
    select?: ProductQnaReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaReplyInclude<ExtArgs> | null
    /**
     * Filter, which ProductQnaReply to fetch.
     */
    where: ProductQnaReplyWhereUniqueInput
  }

  /**
   * ProductQnaReply findUniqueOrThrow
   */
  export type ProductQnaReplyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQnaReply
     */
    select?: ProductQnaReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaReplyInclude<ExtArgs> | null
    /**
     * Filter, which ProductQnaReply to fetch.
     */
    where: ProductQnaReplyWhereUniqueInput
  }

  /**
   * ProductQnaReply findFirst
   */
  export type ProductQnaReplyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQnaReply
     */
    select?: ProductQnaReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaReplyInclude<ExtArgs> | null
    /**
     * Filter, which ProductQnaReply to fetch.
     */
    where?: ProductQnaReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductQnaReplies to fetch.
     */
    orderBy?: ProductQnaReplyOrderByWithRelationInput | ProductQnaReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductQnaReplies.
     */
    cursor?: ProductQnaReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductQnaReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductQnaReplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductQnaReplies.
     */
    distinct?: ProductQnaReplyScalarFieldEnum | ProductQnaReplyScalarFieldEnum[]
  }

  /**
   * ProductQnaReply findFirstOrThrow
   */
  export type ProductQnaReplyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQnaReply
     */
    select?: ProductQnaReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaReplyInclude<ExtArgs> | null
    /**
     * Filter, which ProductQnaReply to fetch.
     */
    where?: ProductQnaReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductQnaReplies to fetch.
     */
    orderBy?: ProductQnaReplyOrderByWithRelationInput | ProductQnaReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductQnaReplies.
     */
    cursor?: ProductQnaReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductQnaReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductQnaReplies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductQnaReplies.
     */
    distinct?: ProductQnaReplyScalarFieldEnum | ProductQnaReplyScalarFieldEnum[]
  }

  /**
   * ProductQnaReply findMany
   */
  export type ProductQnaReplyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQnaReply
     */
    select?: ProductQnaReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaReplyInclude<ExtArgs> | null
    /**
     * Filter, which ProductQnaReplies to fetch.
     */
    where?: ProductQnaReplyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductQnaReplies to fetch.
     */
    orderBy?: ProductQnaReplyOrderByWithRelationInput | ProductQnaReplyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductQnaReplies.
     */
    cursor?: ProductQnaReplyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductQnaReplies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductQnaReplies.
     */
    skip?: number
    distinct?: ProductQnaReplyScalarFieldEnum | ProductQnaReplyScalarFieldEnum[]
  }

  /**
   * ProductQnaReply create
   */
  export type ProductQnaReplyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQnaReply
     */
    select?: ProductQnaReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaReplyInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductQnaReply.
     */
    data: XOR<ProductQnaReplyCreateInput, ProductQnaReplyUncheckedCreateInput>
  }

  /**
   * ProductQnaReply createMany
   */
  export type ProductQnaReplyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductQnaReplies.
     */
    data: ProductQnaReplyCreateManyInput | ProductQnaReplyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductQnaReply createManyAndReturn
   */
  export type ProductQnaReplyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQnaReply
     */
    select?: ProductQnaReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaReplyInclude<ExtArgs> | null
    /**
     * The data used to create many ProductQnaReplies.
     */
    data: ProductQnaReplyCreateManyInput | ProductQnaReplyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProductQnaReply update
   */
  export type ProductQnaReplyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQnaReply
     */
    select?: ProductQnaReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaReplyInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductQnaReply.
     */
    data: XOR<ProductQnaReplyUpdateInput, ProductQnaReplyUncheckedUpdateInput>
    /**
     * Choose, which ProductQnaReply to update.
     */
    where: ProductQnaReplyWhereUniqueInput
  }

  /**
   * ProductQnaReply updateMany
   */
  export type ProductQnaReplyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductQnaReplies.
     */
    data: XOR<ProductQnaReplyUpdateManyMutationInput, ProductQnaReplyUncheckedUpdateManyInput>
    /**
     * Filter which ProductQnaReplies to update
     */
    where?: ProductQnaReplyWhereInput
  }

  /**
   * ProductQnaReply upsert
   */
  export type ProductQnaReplyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQnaReply
     */
    select?: ProductQnaReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaReplyInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductQnaReply to update in case it exists.
     */
    where: ProductQnaReplyWhereUniqueInput
    /**
     * In case the ProductQnaReply found by the `where` argument doesn't exist, create a new ProductQnaReply with this data.
     */
    create: XOR<ProductQnaReplyCreateInput, ProductQnaReplyUncheckedCreateInput>
    /**
     * In case the ProductQnaReply was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductQnaReplyUpdateInput, ProductQnaReplyUncheckedUpdateInput>
  }

  /**
   * ProductQnaReply delete
   */
  export type ProductQnaReplyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQnaReply
     */
    select?: ProductQnaReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaReplyInclude<ExtArgs> | null
    /**
     * Filter which ProductQnaReply to delete.
     */
    where: ProductQnaReplyWhereUniqueInput
  }

  /**
   * ProductQnaReply deleteMany
   */
  export type ProductQnaReplyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductQnaReplies to delete
     */
    where?: ProductQnaReplyWhereInput
  }

  /**
   * ProductQnaReply without action
   */
  export type ProductQnaReplyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductQnaReply
     */
    select?: ProductQnaReplySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductQnaReplyInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    username: 'username',
    role: 'role',
    phone: 'phone',
    birthDate: 'birthDate',
    address: 'address',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    parentId: 'parentId',
    slug: 'slug',
    sortOrder: 'sortOrder'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    thumbnail: 'thumbnail',
    images: 'images',
    material: 'material',
    origin: 'origin',
    createdAt: 'createdAt',
    categoryId: 'categoryId'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ProductOptionScalarFieldEnum: {
    id: 'id',
    color: 'color',
    size: 'size',
    price: 'price',
    stock: 'stock',
    status: 'status',
    sale: 'sale',
    productId: 'productId'
  };

  export type ProductOptionScalarFieldEnum = (typeof ProductOptionScalarFieldEnum)[keyof typeof ProductOptionScalarFieldEnum]


  export const CartItemScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    productId: 'productId',
    productOptionId: 'productOptionId',
    quantity: 'quantity',
    createdAt: 'createdAt'
  };

  export type CartItemScalarFieldEnum = (typeof CartItemScalarFieldEnum)[keyof typeof CartItemScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    orderNumber: 'orderNumber',
    createdAt: 'createdAt',
    total: 'total',
    status: 'status',
    userId: 'userId'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    productName: 'productName',
    productImage: 'productImage',
    optionText: 'optionText',
    unitPrice: 'unitPrice',
    quantity: 'quantity',
    totalPrice: 'totalPrice',
    createdAt: 'createdAt'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const ClaimScalarFieldEnum: {
    id: 'id',
    claimNumber: 'claimNumber',
    claimType: 'claimType',
    status: 'status',
    requestedAt: 'requestedAt',
    detail: 'detail',
    orderItemId: 'orderItemId',
    reason: 'reason',
    processedAt: 'processedAt'
  };

  export type ClaimScalarFieldEnum = (typeof ClaimScalarFieldEnum)[keyof typeof ClaimScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    orderItemId: 'orderItemId',
    userId: 'userId',
    rating: 'rating',
    content: 'content',
    createdAt: 'createdAt',
    images: 'images'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const ReviewReplyScalarFieldEnum: {
    id: 'id',
    reviewId: 'reviewId',
    adminId: 'adminId',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type ReviewReplyScalarFieldEnum = (typeof ReviewReplyScalarFieldEnum)[keyof typeof ReviewReplyScalarFieldEnum]


  export const InquiryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type InquiryScalarFieldEnum = (typeof InquiryScalarFieldEnum)[keyof typeof InquiryScalarFieldEnum]


  export const InquiryReplyScalarFieldEnum: {
    id: 'id',
    inquiryId: 'inquiryId',
    adminId: 'adminId',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type InquiryReplyScalarFieldEnum = (typeof InquiryReplyScalarFieldEnum)[keyof typeof InquiryReplyScalarFieldEnum]


  export const ProductQnaScalarFieldEnum: {
    id: 'id',
    content: 'content',
    isSecret: 'isSecret',
    productId: 'productId',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductQnaScalarFieldEnum = (typeof ProductQnaScalarFieldEnum)[keyof typeof ProductQnaScalarFieldEnum]


  export const ProductQnaReplyScalarFieldEnum: {
    id: 'id',
    content: 'content',
    productQnaId: 'productQnaId',
    adminId: 'adminId',
    createdAt: 'createdAt'
  };

  export type ProductQnaReplyScalarFieldEnum = (typeof ProductQnaReplyScalarFieldEnum)[keyof typeof ProductQnaReplyScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'ClaimType'
   */
  export type EnumClaimTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClaimType'>
    


  /**
   * Reference to a field of type 'ClaimType[]'
   */
  export type ListEnumClaimTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClaimType[]'>
    


  /**
   * Reference to a field of type 'ClaimStatus'
   */
  export type EnumClaimStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClaimStatus'>
    


  /**
   * Reference to a field of type 'ClaimStatus[]'
   */
  export type ListEnumClaimStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ClaimStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    birthDate?: DateTimeFilter<"User"> | Date | string
    address?: JsonNullableFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    orders?: OrderListRelationFilter
    reviews?: ReviewListRelationFilter
    reviewReplies?: ReviewReplyListRelationFilter
    inquiries?: InquiryListRelationFilter
    inquiryReplies?: InquiryReplyListRelationFilter
    productQnas?: ProductQnaListRelationFilter
    productQnaReplies?: ProductQnaReplyListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    username?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    birthDate?: SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    orders?: OrderOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    reviewReplies?: ReviewReplyOrderByRelationAggregateInput
    inquiries?: InquiryOrderByRelationAggregateInput
    inquiryReplies?: InquiryReplyOrderByRelationAggregateInput
    productQnas?: ProductQnaOrderByRelationAggregateInput
    productQnaReplies?: ProductQnaReplyOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    username?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    birthDate?: DateTimeFilter<"User"> | Date | string
    address?: JsonNullableFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    orders?: OrderListRelationFilter
    reviews?: ReviewListRelationFilter
    reviewReplies?: ReviewReplyListRelationFilter
    inquiries?: InquiryListRelationFilter
    inquiryReplies?: InquiryReplyListRelationFilter
    productQnas?: ProductQnaListRelationFilter
    productQnaReplies?: ProductQnaReplyListRelationFilter
  }, "id" | "email" | "username" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    username?: SortOrder
    role?: SortOrder
    phone?: SortOrderInput | SortOrder
    birthDate?: SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    birthDate?: DateTimeWithAggregatesFilter<"User"> | Date | string
    address?: JsonNullableWithAggregatesFilter<"User">
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    parentId?: IntNullableFilter<"Category"> | number | null
    slug?: StringFilter<"Category"> | string
    sortOrder?: IntNullableFilter<"Category"> | number | null
    parent?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null
    children?: CategoryListRelationFilter
    products?: ProductListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrderInput | SortOrder
    slug?: SortOrder
    sortOrder?: SortOrderInput | SortOrder
    parent?: CategoryOrderByWithRelationInput
    children?: CategoryOrderByRelationAggregateInput
    products?: ProductOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    slug?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    parentId?: IntNullableFilter<"Category"> | number | null
    sortOrder?: IntNullableFilter<"Category"> | number | null
    parent?: XOR<CategoryNullableRelationFilter, CategoryWhereInput> | null
    children?: CategoryListRelationFilter
    products?: ProductListRelationFilter
  }, "id" | "slug">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrderInput | SortOrder
    slug?: SortOrder
    sortOrder?: SortOrderInput | SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
    name?: StringWithAggregatesFilter<"Category"> | string
    parentId?: IntNullableWithAggregatesFilter<"Category"> | number | null
    slug?: StringWithAggregatesFilter<"Category"> | string
    sortOrder?: IntNullableWithAggregatesFilter<"Category"> | number | null
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: IntFilter<"Product"> | number
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    thumbnail?: StringNullableFilter<"Product"> | string | null
    images?: StringNullableListFilter<"Product">
    material?: StringFilter<"Product"> | string
    origin?: StringFilter<"Product"> | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
    categoryId?: IntFilter<"Product"> | number
    options?: ProductOptionListRelationFilter
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    cartItems?: CartItemListRelationFilter
    orderItems?: OrderItemListRelationFilter
    productQnas?: ProductQnaListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    thumbnail?: SortOrderInput | SortOrder
    images?: SortOrder
    material?: SortOrder
    origin?: SortOrder
    createdAt?: SortOrder
    categoryId?: SortOrder
    options?: ProductOptionOrderByRelationAggregateInput
    category?: CategoryOrderByWithRelationInput
    cartItems?: CartItemOrderByRelationAggregateInput
    orderItems?: OrderItemOrderByRelationAggregateInput
    productQnas?: ProductQnaOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    thumbnail?: StringNullableFilter<"Product"> | string | null
    images?: StringNullableListFilter<"Product">
    material?: StringFilter<"Product"> | string
    origin?: StringFilter<"Product"> | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
    categoryId?: IntFilter<"Product"> | number
    options?: ProductOptionListRelationFilter
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    cartItems?: CartItemListRelationFilter
    orderItems?: OrderItemListRelationFilter
    productQnas?: ProductQnaListRelationFilter
  }, "id">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    thumbnail?: SortOrderInput | SortOrder
    images?: SortOrder
    material?: SortOrder
    origin?: SortOrder
    createdAt?: SortOrder
    categoryId?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Product"> | number
    name?: StringWithAggregatesFilter<"Product"> | string
    description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    thumbnail?: StringNullableWithAggregatesFilter<"Product"> | string | null
    images?: StringNullableListFilter<"Product">
    material?: StringWithAggregatesFilter<"Product"> | string
    origin?: StringWithAggregatesFilter<"Product"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    categoryId?: IntWithAggregatesFilter<"Product"> | number
  }

  export type ProductOptionWhereInput = {
    AND?: ProductOptionWhereInput | ProductOptionWhereInput[]
    OR?: ProductOptionWhereInput[]
    NOT?: ProductOptionWhereInput | ProductOptionWhereInput[]
    id?: IntFilter<"ProductOption"> | number
    color?: StringNullableFilter<"ProductOption"> | string | null
    size?: StringNullableFilter<"ProductOption"> | string | null
    price?: IntFilter<"ProductOption"> | number
    stock?: IntFilter<"ProductOption"> | number
    status?: StringFilter<"ProductOption"> | string
    sale?: IntNullableFilter<"ProductOption"> | number | null
    productId?: IntFilter<"ProductOption"> | number
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    cartItems?: CartItemListRelationFilter
  }

  export type ProductOptionOrderByWithRelationInput = {
    id?: SortOrder
    color?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    price?: SortOrder
    stock?: SortOrder
    status?: SortOrder
    sale?: SortOrderInput | SortOrder
    productId?: SortOrder
    product?: ProductOrderByWithRelationInput
    cartItems?: CartItemOrderByRelationAggregateInput
  }

  export type ProductOptionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductOptionWhereInput | ProductOptionWhereInput[]
    OR?: ProductOptionWhereInput[]
    NOT?: ProductOptionWhereInput | ProductOptionWhereInput[]
    color?: StringNullableFilter<"ProductOption"> | string | null
    size?: StringNullableFilter<"ProductOption"> | string | null
    price?: IntFilter<"ProductOption"> | number
    stock?: IntFilter<"ProductOption"> | number
    status?: StringFilter<"ProductOption"> | string
    sale?: IntNullableFilter<"ProductOption"> | number | null
    productId?: IntFilter<"ProductOption"> | number
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    cartItems?: CartItemListRelationFilter
  }, "id">

  export type ProductOptionOrderByWithAggregationInput = {
    id?: SortOrder
    color?: SortOrderInput | SortOrder
    size?: SortOrderInput | SortOrder
    price?: SortOrder
    stock?: SortOrder
    status?: SortOrder
    sale?: SortOrderInput | SortOrder
    productId?: SortOrder
    _count?: ProductOptionCountOrderByAggregateInput
    _avg?: ProductOptionAvgOrderByAggregateInput
    _max?: ProductOptionMaxOrderByAggregateInput
    _min?: ProductOptionMinOrderByAggregateInput
    _sum?: ProductOptionSumOrderByAggregateInput
  }

  export type ProductOptionScalarWhereWithAggregatesInput = {
    AND?: ProductOptionScalarWhereWithAggregatesInput | ProductOptionScalarWhereWithAggregatesInput[]
    OR?: ProductOptionScalarWhereWithAggregatesInput[]
    NOT?: ProductOptionScalarWhereWithAggregatesInput | ProductOptionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductOption"> | number
    color?: StringNullableWithAggregatesFilter<"ProductOption"> | string | null
    size?: StringNullableWithAggregatesFilter<"ProductOption"> | string | null
    price?: IntWithAggregatesFilter<"ProductOption"> | number
    stock?: IntWithAggregatesFilter<"ProductOption"> | number
    status?: StringWithAggregatesFilter<"ProductOption"> | string
    sale?: IntNullableWithAggregatesFilter<"ProductOption"> | number | null
    productId?: IntWithAggregatesFilter<"ProductOption"> | number
  }

  export type CartItemWhereInput = {
    AND?: CartItemWhereInput | CartItemWhereInput[]
    OR?: CartItemWhereInput[]
    NOT?: CartItemWhereInput | CartItemWhereInput[]
    id?: IntFilter<"CartItem"> | number
    userId?: IntFilter<"CartItem"> | number
    productId?: IntFilter<"CartItem"> | number
    productOptionId?: IntFilter<"CartItem"> | number
    quantity?: IntFilter<"CartItem"> | number
    createdAt?: DateTimeFilter<"CartItem"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    option?: XOR<ProductOptionRelationFilter, ProductOptionWhereInput>
  }

  export type CartItemOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    productOptionId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    option?: ProductOptionOrderByWithRelationInput
  }

  export type CartItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CartItemWhereInput | CartItemWhereInput[]
    OR?: CartItemWhereInput[]
    NOT?: CartItemWhereInput | CartItemWhereInput[]
    userId?: IntFilter<"CartItem"> | number
    productId?: IntFilter<"CartItem"> | number
    productOptionId?: IntFilter<"CartItem"> | number
    quantity?: IntFilter<"CartItem"> | number
    createdAt?: DateTimeFilter<"CartItem"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    option?: XOR<ProductOptionRelationFilter, ProductOptionWhereInput>
  }, "id">

  export type CartItemOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    productOptionId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    _count?: CartItemCountOrderByAggregateInput
    _avg?: CartItemAvgOrderByAggregateInput
    _max?: CartItemMaxOrderByAggregateInput
    _min?: CartItemMinOrderByAggregateInput
    _sum?: CartItemSumOrderByAggregateInput
  }

  export type CartItemScalarWhereWithAggregatesInput = {
    AND?: CartItemScalarWhereWithAggregatesInput | CartItemScalarWhereWithAggregatesInput[]
    OR?: CartItemScalarWhereWithAggregatesInput[]
    NOT?: CartItemScalarWhereWithAggregatesInput | CartItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CartItem"> | number
    userId?: IntWithAggregatesFilter<"CartItem"> | number
    productId?: IntWithAggregatesFilter<"CartItem"> | number
    productOptionId?: IntWithAggregatesFilter<"CartItem"> | number
    quantity?: IntWithAggregatesFilter<"CartItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"CartItem"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: IntFilter<"Order"> | number
    orderNumber?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    total?: IntFilter<"Order"> | number
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    userId?: IntFilter<"Order"> | number
    user?: XOR<UserRelationFilter, UserWhereInput>
    items?: OrderItemListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    createdAt?: SortOrder
    total?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    items?: OrderItemOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    orderNumber?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    createdAt?: DateTimeFilter<"Order"> | Date | string
    total?: IntFilter<"Order"> | number
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    userId?: IntFilter<"Order"> | number
    user?: XOR<UserRelationFilter, UserWhereInput>
    items?: OrderItemListRelationFilter
  }, "id" | "orderNumber">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    createdAt?: SortOrder
    total?: SortOrder
    status?: SortOrder
    userId?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Order"> | number
    orderNumber?: StringWithAggregatesFilter<"Order"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    total?: IntWithAggregatesFilter<"Order"> | number
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    userId?: IntWithAggregatesFilter<"Order"> | number
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: IntFilter<"OrderItem"> | number
    orderId?: IntFilter<"OrderItem"> | number
    productId?: IntFilter<"OrderItem"> | number
    productName?: StringFilter<"OrderItem"> | string
    productImage?: StringNullableFilter<"OrderItem"> | string | null
    optionText?: StringNullableFilter<"OrderItem"> | string | null
    unitPrice?: IntFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    totalPrice?: IntFilter<"OrderItem"> | number
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
    order?: XOR<OrderRelationFilter, OrderWhereInput>
    reviews?: ReviewListRelationFilter
    claims?: ClaimListRelationFilter
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    productImage?: SortOrderInput | SortOrder
    optionText?: SortOrderInput | SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    reviews?: ReviewOrderByRelationAggregateInput
    claims?: ClaimOrderByRelationAggregateInput
    product?: ProductOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: IntFilter<"OrderItem"> | number
    productId?: IntFilter<"OrderItem"> | number
    productName?: StringFilter<"OrderItem"> | string
    productImage?: StringNullableFilter<"OrderItem"> | string | null
    optionText?: StringNullableFilter<"OrderItem"> | string | null
    unitPrice?: IntFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    totalPrice?: IntFilter<"OrderItem"> | number
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
    order?: XOR<OrderRelationFilter, OrderWhereInput>
    reviews?: ReviewListRelationFilter
    claims?: ClaimListRelationFilter
    product?: XOR<ProductRelationFilter, ProductWhereInput>
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    productImage?: SortOrderInput | SortOrder
    optionText?: SortOrderInput | SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OrderItem"> | number
    orderId?: IntWithAggregatesFilter<"OrderItem"> | number
    productId?: IntWithAggregatesFilter<"OrderItem"> | number
    productName?: StringWithAggregatesFilter<"OrderItem"> | string
    productImage?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
    optionText?: StringNullableWithAggregatesFilter<"OrderItem"> | string | null
    unitPrice?: IntWithAggregatesFilter<"OrderItem"> | number
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    totalPrice?: IntWithAggregatesFilter<"OrderItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"OrderItem"> | Date | string
  }

  export type ClaimWhereInput = {
    AND?: ClaimWhereInput | ClaimWhereInput[]
    OR?: ClaimWhereInput[]
    NOT?: ClaimWhereInput | ClaimWhereInput[]
    id?: IntFilter<"Claim"> | number
    claimNumber?: StringFilter<"Claim"> | string
    claimType?: EnumClaimTypeFilter<"Claim"> | $Enums.ClaimType
    status?: EnumClaimStatusFilter<"Claim"> | $Enums.ClaimStatus
    requestedAt?: DateTimeFilter<"Claim"> | Date | string
    detail?: StringFilter<"Claim"> | string
    orderItemId?: IntNullableFilter<"Claim"> | number | null
    reason?: StringNullableFilter<"Claim"> | string | null
    processedAt?: DateTimeNullableFilter<"Claim"> | Date | string | null
    orderItem?: XOR<OrderItemNullableRelationFilter, OrderItemWhereInput> | null
  }

  export type ClaimOrderByWithRelationInput = {
    id?: SortOrder
    claimNumber?: SortOrder
    claimType?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    detail?: SortOrder
    orderItemId?: SortOrderInput | SortOrder
    reason?: SortOrderInput | SortOrder
    processedAt?: SortOrderInput | SortOrder
    orderItem?: OrderItemOrderByWithRelationInput
  }

  export type ClaimWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    claimNumber?: string
    AND?: ClaimWhereInput | ClaimWhereInput[]
    OR?: ClaimWhereInput[]
    NOT?: ClaimWhereInput | ClaimWhereInput[]
    claimType?: EnumClaimTypeFilter<"Claim"> | $Enums.ClaimType
    status?: EnumClaimStatusFilter<"Claim"> | $Enums.ClaimStatus
    requestedAt?: DateTimeFilter<"Claim"> | Date | string
    detail?: StringFilter<"Claim"> | string
    orderItemId?: IntNullableFilter<"Claim"> | number | null
    reason?: StringNullableFilter<"Claim"> | string | null
    processedAt?: DateTimeNullableFilter<"Claim"> | Date | string | null
    orderItem?: XOR<OrderItemNullableRelationFilter, OrderItemWhereInput> | null
  }, "id" | "claimNumber">

  export type ClaimOrderByWithAggregationInput = {
    id?: SortOrder
    claimNumber?: SortOrder
    claimType?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    detail?: SortOrder
    orderItemId?: SortOrderInput | SortOrder
    reason?: SortOrderInput | SortOrder
    processedAt?: SortOrderInput | SortOrder
    _count?: ClaimCountOrderByAggregateInput
    _avg?: ClaimAvgOrderByAggregateInput
    _max?: ClaimMaxOrderByAggregateInput
    _min?: ClaimMinOrderByAggregateInput
    _sum?: ClaimSumOrderByAggregateInput
  }

  export type ClaimScalarWhereWithAggregatesInput = {
    AND?: ClaimScalarWhereWithAggregatesInput | ClaimScalarWhereWithAggregatesInput[]
    OR?: ClaimScalarWhereWithAggregatesInput[]
    NOT?: ClaimScalarWhereWithAggregatesInput | ClaimScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Claim"> | number
    claimNumber?: StringWithAggregatesFilter<"Claim"> | string
    claimType?: EnumClaimTypeWithAggregatesFilter<"Claim"> | $Enums.ClaimType
    status?: EnumClaimStatusWithAggregatesFilter<"Claim"> | $Enums.ClaimStatus
    requestedAt?: DateTimeWithAggregatesFilter<"Claim"> | Date | string
    detail?: StringWithAggregatesFilter<"Claim"> | string
    orderItemId?: IntNullableWithAggregatesFilter<"Claim"> | number | null
    reason?: StringNullableWithAggregatesFilter<"Claim"> | string | null
    processedAt?: DateTimeNullableWithAggregatesFilter<"Claim"> | Date | string | null
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: IntFilter<"Review"> | number
    orderItemId?: IntFilter<"Review"> | number
    userId?: IntFilter<"Review"> | number
    rating?: IntFilter<"Review"> | number
    content?: StringFilter<"Review"> | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
    images?: StringNullableListFilter<"Review">
    orderItem?: XOR<OrderItemRelationFilter, OrderItemWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    reply?: XOR<ReviewReplyNullableRelationFilter, ReviewReplyWhereInput> | null
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    orderItemId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    images?: SortOrder
    orderItem?: OrderItemOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    reply?: ReviewReplyOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    orderItemId?: number
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    userId?: IntFilter<"Review"> | number
    rating?: IntFilter<"Review"> | number
    content?: StringFilter<"Review"> | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
    images?: StringNullableListFilter<"Review">
    orderItem?: XOR<OrderItemRelationFilter, OrderItemWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    reply?: XOR<ReviewReplyNullableRelationFilter, ReviewReplyWhereInput> | null
  }, "id" | "orderItemId">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    orderItemId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    images?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Review"> | number
    orderItemId?: IntWithAggregatesFilter<"Review"> | number
    userId?: IntWithAggregatesFilter<"Review"> | number
    rating?: IntWithAggregatesFilter<"Review"> | number
    content?: StringWithAggregatesFilter<"Review"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    images?: StringNullableListFilter<"Review">
  }

  export type ReviewReplyWhereInput = {
    AND?: ReviewReplyWhereInput | ReviewReplyWhereInput[]
    OR?: ReviewReplyWhereInput[]
    NOT?: ReviewReplyWhereInput | ReviewReplyWhereInput[]
    id?: IntFilter<"ReviewReply"> | number
    reviewId?: IntFilter<"ReviewReply"> | number
    adminId?: IntFilter<"ReviewReply"> | number
    content?: StringFilter<"ReviewReply"> | string
    createdAt?: DateTimeFilter<"ReviewReply"> | Date | string
    review?: XOR<ReviewRelationFilter, ReviewWhereInput>
    admin?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ReviewReplyOrderByWithRelationInput = {
    id?: SortOrder
    reviewId?: SortOrder
    adminId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    review?: ReviewOrderByWithRelationInput
    admin?: UserOrderByWithRelationInput
  }

  export type ReviewReplyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    reviewId?: number
    AND?: ReviewReplyWhereInput | ReviewReplyWhereInput[]
    OR?: ReviewReplyWhereInput[]
    NOT?: ReviewReplyWhereInput | ReviewReplyWhereInput[]
    adminId?: IntFilter<"ReviewReply"> | number
    content?: StringFilter<"ReviewReply"> | string
    createdAt?: DateTimeFilter<"ReviewReply"> | Date | string
    review?: XOR<ReviewRelationFilter, ReviewWhereInput>
    admin?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "reviewId">

  export type ReviewReplyOrderByWithAggregationInput = {
    id?: SortOrder
    reviewId?: SortOrder
    adminId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: ReviewReplyCountOrderByAggregateInput
    _avg?: ReviewReplyAvgOrderByAggregateInput
    _max?: ReviewReplyMaxOrderByAggregateInput
    _min?: ReviewReplyMinOrderByAggregateInput
    _sum?: ReviewReplySumOrderByAggregateInput
  }

  export type ReviewReplyScalarWhereWithAggregatesInput = {
    AND?: ReviewReplyScalarWhereWithAggregatesInput | ReviewReplyScalarWhereWithAggregatesInput[]
    OR?: ReviewReplyScalarWhereWithAggregatesInput[]
    NOT?: ReviewReplyScalarWhereWithAggregatesInput | ReviewReplyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ReviewReply"> | number
    reviewId?: IntWithAggregatesFilter<"ReviewReply"> | number
    adminId?: IntWithAggregatesFilter<"ReviewReply"> | number
    content?: StringWithAggregatesFilter<"ReviewReply"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ReviewReply"> | Date | string
  }

  export type InquiryWhereInput = {
    AND?: InquiryWhereInput | InquiryWhereInput[]
    OR?: InquiryWhereInput[]
    NOT?: InquiryWhereInput | InquiryWhereInput[]
    id?: IntFilter<"Inquiry"> | number
    userId?: IntFilter<"Inquiry"> | number
    content?: StringFilter<"Inquiry"> | string
    createdAt?: DateTimeFilter<"Inquiry"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    replies?: InquiryReplyListRelationFilter
  }

  export type InquiryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    replies?: InquiryReplyOrderByRelationAggregateInput
  }

  export type InquiryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InquiryWhereInput | InquiryWhereInput[]
    OR?: InquiryWhereInput[]
    NOT?: InquiryWhereInput | InquiryWhereInput[]
    userId?: IntFilter<"Inquiry"> | number
    content?: StringFilter<"Inquiry"> | string
    createdAt?: DateTimeFilter<"Inquiry"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    replies?: InquiryReplyListRelationFilter
  }, "id">

  export type InquiryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: InquiryCountOrderByAggregateInput
    _avg?: InquiryAvgOrderByAggregateInput
    _max?: InquiryMaxOrderByAggregateInput
    _min?: InquiryMinOrderByAggregateInput
    _sum?: InquirySumOrderByAggregateInput
  }

  export type InquiryScalarWhereWithAggregatesInput = {
    AND?: InquiryScalarWhereWithAggregatesInput | InquiryScalarWhereWithAggregatesInput[]
    OR?: InquiryScalarWhereWithAggregatesInput[]
    NOT?: InquiryScalarWhereWithAggregatesInput | InquiryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Inquiry"> | number
    userId?: IntWithAggregatesFilter<"Inquiry"> | number
    content?: StringWithAggregatesFilter<"Inquiry"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Inquiry"> | Date | string
  }

  export type InquiryReplyWhereInput = {
    AND?: InquiryReplyWhereInput | InquiryReplyWhereInput[]
    OR?: InquiryReplyWhereInput[]
    NOT?: InquiryReplyWhereInput | InquiryReplyWhereInput[]
    id?: IntFilter<"InquiryReply"> | number
    inquiryId?: IntFilter<"InquiryReply"> | number
    adminId?: IntFilter<"InquiryReply"> | number
    content?: StringFilter<"InquiryReply"> | string
    createdAt?: DateTimeFilter<"InquiryReply"> | Date | string
    inquiry?: XOR<InquiryRelationFilter, InquiryWhereInput>
    admin?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type InquiryReplyOrderByWithRelationInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    adminId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    inquiry?: InquiryOrderByWithRelationInput
    admin?: UserOrderByWithRelationInput
  }

  export type InquiryReplyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: InquiryReplyWhereInput | InquiryReplyWhereInput[]
    OR?: InquiryReplyWhereInput[]
    NOT?: InquiryReplyWhereInput | InquiryReplyWhereInput[]
    inquiryId?: IntFilter<"InquiryReply"> | number
    adminId?: IntFilter<"InquiryReply"> | number
    content?: StringFilter<"InquiryReply"> | string
    createdAt?: DateTimeFilter<"InquiryReply"> | Date | string
    inquiry?: XOR<InquiryRelationFilter, InquiryWhereInput>
    admin?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type InquiryReplyOrderByWithAggregationInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    adminId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: InquiryReplyCountOrderByAggregateInput
    _avg?: InquiryReplyAvgOrderByAggregateInput
    _max?: InquiryReplyMaxOrderByAggregateInput
    _min?: InquiryReplyMinOrderByAggregateInput
    _sum?: InquiryReplySumOrderByAggregateInput
  }

  export type InquiryReplyScalarWhereWithAggregatesInput = {
    AND?: InquiryReplyScalarWhereWithAggregatesInput | InquiryReplyScalarWhereWithAggregatesInput[]
    OR?: InquiryReplyScalarWhereWithAggregatesInput[]
    NOT?: InquiryReplyScalarWhereWithAggregatesInput | InquiryReplyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"InquiryReply"> | number
    inquiryId?: IntWithAggregatesFilter<"InquiryReply"> | number
    adminId?: IntWithAggregatesFilter<"InquiryReply"> | number
    content?: StringWithAggregatesFilter<"InquiryReply"> | string
    createdAt?: DateTimeWithAggregatesFilter<"InquiryReply"> | Date | string
  }

  export type ProductQnaWhereInput = {
    AND?: ProductQnaWhereInput | ProductQnaWhereInput[]
    OR?: ProductQnaWhereInput[]
    NOT?: ProductQnaWhereInput | ProductQnaWhereInput[]
    id?: IntFilter<"ProductQna"> | number
    content?: StringFilter<"ProductQna"> | string
    isSecret?: BoolFilter<"ProductQna"> | boolean
    productId?: IntFilter<"ProductQna"> | number
    userId?: IntFilter<"ProductQna"> | number
    createdAt?: DateTimeFilter<"ProductQna"> | Date | string
    updatedAt?: DateTimeFilter<"ProductQna"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    reply?: XOR<ProductQnaReplyNullableRelationFilter, ProductQnaReplyWhereInput> | null
  }

  export type ProductQnaOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    isSecret?: SortOrder
    productId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
    reply?: ProductQnaReplyOrderByWithRelationInput
  }

  export type ProductQnaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ProductQnaWhereInput | ProductQnaWhereInput[]
    OR?: ProductQnaWhereInput[]
    NOT?: ProductQnaWhereInput | ProductQnaWhereInput[]
    content?: StringFilter<"ProductQna"> | string
    isSecret?: BoolFilter<"ProductQna"> | boolean
    productId?: IntFilter<"ProductQna"> | number
    userId?: IntFilter<"ProductQna"> | number
    createdAt?: DateTimeFilter<"ProductQna"> | Date | string
    updatedAt?: DateTimeFilter<"ProductQna"> | Date | string
    product?: XOR<ProductRelationFilter, ProductWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
    reply?: XOR<ProductQnaReplyNullableRelationFilter, ProductQnaReplyWhereInput> | null
  }, "id">

  export type ProductQnaOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    isSecret?: SortOrder
    productId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductQnaCountOrderByAggregateInput
    _avg?: ProductQnaAvgOrderByAggregateInput
    _max?: ProductQnaMaxOrderByAggregateInput
    _min?: ProductQnaMinOrderByAggregateInput
    _sum?: ProductQnaSumOrderByAggregateInput
  }

  export type ProductQnaScalarWhereWithAggregatesInput = {
    AND?: ProductQnaScalarWhereWithAggregatesInput | ProductQnaScalarWhereWithAggregatesInput[]
    OR?: ProductQnaScalarWhereWithAggregatesInput[]
    NOT?: ProductQnaScalarWhereWithAggregatesInput | ProductQnaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductQna"> | number
    content?: StringWithAggregatesFilter<"ProductQna"> | string
    isSecret?: BoolWithAggregatesFilter<"ProductQna"> | boolean
    productId?: IntWithAggregatesFilter<"ProductQna"> | number
    userId?: IntWithAggregatesFilter<"ProductQna"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ProductQna"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductQna"> | Date | string
  }

  export type ProductQnaReplyWhereInput = {
    AND?: ProductQnaReplyWhereInput | ProductQnaReplyWhereInput[]
    OR?: ProductQnaReplyWhereInput[]
    NOT?: ProductQnaReplyWhereInput | ProductQnaReplyWhereInput[]
    id?: IntFilter<"ProductQnaReply"> | number
    content?: StringFilter<"ProductQnaReply"> | string
    productQnaId?: IntFilter<"ProductQnaReply"> | number
    adminId?: IntFilter<"ProductQnaReply"> | number
    createdAt?: DateTimeFilter<"ProductQnaReply"> | Date | string
    productQna?: XOR<ProductQnaRelationFilter, ProductQnaWhereInput>
    admin?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ProductQnaReplyOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    productQnaId?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    productQna?: ProductQnaOrderByWithRelationInput
    admin?: UserOrderByWithRelationInput
  }

  export type ProductQnaReplyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    productQnaId?: number
    AND?: ProductQnaReplyWhereInput | ProductQnaReplyWhereInput[]
    OR?: ProductQnaReplyWhereInput[]
    NOT?: ProductQnaReplyWhereInput | ProductQnaReplyWhereInput[]
    content?: StringFilter<"ProductQnaReply"> | string
    adminId?: IntFilter<"ProductQnaReply"> | number
    createdAt?: DateTimeFilter<"ProductQnaReply"> | Date | string
    productQna?: XOR<ProductQnaRelationFilter, ProductQnaWhereInput>
    admin?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "productQnaId">

  export type ProductQnaReplyOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    productQnaId?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
    _count?: ProductQnaReplyCountOrderByAggregateInput
    _avg?: ProductQnaReplyAvgOrderByAggregateInput
    _max?: ProductQnaReplyMaxOrderByAggregateInput
    _min?: ProductQnaReplyMinOrderByAggregateInput
    _sum?: ProductQnaReplySumOrderByAggregateInput
  }

  export type ProductQnaReplyScalarWhereWithAggregatesInput = {
    AND?: ProductQnaReplyScalarWhereWithAggregatesInput | ProductQnaReplyScalarWhereWithAggregatesInput[]
    OR?: ProductQnaReplyScalarWhereWithAggregatesInput[]
    NOT?: ProductQnaReplyScalarWhereWithAggregatesInput | ProductQnaReplyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ProductQnaReply"> | number
    content?: StringWithAggregatesFilter<"ProductQnaReply"> | string
    productQnaId?: IntWithAggregatesFilter<"ProductQnaReply"> | number
    adminId?: IntWithAggregatesFilter<"ProductQnaReply"> | number
    createdAt?: DateTimeWithAggregatesFilter<"ProductQnaReply"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    reviewReplies?: ReviewReplyCreateNestedManyWithoutAdminInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    inquiryReplies?: InquiryReplyCreateNestedManyWithoutAdminInput
    productQnas?: ProductQnaCreateNestedManyWithoutUserInput
    productQnaReplies?: ProductQnaReplyCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    reviewReplies?: ReviewReplyUncheckedCreateNestedManyWithoutAdminInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    inquiryReplies?: InquiryReplyUncheckedCreateNestedManyWithoutAdminInput
    productQnas?: ProductQnaUncheckedCreateNestedManyWithoutUserInput
    productQnaReplies?: ProductQnaReplyUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    reviewReplies?: ReviewReplyUpdateManyWithoutAdminNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    inquiryReplies?: InquiryReplyUpdateManyWithoutAdminNestedInput
    productQnas?: ProductQnaUpdateManyWithoutUserNestedInput
    productQnaReplies?: ProductQnaReplyUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    reviewReplies?: ReviewReplyUncheckedUpdateManyWithoutAdminNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    inquiryReplies?: InquiryReplyUncheckedUpdateManyWithoutAdminNestedInput
    productQnas?: ProductQnaUncheckedUpdateManyWithoutUserNestedInput
    productQnaReplies?: ProductQnaReplyUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    name: string
    slug: string
    sortOrder?: number | null
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    name: string
    parentId?: number | null
    slug: string
    sortOrder?: number | null
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    sortOrder?: NullableIntFieldUpdateOperationsInput | number | null
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    slug?: StringFieldUpdateOperationsInput | string
    sortOrder?: NullableIntFieldUpdateOperationsInput | number | null
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    name: string
    parentId?: number | null
    slug: string
    sortOrder?: number | null
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    sortOrder?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    slug?: StringFieldUpdateOperationsInput | string
    sortOrder?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProductCreateInput = {
    name: string
    description?: string | null
    thumbnail?: string | null
    images?: ProductCreateimagesInput | string[]
    material?: string
    origin?: string
    createdAt?: Date | string
    options?: ProductOptionCreateNestedManyWithoutProductInput
    category: CategoryCreateNestedOneWithoutProductsInput
    cartItems?: CartItemCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
    productQnas?: ProductQnaCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    thumbnail?: string | null
    images?: ProductCreateimagesInput | string[]
    material?: string
    origin?: string
    createdAt?: Date | string
    categoryId: number
    options?: ProductOptionUncheckedCreateNestedManyWithoutProductInput
    cartItems?: CartItemUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    productQnas?: ProductQnaUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    images?: ProductUpdateimagesInput | string[]
    material?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: ProductOptionUpdateManyWithoutProductNestedInput
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    cartItems?: CartItemUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
    productQnas?: ProductQnaUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    images?: ProductUpdateimagesInput | string[]
    material?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: IntFieldUpdateOperationsInput | number
    options?: ProductOptionUncheckedUpdateManyWithoutProductNestedInput
    cartItems?: CartItemUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    productQnas?: ProductQnaUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    thumbnail?: string | null
    images?: ProductCreateimagesInput | string[]
    material?: string
    origin?: string
    createdAt?: Date | string
    categoryId: number
  }

  export type ProductUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    images?: ProductUpdateimagesInput | string[]
    material?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    images?: ProductUpdateimagesInput | string[]
    material?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: IntFieldUpdateOperationsInput | number
  }

  export type ProductOptionCreateInput = {
    color?: string | null
    size?: string | null
    price: number
    stock: number
    status?: string
    sale?: number | null
    product: ProductCreateNestedOneWithoutOptionsInput
    cartItems?: CartItemCreateNestedManyWithoutOptionInput
  }

  export type ProductOptionUncheckedCreateInput = {
    id?: number
    color?: string | null
    size?: string | null
    price: number
    stock: number
    status?: string
    sale?: number | null
    productId: number
    cartItems?: CartItemUncheckedCreateNestedManyWithoutOptionInput
  }

  export type ProductOptionUpdateInput = {
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sale?: NullableIntFieldUpdateOperationsInput | number | null
    product?: ProductUpdateOneRequiredWithoutOptionsNestedInput
    cartItems?: CartItemUpdateManyWithoutOptionNestedInput
  }

  export type ProductOptionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sale?: NullableIntFieldUpdateOperationsInput | number | null
    productId?: IntFieldUpdateOperationsInput | number
    cartItems?: CartItemUncheckedUpdateManyWithoutOptionNestedInput
  }

  export type ProductOptionCreateManyInput = {
    id?: number
    color?: string | null
    size?: string | null
    price: number
    stock: number
    status?: string
    sale?: number | null
    productId: number
  }

  export type ProductOptionUpdateManyMutationInput = {
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sale?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProductOptionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sale?: NullableIntFieldUpdateOperationsInput | number | null
    productId?: IntFieldUpdateOperationsInput | number
  }

  export type CartItemCreateInput = {
    userId: number
    quantity?: number
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutCartItemsInput
    option: ProductOptionCreateNestedOneWithoutCartItemsInput
  }

  export type CartItemUncheckedCreateInput = {
    id?: number
    userId: number
    productId: number
    productOptionId: number
    quantity?: number
    createdAt?: Date | string
  }

  export type CartItemUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutCartItemsNestedInput
    option?: ProductOptionUpdateOneRequiredWithoutCartItemsNestedInput
  }

  export type CartItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    productOptionId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemCreateManyInput = {
    id?: number
    userId: number
    productId: number
    productOptionId: number
    quantity?: number
    createdAt?: Date | string
  }

  export type CartItemUpdateManyMutationInput = {
    userId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    productOptionId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    orderNumber: string
    createdAt?: Date | string
    total: number
    status: $Enums.OrderStatus
    user: UserCreateNestedOneWithoutOrdersInput
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: number
    orderNumber: string
    createdAt?: Date | string
    total: number
    status: $Enums.OrderStatus
    userId: number
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    orderNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    userId?: IntFieldUpdateOperationsInput | number
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: number
    orderNumber: string
    createdAt?: Date | string
    total: number
    status: $Enums.OrderStatus
    userId: number
  }

  export type OrderUpdateManyMutationInput = {
    orderNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type OrderItemCreateInput = {
    productName: string
    productImage?: string | null
    optionText?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutItemsInput
    reviews?: ReviewCreateNestedManyWithoutOrderItemInput
    claims?: ClaimCreateNestedManyWithoutOrderItemInput
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: number
    orderId: number
    productId: number
    productName: string
    productImage?: string | null
    optionText?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    createdAt?: Date | string
    reviews?: ReviewUncheckedCreateNestedManyWithoutOrderItemInput
    claims?: ClaimUncheckedCreateNestedManyWithoutOrderItemInput
  }

  export type OrderItemUpdateInput = {
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    optionText?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    reviews?: ReviewUpdateManyWithoutOrderItemNestedInput
    claims?: ClaimUpdateManyWithoutOrderItemNestedInput
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    optionText?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUncheckedUpdateManyWithoutOrderItemNestedInput
    claims?: ClaimUncheckedUpdateManyWithoutOrderItemNestedInput
  }

  export type OrderItemCreateManyInput = {
    id?: number
    orderId: number
    productId: number
    productName: string
    productImage?: string | null
    optionText?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    createdAt?: Date | string
  }

  export type OrderItemUpdateManyMutationInput = {
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    optionText?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    optionText?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClaimCreateInput = {
    claimNumber?: string
    claimType: $Enums.ClaimType
    status?: $Enums.ClaimStatus
    requestedAt?: Date | string
    detail: string
    reason?: string | null
    processedAt?: Date | string | null
    orderItem?: OrderItemCreateNestedOneWithoutClaimsInput
  }

  export type ClaimUncheckedCreateInput = {
    id?: number
    claimNumber?: string
    claimType: $Enums.ClaimType
    status?: $Enums.ClaimStatus
    requestedAt?: Date | string
    detail: string
    orderItemId?: number | null
    reason?: string | null
    processedAt?: Date | string | null
  }

  export type ClaimUpdateInput = {
    claimNumber?: StringFieldUpdateOperationsInput | string
    claimType?: EnumClaimTypeFieldUpdateOperationsInput | $Enums.ClaimType
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detail?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    orderItem?: OrderItemUpdateOneWithoutClaimsNestedInput
  }

  export type ClaimUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    claimNumber?: StringFieldUpdateOperationsInput | string
    claimType?: EnumClaimTypeFieldUpdateOperationsInput | $Enums.ClaimType
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detail?: StringFieldUpdateOperationsInput | string
    orderItemId?: NullableIntFieldUpdateOperationsInput | number | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ClaimCreateManyInput = {
    id?: number
    claimNumber?: string
    claimType: $Enums.ClaimType
    status?: $Enums.ClaimStatus
    requestedAt?: Date | string
    detail: string
    orderItemId?: number | null
    reason?: string | null
    processedAt?: Date | string | null
  }

  export type ClaimUpdateManyMutationInput = {
    claimNumber?: StringFieldUpdateOperationsInput | string
    claimType?: EnumClaimTypeFieldUpdateOperationsInput | $Enums.ClaimType
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detail?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ClaimUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    claimNumber?: StringFieldUpdateOperationsInput | string
    claimType?: EnumClaimTypeFieldUpdateOperationsInput | $Enums.ClaimType
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detail?: StringFieldUpdateOperationsInput | string
    orderItemId?: NullableIntFieldUpdateOperationsInput | number | null
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReviewCreateInput = {
    rating: number
    content: string
    createdAt?: Date | string
    images?: ReviewCreateimagesInput | string[]
    orderItem: OrderItemCreateNestedOneWithoutReviewsInput
    user: UserCreateNestedOneWithoutReviewsInput
    reply?: ReviewReplyCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: number
    orderItemId: number
    userId: number
    rating: number
    content: string
    createdAt?: Date | string
    images?: ReviewCreateimagesInput | string[]
    reply?: ReviewReplyUncheckedCreateNestedOneWithoutReviewInput
  }

  export type ReviewUpdateInput = {
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ReviewUpdateimagesInput | string[]
    orderItem?: OrderItemUpdateOneRequiredWithoutReviewsNestedInput
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
    reply?: ReviewReplyUpdateOneWithoutReviewNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderItemId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ReviewUpdateimagesInput | string[]
    reply?: ReviewReplyUncheckedUpdateOneWithoutReviewNestedInput
  }

  export type ReviewCreateManyInput = {
    id?: number
    orderItemId: number
    userId: number
    rating: number
    content: string
    createdAt?: Date | string
    images?: ReviewCreateimagesInput | string[]
  }

  export type ReviewUpdateManyMutationInput = {
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ReviewUpdateimagesInput | string[]
  }

  export type ReviewUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderItemId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ReviewUpdateimagesInput | string[]
  }

  export type ReviewReplyCreateInput = {
    content: string
    createdAt?: Date | string
    review: ReviewCreateNestedOneWithoutReplyInput
    admin: UserCreateNestedOneWithoutReviewRepliesInput
  }

  export type ReviewReplyUncheckedCreateInput = {
    id?: number
    reviewId: number
    adminId: number
    content: string
    createdAt?: Date | string
  }

  export type ReviewReplyUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    review?: ReviewUpdateOneRequiredWithoutReplyNestedInput
    admin?: UserUpdateOneRequiredWithoutReviewRepliesNestedInput
  }

  export type ReviewReplyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    reviewId?: IntFieldUpdateOperationsInput | number
    adminId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewReplyCreateManyInput = {
    id?: number
    reviewId: number
    adminId: number
    content: string
    createdAt?: Date | string
  }

  export type ReviewReplyUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewReplyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    reviewId?: IntFieldUpdateOperationsInput | number
    adminId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryCreateInput = {
    content: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutInquiriesInput
    replies?: InquiryReplyCreateNestedManyWithoutInquiryInput
  }

  export type InquiryUncheckedCreateInput = {
    id?: number
    userId: number
    content: string
    createdAt?: Date | string
    replies?: InquiryReplyUncheckedCreateNestedManyWithoutInquiryInput
  }

  export type InquiryUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInquiriesNestedInput
    replies?: InquiryReplyUpdateManyWithoutInquiryNestedInput
  }

  export type InquiryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: InquiryReplyUncheckedUpdateManyWithoutInquiryNestedInput
  }

  export type InquiryCreateManyInput = {
    id?: number
    userId: number
    content: string
    createdAt?: Date | string
  }

  export type InquiryUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryReplyCreateInput = {
    content: string
    createdAt?: Date | string
    inquiry: InquiryCreateNestedOneWithoutRepliesInput
    admin: UserCreateNestedOneWithoutInquiryRepliesInput
  }

  export type InquiryReplyUncheckedCreateInput = {
    id?: number
    inquiryId: number
    adminId: number
    content: string
    createdAt?: Date | string
  }

  export type InquiryReplyUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inquiry?: InquiryUpdateOneRequiredWithoutRepliesNestedInput
    admin?: UserUpdateOneRequiredWithoutInquiryRepliesNestedInput
  }

  export type InquiryReplyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    inquiryId?: IntFieldUpdateOperationsInput | number
    adminId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryReplyCreateManyInput = {
    id?: number
    inquiryId: number
    adminId: number
    content: string
    createdAt?: Date | string
  }

  export type InquiryReplyUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryReplyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    inquiryId?: IntFieldUpdateOperationsInput | number
    adminId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductQnaCreateInput = {
    content: string
    isSecret?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutProductQnasInput
    user: UserCreateNestedOneWithoutProductQnasInput
    reply?: ProductQnaReplyCreateNestedOneWithoutProductQnaInput
  }

  export type ProductQnaUncheckedCreateInput = {
    id?: number
    content: string
    isSecret?: boolean
    productId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reply?: ProductQnaReplyUncheckedCreateNestedOneWithoutProductQnaInput
  }

  export type ProductQnaUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutProductQnasNestedInput
    user?: UserUpdateOneRequiredWithoutProductQnasNestedInput
    reply?: ProductQnaReplyUpdateOneWithoutProductQnaNestedInput
  }

  export type ProductQnaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    productId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reply?: ProductQnaReplyUncheckedUpdateOneWithoutProductQnaNestedInput
  }

  export type ProductQnaCreateManyInput = {
    id?: number
    content: string
    isSecret?: boolean
    productId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductQnaUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductQnaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    productId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductQnaReplyCreateInput = {
    content: string
    createdAt?: Date | string
    productQna: ProductQnaCreateNestedOneWithoutReplyInput
    admin: UserCreateNestedOneWithoutProductQnaRepliesInput
  }

  export type ProductQnaReplyUncheckedCreateInput = {
    id?: number
    content: string
    productQnaId: number
    adminId: number
    createdAt?: Date | string
  }

  export type ProductQnaReplyUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productQna?: ProductQnaUpdateOneRequiredWithoutReplyNestedInput
    admin?: UserUpdateOneRequiredWithoutProductQnaRepliesNestedInput
  }

  export type ProductQnaReplyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    productQnaId?: IntFieldUpdateOperationsInput | number
    adminId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductQnaReplyCreateManyInput = {
    id?: number
    content: string
    productQnaId: number
    adminId: number
    createdAt?: Date | string
  }

  export type ProductQnaReplyUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductQnaReplyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    productQnaId?: IntFieldUpdateOperationsInput | number
    adminId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type ReviewReplyListRelationFilter = {
    every?: ReviewReplyWhereInput
    some?: ReviewReplyWhereInput
    none?: ReviewReplyWhereInput
  }

  export type InquiryListRelationFilter = {
    every?: InquiryWhereInput
    some?: InquiryWhereInput
    none?: InquiryWhereInput
  }

  export type InquiryReplyListRelationFilter = {
    every?: InquiryReplyWhereInput
    some?: InquiryReplyWhereInput
    none?: InquiryReplyWhereInput
  }

  export type ProductQnaListRelationFilter = {
    every?: ProductQnaWhereInput
    some?: ProductQnaWhereInput
    none?: ProductQnaWhereInput
  }

  export type ProductQnaReplyListRelationFilter = {
    every?: ProductQnaReplyWhereInput
    some?: ProductQnaReplyWhereInput
    none?: ProductQnaReplyWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReviewReplyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InquiryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InquiryReplyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductQnaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductQnaReplyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    username?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    birthDate?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    username?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    username?: SortOrder
    role?: SortOrder
    phone?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type CategoryNullableRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type ProductListRelationFilter = {
    every?: ProductWhereInput
    some?: ProductWhereInput
    none?: ProductWhereInput
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    slug?: SortOrder
    sortOrder?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    sortOrder?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    slug?: SortOrder
    sortOrder?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    parentId?: SortOrder
    slug?: SortOrder
    sortOrder?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
    parentId?: SortOrder
    sortOrder?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ProductOptionListRelationFilter = {
    every?: ProductOptionWhereInput
    some?: ProductOptionWhereInput
    none?: ProductOptionWhereInput
  }

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type CartItemListRelationFilter = {
    every?: CartItemWhereInput
    some?: CartItemWhereInput
    none?: CartItemWhereInput
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type ProductOptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CartItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    images?: SortOrder
    material?: SortOrder
    origin?: SortOrder
    createdAt?: SortOrder
    categoryId?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    material?: SortOrder
    origin?: SortOrder
    createdAt?: SortOrder
    categoryId?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    material?: SortOrder
    origin?: SortOrder
    createdAt?: SortOrder
    categoryId?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    id?: SortOrder
    categoryId?: SortOrder
  }

  export type ProductRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ProductOptionCountOrderByAggregateInput = {
    id?: SortOrder
    color?: SortOrder
    size?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    status?: SortOrder
    sale?: SortOrder
    productId?: SortOrder
  }

  export type ProductOptionAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    sale?: SortOrder
    productId?: SortOrder
  }

  export type ProductOptionMaxOrderByAggregateInput = {
    id?: SortOrder
    color?: SortOrder
    size?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    status?: SortOrder
    sale?: SortOrder
    productId?: SortOrder
  }

  export type ProductOptionMinOrderByAggregateInput = {
    id?: SortOrder
    color?: SortOrder
    size?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    status?: SortOrder
    sale?: SortOrder
    productId?: SortOrder
  }

  export type ProductOptionSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    stock?: SortOrder
    sale?: SortOrder
    productId?: SortOrder
  }

  export type ProductOptionRelationFilter = {
    is?: ProductOptionWhereInput
    isNot?: ProductOptionWhereInput
  }

  export type CartItemCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    productOptionId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
  }

  export type CartItemAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    productOptionId?: SortOrder
    quantity?: SortOrder
  }

  export type CartItemMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    productOptionId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
  }

  export type CartItemMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    productOptionId?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
  }

  export type CartItemSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productId?: SortOrder
    productOptionId?: SortOrder
    quantity?: SortOrder
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    createdAt?: SortOrder
    total?: SortOrder
    status?: SortOrder
    userId?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    id?: SortOrder
    total?: SortOrder
    userId?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    createdAt?: SortOrder
    total?: SortOrder
    status?: SortOrder
    userId?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    orderNumber?: SortOrder
    createdAt?: SortOrder
    total?: SortOrder
    status?: SortOrder
    userId?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    id?: SortOrder
    total?: SortOrder
    userId?: SortOrder
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type OrderRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type ClaimListRelationFilter = {
    every?: ClaimWhereInput
    some?: ClaimWhereInput
    none?: ClaimWhereInput
  }

  export type ClaimOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    productImage?: SortOrder
    optionText?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    totalPrice?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    productImage?: SortOrder
    optionText?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    productName?: SortOrder
    productImage?: SortOrder
    optionText?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    unitPrice?: SortOrder
    quantity?: SortOrder
    totalPrice?: SortOrder
  }

  export type EnumClaimTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimType | EnumClaimTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimType[] | ListEnumClaimTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimType[] | ListEnumClaimTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimTypeFilter<$PrismaModel> | $Enums.ClaimType
  }

  export type EnumClaimStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusFilter<$PrismaModel> | $Enums.ClaimStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type OrderItemNullableRelationFilter = {
    is?: OrderItemWhereInput | null
    isNot?: OrderItemWhereInput | null
  }

  export type ClaimCountOrderByAggregateInput = {
    id?: SortOrder
    claimNumber?: SortOrder
    claimType?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    detail?: SortOrder
    orderItemId?: SortOrder
    reason?: SortOrder
    processedAt?: SortOrder
  }

  export type ClaimAvgOrderByAggregateInput = {
    id?: SortOrder
    orderItemId?: SortOrder
  }

  export type ClaimMaxOrderByAggregateInput = {
    id?: SortOrder
    claimNumber?: SortOrder
    claimType?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    detail?: SortOrder
    orderItemId?: SortOrder
    reason?: SortOrder
    processedAt?: SortOrder
  }

  export type ClaimMinOrderByAggregateInput = {
    id?: SortOrder
    claimNumber?: SortOrder
    claimType?: SortOrder
    status?: SortOrder
    requestedAt?: SortOrder
    detail?: SortOrder
    orderItemId?: SortOrder
    reason?: SortOrder
    processedAt?: SortOrder
  }

  export type ClaimSumOrderByAggregateInput = {
    id?: SortOrder
    orderItemId?: SortOrder
  }

  export type EnumClaimTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimType | EnumClaimTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimType[] | ListEnumClaimTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimType[] | ListEnumClaimTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimTypeWithAggregatesFilter<$PrismaModel> | $Enums.ClaimType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClaimTypeFilter<$PrismaModel>
    _max?: NestedEnumClaimTypeFilter<$PrismaModel>
  }

  export type EnumClaimStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClaimStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClaimStatusFilter<$PrismaModel>
    _max?: NestedEnumClaimStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type OrderItemRelationFilter = {
    is?: OrderItemWhereInput
    isNot?: OrderItemWhereInput
  }

  export type ReviewReplyNullableRelationFilter = {
    is?: ReviewReplyWhereInput | null
    isNot?: ReviewReplyWhereInput | null
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    orderItemId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    images?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    id?: SortOrder
    orderItemId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    orderItemId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    orderItemId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    id?: SortOrder
    orderItemId?: SortOrder
    userId?: SortOrder
    rating?: SortOrder
  }

  export type ReviewRelationFilter = {
    is?: ReviewWhereInput
    isNot?: ReviewWhereInput
  }

  export type ReviewReplyCountOrderByAggregateInput = {
    id?: SortOrder
    reviewId?: SortOrder
    adminId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewReplyAvgOrderByAggregateInput = {
    id?: SortOrder
    reviewId?: SortOrder
    adminId?: SortOrder
  }

  export type ReviewReplyMaxOrderByAggregateInput = {
    id?: SortOrder
    reviewId?: SortOrder
    adminId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewReplyMinOrderByAggregateInput = {
    id?: SortOrder
    reviewId?: SortOrder
    adminId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type ReviewReplySumOrderByAggregateInput = {
    id?: SortOrder
    reviewId?: SortOrder
    adminId?: SortOrder
  }

  export type InquiryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type InquiryAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type InquiryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type InquiryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type InquirySumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type InquiryRelationFilter = {
    is?: InquiryWhereInput
    isNot?: InquiryWhereInput
  }

  export type InquiryReplyCountOrderByAggregateInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    adminId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type InquiryReplyAvgOrderByAggregateInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    adminId?: SortOrder
  }

  export type InquiryReplyMaxOrderByAggregateInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    adminId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type InquiryReplyMinOrderByAggregateInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    adminId?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type InquiryReplySumOrderByAggregateInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    adminId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ProductQnaReplyNullableRelationFilter = {
    is?: ProductQnaReplyWhereInput | null
    isNot?: ProductQnaReplyWhereInput | null
  }

  export type ProductQnaCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    isSecret?: SortOrder
    productId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductQnaAvgOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    userId?: SortOrder
  }

  export type ProductQnaMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    isSecret?: SortOrder
    productId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductQnaMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    isSecret?: SortOrder
    productId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductQnaSumOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    userId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ProductQnaRelationFilter = {
    is?: ProductQnaWhereInput
    isNot?: ProductQnaWhereInput
  }

  export type ProductQnaReplyCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    productQnaId?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductQnaReplyAvgOrderByAggregateInput = {
    id?: SortOrder
    productQnaId?: SortOrder
    adminId?: SortOrder
  }

  export type ProductQnaReplyMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    productQnaId?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductQnaReplyMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    productQnaId?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
  }

  export type ProductQnaReplySumOrderByAggregateInput = {
    id?: SortOrder
    productQnaId?: SortOrder
    adminId?: SortOrder
  }

  export type OrderCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ReviewReplyCreateNestedManyWithoutAdminInput = {
    create?: XOR<ReviewReplyCreateWithoutAdminInput, ReviewReplyUncheckedCreateWithoutAdminInput> | ReviewReplyCreateWithoutAdminInput[] | ReviewReplyUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ReviewReplyCreateOrConnectWithoutAdminInput | ReviewReplyCreateOrConnectWithoutAdminInput[]
    createMany?: ReviewReplyCreateManyAdminInputEnvelope
    connect?: ReviewReplyWhereUniqueInput | ReviewReplyWhereUniqueInput[]
  }

  export type InquiryCreateNestedManyWithoutUserInput = {
    create?: XOR<InquiryCreateWithoutUserInput, InquiryUncheckedCreateWithoutUserInput> | InquiryCreateWithoutUserInput[] | InquiryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InquiryCreateOrConnectWithoutUserInput | InquiryCreateOrConnectWithoutUserInput[]
    createMany?: InquiryCreateManyUserInputEnvelope
    connect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
  }

  export type InquiryReplyCreateNestedManyWithoutAdminInput = {
    create?: XOR<InquiryReplyCreateWithoutAdminInput, InquiryReplyUncheckedCreateWithoutAdminInput> | InquiryReplyCreateWithoutAdminInput[] | InquiryReplyUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: InquiryReplyCreateOrConnectWithoutAdminInput | InquiryReplyCreateOrConnectWithoutAdminInput[]
    createMany?: InquiryReplyCreateManyAdminInputEnvelope
    connect?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
  }

  export type ProductQnaCreateNestedManyWithoutUserInput = {
    create?: XOR<ProductQnaCreateWithoutUserInput, ProductQnaUncheckedCreateWithoutUserInput> | ProductQnaCreateWithoutUserInput[] | ProductQnaUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProductQnaCreateOrConnectWithoutUserInput | ProductQnaCreateOrConnectWithoutUserInput[]
    createMany?: ProductQnaCreateManyUserInputEnvelope
    connect?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
  }

  export type ProductQnaReplyCreateNestedManyWithoutAdminInput = {
    create?: XOR<ProductQnaReplyCreateWithoutAdminInput, ProductQnaReplyUncheckedCreateWithoutAdminInput> | ProductQnaReplyCreateWithoutAdminInput[] | ProductQnaReplyUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ProductQnaReplyCreateOrConnectWithoutAdminInput | ProductQnaReplyCreateOrConnectWithoutAdminInput[]
    createMany?: ProductQnaReplyCreateManyAdminInputEnvelope
    connect?: ProductQnaReplyWhereUniqueInput | ProductQnaReplyWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ReviewReplyUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<ReviewReplyCreateWithoutAdminInput, ReviewReplyUncheckedCreateWithoutAdminInput> | ReviewReplyCreateWithoutAdminInput[] | ReviewReplyUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ReviewReplyCreateOrConnectWithoutAdminInput | ReviewReplyCreateOrConnectWithoutAdminInput[]
    createMany?: ReviewReplyCreateManyAdminInputEnvelope
    connect?: ReviewReplyWhereUniqueInput | ReviewReplyWhereUniqueInput[]
  }

  export type InquiryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<InquiryCreateWithoutUserInput, InquiryUncheckedCreateWithoutUserInput> | InquiryCreateWithoutUserInput[] | InquiryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InquiryCreateOrConnectWithoutUserInput | InquiryCreateOrConnectWithoutUserInput[]
    createMany?: InquiryCreateManyUserInputEnvelope
    connect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
  }

  export type InquiryReplyUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<InquiryReplyCreateWithoutAdminInput, InquiryReplyUncheckedCreateWithoutAdminInput> | InquiryReplyCreateWithoutAdminInput[] | InquiryReplyUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: InquiryReplyCreateOrConnectWithoutAdminInput | InquiryReplyCreateOrConnectWithoutAdminInput[]
    createMany?: InquiryReplyCreateManyAdminInputEnvelope
    connect?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
  }

  export type ProductQnaUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ProductQnaCreateWithoutUserInput, ProductQnaUncheckedCreateWithoutUserInput> | ProductQnaCreateWithoutUserInput[] | ProductQnaUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProductQnaCreateOrConnectWithoutUserInput | ProductQnaCreateOrConnectWithoutUserInput[]
    createMany?: ProductQnaCreateManyUserInputEnvelope
    connect?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
  }

  export type ProductQnaReplyUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<ProductQnaReplyCreateWithoutAdminInput, ProductQnaReplyUncheckedCreateWithoutAdminInput> | ProductQnaReplyCreateWithoutAdminInput[] | ProductQnaReplyUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ProductQnaReplyCreateOrConnectWithoutAdminInput | ProductQnaReplyCreateOrConnectWithoutAdminInput[]
    createMany?: ProductQnaReplyCreateManyAdminInputEnvelope
    connect?: ProductQnaReplyWhereUniqueInput | ProductQnaReplyWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OrderUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutUserInput | ReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutUserInput | ReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutUserInput | ReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ReviewReplyUpdateManyWithoutAdminNestedInput = {
    create?: XOR<ReviewReplyCreateWithoutAdminInput, ReviewReplyUncheckedCreateWithoutAdminInput> | ReviewReplyCreateWithoutAdminInput[] | ReviewReplyUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ReviewReplyCreateOrConnectWithoutAdminInput | ReviewReplyCreateOrConnectWithoutAdminInput[]
    upsert?: ReviewReplyUpsertWithWhereUniqueWithoutAdminInput | ReviewReplyUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: ReviewReplyCreateManyAdminInputEnvelope
    set?: ReviewReplyWhereUniqueInput | ReviewReplyWhereUniqueInput[]
    disconnect?: ReviewReplyWhereUniqueInput | ReviewReplyWhereUniqueInput[]
    delete?: ReviewReplyWhereUniqueInput | ReviewReplyWhereUniqueInput[]
    connect?: ReviewReplyWhereUniqueInput | ReviewReplyWhereUniqueInput[]
    update?: ReviewReplyUpdateWithWhereUniqueWithoutAdminInput | ReviewReplyUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: ReviewReplyUpdateManyWithWhereWithoutAdminInput | ReviewReplyUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: ReviewReplyScalarWhereInput | ReviewReplyScalarWhereInput[]
  }

  export type InquiryUpdateManyWithoutUserNestedInput = {
    create?: XOR<InquiryCreateWithoutUserInput, InquiryUncheckedCreateWithoutUserInput> | InquiryCreateWithoutUserInput[] | InquiryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InquiryCreateOrConnectWithoutUserInput | InquiryCreateOrConnectWithoutUserInput[]
    upsert?: InquiryUpsertWithWhereUniqueWithoutUserInput | InquiryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InquiryCreateManyUserInputEnvelope
    set?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    disconnect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    delete?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    connect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    update?: InquiryUpdateWithWhereUniqueWithoutUserInput | InquiryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InquiryUpdateManyWithWhereWithoutUserInput | InquiryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InquiryScalarWhereInput | InquiryScalarWhereInput[]
  }

  export type InquiryReplyUpdateManyWithoutAdminNestedInput = {
    create?: XOR<InquiryReplyCreateWithoutAdminInput, InquiryReplyUncheckedCreateWithoutAdminInput> | InquiryReplyCreateWithoutAdminInput[] | InquiryReplyUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: InquiryReplyCreateOrConnectWithoutAdminInput | InquiryReplyCreateOrConnectWithoutAdminInput[]
    upsert?: InquiryReplyUpsertWithWhereUniqueWithoutAdminInput | InquiryReplyUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: InquiryReplyCreateManyAdminInputEnvelope
    set?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
    disconnect?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
    delete?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
    connect?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
    update?: InquiryReplyUpdateWithWhereUniqueWithoutAdminInput | InquiryReplyUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: InquiryReplyUpdateManyWithWhereWithoutAdminInput | InquiryReplyUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: InquiryReplyScalarWhereInput | InquiryReplyScalarWhereInput[]
  }

  export type ProductQnaUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProductQnaCreateWithoutUserInput, ProductQnaUncheckedCreateWithoutUserInput> | ProductQnaCreateWithoutUserInput[] | ProductQnaUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProductQnaCreateOrConnectWithoutUserInput | ProductQnaCreateOrConnectWithoutUserInput[]
    upsert?: ProductQnaUpsertWithWhereUniqueWithoutUserInput | ProductQnaUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProductQnaCreateManyUserInputEnvelope
    set?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
    disconnect?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
    delete?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
    connect?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
    update?: ProductQnaUpdateWithWhereUniqueWithoutUserInput | ProductQnaUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProductQnaUpdateManyWithWhereWithoutUserInput | ProductQnaUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProductQnaScalarWhereInput | ProductQnaScalarWhereInput[]
  }

  export type ProductQnaReplyUpdateManyWithoutAdminNestedInput = {
    create?: XOR<ProductQnaReplyCreateWithoutAdminInput, ProductQnaReplyUncheckedCreateWithoutAdminInput> | ProductQnaReplyCreateWithoutAdminInput[] | ProductQnaReplyUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ProductQnaReplyCreateOrConnectWithoutAdminInput | ProductQnaReplyCreateOrConnectWithoutAdminInput[]
    upsert?: ProductQnaReplyUpsertWithWhereUniqueWithoutAdminInput | ProductQnaReplyUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: ProductQnaReplyCreateManyAdminInputEnvelope
    set?: ProductQnaReplyWhereUniqueInput | ProductQnaReplyWhereUniqueInput[]
    disconnect?: ProductQnaReplyWhereUniqueInput | ProductQnaReplyWhereUniqueInput[]
    delete?: ProductQnaReplyWhereUniqueInput | ProductQnaReplyWhereUniqueInput[]
    connect?: ProductQnaReplyWhereUniqueInput | ProductQnaReplyWhereUniqueInput[]
    update?: ProductQnaReplyUpdateWithWhereUniqueWithoutAdminInput | ProductQnaReplyUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: ProductQnaReplyUpdateManyWithWhereWithoutAdminInput | ProductQnaReplyUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: ProductQnaReplyScalarWhereInput | ProductQnaReplyScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput> | ReviewCreateWithoutUserInput[] | ReviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutUserInput | ReviewCreateOrConnectWithoutUserInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutUserInput | ReviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReviewCreateManyUserInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutUserInput | ReviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutUserInput | ReviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ReviewReplyUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<ReviewReplyCreateWithoutAdminInput, ReviewReplyUncheckedCreateWithoutAdminInput> | ReviewReplyCreateWithoutAdminInput[] | ReviewReplyUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ReviewReplyCreateOrConnectWithoutAdminInput | ReviewReplyCreateOrConnectWithoutAdminInput[]
    upsert?: ReviewReplyUpsertWithWhereUniqueWithoutAdminInput | ReviewReplyUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: ReviewReplyCreateManyAdminInputEnvelope
    set?: ReviewReplyWhereUniqueInput | ReviewReplyWhereUniqueInput[]
    disconnect?: ReviewReplyWhereUniqueInput | ReviewReplyWhereUniqueInput[]
    delete?: ReviewReplyWhereUniqueInput | ReviewReplyWhereUniqueInput[]
    connect?: ReviewReplyWhereUniqueInput | ReviewReplyWhereUniqueInput[]
    update?: ReviewReplyUpdateWithWhereUniqueWithoutAdminInput | ReviewReplyUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: ReviewReplyUpdateManyWithWhereWithoutAdminInput | ReviewReplyUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: ReviewReplyScalarWhereInput | ReviewReplyScalarWhereInput[]
  }

  export type InquiryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<InquiryCreateWithoutUserInput, InquiryUncheckedCreateWithoutUserInput> | InquiryCreateWithoutUserInput[] | InquiryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InquiryCreateOrConnectWithoutUserInput | InquiryCreateOrConnectWithoutUserInput[]
    upsert?: InquiryUpsertWithWhereUniqueWithoutUserInput | InquiryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InquiryCreateManyUserInputEnvelope
    set?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    disconnect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    delete?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    connect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    update?: InquiryUpdateWithWhereUniqueWithoutUserInput | InquiryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InquiryUpdateManyWithWhereWithoutUserInput | InquiryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InquiryScalarWhereInput | InquiryScalarWhereInput[]
  }

  export type InquiryReplyUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<InquiryReplyCreateWithoutAdminInput, InquiryReplyUncheckedCreateWithoutAdminInput> | InquiryReplyCreateWithoutAdminInput[] | InquiryReplyUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: InquiryReplyCreateOrConnectWithoutAdminInput | InquiryReplyCreateOrConnectWithoutAdminInput[]
    upsert?: InquiryReplyUpsertWithWhereUniqueWithoutAdminInput | InquiryReplyUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: InquiryReplyCreateManyAdminInputEnvelope
    set?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
    disconnect?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
    delete?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
    connect?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
    update?: InquiryReplyUpdateWithWhereUniqueWithoutAdminInput | InquiryReplyUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: InquiryReplyUpdateManyWithWhereWithoutAdminInput | InquiryReplyUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: InquiryReplyScalarWhereInput | InquiryReplyScalarWhereInput[]
  }

  export type ProductQnaUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ProductQnaCreateWithoutUserInput, ProductQnaUncheckedCreateWithoutUserInput> | ProductQnaCreateWithoutUserInput[] | ProductQnaUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ProductQnaCreateOrConnectWithoutUserInput | ProductQnaCreateOrConnectWithoutUserInput[]
    upsert?: ProductQnaUpsertWithWhereUniqueWithoutUserInput | ProductQnaUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ProductQnaCreateManyUserInputEnvelope
    set?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
    disconnect?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
    delete?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
    connect?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
    update?: ProductQnaUpdateWithWhereUniqueWithoutUserInput | ProductQnaUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ProductQnaUpdateManyWithWhereWithoutUserInput | ProductQnaUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ProductQnaScalarWhereInput | ProductQnaScalarWhereInput[]
  }

  export type ProductQnaReplyUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<ProductQnaReplyCreateWithoutAdminInput, ProductQnaReplyUncheckedCreateWithoutAdminInput> | ProductQnaReplyCreateWithoutAdminInput[] | ProductQnaReplyUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: ProductQnaReplyCreateOrConnectWithoutAdminInput | ProductQnaReplyCreateOrConnectWithoutAdminInput[]
    upsert?: ProductQnaReplyUpsertWithWhereUniqueWithoutAdminInput | ProductQnaReplyUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: ProductQnaReplyCreateManyAdminInputEnvelope
    set?: ProductQnaReplyWhereUniqueInput | ProductQnaReplyWhereUniqueInput[]
    disconnect?: ProductQnaReplyWhereUniqueInput | ProductQnaReplyWhereUniqueInput[]
    delete?: ProductQnaReplyWhereUniqueInput | ProductQnaReplyWhereUniqueInput[]
    connect?: ProductQnaReplyWhereUniqueInput | ProductQnaReplyWhereUniqueInput[]
    update?: ProductQnaReplyUpdateWithWhereUniqueWithoutAdminInput | ProductQnaReplyUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: ProductQnaReplyUpdateManyWithWhereWithoutAdminInput | ProductQnaReplyUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: ProductQnaReplyScalarWhereInput | ProductQnaReplyScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutChildrenInput = {
    create?: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutChildrenInput
    connect?: CategoryWhereUniqueInput
  }

  export type CategoryCreateNestedManyWithoutParentInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ProductCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type ProductUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CategoryUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutChildrenInput
    upsert?: CategoryUpsertWithoutChildrenInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutChildrenInput, CategoryUpdateWithoutChildrenInput>, CategoryUncheckedUpdateWithoutChildrenInput>
  }

  export type CategoryUpdateManyWithoutParentNestedInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutParentInput | CategoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutParentInput | CategoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutParentInput | CategoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ProductUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutParentInput | CategoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutParentInput | CategoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutParentInput | CategoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ProductUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput> | ProductCreateWithoutCategoryInput[] | ProductUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProductCreateOrConnectWithoutCategoryInput | ProductCreateOrConnectWithoutCategoryInput[]
    upsert?: ProductUpsertWithWhereUniqueWithoutCategoryInput | ProductUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProductCreateManyCategoryInputEnvelope
    set?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    disconnect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    delete?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    connect?: ProductWhereUniqueInput | ProductWhereUniqueInput[]
    update?: ProductUpdateWithWhereUniqueWithoutCategoryInput | ProductUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProductUpdateManyWithWhereWithoutCategoryInput | ProductUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProductScalarWhereInput | ProductScalarWhereInput[]
  }

  export type ProductCreateimagesInput = {
    set: string[]
  }

  export type ProductOptionCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductOptionCreateWithoutProductInput, ProductOptionUncheckedCreateWithoutProductInput> | ProductOptionCreateWithoutProductInput[] | ProductOptionUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductOptionCreateOrConnectWithoutProductInput | ProductOptionCreateOrConnectWithoutProductInput[]
    createMany?: ProductOptionCreateManyProductInputEnvelope
    connect?: ProductOptionWhereUniqueInput | ProductOptionWhereUniqueInput[]
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type CartItemCreateNestedManyWithoutProductInput = {
    create?: XOR<CartItemCreateWithoutProductInput, CartItemUncheckedCreateWithoutProductInput> | CartItemCreateWithoutProductInput[] | CartItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutProductInput | CartItemCreateOrConnectWithoutProductInput[]
    createMany?: CartItemCreateManyProductInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type OrderItemCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type ProductQnaCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductQnaCreateWithoutProductInput, ProductQnaUncheckedCreateWithoutProductInput> | ProductQnaCreateWithoutProductInput[] | ProductQnaUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductQnaCreateOrConnectWithoutProductInput | ProductQnaCreateOrConnectWithoutProductInput[]
    createMany?: ProductQnaCreateManyProductInputEnvelope
    connect?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
  }

  export type ProductOptionUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductOptionCreateWithoutProductInput, ProductOptionUncheckedCreateWithoutProductInput> | ProductOptionCreateWithoutProductInput[] | ProductOptionUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductOptionCreateOrConnectWithoutProductInput | ProductOptionCreateOrConnectWithoutProductInput[]
    createMany?: ProductOptionCreateManyProductInputEnvelope
    connect?: ProductOptionWhereUniqueInput | ProductOptionWhereUniqueInput[]
  }

  export type CartItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<CartItemCreateWithoutProductInput, CartItemUncheckedCreateWithoutProductInput> | CartItemCreateWithoutProductInput[] | CartItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutProductInput | CartItemCreateOrConnectWithoutProductInput[]
    createMany?: CartItemCreateManyProductInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type ProductQnaUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ProductQnaCreateWithoutProductInput, ProductQnaUncheckedCreateWithoutProductInput> | ProductQnaCreateWithoutProductInput[] | ProductQnaUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductQnaCreateOrConnectWithoutProductInput | ProductQnaCreateOrConnectWithoutProductInput[]
    createMany?: ProductQnaCreateManyProductInputEnvelope
    connect?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
  }

  export type ProductUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ProductOptionUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductOptionCreateWithoutProductInput, ProductOptionUncheckedCreateWithoutProductInput> | ProductOptionCreateWithoutProductInput[] | ProductOptionUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductOptionCreateOrConnectWithoutProductInput | ProductOptionCreateOrConnectWithoutProductInput[]
    upsert?: ProductOptionUpsertWithWhereUniqueWithoutProductInput | ProductOptionUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductOptionCreateManyProductInputEnvelope
    set?: ProductOptionWhereUniqueInput | ProductOptionWhereUniqueInput[]
    disconnect?: ProductOptionWhereUniqueInput | ProductOptionWhereUniqueInput[]
    delete?: ProductOptionWhereUniqueInput | ProductOptionWhereUniqueInput[]
    connect?: ProductOptionWhereUniqueInput | ProductOptionWhereUniqueInput[]
    update?: ProductOptionUpdateWithWhereUniqueWithoutProductInput | ProductOptionUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductOptionUpdateManyWithWhereWithoutProductInput | ProductOptionUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductOptionScalarWhereInput | ProductOptionScalarWhereInput[]
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CartItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<CartItemCreateWithoutProductInput, CartItemUncheckedCreateWithoutProductInput> | CartItemCreateWithoutProductInput[] | CartItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutProductInput | CartItemCreateOrConnectWithoutProductInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutProductInput | CartItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: CartItemCreateManyProductInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutProductInput | CartItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutProductInput | CartItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
  }

  export type OrderItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type ProductQnaUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductQnaCreateWithoutProductInput, ProductQnaUncheckedCreateWithoutProductInput> | ProductQnaCreateWithoutProductInput[] | ProductQnaUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductQnaCreateOrConnectWithoutProductInput | ProductQnaCreateOrConnectWithoutProductInput[]
    upsert?: ProductQnaUpsertWithWhereUniqueWithoutProductInput | ProductQnaUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductQnaCreateManyProductInputEnvelope
    set?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
    disconnect?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
    delete?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
    connect?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
    update?: ProductQnaUpdateWithWhereUniqueWithoutProductInput | ProductQnaUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductQnaUpdateManyWithWhereWithoutProductInput | ProductQnaUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductQnaScalarWhereInput | ProductQnaScalarWhereInput[]
  }

  export type ProductOptionUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductOptionCreateWithoutProductInput, ProductOptionUncheckedCreateWithoutProductInput> | ProductOptionCreateWithoutProductInput[] | ProductOptionUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductOptionCreateOrConnectWithoutProductInput | ProductOptionCreateOrConnectWithoutProductInput[]
    upsert?: ProductOptionUpsertWithWhereUniqueWithoutProductInput | ProductOptionUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductOptionCreateManyProductInputEnvelope
    set?: ProductOptionWhereUniqueInput | ProductOptionWhereUniqueInput[]
    disconnect?: ProductOptionWhereUniqueInput | ProductOptionWhereUniqueInput[]
    delete?: ProductOptionWhereUniqueInput | ProductOptionWhereUniqueInput[]
    connect?: ProductOptionWhereUniqueInput | ProductOptionWhereUniqueInput[]
    update?: ProductOptionUpdateWithWhereUniqueWithoutProductInput | ProductOptionUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductOptionUpdateManyWithWhereWithoutProductInput | ProductOptionUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductOptionScalarWhereInput | ProductOptionScalarWhereInput[]
  }

  export type CartItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<CartItemCreateWithoutProductInput, CartItemUncheckedCreateWithoutProductInput> | CartItemCreateWithoutProductInput[] | CartItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutProductInput | CartItemCreateOrConnectWithoutProductInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutProductInput | CartItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: CartItemCreateManyProductInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutProductInput | CartItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutProductInput | CartItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type ProductQnaUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ProductQnaCreateWithoutProductInput, ProductQnaUncheckedCreateWithoutProductInput> | ProductQnaCreateWithoutProductInput[] | ProductQnaUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ProductQnaCreateOrConnectWithoutProductInput | ProductQnaCreateOrConnectWithoutProductInput[]
    upsert?: ProductQnaUpsertWithWhereUniqueWithoutProductInput | ProductQnaUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ProductQnaCreateManyProductInputEnvelope
    set?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
    disconnect?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
    delete?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
    connect?: ProductQnaWhereUniqueInput | ProductQnaWhereUniqueInput[]
    update?: ProductQnaUpdateWithWhereUniqueWithoutProductInput | ProductQnaUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ProductQnaUpdateManyWithWhereWithoutProductInput | ProductQnaUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ProductQnaScalarWhereInput | ProductQnaScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutOptionsInput = {
    create?: XOR<ProductCreateWithoutOptionsInput, ProductUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOptionsInput
    connect?: ProductWhereUniqueInput
  }

  export type CartItemCreateNestedManyWithoutOptionInput = {
    create?: XOR<CartItemCreateWithoutOptionInput, CartItemUncheckedCreateWithoutOptionInput> | CartItemCreateWithoutOptionInput[] | CartItemUncheckedCreateWithoutOptionInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutOptionInput | CartItemCreateOrConnectWithoutOptionInput[]
    createMany?: CartItemCreateManyOptionInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type CartItemUncheckedCreateNestedManyWithoutOptionInput = {
    create?: XOR<CartItemCreateWithoutOptionInput, CartItemUncheckedCreateWithoutOptionInput> | CartItemCreateWithoutOptionInput[] | CartItemUncheckedCreateWithoutOptionInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutOptionInput | CartItemCreateOrConnectWithoutOptionInput[]
    createMany?: CartItemCreateManyOptionInputEnvelope
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
  }

  export type ProductUpdateOneRequiredWithoutOptionsNestedInput = {
    create?: XOR<ProductCreateWithoutOptionsInput, ProductUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOptionsInput
    upsert?: ProductUpsertWithoutOptionsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOptionsInput, ProductUpdateWithoutOptionsInput>, ProductUncheckedUpdateWithoutOptionsInput>
  }

  export type CartItemUpdateManyWithoutOptionNestedInput = {
    create?: XOR<CartItemCreateWithoutOptionInput, CartItemUncheckedCreateWithoutOptionInput> | CartItemCreateWithoutOptionInput[] | CartItemUncheckedCreateWithoutOptionInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutOptionInput | CartItemCreateOrConnectWithoutOptionInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutOptionInput | CartItemUpsertWithWhereUniqueWithoutOptionInput[]
    createMany?: CartItemCreateManyOptionInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutOptionInput | CartItemUpdateWithWhereUniqueWithoutOptionInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutOptionInput | CartItemUpdateManyWithWhereWithoutOptionInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
  }

  export type CartItemUncheckedUpdateManyWithoutOptionNestedInput = {
    create?: XOR<CartItemCreateWithoutOptionInput, CartItemUncheckedCreateWithoutOptionInput> | CartItemCreateWithoutOptionInput[] | CartItemUncheckedCreateWithoutOptionInput[]
    connectOrCreate?: CartItemCreateOrConnectWithoutOptionInput | CartItemCreateOrConnectWithoutOptionInput[]
    upsert?: CartItemUpsertWithWhereUniqueWithoutOptionInput | CartItemUpsertWithWhereUniqueWithoutOptionInput[]
    createMany?: CartItemCreateManyOptionInputEnvelope
    set?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    disconnect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    delete?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    connect?: CartItemWhereUniqueInput | CartItemWhereUniqueInput[]
    update?: CartItemUpdateWithWhereUniqueWithoutOptionInput | CartItemUpdateWithWhereUniqueWithoutOptionInput[]
    updateMany?: CartItemUpdateManyWithWhereWithoutOptionInput | CartItemUpdateManyWithWhereWithoutOptionInput[]
    deleteMany?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutCartItemsInput = {
    create?: XOR<ProductCreateWithoutCartItemsInput, ProductUncheckedCreateWithoutCartItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutCartItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductOptionCreateNestedOneWithoutCartItemsInput = {
    create?: XOR<ProductOptionCreateWithoutCartItemsInput, ProductOptionUncheckedCreateWithoutCartItemsInput>
    connectOrCreate?: ProductOptionCreateOrConnectWithoutCartItemsInput
    connect?: ProductOptionWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutCartItemsNestedInput = {
    create?: XOR<ProductCreateWithoutCartItemsInput, ProductUncheckedCreateWithoutCartItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutCartItemsInput
    upsert?: ProductUpsertWithoutCartItemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutCartItemsInput, ProductUpdateWithoutCartItemsInput>, ProductUncheckedUpdateWithoutCartItemsInput>
  }

  export type ProductOptionUpdateOneRequiredWithoutCartItemsNestedInput = {
    create?: XOR<ProductOptionCreateWithoutCartItemsInput, ProductOptionUncheckedCreateWithoutCartItemsInput>
    connectOrCreate?: ProductOptionCreateOrConnectWithoutCartItemsInput
    upsert?: ProductOptionUpsertWithoutCartItemsInput
    connect?: ProductOptionWhereUniqueInput
    update?: XOR<XOR<ProductOptionUpdateToOneWithWhereWithoutCartItemsInput, ProductOptionUpdateWithoutCartItemsInput>, ProductOptionUncheckedUpdateWithoutCartItemsInput>
  }

  export type UserCreateNestedOneWithoutOrdersInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    connect?: UserWhereUniqueInput
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrdersInput
    upsert?: UserUpsertWithoutOrdersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrdersInput, UserUpdateWithoutOrdersInput>, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type ReviewCreateNestedManyWithoutOrderItemInput = {
    create?: XOR<ReviewCreateWithoutOrderItemInput, ReviewUncheckedCreateWithoutOrderItemInput> | ReviewCreateWithoutOrderItemInput[] | ReviewUncheckedCreateWithoutOrderItemInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutOrderItemInput | ReviewCreateOrConnectWithoutOrderItemInput[]
    createMany?: ReviewCreateManyOrderItemInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ClaimCreateNestedManyWithoutOrderItemInput = {
    create?: XOR<ClaimCreateWithoutOrderItemInput, ClaimUncheckedCreateWithoutOrderItemInput> | ClaimCreateWithoutOrderItemInput[] | ClaimUncheckedCreateWithoutOrderItemInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutOrderItemInput | ClaimCreateOrConnectWithoutOrderItemInput[]
    createMany?: ClaimCreateManyOrderItemInputEnvelope
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
  }

  export type ProductCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
  }

  export type ReviewUncheckedCreateNestedManyWithoutOrderItemInput = {
    create?: XOR<ReviewCreateWithoutOrderItemInput, ReviewUncheckedCreateWithoutOrderItemInput> | ReviewCreateWithoutOrderItemInput[] | ReviewUncheckedCreateWithoutOrderItemInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutOrderItemInput | ReviewCreateOrConnectWithoutOrderItemInput[]
    createMany?: ReviewCreateManyOrderItemInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type ClaimUncheckedCreateNestedManyWithoutOrderItemInput = {
    create?: XOR<ClaimCreateWithoutOrderItemInput, ClaimUncheckedCreateWithoutOrderItemInput> | ClaimCreateWithoutOrderItemInput[] | ClaimUncheckedCreateWithoutOrderItemInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutOrderItemInput | ClaimCreateOrConnectWithoutOrderItemInput[]
    createMany?: ClaimCreateManyOrderItemInputEnvelope
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type ReviewUpdateManyWithoutOrderItemNestedInput = {
    create?: XOR<ReviewCreateWithoutOrderItemInput, ReviewUncheckedCreateWithoutOrderItemInput> | ReviewCreateWithoutOrderItemInput[] | ReviewUncheckedCreateWithoutOrderItemInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutOrderItemInput | ReviewCreateOrConnectWithoutOrderItemInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutOrderItemInput | ReviewUpsertWithWhereUniqueWithoutOrderItemInput[]
    createMany?: ReviewCreateManyOrderItemInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutOrderItemInput | ReviewUpdateWithWhereUniqueWithoutOrderItemInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutOrderItemInput | ReviewUpdateManyWithWhereWithoutOrderItemInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ClaimUpdateManyWithoutOrderItemNestedInput = {
    create?: XOR<ClaimCreateWithoutOrderItemInput, ClaimUncheckedCreateWithoutOrderItemInput> | ClaimCreateWithoutOrderItemInput[] | ClaimUncheckedCreateWithoutOrderItemInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutOrderItemInput | ClaimCreateOrConnectWithoutOrderItemInput[]
    upsert?: ClaimUpsertWithWhereUniqueWithoutOrderItemInput | ClaimUpsertWithWhereUniqueWithoutOrderItemInput[]
    createMany?: ClaimCreateManyOrderItemInputEnvelope
    set?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    disconnect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    delete?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    update?: ClaimUpdateWithWhereUniqueWithoutOrderItemInput | ClaimUpdateWithWhereUniqueWithoutOrderItemInput[]
    updateMany?: ClaimUpdateManyWithWhereWithoutOrderItemInput | ClaimUpdateManyWithWhereWithoutOrderItemInput[]
    deleteMany?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
  }

  export type ProductUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemsInput
    upsert?: ProductUpsertWithoutOrderItemsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrderItemsInput, ProductUpdateWithoutOrderItemsInput>, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type ReviewUncheckedUpdateManyWithoutOrderItemNestedInput = {
    create?: XOR<ReviewCreateWithoutOrderItemInput, ReviewUncheckedCreateWithoutOrderItemInput> | ReviewCreateWithoutOrderItemInput[] | ReviewUncheckedCreateWithoutOrderItemInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutOrderItemInput | ReviewCreateOrConnectWithoutOrderItemInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutOrderItemInput | ReviewUpsertWithWhereUniqueWithoutOrderItemInput[]
    createMany?: ReviewCreateManyOrderItemInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutOrderItemInput | ReviewUpdateWithWhereUniqueWithoutOrderItemInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutOrderItemInput | ReviewUpdateManyWithWhereWithoutOrderItemInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type ClaimUncheckedUpdateManyWithoutOrderItemNestedInput = {
    create?: XOR<ClaimCreateWithoutOrderItemInput, ClaimUncheckedCreateWithoutOrderItemInput> | ClaimCreateWithoutOrderItemInput[] | ClaimUncheckedCreateWithoutOrderItemInput[]
    connectOrCreate?: ClaimCreateOrConnectWithoutOrderItemInput | ClaimCreateOrConnectWithoutOrderItemInput[]
    upsert?: ClaimUpsertWithWhereUniqueWithoutOrderItemInput | ClaimUpsertWithWhereUniqueWithoutOrderItemInput[]
    createMany?: ClaimCreateManyOrderItemInputEnvelope
    set?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    disconnect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    delete?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    connect?: ClaimWhereUniqueInput | ClaimWhereUniqueInput[]
    update?: ClaimUpdateWithWhereUniqueWithoutOrderItemInput | ClaimUpdateWithWhereUniqueWithoutOrderItemInput[]
    updateMany?: ClaimUpdateManyWithWhereWithoutOrderItemInput | ClaimUpdateManyWithWhereWithoutOrderItemInput[]
    deleteMany?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
  }

  export type OrderItemCreateNestedOneWithoutClaimsInput = {
    create?: XOR<OrderItemCreateWithoutClaimsInput, OrderItemUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: OrderItemCreateOrConnectWithoutClaimsInput
    connect?: OrderItemWhereUniqueInput
  }

  export type EnumClaimTypeFieldUpdateOperationsInput = {
    set?: $Enums.ClaimType
  }

  export type EnumClaimStatusFieldUpdateOperationsInput = {
    set?: $Enums.ClaimStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type OrderItemUpdateOneWithoutClaimsNestedInput = {
    create?: XOR<OrderItemCreateWithoutClaimsInput, OrderItemUncheckedCreateWithoutClaimsInput>
    connectOrCreate?: OrderItemCreateOrConnectWithoutClaimsInput
    upsert?: OrderItemUpsertWithoutClaimsInput
    disconnect?: OrderItemWhereInput | boolean
    delete?: OrderItemWhereInput | boolean
    connect?: OrderItemWhereUniqueInput
    update?: XOR<XOR<OrderItemUpdateToOneWithWhereWithoutClaimsInput, OrderItemUpdateWithoutClaimsInput>, OrderItemUncheckedUpdateWithoutClaimsInput>
  }

  export type ReviewCreateimagesInput = {
    set: string[]
  }

  export type OrderItemCreateNestedOneWithoutReviewsInput = {
    create?: XOR<OrderItemCreateWithoutReviewsInput, OrderItemUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: OrderItemCreateOrConnectWithoutReviewsInput
    connect?: OrderItemWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewsInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    connect?: UserWhereUniqueInput
  }

  export type ReviewReplyCreateNestedOneWithoutReviewInput = {
    create?: XOR<ReviewReplyCreateWithoutReviewInput, ReviewReplyUncheckedCreateWithoutReviewInput>
    connectOrCreate?: ReviewReplyCreateOrConnectWithoutReviewInput
    connect?: ReviewReplyWhereUniqueInput
  }

  export type ReviewReplyUncheckedCreateNestedOneWithoutReviewInput = {
    create?: XOR<ReviewReplyCreateWithoutReviewInput, ReviewReplyUncheckedCreateWithoutReviewInput>
    connectOrCreate?: ReviewReplyCreateOrConnectWithoutReviewInput
    connect?: ReviewReplyWhereUniqueInput
  }

  export type ReviewUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type OrderItemUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<OrderItemCreateWithoutReviewsInput, OrderItemUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: OrderItemCreateOrConnectWithoutReviewsInput
    upsert?: OrderItemUpsertWithoutReviewsInput
    connect?: OrderItemWhereUniqueInput
    update?: XOR<XOR<OrderItemUpdateToOneWithWhereWithoutReviewsInput, OrderItemUpdateWithoutReviewsInput>, OrderItemUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewsInput
    upsert?: UserUpsertWithoutReviewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewsInput, UserUpdateWithoutReviewsInput>, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type ReviewReplyUpdateOneWithoutReviewNestedInput = {
    create?: XOR<ReviewReplyCreateWithoutReviewInput, ReviewReplyUncheckedCreateWithoutReviewInput>
    connectOrCreate?: ReviewReplyCreateOrConnectWithoutReviewInput
    upsert?: ReviewReplyUpsertWithoutReviewInput
    disconnect?: ReviewReplyWhereInput | boolean
    delete?: ReviewReplyWhereInput | boolean
    connect?: ReviewReplyWhereUniqueInput
    update?: XOR<XOR<ReviewReplyUpdateToOneWithWhereWithoutReviewInput, ReviewReplyUpdateWithoutReviewInput>, ReviewReplyUncheckedUpdateWithoutReviewInput>
  }

  export type ReviewReplyUncheckedUpdateOneWithoutReviewNestedInput = {
    create?: XOR<ReviewReplyCreateWithoutReviewInput, ReviewReplyUncheckedCreateWithoutReviewInput>
    connectOrCreate?: ReviewReplyCreateOrConnectWithoutReviewInput
    upsert?: ReviewReplyUpsertWithoutReviewInput
    disconnect?: ReviewReplyWhereInput | boolean
    delete?: ReviewReplyWhereInput | boolean
    connect?: ReviewReplyWhereUniqueInput
    update?: XOR<XOR<ReviewReplyUpdateToOneWithWhereWithoutReviewInput, ReviewReplyUpdateWithoutReviewInput>, ReviewReplyUncheckedUpdateWithoutReviewInput>
  }

  export type ReviewCreateNestedOneWithoutReplyInput = {
    create?: XOR<ReviewCreateWithoutReplyInput, ReviewUncheckedCreateWithoutReplyInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutReplyInput
    connect?: ReviewWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReviewRepliesInput = {
    create?: XOR<UserCreateWithoutReviewRepliesInput, UserUncheckedCreateWithoutReviewRepliesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewRepliesInput
    connect?: UserWhereUniqueInput
  }

  export type ReviewUpdateOneRequiredWithoutReplyNestedInput = {
    create?: XOR<ReviewCreateWithoutReplyInput, ReviewUncheckedCreateWithoutReplyInput>
    connectOrCreate?: ReviewCreateOrConnectWithoutReplyInput
    upsert?: ReviewUpsertWithoutReplyInput
    connect?: ReviewWhereUniqueInput
    update?: XOR<XOR<ReviewUpdateToOneWithWhereWithoutReplyInput, ReviewUpdateWithoutReplyInput>, ReviewUncheckedUpdateWithoutReplyInput>
  }

  export type UserUpdateOneRequiredWithoutReviewRepliesNestedInput = {
    create?: XOR<UserCreateWithoutReviewRepliesInput, UserUncheckedCreateWithoutReviewRepliesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReviewRepliesInput
    upsert?: UserUpsertWithoutReviewRepliesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReviewRepliesInput, UserUpdateWithoutReviewRepliesInput>, UserUncheckedUpdateWithoutReviewRepliesInput>
  }

  export type UserCreateNestedOneWithoutInquiriesInput = {
    create?: XOR<UserCreateWithoutInquiriesInput, UserUncheckedCreateWithoutInquiriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInquiriesInput
    connect?: UserWhereUniqueInput
  }

  export type InquiryReplyCreateNestedManyWithoutInquiryInput = {
    create?: XOR<InquiryReplyCreateWithoutInquiryInput, InquiryReplyUncheckedCreateWithoutInquiryInput> | InquiryReplyCreateWithoutInquiryInput[] | InquiryReplyUncheckedCreateWithoutInquiryInput[]
    connectOrCreate?: InquiryReplyCreateOrConnectWithoutInquiryInput | InquiryReplyCreateOrConnectWithoutInquiryInput[]
    createMany?: InquiryReplyCreateManyInquiryInputEnvelope
    connect?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
  }

  export type InquiryReplyUncheckedCreateNestedManyWithoutInquiryInput = {
    create?: XOR<InquiryReplyCreateWithoutInquiryInput, InquiryReplyUncheckedCreateWithoutInquiryInput> | InquiryReplyCreateWithoutInquiryInput[] | InquiryReplyUncheckedCreateWithoutInquiryInput[]
    connectOrCreate?: InquiryReplyCreateOrConnectWithoutInquiryInput | InquiryReplyCreateOrConnectWithoutInquiryInput[]
    createMany?: InquiryReplyCreateManyInquiryInputEnvelope
    connect?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutInquiriesNestedInput = {
    create?: XOR<UserCreateWithoutInquiriesInput, UserUncheckedCreateWithoutInquiriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInquiriesInput
    upsert?: UserUpsertWithoutInquiriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInquiriesInput, UserUpdateWithoutInquiriesInput>, UserUncheckedUpdateWithoutInquiriesInput>
  }

  export type InquiryReplyUpdateManyWithoutInquiryNestedInput = {
    create?: XOR<InquiryReplyCreateWithoutInquiryInput, InquiryReplyUncheckedCreateWithoutInquiryInput> | InquiryReplyCreateWithoutInquiryInput[] | InquiryReplyUncheckedCreateWithoutInquiryInput[]
    connectOrCreate?: InquiryReplyCreateOrConnectWithoutInquiryInput | InquiryReplyCreateOrConnectWithoutInquiryInput[]
    upsert?: InquiryReplyUpsertWithWhereUniqueWithoutInquiryInput | InquiryReplyUpsertWithWhereUniqueWithoutInquiryInput[]
    createMany?: InquiryReplyCreateManyInquiryInputEnvelope
    set?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
    disconnect?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
    delete?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
    connect?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
    update?: InquiryReplyUpdateWithWhereUniqueWithoutInquiryInput | InquiryReplyUpdateWithWhereUniqueWithoutInquiryInput[]
    updateMany?: InquiryReplyUpdateManyWithWhereWithoutInquiryInput | InquiryReplyUpdateManyWithWhereWithoutInquiryInput[]
    deleteMany?: InquiryReplyScalarWhereInput | InquiryReplyScalarWhereInput[]
  }

  export type InquiryReplyUncheckedUpdateManyWithoutInquiryNestedInput = {
    create?: XOR<InquiryReplyCreateWithoutInquiryInput, InquiryReplyUncheckedCreateWithoutInquiryInput> | InquiryReplyCreateWithoutInquiryInput[] | InquiryReplyUncheckedCreateWithoutInquiryInput[]
    connectOrCreate?: InquiryReplyCreateOrConnectWithoutInquiryInput | InquiryReplyCreateOrConnectWithoutInquiryInput[]
    upsert?: InquiryReplyUpsertWithWhereUniqueWithoutInquiryInput | InquiryReplyUpsertWithWhereUniqueWithoutInquiryInput[]
    createMany?: InquiryReplyCreateManyInquiryInputEnvelope
    set?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
    disconnect?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
    delete?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
    connect?: InquiryReplyWhereUniqueInput | InquiryReplyWhereUniqueInput[]
    update?: InquiryReplyUpdateWithWhereUniqueWithoutInquiryInput | InquiryReplyUpdateWithWhereUniqueWithoutInquiryInput[]
    updateMany?: InquiryReplyUpdateManyWithWhereWithoutInquiryInput | InquiryReplyUpdateManyWithWhereWithoutInquiryInput[]
    deleteMany?: InquiryReplyScalarWhereInput | InquiryReplyScalarWhereInput[]
  }

  export type InquiryCreateNestedOneWithoutRepliesInput = {
    create?: XOR<InquiryCreateWithoutRepliesInput, InquiryUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: InquiryCreateOrConnectWithoutRepliesInput
    connect?: InquiryWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutInquiryRepliesInput = {
    create?: XOR<UserCreateWithoutInquiryRepliesInput, UserUncheckedCreateWithoutInquiryRepliesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInquiryRepliesInput
    connect?: UserWhereUniqueInput
  }

  export type InquiryUpdateOneRequiredWithoutRepliesNestedInput = {
    create?: XOR<InquiryCreateWithoutRepliesInput, InquiryUncheckedCreateWithoutRepliesInput>
    connectOrCreate?: InquiryCreateOrConnectWithoutRepliesInput
    upsert?: InquiryUpsertWithoutRepliesInput
    connect?: InquiryWhereUniqueInput
    update?: XOR<XOR<InquiryUpdateToOneWithWhereWithoutRepliesInput, InquiryUpdateWithoutRepliesInput>, InquiryUncheckedUpdateWithoutRepliesInput>
  }

  export type UserUpdateOneRequiredWithoutInquiryRepliesNestedInput = {
    create?: XOR<UserCreateWithoutInquiryRepliesInput, UserUncheckedCreateWithoutInquiryRepliesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInquiryRepliesInput
    upsert?: UserUpsertWithoutInquiryRepliesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInquiryRepliesInput, UserUpdateWithoutInquiryRepliesInput>, UserUncheckedUpdateWithoutInquiryRepliesInput>
  }

  export type ProductCreateNestedOneWithoutProductQnasInput = {
    create?: XOR<ProductCreateWithoutProductQnasInput, ProductUncheckedCreateWithoutProductQnasInput>
    connectOrCreate?: ProductCreateOrConnectWithoutProductQnasInput
    connect?: ProductWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProductQnasInput = {
    create?: XOR<UserCreateWithoutProductQnasInput, UserUncheckedCreateWithoutProductQnasInput>
    connectOrCreate?: UserCreateOrConnectWithoutProductQnasInput
    connect?: UserWhereUniqueInput
  }

  export type ProductQnaReplyCreateNestedOneWithoutProductQnaInput = {
    create?: XOR<ProductQnaReplyCreateWithoutProductQnaInput, ProductQnaReplyUncheckedCreateWithoutProductQnaInput>
    connectOrCreate?: ProductQnaReplyCreateOrConnectWithoutProductQnaInput
    connect?: ProductQnaReplyWhereUniqueInput
  }

  export type ProductQnaReplyUncheckedCreateNestedOneWithoutProductQnaInput = {
    create?: XOR<ProductQnaReplyCreateWithoutProductQnaInput, ProductQnaReplyUncheckedCreateWithoutProductQnaInput>
    connectOrCreate?: ProductQnaReplyCreateOrConnectWithoutProductQnaInput
    connect?: ProductQnaReplyWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ProductUpdateOneRequiredWithoutProductQnasNestedInput = {
    create?: XOR<ProductCreateWithoutProductQnasInput, ProductUncheckedCreateWithoutProductQnasInput>
    connectOrCreate?: ProductCreateOrConnectWithoutProductQnasInput
    upsert?: ProductUpsertWithoutProductQnasInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutProductQnasInput, ProductUpdateWithoutProductQnasInput>, ProductUncheckedUpdateWithoutProductQnasInput>
  }

  export type UserUpdateOneRequiredWithoutProductQnasNestedInput = {
    create?: XOR<UserCreateWithoutProductQnasInput, UserUncheckedCreateWithoutProductQnasInput>
    connectOrCreate?: UserCreateOrConnectWithoutProductQnasInput
    upsert?: UserUpsertWithoutProductQnasInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProductQnasInput, UserUpdateWithoutProductQnasInput>, UserUncheckedUpdateWithoutProductQnasInput>
  }

  export type ProductQnaReplyUpdateOneWithoutProductQnaNestedInput = {
    create?: XOR<ProductQnaReplyCreateWithoutProductQnaInput, ProductQnaReplyUncheckedCreateWithoutProductQnaInput>
    connectOrCreate?: ProductQnaReplyCreateOrConnectWithoutProductQnaInput
    upsert?: ProductQnaReplyUpsertWithoutProductQnaInput
    disconnect?: ProductQnaReplyWhereInput | boolean
    delete?: ProductQnaReplyWhereInput | boolean
    connect?: ProductQnaReplyWhereUniqueInput
    update?: XOR<XOR<ProductQnaReplyUpdateToOneWithWhereWithoutProductQnaInput, ProductQnaReplyUpdateWithoutProductQnaInput>, ProductQnaReplyUncheckedUpdateWithoutProductQnaInput>
  }

  export type ProductQnaReplyUncheckedUpdateOneWithoutProductQnaNestedInput = {
    create?: XOR<ProductQnaReplyCreateWithoutProductQnaInput, ProductQnaReplyUncheckedCreateWithoutProductQnaInput>
    connectOrCreate?: ProductQnaReplyCreateOrConnectWithoutProductQnaInput
    upsert?: ProductQnaReplyUpsertWithoutProductQnaInput
    disconnect?: ProductQnaReplyWhereInput | boolean
    delete?: ProductQnaReplyWhereInput | boolean
    connect?: ProductQnaReplyWhereUniqueInput
    update?: XOR<XOR<ProductQnaReplyUpdateToOneWithWhereWithoutProductQnaInput, ProductQnaReplyUpdateWithoutProductQnaInput>, ProductQnaReplyUncheckedUpdateWithoutProductQnaInput>
  }

  export type ProductQnaCreateNestedOneWithoutReplyInput = {
    create?: XOR<ProductQnaCreateWithoutReplyInput, ProductQnaUncheckedCreateWithoutReplyInput>
    connectOrCreate?: ProductQnaCreateOrConnectWithoutReplyInput
    connect?: ProductQnaWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProductQnaRepliesInput = {
    create?: XOR<UserCreateWithoutProductQnaRepliesInput, UserUncheckedCreateWithoutProductQnaRepliesInput>
    connectOrCreate?: UserCreateOrConnectWithoutProductQnaRepliesInput
    connect?: UserWhereUniqueInput
  }

  export type ProductQnaUpdateOneRequiredWithoutReplyNestedInput = {
    create?: XOR<ProductQnaCreateWithoutReplyInput, ProductQnaUncheckedCreateWithoutReplyInput>
    connectOrCreate?: ProductQnaCreateOrConnectWithoutReplyInput
    upsert?: ProductQnaUpsertWithoutReplyInput
    connect?: ProductQnaWhereUniqueInput
    update?: XOR<XOR<ProductQnaUpdateToOneWithWhereWithoutReplyInput, ProductQnaUpdateWithoutReplyInput>, ProductQnaUncheckedUpdateWithoutReplyInput>
  }

  export type UserUpdateOneRequiredWithoutProductQnaRepliesNestedInput = {
    create?: XOR<UserCreateWithoutProductQnaRepliesInput, UserUncheckedCreateWithoutProductQnaRepliesInput>
    connectOrCreate?: UserCreateOrConnectWithoutProductQnaRepliesInput
    upsert?: UserUpsertWithoutProductQnaRepliesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProductQnaRepliesInput, UserUpdateWithoutProductQnaRepliesInput>, UserUncheckedUpdateWithoutProductQnaRepliesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type NestedEnumClaimTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimType | EnumClaimTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimType[] | ListEnumClaimTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimType[] | ListEnumClaimTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimTypeFilter<$PrismaModel> | $Enums.ClaimType
  }

  export type NestedEnumClaimStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusFilter<$PrismaModel> | $Enums.ClaimStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumClaimTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimType | EnumClaimTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimType[] | ListEnumClaimTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimType[] | ListEnumClaimTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimTypeWithAggregatesFilter<$PrismaModel> | $Enums.ClaimType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClaimTypeFilter<$PrismaModel>
    _max?: NestedEnumClaimTypeFilter<$PrismaModel>
  }

  export type NestedEnumClaimStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ClaimStatus | EnumClaimStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ClaimStatus[] | ListEnumClaimStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumClaimStatusWithAggregatesFilter<$PrismaModel> | $Enums.ClaimStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumClaimStatusFilter<$PrismaModel>
    _max?: NestedEnumClaimStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type OrderCreateWithoutUserInput = {
    orderNumber: string
    createdAt?: Date | string
    total: number
    status: $Enums.OrderStatus
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutUserInput = {
    id?: number
    orderNumber: string
    createdAt?: Date | string
    total: number
    status: $Enums.OrderStatus
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutUserInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderCreateManyUserInputEnvelope = {
    data: OrderCreateManyUserInput | OrderCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReviewCreateWithoutUserInput = {
    rating: number
    content: string
    createdAt?: Date | string
    images?: ReviewCreateimagesInput | string[]
    orderItem: OrderItemCreateNestedOneWithoutReviewsInput
    reply?: ReviewReplyCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateWithoutUserInput = {
    id?: number
    orderItemId: number
    rating: number
    content: string
    createdAt?: Date | string
    images?: ReviewCreateimagesInput | string[]
    reply?: ReviewReplyUncheckedCreateNestedOneWithoutReviewInput
  }

  export type ReviewCreateOrConnectWithoutUserInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewCreateManyUserInputEnvelope = {
    data: ReviewCreateManyUserInput | ReviewCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ReviewReplyCreateWithoutAdminInput = {
    content: string
    createdAt?: Date | string
    review: ReviewCreateNestedOneWithoutReplyInput
  }

  export type ReviewReplyUncheckedCreateWithoutAdminInput = {
    id?: number
    reviewId: number
    content: string
    createdAt?: Date | string
  }

  export type ReviewReplyCreateOrConnectWithoutAdminInput = {
    where: ReviewReplyWhereUniqueInput
    create: XOR<ReviewReplyCreateWithoutAdminInput, ReviewReplyUncheckedCreateWithoutAdminInput>
  }

  export type ReviewReplyCreateManyAdminInputEnvelope = {
    data: ReviewReplyCreateManyAdminInput | ReviewReplyCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type InquiryCreateWithoutUserInput = {
    content: string
    createdAt?: Date | string
    replies?: InquiryReplyCreateNestedManyWithoutInquiryInput
  }

  export type InquiryUncheckedCreateWithoutUserInput = {
    id?: number
    content: string
    createdAt?: Date | string
    replies?: InquiryReplyUncheckedCreateNestedManyWithoutInquiryInput
  }

  export type InquiryCreateOrConnectWithoutUserInput = {
    where: InquiryWhereUniqueInput
    create: XOR<InquiryCreateWithoutUserInput, InquiryUncheckedCreateWithoutUserInput>
  }

  export type InquiryCreateManyUserInputEnvelope = {
    data: InquiryCreateManyUserInput | InquiryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type InquiryReplyCreateWithoutAdminInput = {
    content: string
    createdAt?: Date | string
    inquiry: InquiryCreateNestedOneWithoutRepliesInput
  }

  export type InquiryReplyUncheckedCreateWithoutAdminInput = {
    id?: number
    inquiryId: number
    content: string
    createdAt?: Date | string
  }

  export type InquiryReplyCreateOrConnectWithoutAdminInput = {
    where: InquiryReplyWhereUniqueInput
    create: XOR<InquiryReplyCreateWithoutAdminInput, InquiryReplyUncheckedCreateWithoutAdminInput>
  }

  export type InquiryReplyCreateManyAdminInputEnvelope = {
    data: InquiryReplyCreateManyAdminInput | InquiryReplyCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type ProductQnaCreateWithoutUserInput = {
    content: string
    isSecret?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutProductQnasInput
    reply?: ProductQnaReplyCreateNestedOneWithoutProductQnaInput
  }

  export type ProductQnaUncheckedCreateWithoutUserInput = {
    id?: number
    content: string
    isSecret?: boolean
    productId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reply?: ProductQnaReplyUncheckedCreateNestedOneWithoutProductQnaInput
  }

  export type ProductQnaCreateOrConnectWithoutUserInput = {
    where: ProductQnaWhereUniqueInput
    create: XOR<ProductQnaCreateWithoutUserInput, ProductQnaUncheckedCreateWithoutUserInput>
  }

  export type ProductQnaCreateManyUserInputEnvelope = {
    data: ProductQnaCreateManyUserInput | ProductQnaCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ProductQnaReplyCreateWithoutAdminInput = {
    content: string
    createdAt?: Date | string
    productQna: ProductQnaCreateNestedOneWithoutReplyInput
  }

  export type ProductQnaReplyUncheckedCreateWithoutAdminInput = {
    id?: number
    content: string
    productQnaId: number
    createdAt?: Date | string
  }

  export type ProductQnaReplyCreateOrConnectWithoutAdminInput = {
    where: ProductQnaReplyWhereUniqueInput
    create: XOR<ProductQnaReplyCreateWithoutAdminInput, ProductQnaReplyUncheckedCreateWithoutAdminInput>
  }

  export type ProductQnaReplyCreateManyAdminInputEnvelope = {
    data: ProductQnaReplyCreateManyAdminInput | ProductQnaReplyCreateManyAdminInput[]
    skipDuplicates?: boolean
  }

  export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
  }

  export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutUserInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: IntFilter<"Order"> | number
    orderNumber?: StringFilter<"Order"> | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    total?: IntFilter<"Order"> | number
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    userId?: IntFilter<"Order"> | number
  }

  export type ReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
    create: XOR<ReviewCreateWithoutUserInput, ReviewUncheckedCreateWithoutUserInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutUserInput, ReviewUncheckedUpdateWithoutUserInput>
  }

  export type ReviewUpdateManyWithWhereWithoutUserInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutUserInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: IntFilter<"Review"> | number
    orderItemId?: IntFilter<"Review"> | number
    userId?: IntFilter<"Review"> | number
    rating?: IntFilter<"Review"> | number
    content?: StringFilter<"Review"> | string
    createdAt?: DateTimeFilter<"Review"> | Date | string
    images?: StringNullableListFilter<"Review">
  }

  export type ReviewReplyUpsertWithWhereUniqueWithoutAdminInput = {
    where: ReviewReplyWhereUniqueInput
    update: XOR<ReviewReplyUpdateWithoutAdminInput, ReviewReplyUncheckedUpdateWithoutAdminInput>
    create: XOR<ReviewReplyCreateWithoutAdminInput, ReviewReplyUncheckedCreateWithoutAdminInput>
  }

  export type ReviewReplyUpdateWithWhereUniqueWithoutAdminInput = {
    where: ReviewReplyWhereUniqueInput
    data: XOR<ReviewReplyUpdateWithoutAdminInput, ReviewReplyUncheckedUpdateWithoutAdminInput>
  }

  export type ReviewReplyUpdateManyWithWhereWithoutAdminInput = {
    where: ReviewReplyScalarWhereInput
    data: XOR<ReviewReplyUpdateManyMutationInput, ReviewReplyUncheckedUpdateManyWithoutAdminInput>
  }

  export type ReviewReplyScalarWhereInput = {
    AND?: ReviewReplyScalarWhereInput | ReviewReplyScalarWhereInput[]
    OR?: ReviewReplyScalarWhereInput[]
    NOT?: ReviewReplyScalarWhereInput | ReviewReplyScalarWhereInput[]
    id?: IntFilter<"ReviewReply"> | number
    reviewId?: IntFilter<"ReviewReply"> | number
    adminId?: IntFilter<"ReviewReply"> | number
    content?: StringFilter<"ReviewReply"> | string
    createdAt?: DateTimeFilter<"ReviewReply"> | Date | string
  }

  export type InquiryUpsertWithWhereUniqueWithoutUserInput = {
    where: InquiryWhereUniqueInput
    update: XOR<InquiryUpdateWithoutUserInput, InquiryUncheckedUpdateWithoutUserInput>
    create: XOR<InquiryCreateWithoutUserInput, InquiryUncheckedCreateWithoutUserInput>
  }

  export type InquiryUpdateWithWhereUniqueWithoutUserInput = {
    where: InquiryWhereUniqueInput
    data: XOR<InquiryUpdateWithoutUserInput, InquiryUncheckedUpdateWithoutUserInput>
  }

  export type InquiryUpdateManyWithWhereWithoutUserInput = {
    where: InquiryScalarWhereInput
    data: XOR<InquiryUpdateManyMutationInput, InquiryUncheckedUpdateManyWithoutUserInput>
  }

  export type InquiryScalarWhereInput = {
    AND?: InquiryScalarWhereInput | InquiryScalarWhereInput[]
    OR?: InquiryScalarWhereInput[]
    NOT?: InquiryScalarWhereInput | InquiryScalarWhereInput[]
    id?: IntFilter<"Inquiry"> | number
    userId?: IntFilter<"Inquiry"> | number
    content?: StringFilter<"Inquiry"> | string
    createdAt?: DateTimeFilter<"Inquiry"> | Date | string
  }

  export type InquiryReplyUpsertWithWhereUniqueWithoutAdminInput = {
    where: InquiryReplyWhereUniqueInput
    update: XOR<InquiryReplyUpdateWithoutAdminInput, InquiryReplyUncheckedUpdateWithoutAdminInput>
    create: XOR<InquiryReplyCreateWithoutAdminInput, InquiryReplyUncheckedCreateWithoutAdminInput>
  }

  export type InquiryReplyUpdateWithWhereUniqueWithoutAdminInput = {
    where: InquiryReplyWhereUniqueInput
    data: XOR<InquiryReplyUpdateWithoutAdminInput, InquiryReplyUncheckedUpdateWithoutAdminInput>
  }

  export type InquiryReplyUpdateManyWithWhereWithoutAdminInput = {
    where: InquiryReplyScalarWhereInput
    data: XOR<InquiryReplyUpdateManyMutationInput, InquiryReplyUncheckedUpdateManyWithoutAdminInput>
  }

  export type InquiryReplyScalarWhereInput = {
    AND?: InquiryReplyScalarWhereInput | InquiryReplyScalarWhereInput[]
    OR?: InquiryReplyScalarWhereInput[]
    NOT?: InquiryReplyScalarWhereInput | InquiryReplyScalarWhereInput[]
    id?: IntFilter<"InquiryReply"> | number
    inquiryId?: IntFilter<"InquiryReply"> | number
    adminId?: IntFilter<"InquiryReply"> | number
    content?: StringFilter<"InquiryReply"> | string
    createdAt?: DateTimeFilter<"InquiryReply"> | Date | string
  }

  export type ProductQnaUpsertWithWhereUniqueWithoutUserInput = {
    where: ProductQnaWhereUniqueInput
    update: XOR<ProductQnaUpdateWithoutUserInput, ProductQnaUncheckedUpdateWithoutUserInput>
    create: XOR<ProductQnaCreateWithoutUserInput, ProductQnaUncheckedCreateWithoutUserInput>
  }

  export type ProductQnaUpdateWithWhereUniqueWithoutUserInput = {
    where: ProductQnaWhereUniqueInput
    data: XOR<ProductQnaUpdateWithoutUserInput, ProductQnaUncheckedUpdateWithoutUserInput>
  }

  export type ProductQnaUpdateManyWithWhereWithoutUserInput = {
    where: ProductQnaScalarWhereInput
    data: XOR<ProductQnaUpdateManyMutationInput, ProductQnaUncheckedUpdateManyWithoutUserInput>
  }

  export type ProductQnaScalarWhereInput = {
    AND?: ProductQnaScalarWhereInput | ProductQnaScalarWhereInput[]
    OR?: ProductQnaScalarWhereInput[]
    NOT?: ProductQnaScalarWhereInput | ProductQnaScalarWhereInput[]
    id?: IntFilter<"ProductQna"> | number
    content?: StringFilter<"ProductQna"> | string
    isSecret?: BoolFilter<"ProductQna"> | boolean
    productId?: IntFilter<"ProductQna"> | number
    userId?: IntFilter<"ProductQna"> | number
    createdAt?: DateTimeFilter<"ProductQna"> | Date | string
    updatedAt?: DateTimeFilter<"ProductQna"> | Date | string
  }

  export type ProductQnaReplyUpsertWithWhereUniqueWithoutAdminInput = {
    where: ProductQnaReplyWhereUniqueInput
    update: XOR<ProductQnaReplyUpdateWithoutAdminInput, ProductQnaReplyUncheckedUpdateWithoutAdminInput>
    create: XOR<ProductQnaReplyCreateWithoutAdminInput, ProductQnaReplyUncheckedCreateWithoutAdminInput>
  }

  export type ProductQnaReplyUpdateWithWhereUniqueWithoutAdminInput = {
    where: ProductQnaReplyWhereUniqueInput
    data: XOR<ProductQnaReplyUpdateWithoutAdminInput, ProductQnaReplyUncheckedUpdateWithoutAdminInput>
  }

  export type ProductQnaReplyUpdateManyWithWhereWithoutAdminInput = {
    where: ProductQnaReplyScalarWhereInput
    data: XOR<ProductQnaReplyUpdateManyMutationInput, ProductQnaReplyUncheckedUpdateManyWithoutAdminInput>
  }

  export type ProductQnaReplyScalarWhereInput = {
    AND?: ProductQnaReplyScalarWhereInput | ProductQnaReplyScalarWhereInput[]
    OR?: ProductQnaReplyScalarWhereInput[]
    NOT?: ProductQnaReplyScalarWhereInput | ProductQnaReplyScalarWhereInput[]
    id?: IntFilter<"ProductQnaReply"> | number
    content?: StringFilter<"ProductQnaReply"> | string
    productQnaId?: IntFilter<"ProductQnaReply"> | number
    adminId?: IntFilter<"ProductQnaReply"> | number
    createdAt?: DateTimeFilter<"ProductQnaReply"> | Date | string
  }

  export type CategoryCreateWithoutChildrenInput = {
    name: string
    slug: string
    sortOrder?: number | null
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutChildrenInput = {
    id?: number
    name: string
    parentId?: number | null
    slug: string
    sortOrder?: number | null
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutChildrenInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
  }

  export type CategoryCreateWithoutParentInput = {
    name: string
    slug: string
    sortOrder?: number | null
    children?: CategoryCreateNestedManyWithoutParentInput
    products?: ProductCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutParentInput = {
    id?: number
    name: string
    slug: string
    sortOrder?: number | null
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    products?: ProductUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutParentInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput>
  }

  export type CategoryCreateManyParentInputEnvelope = {
    data: CategoryCreateManyParentInput | CategoryCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutCategoryInput = {
    name: string
    description?: string | null
    thumbnail?: string | null
    images?: ProductCreateimagesInput | string[]
    material?: string
    origin?: string
    createdAt?: Date | string
    options?: ProductOptionCreateNestedManyWithoutProductInput
    cartItems?: CartItemCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
    productQnas?: ProductQnaCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoryInput = {
    id?: number
    name: string
    description?: string | null
    thumbnail?: string | null
    images?: ProductCreateimagesInput | string[]
    material?: string
    origin?: string
    createdAt?: Date | string
    options?: ProductOptionUncheckedCreateNestedManyWithoutProductInput
    cartItems?: CartItemUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    productQnas?: ProductQnaUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductCreateManyCategoryInputEnvelope = {
    data: ProductCreateManyCategoryInput | ProductCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithoutChildrenInput = {
    update: XOR<CategoryUpdateWithoutChildrenInput, CategoryUncheckedUpdateWithoutChildrenInput>
    create: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutChildrenInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutChildrenInput, CategoryUncheckedUpdateWithoutChildrenInput>
  }

  export type CategoryUpdateWithoutChildrenInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    sortOrder?: NullableIntFieldUpdateOperationsInput | number | null
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutChildrenInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    slug?: StringFieldUpdateOperationsInput | string
    sortOrder?: NullableIntFieldUpdateOperationsInput | number | null
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUpsertWithWhereUniqueWithoutParentInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutParentInput, CategoryUncheckedUpdateWithoutParentInput>
    create: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutParentInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutParentInput, CategoryUncheckedUpdateWithoutParentInput>
  }

  export type CategoryUpdateManyWithWhereWithoutParentInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutParentInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    parentId?: IntNullableFilter<"Category"> | number | null
    slug?: StringFilter<"Category"> | string
    sortOrder?: IntNullableFilter<"Category"> | number | null
  }

  export type ProductUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    update: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProductCreateWithoutCategoryInput, ProductUncheckedCreateWithoutCategoryInput>
  }

  export type ProductUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProductWhereUniqueInput
    data: XOR<ProductUpdateWithoutCategoryInput, ProductUncheckedUpdateWithoutCategoryInput>
  }

  export type ProductUpdateManyWithWhereWithoutCategoryInput = {
    where: ProductScalarWhereInput
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ProductScalarWhereInput = {
    AND?: ProductScalarWhereInput | ProductScalarWhereInput[]
    OR?: ProductScalarWhereInput[]
    NOT?: ProductScalarWhereInput | ProductScalarWhereInput[]
    id?: IntFilter<"Product"> | number
    name?: StringFilter<"Product"> | string
    description?: StringNullableFilter<"Product"> | string | null
    thumbnail?: StringNullableFilter<"Product"> | string | null
    images?: StringNullableListFilter<"Product">
    material?: StringFilter<"Product"> | string
    origin?: StringFilter<"Product"> | string
    createdAt?: DateTimeFilter<"Product"> | Date | string
    categoryId?: IntFilter<"Product"> | number
  }

  export type ProductOptionCreateWithoutProductInput = {
    color?: string | null
    size?: string | null
    price: number
    stock: number
    status?: string
    sale?: number | null
    cartItems?: CartItemCreateNestedManyWithoutOptionInput
  }

  export type ProductOptionUncheckedCreateWithoutProductInput = {
    id?: number
    color?: string | null
    size?: string | null
    price: number
    stock: number
    status?: string
    sale?: number | null
    cartItems?: CartItemUncheckedCreateNestedManyWithoutOptionInput
  }

  export type ProductOptionCreateOrConnectWithoutProductInput = {
    where: ProductOptionWhereUniqueInput
    create: XOR<ProductOptionCreateWithoutProductInput, ProductOptionUncheckedCreateWithoutProductInput>
  }

  export type ProductOptionCreateManyProductInputEnvelope = {
    data: ProductOptionCreateManyProductInput | ProductOptionCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type CategoryCreateWithoutProductsInput = {
    name: string
    slug: string
    sortOrder?: number | null
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: number
    name: string
    parentId?: number | null
    slug: string
    sortOrder?: number | null
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type CartItemCreateWithoutProductInput = {
    userId: number
    quantity?: number
    createdAt?: Date | string
    option: ProductOptionCreateNestedOneWithoutCartItemsInput
  }

  export type CartItemUncheckedCreateWithoutProductInput = {
    id?: number
    userId: number
    productOptionId: number
    quantity?: number
    createdAt?: Date | string
  }

  export type CartItemCreateOrConnectWithoutProductInput = {
    where: CartItemWhereUniqueInput
    create: XOR<CartItemCreateWithoutProductInput, CartItemUncheckedCreateWithoutProductInput>
  }

  export type CartItemCreateManyProductInputEnvelope = {
    data: CartItemCreateManyProductInput | CartItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type OrderItemCreateWithoutProductInput = {
    productName: string
    productImage?: string | null
    optionText?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutItemsInput
    reviews?: ReviewCreateNestedManyWithoutOrderItemInput
    claims?: ClaimCreateNestedManyWithoutOrderItemInput
  }

  export type OrderItemUncheckedCreateWithoutProductInput = {
    id?: number
    orderId: number
    productName: string
    productImage?: string | null
    optionText?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    createdAt?: Date | string
    reviews?: ReviewUncheckedCreateNestedManyWithoutOrderItemInput
    claims?: ClaimUncheckedCreateNestedManyWithoutOrderItemInput
  }

  export type OrderItemCreateOrConnectWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemCreateManyProductInputEnvelope = {
    data: OrderItemCreateManyProductInput | OrderItemCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductQnaCreateWithoutProductInput = {
    content: string
    isSecret?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProductQnasInput
    reply?: ProductQnaReplyCreateNestedOneWithoutProductQnaInput
  }

  export type ProductQnaUncheckedCreateWithoutProductInput = {
    id?: number
    content: string
    isSecret?: boolean
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    reply?: ProductQnaReplyUncheckedCreateNestedOneWithoutProductQnaInput
  }

  export type ProductQnaCreateOrConnectWithoutProductInput = {
    where: ProductQnaWhereUniqueInput
    create: XOR<ProductQnaCreateWithoutProductInput, ProductQnaUncheckedCreateWithoutProductInput>
  }

  export type ProductQnaCreateManyProductInputEnvelope = {
    data: ProductQnaCreateManyProductInput | ProductQnaCreateManyProductInput[]
    skipDuplicates?: boolean
  }

  export type ProductOptionUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductOptionWhereUniqueInput
    update: XOR<ProductOptionUpdateWithoutProductInput, ProductOptionUncheckedUpdateWithoutProductInput>
    create: XOR<ProductOptionCreateWithoutProductInput, ProductOptionUncheckedCreateWithoutProductInput>
  }

  export type ProductOptionUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductOptionWhereUniqueInput
    data: XOR<ProductOptionUpdateWithoutProductInput, ProductOptionUncheckedUpdateWithoutProductInput>
  }

  export type ProductOptionUpdateManyWithWhereWithoutProductInput = {
    where: ProductOptionScalarWhereInput
    data: XOR<ProductOptionUpdateManyMutationInput, ProductOptionUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductOptionScalarWhereInput = {
    AND?: ProductOptionScalarWhereInput | ProductOptionScalarWhereInput[]
    OR?: ProductOptionScalarWhereInput[]
    NOT?: ProductOptionScalarWhereInput | ProductOptionScalarWhereInput[]
    id?: IntFilter<"ProductOption"> | number
    color?: StringNullableFilter<"ProductOption"> | string | null
    size?: StringNullableFilter<"ProductOption"> | string | null
    price?: IntFilter<"ProductOption"> | number
    stock?: IntFilter<"ProductOption"> | number
    status?: StringFilter<"ProductOption"> | string
    sale?: IntNullableFilter<"ProductOption"> | number | null
    productId?: IntFilter<"ProductOption"> | number
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    sortOrder?: NullableIntFieldUpdateOperationsInput | number | null
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    slug?: StringFieldUpdateOperationsInput | string
    sortOrder?: NullableIntFieldUpdateOperationsInput | number | null
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
  }

  export type CartItemUpsertWithWhereUniqueWithoutProductInput = {
    where: CartItemWhereUniqueInput
    update: XOR<CartItemUpdateWithoutProductInput, CartItemUncheckedUpdateWithoutProductInput>
    create: XOR<CartItemCreateWithoutProductInput, CartItemUncheckedCreateWithoutProductInput>
  }

  export type CartItemUpdateWithWhereUniqueWithoutProductInput = {
    where: CartItemWhereUniqueInput
    data: XOR<CartItemUpdateWithoutProductInput, CartItemUncheckedUpdateWithoutProductInput>
  }

  export type CartItemUpdateManyWithWhereWithoutProductInput = {
    where: CartItemScalarWhereInput
    data: XOR<CartItemUpdateManyMutationInput, CartItemUncheckedUpdateManyWithoutProductInput>
  }

  export type CartItemScalarWhereInput = {
    AND?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
    OR?: CartItemScalarWhereInput[]
    NOT?: CartItemScalarWhereInput | CartItemScalarWhereInput[]
    id?: IntFilter<"CartItem"> | number
    userId?: IntFilter<"CartItem"> | number
    productId?: IntFilter<"CartItem"> | number
    productOptionId?: IntFilter<"CartItem"> | number
    quantity?: IntFilter<"CartItem"> | number
    createdAt?: DateTimeFilter<"CartItem"> | Date | string
  }

  export type OrderItemUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutProductInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: IntFilter<"OrderItem"> | number
    orderId?: IntFilter<"OrderItem"> | number
    productId?: IntFilter<"OrderItem"> | number
    productName?: StringFilter<"OrderItem"> | string
    productImage?: StringNullableFilter<"OrderItem"> | string | null
    optionText?: StringNullableFilter<"OrderItem"> | string | null
    unitPrice?: IntFilter<"OrderItem"> | number
    quantity?: IntFilter<"OrderItem"> | number
    totalPrice?: IntFilter<"OrderItem"> | number
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
  }

  export type ProductQnaUpsertWithWhereUniqueWithoutProductInput = {
    where: ProductQnaWhereUniqueInput
    update: XOR<ProductQnaUpdateWithoutProductInput, ProductQnaUncheckedUpdateWithoutProductInput>
    create: XOR<ProductQnaCreateWithoutProductInput, ProductQnaUncheckedCreateWithoutProductInput>
  }

  export type ProductQnaUpdateWithWhereUniqueWithoutProductInput = {
    where: ProductQnaWhereUniqueInput
    data: XOR<ProductQnaUpdateWithoutProductInput, ProductQnaUncheckedUpdateWithoutProductInput>
  }

  export type ProductQnaUpdateManyWithWhereWithoutProductInput = {
    where: ProductQnaScalarWhereInput
    data: XOR<ProductQnaUpdateManyMutationInput, ProductQnaUncheckedUpdateManyWithoutProductInput>
  }

  export type ProductCreateWithoutOptionsInput = {
    name: string
    description?: string | null
    thumbnail?: string | null
    images?: ProductCreateimagesInput | string[]
    material?: string
    origin?: string
    createdAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
    cartItems?: CartItemCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
    productQnas?: ProductQnaCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutOptionsInput = {
    id?: number
    name: string
    description?: string | null
    thumbnail?: string | null
    images?: ProductCreateimagesInput | string[]
    material?: string
    origin?: string
    createdAt?: Date | string
    categoryId: number
    cartItems?: CartItemUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    productQnas?: ProductQnaUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutOptionsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOptionsInput, ProductUncheckedCreateWithoutOptionsInput>
  }

  export type CartItemCreateWithoutOptionInput = {
    userId: number
    quantity?: number
    createdAt?: Date | string
    product: ProductCreateNestedOneWithoutCartItemsInput
  }

  export type CartItemUncheckedCreateWithoutOptionInput = {
    id?: number
    userId: number
    productId: number
    quantity?: number
    createdAt?: Date | string
  }

  export type CartItemCreateOrConnectWithoutOptionInput = {
    where: CartItemWhereUniqueInput
    create: XOR<CartItemCreateWithoutOptionInput, CartItemUncheckedCreateWithoutOptionInput>
  }

  export type CartItemCreateManyOptionInputEnvelope = {
    data: CartItemCreateManyOptionInput | CartItemCreateManyOptionInput[]
    skipDuplicates?: boolean
  }

  export type ProductUpsertWithoutOptionsInput = {
    update: XOR<ProductUpdateWithoutOptionsInput, ProductUncheckedUpdateWithoutOptionsInput>
    create: XOR<ProductCreateWithoutOptionsInput, ProductUncheckedCreateWithoutOptionsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOptionsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOptionsInput, ProductUncheckedUpdateWithoutOptionsInput>
  }

  export type ProductUpdateWithoutOptionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    images?: ProductUpdateimagesInput | string[]
    material?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    cartItems?: CartItemUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
    productQnas?: ProductQnaUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutOptionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    images?: ProductUpdateimagesInput | string[]
    material?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: IntFieldUpdateOperationsInput | number
    cartItems?: CartItemUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    productQnas?: ProductQnaUncheckedUpdateManyWithoutProductNestedInput
  }

  export type CartItemUpsertWithWhereUniqueWithoutOptionInput = {
    where: CartItemWhereUniqueInput
    update: XOR<CartItemUpdateWithoutOptionInput, CartItemUncheckedUpdateWithoutOptionInput>
    create: XOR<CartItemCreateWithoutOptionInput, CartItemUncheckedCreateWithoutOptionInput>
  }

  export type CartItemUpdateWithWhereUniqueWithoutOptionInput = {
    where: CartItemWhereUniqueInput
    data: XOR<CartItemUpdateWithoutOptionInput, CartItemUncheckedUpdateWithoutOptionInput>
  }

  export type CartItemUpdateManyWithWhereWithoutOptionInput = {
    where: CartItemScalarWhereInput
    data: XOR<CartItemUpdateManyMutationInput, CartItemUncheckedUpdateManyWithoutOptionInput>
  }

  export type ProductCreateWithoutCartItemsInput = {
    name: string
    description?: string | null
    thumbnail?: string | null
    images?: ProductCreateimagesInput | string[]
    material?: string
    origin?: string
    createdAt?: Date | string
    options?: ProductOptionCreateNestedManyWithoutProductInput
    category: CategoryCreateNestedOneWithoutProductsInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
    productQnas?: ProductQnaCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCartItemsInput = {
    id?: number
    name: string
    description?: string | null
    thumbnail?: string | null
    images?: ProductCreateimagesInput | string[]
    material?: string
    origin?: string
    createdAt?: Date | string
    categoryId: number
    options?: ProductOptionUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    productQnas?: ProductQnaUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCartItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCartItemsInput, ProductUncheckedCreateWithoutCartItemsInput>
  }

  export type ProductOptionCreateWithoutCartItemsInput = {
    color?: string | null
    size?: string | null
    price: number
    stock: number
    status?: string
    sale?: number | null
    product: ProductCreateNestedOneWithoutOptionsInput
  }

  export type ProductOptionUncheckedCreateWithoutCartItemsInput = {
    id?: number
    color?: string | null
    size?: string | null
    price: number
    stock: number
    status?: string
    sale?: number | null
    productId: number
  }

  export type ProductOptionCreateOrConnectWithoutCartItemsInput = {
    where: ProductOptionWhereUniqueInput
    create: XOR<ProductOptionCreateWithoutCartItemsInput, ProductOptionUncheckedCreateWithoutCartItemsInput>
  }

  export type ProductUpsertWithoutCartItemsInput = {
    update: XOR<ProductUpdateWithoutCartItemsInput, ProductUncheckedUpdateWithoutCartItemsInput>
    create: XOR<ProductCreateWithoutCartItemsInput, ProductUncheckedCreateWithoutCartItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutCartItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutCartItemsInput, ProductUncheckedUpdateWithoutCartItemsInput>
  }

  export type ProductUpdateWithoutCartItemsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    images?: ProductUpdateimagesInput | string[]
    material?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: ProductOptionUpdateManyWithoutProductNestedInput
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
    productQnas?: ProductQnaUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCartItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    images?: ProductUpdateimagesInput | string[]
    material?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: IntFieldUpdateOperationsInput | number
    options?: ProductOptionUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    productQnas?: ProductQnaUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductOptionUpsertWithoutCartItemsInput = {
    update: XOR<ProductOptionUpdateWithoutCartItemsInput, ProductOptionUncheckedUpdateWithoutCartItemsInput>
    create: XOR<ProductOptionCreateWithoutCartItemsInput, ProductOptionUncheckedCreateWithoutCartItemsInput>
    where?: ProductOptionWhereInput
  }

  export type ProductOptionUpdateToOneWithWhereWithoutCartItemsInput = {
    where?: ProductOptionWhereInput
    data: XOR<ProductOptionUpdateWithoutCartItemsInput, ProductOptionUncheckedUpdateWithoutCartItemsInput>
  }

  export type ProductOptionUpdateWithoutCartItemsInput = {
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sale?: NullableIntFieldUpdateOperationsInput | number | null
    product?: ProductUpdateOneRequiredWithoutOptionsNestedInput
  }

  export type ProductOptionUncheckedUpdateWithoutCartItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sale?: NullableIntFieldUpdateOperationsInput | number | null
    productId?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateWithoutOrdersInput = {
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    reviews?: ReviewCreateNestedManyWithoutUserInput
    reviewReplies?: ReviewReplyCreateNestedManyWithoutAdminInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    inquiryReplies?: InquiryReplyCreateNestedManyWithoutAdminInput
    productQnas?: ProductQnaCreateNestedManyWithoutUserInput
    productQnaReplies?: ProductQnaReplyCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutOrdersInput = {
    id?: number
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    reviewReplies?: ReviewReplyUncheckedCreateNestedManyWithoutAdminInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    inquiryReplies?: InquiryReplyUncheckedCreateNestedManyWithoutAdminInput
    productQnas?: ProductQnaUncheckedCreateNestedManyWithoutUserInput
    productQnaReplies?: ProductQnaReplyUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutOrdersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
  }

  export type OrderItemCreateWithoutOrderInput = {
    productName: string
    productImage?: string | null
    optionText?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    createdAt?: Date | string
    reviews?: ReviewCreateNestedManyWithoutOrderItemInput
    claims?: ClaimCreateNestedManyWithoutOrderItemInput
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: number
    productId: number
    productName: string
    productImage?: string | null
    optionText?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    createdAt?: Date | string
    reviews?: ReviewUncheckedCreateNestedManyWithoutOrderItemInput
    claims?: ClaimUncheckedCreateNestedManyWithoutOrderItemInput
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOrdersInput = {
    update: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
    create: XOR<UserCreateWithoutOrdersInput, UserUncheckedCreateWithoutOrdersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrdersInput, UserUncheckedUpdateWithoutOrdersInput>
  }

  export type UserUpdateWithoutOrdersInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    reviewReplies?: ReviewReplyUpdateManyWithoutAdminNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    inquiryReplies?: InquiryReplyUpdateManyWithoutAdminNestedInput
    productQnas?: ProductQnaUpdateManyWithoutUserNestedInput
    productQnaReplies?: ProductQnaReplyUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    reviewReplies?: ReviewReplyUncheckedUpdateManyWithoutAdminNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    inquiryReplies?: InquiryReplyUncheckedUpdateManyWithoutAdminNestedInput
    productQnas?: ProductQnaUncheckedUpdateManyWithoutUserNestedInput
    productQnaReplies?: ProductQnaReplyUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type OrderCreateWithoutItemsInput = {
    orderNumber: string
    createdAt?: Date | string
    total: number
    status: $Enums.OrderStatus
    user: UserCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: number
    orderNumber: string
    createdAt?: Date | string
    total: number
    status: $Enums.OrderStatus
    userId: number
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type ReviewCreateWithoutOrderItemInput = {
    rating: number
    content: string
    createdAt?: Date | string
    images?: ReviewCreateimagesInput | string[]
    user: UserCreateNestedOneWithoutReviewsInput
    reply?: ReviewReplyCreateNestedOneWithoutReviewInput
  }

  export type ReviewUncheckedCreateWithoutOrderItemInput = {
    id?: number
    userId: number
    rating: number
    content: string
    createdAt?: Date | string
    images?: ReviewCreateimagesInput | string[]
    reply?: ReviewReplyUncheckedCreateNestedOneWithoutReviewInput
  }

  export type ReviewCreateOrConnectWithoutOrderItemInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutOrderItemInput, ReviewUncheckedCreateWithoutOrderItemInput>
  }

  export type ReviewCreateManyOrderItemInputEnvelope = {
    data: ReviewCreateManyOrderItemInput | ReviewCreateManyOrderItemInput[]
    skipDuplicates?: boolean
  }

  export type ClaimCreateWithoutOrderItemInput = {
    claimNumber?: string
    claimType: $Enums.ClaimType
    status?: $Enums.ClaimStatus
    requestedAt?: Date | string
    detail: string
    reason?: string | null
    processedAt?: Date | string | null
  }

  export type ClaimUncheckedCreateWithoutOrderItemInput = {
    id?: number
    claimNumber?: string
    claimType: $Enums.ClaimType
    status?: $Enums.ClaimStatus
    requestedAt?: Date | string
    detail: string
    reason?: string | null
    processedAt?: Date | string | null
  }

  export type ClaimCreateOrConnectWithoutOrderItemInput = {
    where: ClaimWhereUniqueInput
    create: XOR<ClaimCreateWithoutOrderItemInput, ClaimUncheckedCreateWithoutOrderItemInput>
  }

  export type ClaimCreateManyOrderItemInputEnvelope = {
    data: ClaimCreateManyOrderItemInput | ClaimCreateManyOrderItemInput[]
    skipDuplicates?: boolean
  }

  export type ProductCreateWithoutOrderItemsInput = {
    name: string
    description?: string | null
    thumbnail?: string | null
    images?: ProductCreateimagesInput | string[]
    material?: string
    origin?: string
    createdAt?: Date | string
    options?: ProductOptionCreateNestedManyWithoutProductInput
    category: CategoryCreateNestedOneWithoutProductsInput
    cartItems?: CartItemCreateNestedManyWithoutProductInput
    productQnas?: ProductQnaCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutOrderItemsInput = {
    id?: number
    name: string
    description?: string | null
    thumbnail?: string | null
    images?: ProductCreateimagesInput | string[]
    material?: string
    origin?: string
    createdAt?: Date | string
    categoryId: number
    options?: ProductOptionUncheckedCreateNestedManyWithoutProductInput
    cartItems?: CartItemUncheckedCreateNestedManyWithoutProductInput
    productQnas?: ProductQnaUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutOrderItemsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    orderNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    user?: UserUpdateOneRequiredWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type ReviewUpsertWithWhereUniqueWithoutOrderItemInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutOrderItemInput, ReviewUncheckedUpdateWithoutOrderItemInput>
    create: XOR<ReviewCreateWithoutOrderItemInput, ReviewUncheckedCreateWithoutOrderItemInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutOrderItemInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutOrderItemInput, ReviewUncheckedUpdateWithoutOrderItemInput>
  }

  export type ReviewUpdateManyWithWhereWithoutOrderItemInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutOrderItemInput>
  }

  export type ClaimUpsertWithWhereUniqueWithoutOrderItemInput = {
    where: ClaimWhereUniqueInput
    update: XOR<ClaimUpdateWithoutOrderItemInput, ClaimUncheckedUpdateWithoutOrderItemInput>
    create: XOR<ClaimCreateWithoutOrderItemInput, ClaimUncheckedCreateWithoutOrderItemInput>
  }

  export type ClaimUpdateWithWhereUniqueWithoutOrderItemInput = {
    where: ClaimWhereUniqueInput
    data: XOR<ClaimUpdateWithoutOrderItemInput, ClaimUncheckedUpdateWithoutOrderItemInput>
  }

  export type ClaimUpdateManyWithWhereWithoutOrderItemInput = {
    where: ClaimScalarWhereInput
    data: XOR<ClaimUpdateManyMutationInput, ClaimUncheckedUpdateManyWithoutOrderItemInput>
  }

  export type ClaimScalarWhereInput = {
    AND?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
    OR?: ClaimScalarWhereInput[]
    NOT?: ClaimScalarWhereInput | ClaimScalarWhereInput[]
    id?: IntFilter<"Claim"> | number
    claimNumber?: StringFilter<"Claim"> | string
    claimType?: EnumClaimTypeFilter<"Claim"> | $Enums.ClaimType
    status?: EnumClaimStatusFilter<"Claim"> | $Enums.ClaimStatus
    requestedAt?: DateTimeFilter<"Claim"> | Date | string
    detail?: StringFilter<"Claim"> | string
    orderItemId?: IntNullableFilter<"Claim"> | number | null
    reason?: StringNullableFilter<"Claim"> | string | null
    processedAt?: DateTimeNullableFilter<"Claim"> | Date | string | null
  }

  export type ProductUpsertWithoutOrderItemsInput = {
    update: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
    create: XOR<ProductCreateWithoutOrderItemsInput, ProductUncheckedCreateWithoutOrderItemsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrderItemsInput, ProductUncheckedUpdateWithoutOrderItemsInput>
  }

  export type ProductUpdateWithoutOrderItemsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    images?: ProductUpdateimagesInput | string[]
    material?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: ProductOptionUpdateManyWithoutProductNestedInput
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    cartItems?: CartItemUpdateManyWithoutProductNestedInput
    productQnas?: ProductQnaUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutOrderItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    images?: ProductUpdateimagesInput | string[]
    material?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: IntFieldUpdateOperationsInput | number
    options?: ProductOptionUncheckedUpdateManyWithoutProductNestedInput
    cartItems?: CartItemUncheckedUpdateManyWithoutProductNestedInput
    productQnas?: ProductQnaUncheckedUpdateManyWithoutProductNestedInput
  }

  export type OrderItemCreateWithoutClaimsInput = {
    productName: string
    productImage?: string | null
    optionText?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutItemsInput
    reviews?: ReviewCreateNestedManyWithoutOrderItemInput
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateWithoutClaimsInput = {
    id?: number
    orderId: number
    productId: number
    productName: string
    productImage?: string | null
    optionText?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    createdAt?: Date | string
    reviews?: ReviewUncheckedCreateNestedManyWithoutOrderItemInput
  }

  export type OrderItemCreateOrConnectWithoutClaimsInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutClaimsInput, OrderItemUncheckedCreateWithoutClaimsInput>
  }

  export type OrderItemUpsertWithoutClaimsInput = {
    update: XOR<OrderItemUpdateWithoutClaimsInput, OrderItemUncheckedUpdateWithoutClaimsInput>
    create: XOR<OrderItemCreateWithoutClaimsInput, OrderItemUncheckedCreateWithoutClaimsInput>
    where?: OrderItemWhereInput
  }

  export type OrderItemUpdateToOneWithWhereWithoutClaimsInput = {
    where?: OrderItemWhereInput
    data: XOR<OrderItemUpdateWithoutClaimsInput, OrderItemUncheckedUpdateWithoutClaimsInput>
  }

  export type OrderItemUpdateWithoutClaimsInput = {
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    optionText?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    reviews?: ReviewUpdateManyWithoutOrderItemNestedInput
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutClaimsInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    optionText?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUncheckedUpdateManyWithoutOrderItemNestedInput
  }

  export type OrderItemCreateWithoutReviewsInput = {
    productName: string
    productImage?: string | null
    optionText?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutItemsInput
    claims?: ClaimCreateNestedManyWithoutOrderItemInput
    product: ProductCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateWithoutReviewsInput = {
    id?: number
    orderId: number
    productId: number
    productName: string
    productImage?: string | null
    optionText?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    createdAt?: Date | string
    claims?: ClaimUncheckedCreateNestedManyWithoutOrderItemInput
  }

  export type OrderItemCreateOrConnectWithoutReviewsInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutReviewsInput, OrderItemUncheckedCreateWithoutReviewsInput>
  }

  export type UserCreateWithoutReviewsInput = {
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutUserInput
    reviewReplies?: ReviewReplyCreateNestedManyWithoutAdminInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    inquiryReplies?: InquiryReplyCreateNestedManyWithoutAdminInput
    productQnas?: ProductQnaCreateNestedManyWithoutUserInput
    productQnaReplies?: ProductQnaReplyCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutReviewsInput = {
    id?: number
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    reviewReplies?: ReviewReplyUncheckedCreateNestedManyWithoutAdminInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    inquiryReplies?: InquiryReplyUncheckedCreateNestedManyWithoutAdminInput
    productQnas?: ProductQnaUncheckedCreateNestedManyWithoutUserInput
    productQnaReplies?: ProductQnaReplyUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutReviewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
  }

  export type ReviewReplyCreateWithoutReviewInput = {
    content: string
    createdAt?: Date | string
    admin: UserCreateNestedOneWithoutReviewRepliesInput
  }

  export type ReviewReplyUncheckedCreateWithoutReviewInput = {
    id?: number
    adminId: number
    content: string
    createdAt?: Date | string
  }

  export type ReviewReplyCreateOrConnectWithoutReviewInput = {
    where: ReviewReplyWhereUniqueInput
    create: XOR<ReviewReplyCreateWithoutReviewInput, ReviewReplyUncheckedCreateWithoutReviewInput>
  }

  export type OrderItemUpsertWithoutReviewsInput = {
    update: XOR<OrderItemUpdateWithoutReviewsInput, OrderItemUncheckedUpdateWithoutReviewsInput>
    create: XOR<OrderItemCreateWithoutReviewsInput, OrderItemUncheckedCreateWithoutReviewsInput>
    where?: OrderItemWhereInput
  }

  export type OrderItemUpdateToOneWithWhereWithoutReviewsInput = {
    where?: OrderItemWhereInput
    data: XOR<OrderItemUpdateWithoutReviewsInput, OrderItemUncheckedUpdateWithoutReviewsInput>
  }

  export type OrderItemUpdateWithoutReviewsInput = {
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    optionText?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    claims?: ClaimUpdateManyWithoutOrderItemNestedInput
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    optionText?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    claims?: ClaimUncheckedUpdateManyWithoutOrderItemNestedInput
  }

  export type UserUpsertWithoutReviewsInput = {
    update: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
    create: XOR<UserCreateWithoutReviewsInput, UserUncheckedCreateWithoutReviewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewsInput, UserUncheckedUpdateWithoutReviewsInput>
  }

  export type UserUpdateWithoutReviewsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutUserNestedInput
    reviewReplies?: ReviewReplyUpdateManyWithoutAdminNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    inquiryReplies?: InquiryReplyUpdateManyWithoutAdminNestedInput
    productQnas?: ProductQnaUpdateManyWithoutUserNestedInput
    productQnaReplies?: ProductQnaReplyUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    reviewReplies?: ReviewReplyUncheckedUpdateManyWithoutAdminNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    inquiryReplies?: InquiryReplyUncheckedUpdateManyWithoutAdminNestedInput
    productQnas?: ProductQnaUncheckedUpdateManyWithoutUserNestedInput
    productQnaReplies?: ProductQnaReplyUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type ReviewReplyUpsertWithoutReviewInput = {
    update: XOR<ReviewReplyUpdateWithoutReviewInput, ReviewReplyUncheckedUpdateWithoutReviewInput>
    create: XOR<ReviewReplyCreateWithoutReviewInput, ReviewReplyUncheckedCreateWithoutReviewInput>
    where?: ReviewReplyWhereInput
  }

  export type ReviewReplyUpdateToOneWithWhereWithoutReviewInput = {
    where?: ReviewReplyWhereInput
    data: XOR<ReviewReplyUpdateWithoutReviewInput, ReviewReplyUncheckedUpdateWithoutReviewInput>
  }

  export type ReviewReplyUpdateWithoutReviewInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutReviewRepliesNestedInput
  }

  export type ReviewReplyUncheckedUpdateWithoutReviewInput = {
    id?: IntFieldUpdateOperationsInput | number
    adminId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateWithoutReplyInput = {
    rating: number
    content: string
    createdAt?: Date | string
    images?: ReviewCreateimagesInput | string[]
    orderItem: OrderItemCreateNestedOneWithoutReviewsInput
    user: UserCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateWithoutReplyInput = {
    id?: number
    orderItemId: number
    userId: number
    rating: number
    content: string
    createdAt?: Date | string
    images?: ReviewCreateimagesInput | string[]
  }

  export type ReviewCreateOrConnectWithoutReplyInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutReplyInput, ReviewUncheckedCreateWithoutReplyInput>
  }

  export type UserCreateWithoutReviewRepliesInput = {
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    inquiryReplies?: InquiryReplyCreateNestedManyWithoutAdminInput
    productQnas?: ProductQnaCreateNestedManyWithoutUserInput
    productQnaReplies?: ProductQnaReplyCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutReviewRepliesInput = {
    id?: number
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    inquiryReplies?: InquiryReplyUncheckedCreateNestedManyWithoutAdminInput
    productQnas?: ProductQnaUncheckedCreateNestedManyWithoutUserInput
    productQnaReplies?: ProductQnaReplyUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutReviewRepliesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReviewRepliesInput, UserUncheckedCreateWithoutReviewRepliesInput>
  }

  export type ReviewUpsertWithoutReplyInput = {
    update: XOR<ReviewUpdateWithoutReplyInput, ReviewUncheckedUpdateWithoutReplyInput>
    create: XOR<ReviewCreateWithoutReplyInput, ReviewUncheckedCreateWithoutReplyInput>
    where?: ReviewWhereInput
  }

  export type ReviewUpdateToOneWithWhereWithoutReplyInput = {
    where?: ReviewWhereInput
    data: XOR<ReviewUpdateWithoutReplyInput, ReviewUncheckedUpdateWithoutReplyInput>
  }

  export type ReviewUpdateWithoutReplyInput = {
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ReviewUpdateimagesInput | string[]
    orderItem?: OrderItemUpdateOneRequiredWithoutReviewsNestedInput
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateWithoutReplyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderItemId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ReviewUpdateimagesInput | string[]
  }

  export type UserUpsertWithoutReviewRepliesInput = {
    update: XOR<UserUpdateWithoutReviewRepliesInput, UserUncheckedUpdateWithoutReviewRepliesInput>
    create: XOR<UserCreateWithoutReviewRepliesInput, UserUncheckedCreateWithoutReviewRepliesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReviewRepliesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReviewRepliesInput, UserUncheckedUpdateWithoutReviewRepliesInput>
  }

  export type UserUpdateWithoutReviewRepliesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    inquiryReplies?: InquiryReplyUpdateManyWithoutAdminNestedInput
    productQnas?: ProductQnaUpdateManyWithoutUserNestedInput
    productQnaReplies?: ProductQnaReplyUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutReviewRepliesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    inquiryReplies?: InquiryReplyUncheckedUpdateManyWithoutAdminNestedInput
    productQnas?: ProductQnaUncheckedUpdateManyWithoutUserNestedInput
    productQnaReplies?: ProductQnaReplyUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type UserCreateWithoutInquiriesInput = {
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    reviewReplies?: ReviewReplyCreateNestedManyWithoutAdminInput
    inquiryReplies?: InquiryReplyCreateNestedManyWithoutAdminInput
    productQnas?: ProductQnaCreateNestedManyWithoutUserInput
    productQnaReplies?: ProductQnaReplyCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutInquiriesInput = {
    id?: number
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    reviewReplies?: ReviewReplyUncheckedCreateNestedManyWithoutAdminInput
    inquiryReplies?: InquiryReplyUncheckedCreateNestedManyWithoutAdminInput
    productQnas?: ProductQnaUncheckedCreateNestedManyWithoutUserInput
    productQnaReplies?: ProductQnaReplyUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutInquiriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInquiriesInput, UserUncheckedCreateWithoutInquiriesInput>
  }

  export type InquiryReplyCreateWithoutInquiryInput = {
    content: string
    createdAt?: Date | string
    admin: UserCreateNestedOneWithoutInquiryRepliesInput
  }

  export type InquiryReplyUncheckedCreateWithoutInquiryInput = {
    id?: number
    adminId: number
    content: string
    createdAt?: Date | string
  }

  export type InquiryReplyCreateOrConnectWithoutInquiryInput = {
    where: InquiryReplyWhereUniqueInput
    create: XOR<InquiryReplyCreateWithoutInquiryInput, InquiryReplyUncheckedCreateWithoutInquiryInput>
  }

  export type InquiryReplyCreateManyInquiryInputEnvelope = {
    data: InquiryReplyCreateManyInquiryInput | InquiryReplyCreateManyInquiryInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutInquiriesInput = {
    update: XOR<UserUpdateWithoutInquiriesInput, UserUncheckedUpdateWithoutInquiriesInput>
    create: XOR<UserCreateWithoutInquiriesInput, UserUncheckedCreateWithoutInquiriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInquiriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInquiriesInput, UserUncheckedUpdateWithoutInquiriesInput>
  }

  export type UserUpdateWithoutInquiriesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    reviewReplies?: ReviewReplyUpdateManyWithoutAdminNestedInput
    inquiryReplies?: InquiryReplyUpdateManyWithoutAdminNestedInput
    productQnas?: ProductQnaUpdateManyWithoutUserNestedInput
    productQnaReplies?: ProductQnaReplyUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutInquiriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    reviewReplies?: ReviewReplyUncheckedUpdateManyWithoutAdminNestedInput
    inquiryReplies?: InquiryReplyUncheckedUpdateManyWithoutAdminNestedInput
    productQnas?: ProductQnaUncheckedUpdateManyWithoutUserNestedInput
    productQnaReplies?: ProductQnaReplyUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type InquiryReplyUpsertWithWhereUniqueWithoutInquiryInput = {
    where: InquiryReplyWhereUniqueInput
    update: XOR<InquiryReplyUpdateWithoutInquiryInput, InquiryReplyUncheckedUpdateWithoutInquiryInput>
    create: XOR<InquiryReplyCreateWithoutInquiryInput, InquiryReplyUncheckedCreateWithoutInquiryInput>
  }

  export type InquiryReplyUpdateWithWhereUniqueWithoutInquiryInput = {
    where: InquiryReplyWhereUniqueInput
    data: XOR<InquiryReplyUpdateWithoutInquiryInput, InquiryReplyUncheckedUpdateWithoutInquiryInput>
  }

  export type InquiryReplyUpdateManyWithWhereWithoutInquiryInput = {
    where: InquiryReplyScalarWhereInput
    data: XOR<InquiryReplyUpdateManyMutationInput, InquiryReplyUncheckedUpdateManyWithoutInquiryInput>
  }

  export type InquiryCreateWithoutRepliesInput = {
    content: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutInquiriesInput
  }

  export type InquiryUncheckedCreateWithoutRepliesInput = {
    id?: number
    userId: number
    content: string
    createdAt?: Date | string
  }

  export type InquiryCreateOrConnectWithoutRepliesInput = {
    where: InquiryWhereUniqueInput
    create: XOR<InquiryCreateWithoutRepliesInput, InquiryUncheckedCreateWithoutRepliesInput>
  }

  export type UserCreateWithoutInquiryRepliesInput = {
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    reviewReplies?: ReviewReplyCreateNestedManyWithoutAdminInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    productQnas?: ProductQnaCreateNestedManyWithoutUserInput
    productQnaReplies?: ProductQnaReplyCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutInquiryRepliesInput = {
    id?: number
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    reviewReplies?: ReviewReplyUncheckedCreateNestedManyWithoutAdminInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    productQnas?: ProductQnaUncheckedCreateNestedManyWithoutUserInput
    productQnaReplies?: ProductQnaReplyUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutInquiryRepliesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInquiryRepliesInput, UserUncheckedCreateWithoutInquiryRepliesInput>
  }

  export type InquiryUpsertWithoutRepliesInput = {
    update: XOR<InquiryUpdateWithoutRepliesInput, InquiryUncheckedUpdateWithoutRepliesInput>
    create: XOR<InquiryCreateWithoutRepliesInput, InquiryUncheckedCreateWithoutRepliesInput>
    where?: InquiryWhereInput
  }

  export type InquiryUpdateToOneWithWhereWithoutRepliesInput = {
    where?: InquiryWhereInput
    data: XOR<InquiryUpdateWithoutRepliesInput, InquiryUncheckedUpdateWithoutRepliesInput>
  }

  export type InquiryUpdateWithoutRepliesInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInquiriesNestedInput
  }

  export type InquiryUncheckedUpdateWithoutRepliesInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutInquiryRepliesInput = {
    update: XOR<UserUpdateWithoutInquiryRepliesInput, UserUncheckedUpdateWithoutInquiryRepliesInput>
    create: XOR<UserCreateWithoutInquiryRepliesInput, UserUncheckedCreateWithoutInquiryRepliesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInquiryRepliesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInquiryRepliesInput, UserUncheckedUpdateWithoutInquiryRepliesInput>
  }

  export type UserUpdateWithoutInquiryRepliesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    reviewReplies?: ReviewReplyUpdateManyWithoutAdminNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    productQnas?: ProductQnaUpdateManyWithoutUserNestedInput
    productQnaReplies?: ProductQnaReplyUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutInquiryRepliesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    reviewReplies?: ReviewReplyUncheckedUpdateManyWithoutAdminNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    productQnas?: ProductQnaUncheckedUpdateManyWithoutUserNestedInput
    productQnaReplies?: ProductQnaReplyUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type ProductCreateWithoutProductQnasInput = {
    name: string
    description?: string | null
    thumbnail?: string | null
    images?: ProductCreateimagesInput | string[]
    material?: string
    origin?: string
    createdAt?: Date | string
    options?: ProductOptionCreateNestedManyWithoutProductInput
    category: CategoryCreateNestedOneWithoutProductsInput
    cartItems?: CartItemCreateNestedManyWithoutProductInput
    orderItems?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutProductQnasInput = {
    id?: number
    name: string
    description?: string | null
    thumbnail?: string | null
    images?: ProductCreateimagesInput | string[]
    material?: string
    origin?: string
    createdAt?: Date | string
    categoryId: number
    options?: ProductOptionUncheckedCreateNestedManyWithoutProductInput
    cartItems?: CartItemUncheckedCreateNestedManyWithoutProductInput
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutProductQnasInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutProductQnasInput, ProductUncheckedCreateWithoutProductQnasInput>
  }

  export type UserCreateWithoutProductQnasInput = {
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    reviewReplies?: ReviewReplyCreateNestedManyWithoutAdminInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    inquiryReplies?: InquiryReplyCreateNestedManyWithoutAdminInput
    productQnaReplies?: ProductQnaReplyCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutProductQnasInput = {
    id?: number
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    reviewReplies?: ReviewReplyUncheckedCreateNestedManyWithoutAdminInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    inquiryReplies?: InquiryReplyUncheckedCreateNestedManyWithoutAdminInput
    productQnaReplies?: ProductQnaReplyUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutProductQnasInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProductQnasInput, UserUncheckedCreateWithoutProductQnasInput>
  }

  export type ProductQnaReplyCreateWithoutProductQnaInput = {
    content: string
    createdAt?: Date | string
    admin: UserCreateNestedOneWithoutProductQnaRepliesInput
  }

  export type ProductQnaReplyUncheckedCreateWithoutProductQnaInput = {
    id?: number
    content: string
    adminId: number
    createdAt?: Date | string
  }

  export type ProductQnaReplyCreateOrConnectWithoutProductQnaInput = {
    where: ProductQnaReplyWhereUniqueInput
    create: XOR<ProductQnaReplyCreateWithoutProductQnaInput, ProductQnaReplyUncheckedCreateWithoutProductQnaInput>
  }

  export type ProductUpsertWithoutProductQnasInput = {
    update: XOR<ProductUpdateWithoutProductQnasInput, ProductUncheckedUpdateWithoutProductQnasInput>
    create: XOR<ProductCreateWithoutProductQnasInput, ProductUncheckedCreateWithoutProductQnasInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutProductQnasInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutProductQnasInput, ProductUncheckedUpdateWithoutProductQnasInput>
  }

  export type ProductUpdateWithoutProductQnasInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    images?: ProductUpdateimagesInput | string[]
    material?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: ProductOptionUpdateManyWithoutProductNestedInput
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
    cartItems?: CartItemUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutProductQnasInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    images?: ProductUpdateimagesInput | string[]
    material?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: IntFieldUpdateOperationsInput | number
    options?: ProductOptionUncheckedUpdateManyWithoutProductNestedInput
    cartItems?: CartItemUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type UserUpsertWithoutProductQnasInput = {
    update: XOR<UserUpdateWithoutProductQnasInput, UserUncheckedUpdateWithoutProductQnasInput>
    create: XOR<UserCreateWithoutProductQnasInput, UserUncheckedCreateWithoutProductQnasInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProductQnasInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProductQnasInput, UserUncheckedUpdateWithoutProductQnasInput>
  }

  export type UserUpdateWithoutProductQnasInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    reviewReplies?: ReviewReplyUpdateManyWithoutAdminNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    inquiryReplies?: InquiryReplyUpdateManyWithoutAdminNestedInput
    productQnaReplies?: ProductQnaReplyUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutProductQnasInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    reviewReplies?: ReviewReplyUncheckedUpdateManyWithoutAdminNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    inquiryReplies?: InquiryReplyUncheckedUpdateManyWithoutAdminNestedInput
    productQnaReplies?: ProductQnaReplyUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type ProductQnaReplyUpsertWithoutProductQnaInput = {
    update: XOR<ProductQnaReplyUpdateWithoutProductQnaInput, ProductQnaReplyUncheckedUpdateWithoutProductQnaInput>
    create: XOR<ProductQnaReplyCreateWithoutProductQnaInput, ProductQnaReplyUncheckedCreateWithoutProductQnaInput>
    where?: ProductQnaReplyWhereInput
  }

  export type ProductQnaReplyUpdateToOneWithWhereWithoutProductQnaInput = {
    where?: ProductQnaReplyWhereInput
    data: XOR<ProductQnaReplyUpdateWithoutProductQnaInput, ProductQnaReplyUncheckedUpdateWithoutProductQnaInput>
  }

  export type ProductQnaReplyUpdateWithoutProductQnaInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutProductQnaRepliesNestedInput
  }

  export type ProductQnaReplyUncheckedUpdateWithoutProductQnaInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    adminId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductQnaCreateWithoutReplyInput = {
    content: string
    isSecret?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutProductQnasInput
    user: UserCreateNestedOneWithoutProductQnasInput
  }

  export type ProductQnaUncheckedCreateWithoutReplyInput = {
    id?: number
    content: string
    isSecret?: boolean
    productId: number
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductQnaCreateOrConnectWithoutReplyInput = {
    where: ProductQnaWhereUniqueInput
    create: XOR<ProductQnaCreateWithoutReplyInput, ProductQnaUncheckedCreateWithoutReplyInput>
  }

  export type UserCreateWithoutProductQnaRepliesInput = {
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutUserInput
    reviews?: ReviewCreateNestedManyWithoutUserInput
    reviewReplies?: ReviewReplyCreateNestedManyWithoutAdminInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    inquiryReplies?: InquiryReplyCreateNestedManyWithoutAdminInput
    productQnas?: ProductQnaCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProductQnaRepliesInput = {
    id?: number
    email: string
    password: string
    name: string
    username: string
    role?: string
    phone?: string | null
    birthDate: Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutUserInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutUserInput
    reviewReplies?: ReviewReplyUncheckedCreateNestedManyWithoutAdminInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    inquiryReplies?: InquiryReplyUncheckedCreateNestedManyWithoutAdminInput
    productQnas?: ProductQnaUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProductQnaRepliesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProductQnaRepliesInput, UserUncheckedCreateWithoutProductQnaRepliesInput>
  }

  export type ProductQnaUpsertWithoutReplyInput = {
    update: XOR<ProductQnaUpdateWithoutReplyInput, ProductQnaUncheckedUpdateWithoutReplyInput>
    create: XOR<ProductQnaCreateWithoutReplyInput, ProductQnaUncheckedCreateWithoutReplyInput>
    where?: ProductQnaWhereInput
  }

  export type ProductQnaUpdateToOneWithWhereWithoutReplyInput = {
    where?: ProductQnaWhereInput
    data: XOR<ProductQnaUpdateWithoutReplyInput, ProductQnaUncheckedUpdateWithoutReplyInput>
  }

  export type ProductQnaUpdateWithoutReplyInput = {
    content?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutProductQnasNestedInput
    user?: UserUpdateOneRequiredWithoutProductQnasNestedInput
  }

  export type ProductQnaUncheckedUpdateWithoutReplyInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    productId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutProductQnaRepliesInput = {
    update: XOR<UserUpdateWithoutProductQnaRepliesInput, UserUncheckedUpdateWithoutProductQnaRepliesInput>
    create: XOR<UserCreateWithoutProductQnaRepliesInput, UserUncheckedCreateWithoutProductQnaRepliesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProductQnaRepliesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProductQnaRepliesInput, UserUncheckedUpdateWithoutProductQnaRepliesInput>
  }

  export type UserUpdateWithoutProductQnaRepliesInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutUserNestedInput
    reviews?: ReviewUpdateManyWithoutUserNestedInput
    reviewReplies?: ReviewReplyUpdateManyWithoutAdminNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    inquiryReplies?: InquiryReplyUpdateManyWithoutAdminNestedInput
    productQnas?: ProductQnaUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProductQnaRepliesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutUserNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutUserNestedInput
    reviewReplies?: ReviewReplyUncheckedUpdateManyWithoutAdminNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    inquiryReplies?: InquiryReplyUncheckedUpdateManyWithoutAdminNestedInput
    productQnas?: ProductQnaUncheckedUpdateManyWithoutUserNestedInput
  }

  export type OrderCreateManyUserInput = {
    id?: number
    orderNumber: string
    createdAt?: Date | string
    total: number
    status: $Enums.OrderStatus
  }

  export type ReviewCreateManyUserInput = {
    id?: number
    orderItemId: number
    rating: number
    content: string
    createdAt?: Date | string
    images?: ReviewCreateimagesInput | string[]
  }

  export type ReviewReplyCreateManyAdminInput = {
    id?: number
    reviewId: number
    content: string
    createdAt?: Date | string
  }

  export type InquiryCreateManyUserInput = {
    id?: number
    content: string
    createdAt?: Date | string
  }

  export type InquiryReplyCreateManyAdminInput = {
    id?: number
    inquiryId: number
    content: string
    createdAt?: Date | string
  }

  export type ProductQnaCreateManyUserInput = {
    id?: number
    content: string
    isSecret?: boolean
    productId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductQnaReplyCreateManyAdminInput = {
    id?: number
    content: string
    productQnaId: number
    createdAt?: Date | string
  }

  export type OrderUpdateWithoutUserInput = {
    orderNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderNumber?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    total?: IntFieldUpdateOperationsInput | number
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
  }

  export type ReviewUpdateWithoutUserInput = {
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ReviewUpdateimagesInput | string[]
    orderItem?: OrderItemUpdateOneRequiredWithoutReviewsNestedInput
    reply?: ReviewReplyUpdateOneWithoutReviewNestedInput
  }

  export type ReviewUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderItemId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ReviewUpdateimagesInput | string[]
    reply?: ReviewReplyUncheckedUpdateOneWithoutReviewNestedInput
  }

  export type ReviewUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderItemId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ReviewUpdateimagesInput | string[]
  }

  export type ReviewReplyUpdateWithoutAdminInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    review?: ReviewUpdateOneRequiredWithoutReplyNestedInput
  }

  export type ReviewReplyUncheckedUpdateWithoutAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    reviewId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewReplyUncheckedUpdateManyWithoutAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    reviewId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryUpdateWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: InquiryReplyUpdateManyWithoutInquiryNestedInput
  }

  export type InquiryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    replies?: InquiryReplyUncheckedUpdateManyWithoutInquiryNestedInput
  }

  export type InquiryUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryReplyUpdateWithoutAdminInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inquiry?: InquiryUpdateOneRequiredWithoutRepliesNestedInput
  }

  export type InquiryReplyUncheckedUpdateWithoutAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    inquiryId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryReplyUncheckedUpdateManyWithoutAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    inquiryId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductQnaUpdateWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutProductQnasNestedInput
    reply?: ProductQnaReplyUpdateOneWithoutProductQnaNestedInput
  }

  export type ProductQnaUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    productId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reply?: ProductQnaReplyUncheckedUpdateOneWithoutProductQnaNestedInput
  }

  export type ProductQnaUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    productId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductQnaReplyUpdateWithoutAdminInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    productQna?: ProductQnaUpdateOneRequiredWithoutReplyNestedInput
  }

  export type ProductQnaReplyUncheckedUpdateWithoutAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    productQnaId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductQnaReplyUncheckedUpdateManyWithoutAdminInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    productQnaId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateManyParentInput = {
    id?: number
    name: string
    slug: string
    sortOrder?: number | null
  }

  export type ProductCreateManyCategoryInput = {
    id?: number
    name: string
    description?: string | null
    thumbnail?: string | null
    images?: ProductCreateimagesInput | string[]
    material?: string
    origin?: string
    createdAt?: Date | string
  }

  export type CategoryUpdateWithoutParentInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    sortOrder?: NullableIntFieldUpdateOperationsInput | number | null
    children?: CategoryUpdateManyWithoutParentNestedInput
    products?: ProductUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    sortOrder?: NullableIntFieldUpdateOperationsInput | number | null
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    products?: ProductUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    sortOrder?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ProductUpdateWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    images?: ProductUpdateimagesInput | string[]
    material?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: ProductOptionUpdateManyWithoutProductNestedInput
    cartItems?: CartItemUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUpdateManyWithoutProductNestedInput
    productQnas?: ProductQnaUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    images?: ProductUpdateimagesInput | string[]
    material?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: ProductOptionUncheckedUpdateManyWithoutProductNestedInput
    cartItems?: CartItemUncheckedUpdateManyWithoutProductNestedInput
    orderItems?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    productQnas?: ProductQnaUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    images?: ProductUpdateimagesInput | string[]
    material?: StringFieldUpdateOperationsInput | string
    origin?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductOptionCreateManyProductInput = {
    id?: number
    color?: string | null
    size?: string | null
    price: number
    stock: number
    status?: string
    sale?: number | null
  }

  export type CartItemCreateManyProductInput = {
    id?: number
    userId: number
    productOptionId: number
    quantity?: number
    createdAt?: Date | string
  }

  export type OrderItemCreateManyProductInput = {
    id?: number
    orderId: number
    productName: string
    productImage?: string | null
    optionText?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    createdAt?: Date | string
  }

  export type ProductQnaCreateManyProductInput = {
    id?: number
    content: string
    isSecret?: boolean
    userId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductOptionUpdateWithoutProductInput = {
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sale?: NullableIntFieldUpdateOperationsInput | number | null
    cartItems?: CartItemUpdateManyWithoutOptionNestedInput
  }

  export type ProductOptionUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sale?: NullableIntFieldUpdateOperationsInput | number | null
    cartItems?: CartItemUncheckedUpdateManyWithoutOptionNestedInput
  }

  export type ProductOptionUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    color?: NullableStringFieldUpdateOperationsInput | string | null
    size?: NullableStringFieldUpdateOperationsInput | string | null
    price?: IntFieldUpdateOperationsInput | number
    stock?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    sale?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CartItemUpdateWithoutProductInput = {
    userId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    option?: ProductOptionUpdateOneRequiredWithoutCartItemsNestedInput
  }

  export type CartItemUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    productOptionId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    productOptionId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUpdateWithoutProductInput = {
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    optionText?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    reviews?: ReviewUpdateManyWithoutOrderItemNestedInput
    claims?: ClaimUpdateManyWithoutOrderItemNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    optionText?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUncheckedUpdateManyWithoutOrderItemNestedInput
    claims?: ClaimUncheckedUpdateManyWithoutOrderItemNestedInput
  }

  export type OrderItemUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    optionText?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductQnaUpdateWithoutProductInput = {
    content?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProductQnasNestedInput
    reply?: ProductQnaReplyUpdateOneWithoutProductQnaNestedInput
  }

  export type ProductQnaUncheckedUpdateWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reply?: ProductQnaReplyUncheckedUpdateOneWithoutProductQnaNestedInput
  }

  export type ProductQnaUncheckedUpdateManyWithoutProductInput = {
    id?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    isSecret?: BoolFieldUpdateOperationsInput | boolean
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemCreateManyOptionInput = {
    id?: number
    userId: number
    productId: number
    quantity?: number
    createdAt?: Date | string
  }

  export type CartItemUpdateWithoutOptionInput = {
    userId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutCartItemsNestedInput
  }

  export type CartItemUncheckedUpdateWithoutOptionInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CartItemUncheckedUpdateManyWithoutOptionInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyOrderInput = {
    id?: number
    productId: number
    productName: string
    productImage?: string | null
    optionText?: string | null
    unitPrice: number
    quantity: number
    totalPrice: number
    createdAt?: Date | string
  }

  export type OrderItemUpdateWithoutOrderInput = {
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    optionText?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUpdateManyWithoutOrderItemNestedInput
    claims?: ClaimUpdateManyWithoutOrderItemNestedInput
    product?: ProductUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    optionText?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reviews?: ReviewUncheckedUpdateManyWithoutOrderItemNestedInput
    claims?: ClaimUncheckedUpdateManyWithoutOrderItemNestedInput
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    productId?: IntFieldUpdateOperationsInput | number
    productName?: StringFieldUpdateOperationsInput | string
    productImage?: NullableStringFieldUpdateOperationsInput | string | null
    optionText?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    totalPrice?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewCreateManyOrderItemInput = {
    id?: number
    userId: number
    rating: number
    content: string
    createdAt?: Date | string
    images?: ReviewCreateimagesInput | string[]
  }

  export type ClaimCreateManyOrderItemInput = {
    id?: number
    claimNumber?: string
    claimType: $Enums.ClaimType
    status?: $Enums.ClaimStatus
    requestedAt?: Date | string
    detail: string
    reason?: string | null
    processedAt?: Date | string | null
  }

  export type ReviewUpdateWithoutOrderItemInput = {
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ReviewUpdateimagesInput | string[]
    user?: UserUpdateOneRequiredWithoutReviewsNestedInput
    reply?: ReviewReplyUpdateOneWithoutReviewNestedInput
  }

  export type ReviewUncheckedUpdateWithoutOrderItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ReviewUpdateimagesInput | string[]
    reply?: ReviewReplyUncheckedUpdateOneWithoutReviewNestedInput
  }

  export type ReviewUncheckedUpdateManyWithoutOrderItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    rating?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    images?: ReviewUpdateimagesInput | string[]
  }

  export type ClaimUpdateWithoutOrderItemInput = {
    claimNumber?: StringFieldUpdateOperationsInput | string
    claimType?: EnumClaimTypeFieldUpdateOperationsInput | $Enums.ClaimType
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detail?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ClaimUncheckedUpdateWithoutOrderItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    claimNumber?: StringFieldUpdateOperationsInput | string
    claimType?: EnumClaimTypeFieldUpdateOperationsInput | $Enums.ClaimType
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detail?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ClaimUncheckedUpdateManyWithoutOrderItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    claimNumber?: StringFieldUpdateOperationsInput | string
    claimType?: EnumClaimTypeFieldUpdateOperationsInput | $Enums.ClaimType
    status?: EnumClaimStatusFieldUpdateOperationsInput | $Enums.ClaimStatus
    requestedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    detail?: StringFieldUpdateOperationsInput | string
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InquiryReplyCreateManyInquiryInput = {
    id?: number
    adminId: number
    content: string
    createdAt?: Date | string
  }

  export type InquiryReplyUpdateWithoutInquiryInput = {
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneRequiredWithoutInquiryRepliesNestedInput
  }

  export type InquiryReplyUncheckedUpdateWithoutInquiryInput = {
    id?: IntFieldUpdateOperationsInput | number
    adminId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryReplyUncheckedUpdateManyWithoutInquiryInput = {
    id?: IntFieldUpdateOperationsInput | number
    adminId?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
     */
    export type CategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductCountOutputTypeDefaultArgs instead
     */
    export type ProductCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductOptionCountOutputTypeDefaultArgs instead
     */
    export type ProductOptionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductOptionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrderCountOutputTypeDefaultArgs instead
     */
    export type OrderCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrderCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrderItemCountOutputTypeDefaultArgs instead
     */
    export type OrderItemCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrderItemCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InquiryCountOutputTypeDefaultArgs instead
     */
    export type InquiryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InquiryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryDefaultArgs instead
     */
    export type CategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductDefaultArgs instead
     */
    export type ProductArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductOptionDefaultArgs instead
     */
    export type ProductOptionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductOptionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CartItemDefaultArgs instead
     */
    export type CartItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CartItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrderDefaultArgs instead
     */
    export type OrderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrderDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrderItemDefaultArgs instead
     */
    export type OrderItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrderItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClaimDefaultArgs instead
     */
    export type ClaimArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClaimDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReviewDefaultArgs instead
     */
    export type ReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReviewDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ReviewReplyDefaultArgs instead
     */
    export type ReviewReplyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ReviewReplyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InquiryDefaultArgs instead
     */
    export type InquiryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InquiryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use InquiryReplyDefaultArgs instead
     */
    export type InquiryReplyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = InquiryReplyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductQnaDefaultArgs instead
     */
    export type ProductQnaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductQnaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProductQnaReplyDefaultArgs instead
     */
    export type ProductQnaReplyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProductQnaReplyDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}