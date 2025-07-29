
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
 * Model Bank
 * 
 */
export type Bank = $Result.DefaultSelection<Prisma.$BankPayload>
/**
 * Model Location
 * 
 */
export type Location = $Result.DefaultSelection<Prisma.$LocationPayload>
/**
 * Model CardType
 * 
 */
export type CardType = $Result.DefaultSelection<Prisma.$CardTypePayload>
/**
 * Model Stock
 * 
 */
export type Stock = $Result.DefaultSelection<Prisma.$StockPayload>
/**
 * Model Movement
 * 
 */
export type Movement = $Result.DefaultSelection<Prisma.$MovementPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>

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
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bank`: Exposes CRUD operations for the **Bank** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Banks
    * const banks = await prisma.bank.findMany()
    * ```
    */
  get bank(): Prisma.BankDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.location`: Exposes CRUD operations for the **Location** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Locations
    * const locations = await prisma.location.findMany()
    * ```
    */
  get location(): Prisma.LocationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.cardType`: Exposes CRUD operations for the **CardType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CardTypes
    * const cardTypes = await prisma.cardType.findMany()
    * ```
    */
  get cardType(): Prisma.CardTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stock`: Exposes CRUD operations for the **Stock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stocks
    * const stocks = await prisma.stock.findMany()
    * ```
    */
  get stock(): Prisma.StockDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.movement`: Exposes CRUD operations for the **Movement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Movements
    * const movements = await prisma.movement.findMany()
    * ```
    */
  get movement(): Prisma.MovementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    Bank: 'Bank',
    Location: 'Location',
    CardType: 'CardType',
    Stock: 'Stock',
    Movement: 'Movement',
    AuditLog: 'AuditLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "bank" | "location" | "cardType" | "stock" | "movement" | "auditLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Bank: {
        payload: Prisma.$BankPayload<ExtArgs>
        fields: Prisma.BankFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BankFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BankFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>
          }
          findFirst: {
            args: Prisma.BankFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BankFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>
          }
          findMany: {
            args: Prisma.BankFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>[]
          }
          create: {
            args: Prisma.BankCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>
          }
          createMany: {
            args: Prisma.BankCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BankCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>[]
          }
          delete: {
            args: Prisma.BankDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>
          }
          update: {
            args: Prisma.BankUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>
          }
          deleteMany: {
            args: Prisma.BankDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BankUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BankUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>[]
          }
          upsert: {
            args: Prisma.BankUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BankPayload>
          }
          aggregate: {
            args: Prisma.BankAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBank>
          }
          groupBy: {
            args: Prisma.BankGroupByArgs<ExtArgs>
            result: $Utils.Optional<BankGroupByOutputType>[]
          }
          count: {
            args: Prisma.BankCountArgs<ExtArgs>
            result: $Utils.Optional<BankCountAggregateOutputType> | number
          }
        }
      }
      Location: {
        payload: Prisma.$LocationPayload<ExtArgs>
        fields: Prisma.LocationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LocationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LocationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findFirst: {
            args: Prisma.LocationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LocationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          findMany: {
            args: Prisma.LocationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          create: {
            args: Prisma.LocationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          createMany: {
            args: Prisma.LocationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LocationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          delete: {
            args: Prisma.LocationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          update: {
            args: Prisma.LocationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          deleteMany: {
            args: Prisma.LocationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LocationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LocationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>[]
          }
          upsert: {
            args: Prisma.LocationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LocationPayload>
          }
          aggregate: {
            args: Prisma.LocationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLocation>
          }
          groupBy: {
            args: Prisma.LocationGroupByArgs<ExtArgs>
            result: $Utils.Optional<LocationGroupByOutputType>[]
          }
          count: {
            args: Prisma.LocationCountArgs<ExtArgs>
            result: $Utils.Optional<LocationCountAggregateOutputType> | number
          }
        }
      }
      CardType: {
        payload: Prisma.$CardTypePayload<ExtArgs>
        fields: Prisma.CardTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CardTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CardTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardTypePayload>
          }
          findFirst: {
            args: Prisma.CardTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CardTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardTypePayload>
          }
          findMany: {
            args: Prisma.CardTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardTypePayload>[]
          }
          create: {
            args: Prisma.CardTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardTypePayload>
          }
          createMany: {
            args: Prisma.CardTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CardTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardTypePayload>[]
          }
          delete: {
            args: Prisma.CardTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardTypePayload>
          }
          update: {
            args: Prisma.CardTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardTypePayload>
          }
          deleteMany: {
            args: Prisma.CardTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CardTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CardTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardTypePayload>[]
          }
          upsert: {
            args: Prisma.CardTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CardTypePayload>
          }
          aggregate: {
            args: Prisma.CardTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCardType>
          }
          groupBy: {
            args: Prisma.CardTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CardTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CardTypeCountArgs<ExtArgs>
            result: $Utils.Optional<CardTypeCountAggregateOutputType> | number
          }
        }
      }
      Stock: {
        payload: Prisma.$StockPayload<ExtArgs>
        fields: Prisma.StockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          findFirst: {
            args: Prisma.StockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          findMany: {
            args: Prisma.StockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          create: {
            args: Prisma.StockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          createMany: {
            args: Prisma.StockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StockCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          delete: {
            args: Prisma.StockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          update: {
            args: Prisma.StockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          deleteMany: {
            args: Prisma.StockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StockUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>[]
          }
          upsert: {
            args: Prisma.StockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StockPayload>
          }
          aggregate: {
            args: Prisma.StockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStock>
          }
          groupBy: {
            args: Prisma.StockGroupByArgs<ExtArgs>
            result: $Utils.Optional<StockGroupByOutputType>[]
          }
          count: {
            args: Prisma.StockCountArgs<ExtArgs>
            result: $Utils.Optional<StockCountAggregateOutputType> | number
          }
        }
      }
      Movement: {
        payload: Prisma.$MovementPayload<ExtArgs>
        fields: Prisma.MovementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MovementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MovementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>
          }
          findFirst: {
            args: Prisma.MovementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MovementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>
          }
          findMany: {
            args: Prisma.MovementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>[]
          }
          create: {
            args: Prisma.MovementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>
          }
          createMany: {
            args: Prisma.MovementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MovementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>[]
          }
          delete: {
            args: Prisma.MovementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>
          }
          update: {
            args: Prisma.MovementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>
          }
          deleteMany: {
            args: Prisma.MovementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MovementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MovementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>[]
          }
          upsert: {
            args: Prisma.MovementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MovementPayload>
          }
          aggregate: {
            args: Prisma.MovementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMovement>
          }
          groupBy: {
            args: Prisma.MovementGroupByArgs<ExtArgs>
            result: $Utils.Optional<MovementGroupByOutputType>[]
          }
          count: {
            args: Prisma.MovementCountArgs<ExtArgs>
            result: $Utils.Optional<MovementCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
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
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    bank?: BankOmit
    location?: LocationOmit
    cardType?: CardTypeOmit
    stock?: StockOmit
    movement?: MovementOmit
    auditLog?: AuditLogOmit
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
    | 'updateManyAndReturn'
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
    movements: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    movements?: boolean | UserCountOutputTypeCountMovementsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
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
  export type UserCountOutputTypeCountMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovementWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Count Type BankCountOutputType
   */

  export type BankCountOutputType = {
    locations: number
    users: number
    cardTypes: number
  }

  export type BankCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | BankCountOutputTypeCountLocationsArgs
    users?: boolean | BankCountOutputTypeCountUsersArgs
    cardTypes?: boolean | BankCountOutputTypeCountCardTypesArgs
  }

  // Custom InputTypes
  /**
   * BankCountOutputType without action
   */
  export type BankCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BankCountOutputType
     */
    select?: BankCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BankCountOutputType without action
   */
  export type BankCountOutputTypeCountLocationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
  }

  /**
   * BankCountOutputType without action
   */
  export type BankCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * BankCountOutputType without action
   */
  export type BankCountOutputTypeCountCardTypesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardTypeWhereInput
  }


  /**
   * Count Type LocationCountOutputType
   */

  export type LocationCountOutputType = {
    stock: number
    movements: number
    destMovements: number
  }

  export type LocationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stock?: boolean | LocationCountOutputTypeCountStockArgs
    movements?: boolean | LocationCountOutputTypeCountMovementsArgs
    destMovements?: boolean | LocationCountOutputTypeCountDestMovementsArgs
  }

  // Custom InputTypes
  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LocationCountOutputType
     */
    select?: LocationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountStockArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovementWhereInput
  }

  /**
   * LocationCountOutputType without action
   */
  export type LocationCountOutputTypeCountDestMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovementWhereInput
  }


  /**
   * Count Type CardTypeCountOutputType
   */

  export type CardTypeCountOutputType = {
    stock: number
    movements: number
  }

  export type CardTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    stock?: boolean | CardTypeCountOutputTypeCountStockArgs
    movements?: boolean | CardTypeCountOutputTypeCountMovementsArgs
  }

  // Custom InputTypes
  /**
   * CardTypeCountOutputType without action
   */
  export type CardTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardTypeCountOutputType
     */
    select?: CardTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CardTypeCountOutputType without action
   */
  export type CardTypeCountOutputTypeCountStockArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockWhereInput
  }

  /**
   * CardTypeCountOutputType without action
   */
  export type CardTypeCountOutputTypeCountMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovementWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    role: string | null
    bankId: string | null
    createdAt: Date | null
    lastLogin: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    role: string | null
    bankId: string | null
    createdAt: Date | null
    lastLogin: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    firstName: number
    lastName: number
    role: number
    bankId: number
    createdAt: number
    lastLogin: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    role?: true
    bankId?: true
    createdAt?: true
    lastLogin?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    role?: true
    bankId?: true
    createdAt?: true
    lastLogin?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    role?: true
    bankId?: true
    createdAt?: true
    lastLogin?: true
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
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
    bankId: string | null
    createdAt: Date
    lastLogin: Date | null
    _count: UserCountAggregateOutputType | null
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
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    bankId?: boolean
    createdAt?: boolean
    lastLogin?: boolean
    bank?: boolean | User$bankArgs<ExtArgs>
    movements?: boolean | User$movementsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    bankId?: boolean
    createdAt?: boolean
    lastLogin?: boolean
    bank?: boolean | User$bankArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    bankId?: boolean
    createdAt?: boolean
    lastLogin?: boolean
    bank?: boolean | User$bankArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    bankId?: boolean
    createdAt?: boolean
    lastLogin?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "firstName" | "lastName" | "role" | "bankId" | "createdAt" | "lastLogin", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bank?: boolean | User$bankArgs<ExtArgs>
    movements?: boolean | User$movementsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bank?: boolean | User$bankArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bank?: boolean | User$bankArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      bank: Prisma.$BankPayload<ExtArgs> | null
      movements: Prisma.$MovementPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      firstName: string
      lastName: string
      role: string
      bankId: string | null
      createdAt: Date
      lastLogin: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

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
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bank<T extends User$bankArgs<ExtArgs> = {}>(args?: Subset<T, User$bankArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    movements<T extends User$movementsArgs<ExtArgs> = {}>(args?: Subset<T, User$movementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly bankId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
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
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.bank
   */
  export type User$bankArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bank
     */
    omit?: BankOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    where?: BankWhereInput
  }

  /**
   * User.movements
   */
  export type User$movementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    where?: MovementWhereInput
    orderBy?: MovementOrderByWithRelationInput | MovementOrderByWithRelationInput[]
    cursor?: MovementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovementScalarFieldEnum | MovementScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
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
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Bank
   */

  export type AggregateBank = {
    _count: BankCountAggregateOutputType | null
    _min: BankMinAggregateOutputType | null
    _max: BankMaxAggregateOutputType | null
  }

  export type BankMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type BankMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
  }

  export type BankCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    _all: number
  }


  export type BankMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type BankMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
  }

  export type BankCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type BankAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bank to aggregate.
     */
    where?: BankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Banks to fetch.
     */
    orderBy?: BankOrderByWithRelationInput | BankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Banks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Banks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Banks
    **/
    _count?: true | BankCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BankMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BankMaxAggregateInputType
  }

  export type GetBankAggregateType<T extends BankAggregateArgs> = {
        [P in keyof T & keyof AggregateBank]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBank[P]>
      : GetScalarType<T[P], AggregateBank[P]>
  }




  export type BankGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BankWhereInput
    orderBy?: BankOrderByWithAggregationInput | BankOrderByWithAggregationInput[]
    by: BankScalarFieldEnum[] | BankScalarFieldEnum
    having?: BankScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BankCountAggregateInputType | true
    _min?: BankMinAggregateInputType
    _max?: BankMaxAggregateInputType
  }

  export type BankGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    _count: BankCountAggregateOutputType | null
    _min: BankMinAggregateOutputType | null
    _max: BankMaxAggregateOutputType | null
  }

  type GetBankGroupByPayload<T extends BankGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BankGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BankGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BankGroupByOutputType[P]>
            : GetScalarType<T[P], BankGroupByOutputType[P]>
        }
      >
    >


  export type BankSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    locations?: boolean | Bank$locationsArgs<ExtArgs>
    users?: boolean | Bank$usersArgs<ExtArgs>
    cardTypes?: boolean | Bank$cardTypesArgs<ExtArgs>
    _count?: boolean | BankCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bank"]>

  export type BankSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["bank"]>

  export type BankSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["bank"]>

  export type BankSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type BankOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt", ExtArgs["result"]["bank"]>
  export type BankInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    locations?: boolean | Bank$locationsArgs<ExtArgs>
    users?: boolean | Bank$usersArgs<ExtArgs>
    cardTypes?: boolean | Bank$cardTypesArgs<ExtArgs>
    _count?: boolean | BankCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BankIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BankIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BankPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bank"
    objects: {
      locations: Prisma.$LocationPayload<ExtArgs>[]
      users: Prisma.$UserPayload<ExtArgs>[]
      cardTypes: Prisma.$CardTypePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["bank"]>
    composites: {}
  }

  type BankGetPayload<S extends boolean | null | undefined | BankDefaultArgs> = $Result.GetResult<Prisma.$BankPayload, S>

  type BankCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BankFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BankCountAggregateInputType | true
    }

  export interface BankDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bank'], meta: { name: 'Bank' } }
    /**
     * Find zero or one Bank that matches the filter.
     * @param {BankFindUniqueArgs} args - Arguments to find a Bank
     * @example
     * // Get one Bank
     * const bank = await prisma.bank.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BankFindUniqueArgs>(args: SelectSubset<T, BankFindUniqueArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bank that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BankFindUniqueOrThrowArgs} args - Arguments to find a Bank
     * @example
     * // Get one Bank
     * const bank = await prisma.bank.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BankFindUniqueOrThrowArgs>(args: SelectSubset<T, BankFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bank that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankFindFirstArgs} args - Arguments to find a Bank
     * @example
     * // Get one Bank
     * const bank = await prisma.bank.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BankFindFirstArgs>(args?: SelectSubset<T, BankFindFirstArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bank that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankFindFirstOrThrowArgs} args - Arguments to find a Bank
     * @example
     * // Get one Bank
     * const bank = await prisma.bank.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BankFindFirstOrThrowArgs>(args?: SelectSubset<T, BankFindFirstOrThrowArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Banks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Banks
     * const banks = await prisma.bank.findMany()
     * 
     * // Get first 10 Banks
     * const banks = await prisma.bank.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const bankWithIdOnly = await prisma.bank.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BankFindManyArgs>(args?: SelectSubset<T, BankFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bank.
     * @param {BankCreateArgs} args - Arguments to create a Bank.
     * @example
     * // Create one Bank
     * const Bank = await prisma.bank.create({
     *   data: {
     *     // ... data to create a Bank
     *   }
     * })
     * 
     */
    create<T extends BankCreateArgs>(args: SelectSubset<T, BankCreateArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Banks.
     * @param {BankCreateManyArgs} args - Arguments to create many Banks.
     * @example
     * // Create many Banks
     * const bank = await prisma.bank.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BankCreateManyArgs>(args?: SelectSubset<T, BankCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Banks and returns the data saved in the database.
     * @param {BankCreateManyAndReturnArgs} args - Arguments to create many Banks.
     * @example
     * // Create many Banks
     * const bank = await prisma.bank.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Banks and only return the `id`
     * const bankWithIdOnly = await prisma.bank.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BankCreateManyAndReturnArgs>(args?: SelectSubset<T, BankCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bank.
     * @param {BankDeleteArgs} args - Arguments to delete one Bank.
     * @example
     * // Delete one Bank
     * const Bank = await prisma.bank.delete({
     *   where: {
     *     // ... filter to delete one Bank
     *   }
     * })
     * 
     */
    delete<T extends BankDeleteArgs>(args: SelectSubset<T, BankDeleteArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bank.
     * @param {BankUpdateArgs} args - Arguments to update one Bank.
     * @example
     * // Update one Bank
     * const bank = await prisma.bank.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BankUpdateArgs>(args: SelectSubset<T, BankUpdateArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Banks.
     * @param {BankDeleteManyArgs} args - Arguments to filter Banks to delete.
     * @example
     * // Delete a few Banks
     * const { count } = await prisma.bank.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BankDeleteManyArgs>(args?: SelectSubset<T, BankDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Banks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Banks
     * const bank = await prisma.bank.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BankUpdateManyArgs>(args: SelectSubset<T, BankUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Banks and returns the data updated in the database.
     * @param {BankUpdateManyAndReturnArgs} args - Arguments to update many Banks.
     * @example
     * // Update many Banks
     * const bank = await prisma.bank.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Banks and only return the `id`
     * const bankWithIdOnly = await prisma.bank.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BankUpdateManyAndReturnArgs>(args: SelectSubset<T, BankUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bank.
     * @param {BankUpsertArgs} args - Arguments to update or create a Bank.
     * @example
     * // Update or create a Bank
     * const bank = await prisma.bank.upsert({
     *   create: {
     *     // ... data to create a Bank
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bank we want to update
     *   }
     * })
     */
    upsert<T extends BankUpsertArgs>(args: SelectSubset<T, BankUpsertArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Banks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankCountArgs} args - Arguments to filter Banks to count.
     * @example
     * // Count the number of Banks
     * const count = await prisma.bank.count({
     *   where: {
     *     // ... the filter for the Banks we want to count
     *   }
     * })
    **/
    count<T extends BankCountArgs>(
      args?: Subset<T, BankCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BankCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bank.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BankAggregateArgs>(args: Subset<T, BankAggregateArgs>): Prisma.PrismaPromise<GetBankAggregateType<T>>

    /**
     * Group by Bank.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BankGroupByArgs} args - Group by arguments.
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
      T extends BankGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BankGroupByArgs['orderBy'] }
        : { orderBy?: BankGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BankGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBankGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bank model
   */
  readonly fields: BankFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bank.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BankClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    locations<T extends Bank$locationsArgs<ExtArgs> = {}>(args?: Subset<T, Bank$locationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    users<T extends Bank$usersArgs<ExtArgs> = {}>(args?: Subset<T, Bank$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cardTypes<T extends Bank$cardTypesArgs<ExtArgs> = {}>(args?: Subset<T, Bank$cardTypesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bank model
   */
  interface BankFieldRefs {
    readonly id: FieldRef<"Bank", 'String'>
    readonly name: FieldRef<"Bank", 'String'>
    readonly createdAt: FieldRef<"Bank", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Bank findUnique
   */
  export type BankFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bank
     */
    omit?: BankOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * Filter, which Bank to fetch.
     */
    where: BankWhereUniqueInput
  }

  /**
   * Bank findUniqueOrThrow
   */
  export type BankFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bank
     */
    omit?: BankOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * Filter, which Bank to fetch.
     */
    where: BankWhereUniqueInput
  }

  /**
   * Bank findFirst
   */
  export type BankFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bank
     */
    omit?: BankOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * Filter, which Bank to fetch.
     */
    where?: BankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Banks to fetch.
     */
    orderBy?: BankOrderByWithRelationInput | BankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Banks.
     */
    cursor?: BankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Banks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Banks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Banks.
     */
    distinct?: BankScalarFieldEnum | BankScalarFieldEnum[]
  }

  /**
   * Bank findFirstOrThrow
   */
  export type BankFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bank
     */
    omit?: BankOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * Filter, which Bank to fetch.
     */
    where?: BankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Banks to fetch.
     */
    orderBy?: BankOrderByWithRelationInput | BankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Banks.
     */
    cursor?: BankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Banks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Banks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Banks.
     */
    distinct?: BankScalarFieldEnum | BankScalarFieldEnum[]
  }

  /**
   * Bank findMany
   */
  export type BankFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bank
     */
    omit?: BankOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * Filter, which Banks to fetch.
     */
    where?: BankWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Banks to fetch.
     */
    orderBy?: BankOrderByWithRelationInput | BankOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Banks.
     */
    cursor?: BankWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Banks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Banks.
     */
    skip?: number
    distinct?: BankScalarFieldEnum | BankScalarFieldEnum[]
  }

  /**
   * Bank create
   */
  export type BankCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bank
     */
    omit?: BankOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * The data needed to create a Bank.
     */
    data: XOR<BankCreateInput, BankUncheckedCreateInput>
  }

  /**
   * Bank createMany
   */
  export type BankCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Banks.
     */
    data: BankCreateManyInput | BankCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bank createManyAndReturn
   */
  export type BankCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bank
     */
    omit?: BankOmit<ExtArgs> | null
    /**
     * The data used to create many Banks.
     */
    data: BankCreateManyInput | BankCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bank update
   */
  export type BankUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bank
     */
    omit?: BankOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * The data needed to update a Bank.
     */
    data: XOR<BankUpdateInput, BankUncheckedUpdateInput>
    /**
     * Choose, which Bank to update.
     */
    where: BankWhereUniqueInput
  }

  /**
   * Bank updateMany
   */
  export type BankUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Banks.
     */
    data: XOR<BankUpdateManyMutationInput, BankUncheckedUpdateManyInput>
    /**
     * Filter which Banks to update
     */
    where?: BankWhereInput
    /**
     * Limit how many Banks to update.
     */
    limit?: number
  }

  /**
   * Bank updateManyAndReturn
   */
  export type BankUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bank
     */
    omit?: BankOmit<ExtArgs> | null
    /**
     * The data used to update Banks.
     */
    data: XOR<BankUpdateManyMutationInput, BankUncheckedUpdateManyInput>
    /**
     * Filter which Banks to update
     */
    where?: BankWhereInput
    /**
     * Limit how many Banks to update.
     */
    limit?: number
  }

  /**
   * Bank upsert
   */
  export type BankUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bank
     */
    omit?: BankOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * The filter to search for the Bank to update in case it exists.
     */
    where: BankWhereUniqueInput
    /**
     * In case the Bank found by the `where` argument doesn't exist, create a new Bank with this data.
     */
    create: XOR<BankCreateInput, BankUncheckedCreateInput>
    /**
     * In case the Bank was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BankUpdateInput, BankUncheckedUpdateInput>
  }

  /**
   * Bank delete
   */
  export type BankDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bank
     */
    omit?: BankOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
    /**
     * Filter which Bank to delete.
     */
    where: BankWhereUniqueInput
  }

  /**
   * Bank deleteMany
   */
  export type BankDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Banks to delete
     */
    where?: BankWhereInput
    /**
     * Limit how many Banks to delete.
     */
    limit?: number
  }

  /**
   * Bank.locations
   */
  export type Bank$locationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    cursor?: LocationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Bank.users
   */
  export type Bank$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Bank.cardTypes
   */
  export type Bank$cardTypesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardType
     */
    select?: CardTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardType
     */
    omit?: CardTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardTypeInclude<ExtArgs> | null
    where?: CardTypeWhereInput
    orderBy?: CardTypeOrderByWithRelationInput | CardTypeOrderByWithRelationInput[]
    cursor?: CardTypeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CardTypeScalarFieldEnum | CardTypeScalarFieldEnum[]
  }

  /**
   * Bank without action
   */
  export type BankDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bank
     */
    select?: BankSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bank
     */
    omit?: BankOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BankInclude<ExtArgs> | null
  }


  /**
   * Model Location
   */

  export type AggregateLocation = {
    _count: LocationCountAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  export type LocationMinAggregateOutputType = {
    id: string | null
    name: string | null
    bankId: string | null
    createdAt: Date | null
  }

  export type LocationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    bankId: string | null
    createdAt: Date | null
  }

  export type LocationCountAggregateOutputType = {
    id: number
    name: number
    bankId: number
    createdAt: number
    _all: number
  }


  export type LocationMinAggregateInputType = {
    id?: true
    name?: true
    bankId?: true
    createdAt?: true
  }

  export type LocationMaxAggregateInputType = {
    id?: true
    name?: true
    bankId?: true
    createdAt?: true
  }

  export type LocationCountAggregateInputType = {
    id?: true
    name?: true
    bankId?: true
    createdAt?: true
    _all?: true
  }

  export type LocationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Location to aggregate.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Locations
    **/
    _count?: true | LocationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LocationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LocationMaxAggregateInputType
  }

  export type GetLocationAggregateType<T extends LocationAggregateArgs> = {
        [P in keyof T & keyof AggregateLocation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLocation[P]>
      : GetScalarType<T[P], AggregateLocation[P]>
  }




  export type LocationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LocationWhereInput
    orderBy?: LocationOrderByWithAggregationInput | LocationOrderByWithAggregationInput[]
    by: LocationScalarFieldEnum[] | LocationScalarFieldEnum
    having?: LocationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LocationCountAggregateInputType | true
    _min?: LocationMinAggregateInputType
    _max?: LocationMaxAggregateInputType
  }

  export type LocationGroupByOutputType = {
    id: string
    name: string
    bankId: string
    createdAt: Date
    _count: LocationCountAggregateOutputType | null
    _min: LocationMinAggregateOutputType | null
    _max: LocationMaxAggregateOutputType | null
  }

  type GetLocationGroupByPayload<T extends LocationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LocationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LocationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LocationGroupByOutputType[P]>
            : GetScalarType<T[P], LocationGroupByOutputType[P]>
        }
      >
    >


  export type LocationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    bankId?: boolean
    createdAt?: boolean
    bank?: boolean | BankDefaultArgs<ExtArgs>
    stock?: boolean | Location$stockArgs<ExtArgs>
    movements?: boolean | Location$movementsArgs<ExtArgs>
    destMovements?: boolean | Location$destMovementsArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    bankId?: boolean
    createdAt?: boolean
    bank?: boolean | BankDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    bankId?: boolean
    createdAt?: boolean
    bank?: boolean | BankDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["location"]>

  export type LocationSelectScalar = {
    id?: boolean
    name?: boolean
    bankId?: boolean
    createdAt?: boolean
  }

  export type LocationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "bankId" | "createdAt", ExtArgs["result"]["location"]>
  export type LocationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bank?: boolean | BankDefaultArgs<ExtArgs>
    stock?: boolean | Location$stockArgs<ExtArgs>
    movements?: boolean | Location$movementsArgs<ExtArgs>
    destMovements?: boolean | Location$destMovementsArgs<ExtArgs>
    _count?: boolean | LocationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LocationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bank?: boolean | BankDefaultArgs<ExtArgs>
  }
  export type LocationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bank?: boolean | BankDefaultArgs<ExtArgs>
  }

  export type $LocationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Location"
    objects: {
      bank: Prisma.$BankPayload<ExtArgs>
      stock: Prisma.$StockPayload<ExtArgs>[]
      movements: Prisma.$MovementPayload<ExtArgs>[]
      destMovements: Prisma.$MovementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      bankId: string
      createdAt: Date
    }, ExtArgs["result"]["location"]>
    composites: {}
  }

  type LocationGetPayload<S extends boolean | null | undefined | LocationDefaultArgs> = $Result.GetResult<Prisma.$LocationPayload, S>

  type LocationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LocationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LocationCountAggregateInputType | true
    }

  export interface LocationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Location'], meta: { name: 'Location' } }
    /**
     * Find zero or one Location that matches the filter.
     * @param {LocationFindUniqueArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LocationFindUniqueArgs>(args: SelectSubset<T, LocationFindUniqueArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Location that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LocationFindUniqueOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LocationFindUniqueOrThrowArgs>(args: SelectSubset<T, LocationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LocationFindFirstArgs>(args?: SelectSubset<T, LocationFindFirstArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Location that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindFirstOrThrowArgs} args - Arguments to find a Location
     * @example
     * // Get one Location
     * const location = await prisma.location.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LocationFindFirstOrThrowArgs>(args?: SelectSubset<T, LocationFindFirstOrThrowArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Locations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Locations
     * const locations = await prisma.location.findMany()
     * 
     * // Get first 10 Locations
     * const locations = await prisma.location.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const locationWithIdOnly = await prisma.location.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LocationFindManyArgs>(args?: SelectSubset<T, LocationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Location.
     * @param {LocationCreateArgs} args - Arguments to create a Location.
     * @example
     * // Create one Location
     * const Location = await prisma.location.create({
     *   data: {
     *     // ... data to create a Location
     *   }
     * })
     * 
     */
    create<T extends LocationCreateArgs>(args: SelectSubset<T, LocationCreateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Locations.
     * @param {LocationCreateManyArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LocationCreateManyArgs>(args?: SelectSubset<T, LocationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Locations and returns the data saved in the database.
     * @param {LocationCreateManyAndReturnArgs} args - Arguments to create many Locations.
     * @example
     * // Create many Locations
     * const location = await prisma.location.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LocationCreateManyAndReturnArgs>(args?: SelectSubset<T, LocationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Location.
     * @param {LocationDeleteArgs} args - Arguments to delete one Location.
     * @example
     * // Delete one Location
     * const Location = await prisma.location.delete({
     *   where: {
     *     // ... filter to delete one Location
     *   }
     * })
     * 
     */
    delete<T extends LocationDeleteArgs>(args: SelectSubset<T, LocationDeleteArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Location.
     * @param {LocationUpdateArgs} args - Arguments to update one Location.
     * @example
     * // Update one Location
     * const location = await prisma.location.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LocationUpdateArgs>(args: SelectSubset<T, LocationUpdateArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Locations.
     * @param {LocationDeleteManyArgs} args - Arguments to filter Locations to delete.
     * @example
     * // Delete a few Locations
     * const { count } = await prisma.location.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LocationDeleteManyArgs>(args?: SelectSubset<T, LocationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LocationUpdateManyArgs>(args: SelectSubset<T, LocationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Locations and returns the data updated in the database.
     * @param {LocationUpdateManyAndReturnArgs} args - Arguments to update many Locations.
     * @example
     * // Update many Locations
     * const location = await prisma.location.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Locations and only return the `id`
     * const locationWithIdOnly = await prisma.location.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LocationUpdateManyAndReturnArgs>(args: SelectSubset<T, LocationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Location.
     * @param {LocationUpsertArgs} args - Arguments to update or create a Location.
     * @example
     * // Update or create a Location
     * const location = await prisma.location.upsert({
     *   create: {
     *     // ... data to create a Location
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Location we want to update
     *   }
     * })
     */
    upsert<T extends LocationUpsertArgs>(args: SelectSubset<T, LocationUpsertArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Locations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationCountArgs} args - Arguments to filter Locations to count.
     * @example
     * // Count the number of Locations
     * const count = await prisma.location.count({
     *   where: {
     *     // ... the filter for the Locations we want to count
     *   }
     * })
    **/
    count<T extends LocationCountArgs>(
      args?: Subset<T, LocationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LocationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LocationAggregateArgs>(args: Subset<T, LocationAggregateArgs>): Prisma.PrismaPromise<GetLocationAggregateType<T>>

    /**
     * Group by Location.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LocationGroupByArgs} args - Group by arguments.
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
      T extends LocationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LocationGroupByArgs['orderBy'] }
        : { orderBy?: LocationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LocationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLocationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Location model
   */
  readonly fields: LocationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Location.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LocationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bank<T extends BankDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BankDefaultArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stock<T extends Location$stockArgs<ExtArgs> = {}>(args?: Subset<T, Location$stockArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    movements<T extends Location$movementsArgs<ExtArgs> = {}>(args?: Subset<T, Location$movementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    destMovements<T extends Location$destMovementsArgs<ExtArgs> = {}>(args?: Subset<T, Location$destMovementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Location model
   */
  interface LocationFieldRefs {
    readonly id: FieldRef<"Location", 'String'>
    readonly name: FieldRef<"Location", 'String'>
    readonly bankId: FieldRef<"Location", 'String'>
    readonly createdAt: FieldRef<"Location", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Location findUnique
   */
  export type LocationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findUniqueOrThrow
   */
  export type LocationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location findFirst
   */
  export type LocationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findFirstOrThrow
   */
  export type LocationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Location to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Locations.
     */
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location findMany
   */
  export type LocationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter, which Locations to fetch.
     */
    where?: LocationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Locations to fetch.
     */
    orderBy?: LocationOrderByWithRelationInput | LocationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Locations.
     */
    cursor?: LocationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Locations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Locations.
     */
    skip?: number
    distinct?: LocationScalarFieldEnum | LocationScalarFieldEnum[]
  }

  /**
   * Location create
   */
  export type LocationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to create a Location.
     */
    data: XOR<LocationCreateInput, LocationUncheckedCreateInput>
  }

  /**
   * Location createMany
   */
  export type LocationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Location createManyAndReturn
   */
  export type LocationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to create many Locations.
     */
    data: LocationCreateManyInput | LocationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Location update
   */
  export type LocationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The data needed to update a Location.
     */
    data: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
    /**
     * Choose, which Location to update.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location updateMany
   */
  export type LocationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
  }

  /**
   * Location updateManyAndReturn
   */
  export type LocationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * The data used to update Locations.
     */
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyInput>
    /**
     * Filter which Locations to update
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Location upsert
   */
  export type LocationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * The filter to search for the Location to update in case it exists.
     */
    where: LocationWhereUniqueInput
    /**
     * In case the Location found by the `where` argument doesn't exist, create a new Location with this data.
     */
    create: XOR<LocationCreateInput, LocationUncheckedCreateInput>
    /**
     * In case the Location was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LocationUpdateInput, LocationUncheckedUpdateInput>
  }

  /**
   * Location delete
   */
  export type LocationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    /**
     * Filter which Location to delete.
     */
    where: LocationWhereUniqueInput
  }

  /**
   * Location deleteMany
   */
  export type LocationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Locations to delete
     */
    where?: LocationWhereInput
    /**
     * Limit how many Locations to delete.
     */
    limit?: number
  }

  /**
   * Location.stock
   */
  export type Location$stockArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    where?: StockWhereInput
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    cursor?: StockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Location.movements
   */
  export type Location$movementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    where?: MovementWhereInput
    orderBy?: MovementOrderByWithRelationInput | MovementOrderByWithRelationInput[]
    cursor?: MovementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovementScalarFieldEnum | MovementScalarFieldEnum[]
  }

  /**
   * Location.destMovements
   */
  export type Location$destMovementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    where?: MovementWhereInput
    orderBy?: MovementOrderByWithRelationInput | MovementOrderByWithRelationInput[]
    cursor?: MovementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovementScalarFieldEnum | MovementScalarFieldEnum[]
  }

  /**
   * Location without action
   */
  export type LocationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
  }


  /**
   * Model CardType
   */

  export type AggregateCardType = {
    _count: CardTypeCountAggregateOutputType | null
    _avg: CardTypeAvgAggregateOutputType | null
    _sum: CardTypeSumAggregateOutputType | null
    _min: CardTypeMinAggregateOutputType | null
    _max: CardTypeMaxAggregateOutputType | null
  }

  export type CardTypeAvgAggregateOutputType = {
    alertThreshold: number | null
  }

  export type CardTypeSumAggregateOutputType = {
    alertThreshold: number | null
  }

  export type CardTypeMinAggregateOutputType = {
    id: string | null
    name: string | null
    bankId: string | null
    alertThreshold: number | null
    createdAt: Date | null
  }

  export type CardTypeMaxAggregateOutputType = {
    id: string | null
    name: string | null
    bankId: string | null
    alertThreshold: number | null
    createdAt: Date | null
  }

  export type CardTypeCountAggregateOutputType = {
    id: number
    name: number
    bankId: number
    alertThreshold: number
    createdAt: number
    _all: number
  }


  export type CardTypeAvgAggregateInputType = {
    alertThreshold?: true
  }

  export type CardTypeSumAggregateInputType = {
    alertThreshold?: true
  }

  export type CardTypeMinAggregateInputType = {
    id?: true
    name?: true
    bankId?: true
    alertThreshold?: true
    createdAt?: true
  }

  export type CardTypeMaxAggregateInputType = {
    id?: true
    name?: true
    bankId?: true
    alertThreshold?: true
    createdAt?: true
  }

  export type CardTypeCountAggregateInputType = {
    id?: true
    name?: true
    bankId?: true
    alertThreshold?: true
    createdAt?: true
    _all?: true
  }

  export type CardTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CardType to aggregate.
     */
    where?: CardTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CardTypes to fetch.
     */
    orderBy?: CardTypeOrderByWithRelationInput | CardTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CardTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CardTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CardTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CardTypes
    **/
    _count?: true | CardTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CardTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CardTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CardTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CardTypeMaxAggregateInputType
  }

  export type GetCardTypeAggregateType<T extends CardTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateCardType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCardType[P]>
      : GetScalarType<T[P], AggregateCardType[P]>
  }




  export type CardTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CardTypeWhereInput
    orderBy?: CardTypeOrderByWithAggregationInput | CardTypeOrderByWithAggregationInput[]
    by: CardTypeScalarFieldEnum[] | CardTypeScalarFieldEnum
    having?: CardTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CardTypeCountAggregateInputType | true
    _avg?: CardTypeAvgAggregateInputType
    _sum?: CardTypeSumAggregateInputType
    _min?: CardTypeMinAggregateInputType
    _max?: CardTypeMaxAggregateInputType
  }

  export type CardTypeGroupByOutputType = {
    id: string
    name: string
    bankId: string
    alertThreshold: number | null
    createdAt: Date
    _count: CardTypeCountAggregateOutputType | null
    _avg: CardTypeAvgAggregateOutputType | null
    _sum: CardTypeSumAggregateOutputType | null
    _min: CardTypeMinAggregateOutputType | null
    _max: CardTypeMaxAggregateOutputType | null
  }

  type GetCardTypeGroupByPayload<T extends CardTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CardTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CardTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CardTypeGroupByOutputType[P]>
            : GetScalarType<T[P], CardTypeGroupByOutputType[P]>
        }
      >
    >


  export type CardTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    bankId?: boolean
    alertThreshold?: boolean
    createdAt?: boolean
    bank?: boolean | BankDefaultArgs<ExtArgs>
    stock?: boolean | CardType$stockArgs<ExtArgs>
    movements?: boolean | CardType$movementsArgs<ExtArgs>
    _count?: boolean | CardTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cardType"]>

  export type CardTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    bankId?: boolean
    alertThreshold?: boolean
    createdAt?: boolean
    bank?: boolean | BankDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cardType"]>

  export type CardTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    bankId?: boolean
    alertThreshold?: boolean
    createdAt?: boolean
    bank?: boolean | BankDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cardType"]>

  export type CardTypeSelectScalar = {
    id?: boolean
    name?: boolean
    bankId?: boolean
    alertThreshold?: boolean
    createdAt?: boolean
  }

  export type CardTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "bankId" | "alertThreshold" | "createdAt", ExtArgs["result"]["cardType"]>
  export type CardTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bank?: boolean | BankDefaultArgs<ExtArgs>
    stock?: boolean | CardType$stockArgs<ExtArgs>
    movements?: boolean | CardType$movementsArgs<ExtArgs>
    _count?: boolean | CardTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CardTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bank?: boolean | BankDefaultArgs<ExtArgs>
  }
  export type CardTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bank?: boolean | BankDefaultArgs<ExtArgs>
  }

  export type $CardTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CardType"
    objects: {
      bank: Prisma.$BankPayload<ExtArgs>
      stock: Prisma.$StockPayload<ExtArgs>[]
      movements: Prisma.$MovementPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      bankId: string
      alertThreshold: number | null
      createdAt: Date
    }, ExtArgs["result"]["cardType"]>
    composites: {}
  }

  type CardTypeGetPayload<S extends boolean | null | undefined | CardTypeDefaultArgs> = $Result.GetResult<Prisma.$CardTypePayload, S>

  type CardTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CardTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CardTypeCountAggregateInputType | true
    }

  export interface CardTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CardType'], meta: { name: 'CardType' } }
    /**
     * Find zero or one CardType that matches the filter.
     * @param {CardTypeFindUniqueArgs} args - Arguments to find a CardType
     * @example
     * // Get one CardType
     * const cardType = await prisma.cardType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CardTypeFindUniqueArgs>(args: SelectSubset<T, CardTypeFindUniqueArgs<ExtArgs>>): Prisma__CardTypeClient<$Result.GetResult<Prisma.$CardTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CardType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CardTypeFindUniqueOrThrowArgs} args - Arguments to find a CardType
     * @example
     * // Get one CardType
     * const cardType = await prisma.cardType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CardTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, CardTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CardTypeClient<$Result.GetResult<Prisma.$CardTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CardType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardTypeFindFirstArgs} args - Arguments to find a CardType
     * @example
     * // Get one CardType
     * const cardType = await prisma.cardType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CardTypeFindFirstArgs>(args?: SelectSubset<T, CardTypeFindFirstArgs<ExtArgs>>): Prisma__CardTypeClient<$Result.GetResult<Prisma.$CardTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CardType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardTypeFindFirstOrThrowArgs} args - Arguments to find a CardType
     * @example
     * // Get one CardType
     * const cardType = await prisma.cardType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CardTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, CardTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CardTypeClient<$Result.GetResult<Prisma.$CardTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CardTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CardTypes
     * const cardTypes = await prisma.cardType.findMany()
     * 
     * // Get first 10 CardTypes
     * const cardTypes = await prisma.cardType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cardTypeWithIdOnly = await prisma.cardType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CardTypeFindManyArgs>(args?: SelectSubset<T, CardTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CardType.
     * @param {CardTypeCreateArgs} args - Arguments to create a CardType.
     * @example
     * // Create one CardType
     * const CardType = await prisma.cardType.create({
     *   data: {
     *     // ... data to create a CardType
     *   }
     * })
     * 
     */
    create<T extends CardTypeCreateArgs>(args: SelectSubset<T, CardTypeCreateArgs<ExtArgs>>): Prisma__CardTypeClient<$Result.GetResult<Prisma.$CardTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CardTypes.
     * @param {CardTypeCreateManyArgs} args - Arguments to create many CardTypes.
     * @example
     * // Create many CardTypes
     * const cardType = await prisma.cardType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CardTypeCreateManyArgs>(args?: SelectSubset<T, CardTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CardTypes and returns the data saved in the database.
     * @param {CardTypeCreateManyAndReturnArgs} args - Arguments to create many CardTypes.
     * @example
     * // Create many CardTypes
     * const cardType = await prisma.cardType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CardTypes and only return the `id`
     * const cardTypeWithIdOnly = await prisma.cardType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CardTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, CardTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CardType.
     * @param {CardTypeDeleteArgs} args - Arguments to delete one CardType.
     * @example
     * // Delete one CardType
     * const CardType = await prisma.cardType.delete({
     *   where: {
     *     // ... filter to delete one CardType
     *   }
     * })
     * 
     */
    delete<T extends CardTypeDeleteArgs>(args: SelectSubset<T, CardTypeDeleteArgs<ExtArgs>>): Prisma__CardTypeClient<$Result.GetResult<Prisma.$CardTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CardType.
     * @param {CardTypeUpdateArgs} args - Arguments to update one CardType.
     * @example
     * // Update one CardType
     * const cardType = await prisma.cardType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CardTypeUpdateArgs>(args: SelectSubset<T, CardTypeUpdateArgs<ExtArgs>>): Prisma__CardTypeClient<$Result.GetResult<Prisma.$CardTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CardTypes.
     * @param {CardTypeDeleteManyArgs} args - Arguments to filter CardTypes to delete.
     * @example
     * // Delete a few CardTypes
     * const { count } = await prisma.cardType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CardTypeDeleteManyArgs>(args?: SelectSubset<T, CardTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CardTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CardTypes
     * const cardType = await prisma.cardType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CardTypeUpdateManyArgs>(args: SelectSubset<T, CardTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CardTypes and returns the data updated in the database.
     * @param {CardTypeUpdateManyAndReturnArgs} args - Arguments to update many CardTypes.
     * @example
     * // Update many CardTypes
     * const cardType = await prisma.cardType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CardTypes and only return the `id`
     * const cardTypeWithIdOnly = await prisma.cardType.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CardTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, CardTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CardTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CardType.
     * @param {CardTypeUpsertArgs} args - Arguments to update or create a CardType.
     * @example
     * // Update or create a CardType
     * const cardType = await prisma.cardType.upsert({
     *   create: {
     *     // ... data to create a CardType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CardType we want to update
     *   }
     * })
     */
    upsert<T extends CardTypeUpsertArgs>(args: SelectSubset<T, CardTypeUpsertArgs<ExtArgs>>): Prisma__CardTypeClient<$Result.GetResult<Prisma.$CardTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CardTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardTypeCountArgs} args - Arguments to filter CardTypes to count.
     * @example
     * // Count the number of CardTypes
     * const count = await prisma.cardType.count({
     *   where: {
     *     // ... the filter for the CardTypes we want to count
     *   }
     * })
    **/
    count<T extends CardTypeCountArgs>(
      args?: Subset<T, CardTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CardTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CardType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CardTypeAggregateArgs>(args: Subset<T, CardTypeAggregateArgs>): Prisma.PrismaPromise<GetCardTypeAggregateType<T>>

    /**
     * Group by CardType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CardTypeGroupByArgs} args - Group by arguments.
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
      T extends CardTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CardTypeGroupByArgs['orderBy'] }
        : { orderBy?: CardTypeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CardTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCardTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CardType model
   */
  readonly fields: CardTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CardType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CardTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bank<T extends BankDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BankDefaultArgs<ExtArgs>>): Prisma__BankClient<$Result.GetResult<Prisma.$BankPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    stock<T extends CardType$stockArgs<ExtArgs> = {}>(args?: Subset<T, CardType$stockArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    movements<T extends CardType$movementsArgs<ExtArgs> = {}>(args?: Subset<T, CardType$movementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CardType model
   */
  interface CardTypeFieldRefs {
    readonly id: FieldRef<"CardType", 'String'>
    readonly name: FieldRef<"CardType", 'String'>
    readonly bankId: FieldRef<"CardType", 'String'>
    readonly alertThreshold: FieldRef<"CardType", 'Int'>
    readonly createdAt: FieldRef<"CardType", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CardType findUnique
   */
  export type CardTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardType
     */
    select?: CardTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardType
     */
    omit?: CardTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardTypeInclude<ExtArgs> | null
    /**
     * Filter, which CardType to fetch.
     */
    where: CardTypeWhereUniqueInput
  }

  /**
   * CardType findUniqueOrThrow
   */
  export type CardTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardType
     */
    select?: CardTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardType
     */
    omit?: CardTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardTypeInclude<ExtArgs> | null
    /**
     * Filter, which CardType to fetch.
     */
    where: CardTypeWhereUniqueInput
  }

  /**
   * CardType findFirst
   */
  export type CardTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardType
     */
    select?: CardTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardType
     */
    omit?: CardTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardTypeInclude<ExtArgs> | null
    /**
     * Filter, which CardType to fetch.
     */
    where?: CardTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CardTypes to fetch.
     */
    orderBy?: CardTypeOrderByWithRelationInput | CardTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CardTypes.
     */
    cursor?: CardTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CardTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CardTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CardTypes.
     */
    distinct?: CardTypeScalarFieldEnum | CardTypeScalarFieldEnum[]
  }

  /**
   * CardType findFirstOrThrow
   */
  export type CardTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardType
     */
    select?: CardTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardType
     */
    omit?: CardTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardTypeInclude<ExtArgs> | null
    /**
     * Filter, which CardType to fetch.
     */
    where?: CardTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CardTypes to fetch.
     */
    orderBy?: CardTypeOrderByWithRelationInput | CardTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CardTypes.
     */
    cursor?: CardTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CardTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CardTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CardTypes.
     */
    distinct?: CardTypeScalarFieldEnum | CardTypeScalarFieldEnum[]
  }

  /**
   * CardType findMany
   */
  export type CardTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardType
     */
    select?: CardTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardType
     */
    omit?: CardTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardTypeInclude<ExtArgs> | null
    /**
     * Filter, which CardTypes to fetch.
     */
    where?: CardTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CardTypes to fetch.
     */
    orderBy?: CardTypeOrderByWithRelationInput | CardTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CardTypes.
     */
    cursor?: CardTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CardTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CardTypes.
     */
    skip?: number
    distinct?: CardTypeScalarFieldEnum | CardTypeScalarFieldEnum[]
  }

  /**
   * CardType create
   */
  export type CardTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardType
     */
    select?: CardTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardType
     */
    omit?: CardTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a CardType.
     */
    data: XOR<CardTypeCreateInput, CardTypeUncheckedCreateInput>
  }

  /**
   * CardType createMany
   */
  export type CardTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CardTypes.
     */
    data: CardTypeCreateManyInput | CardTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CardType createManyAndReturn
   */
  export type CardTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardType
     */
    select?: CardTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CardType
     */
    omit?: CardTypeOmit<ExtArgs> | null
    /**
     * The data used to create many CardTypes.
     */
    data: CardTypeCreateManyInput | CardTypeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardTypeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CardType update
   */
  export type CardTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardType
     */
    select?: CardTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardType
     */
    omit?: CardTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a CardType.
     */
    data: XOR<CardTypeUpdateInput, CardTypeUncheckedUpdateInput>
    /**
     * Choose, which CardType to update.
     */
    where: CardTypeWhereUniqueInput
  }

  /**
   * CardType updateMany
   */
  export type CardTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CardTypes.
     */
    data: XOR<CardTypeUpdateManyMutationInput, CardTypeUncheckedUpdateManyInput>
    /**
     * Filter which CardTypes to update
     */
    where?: CardTypeWhereInput
    /**
     * Limit how many CardTypes to update.
     */
    limit?: number
  }

  /**
   * CardType updateManyAndReturn
   */
  export type CardTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardType
     */
    select?: CardTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CardType
     */
    omit?: CardTypeOmit<ExtArgs> | null
    /**
     * The data used to update CardTypes.
     */
    data: XOR<CardTypeUpdateManyMutationInput, CardTypeUncheckedUpdateManyInput>
    /**
     * Filter which CardTypes to update
     */
    where?: CardTypeWhereInput
    /**
     * Limit how many CardTypes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardTypeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CardType upsert
   */
  export type CardTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardType
     */
    select?: CardTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardType
     */
    omit?: CardTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the CardType to update in case it exists.
     */
    where: CardTypeWhereUniqueInput
    /**
     * In case the CardType found by the `where` argument doesn't exist, create a new CardType with this data.
     */
    create: XOR<CardTypeCreateInput, CardTypeUncheckedCreateInput>
    /**
     * In case the CardType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CardTypeUpdateInput, CardTypeUncheckedUpdateInput>
  }

  /**
   * CardType delete
   */
  export type CardTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardType
     */
    select?: CardTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardType
     */
    omit?: CardTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardTypeInclude<ExtArgs> | null
    /**
     * Filter which CardType to delete.
     */
    where: CardTypeWhereUniqueInput
  }

  /**
   * CardType deleteMany
   */
  export type CardTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CardTypes to delete
     */
    where?: CardTypeWhereInput
    /**
     * Limit how many CardTypes to delete.
     */
    limit?: number
  }

  /**
   * CardType.stock
   */
  export type CardType$stockArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    where?: StockWhereInput
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    cursor?: StockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * CardType.movements
   */
  export type CardType$movementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    where?: MovementWhereInput
    orderBy?: MovementOrderByWithRelationInput | MovementOrderByWithRelationInput[]
    cursor?: MovementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MovementScalarFieldEnum | MovementScalarFieldEnum[]
  }

  /**
   * CardType without action
   */
  export type CardTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CardType
     */
    select?: CardTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CardType
     */
    omit?: CardTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CardTypeInclude<ExtArgs> | null
  }


  /**
   * Model Stock
   */

  export type AggregateStock = {
    _count: StockCountAggregateOutputType | null
    _avg: StockAvgAggregateOutputType | null
    _sum: StockSumAggregateOutputType | null
    _min: StockMinAggregateOutputType | null
    _max: StockMaxAggregateOutputType | null
  }

  export type StockAvgAggregateOutputType = {
    quantity: number | null
  }

  export type StockSumAggregateOutputType = {
    quantity: number | null
  }

  export type StockMinAggregateOutputType = {
    id: string | null
    locationId: string | null
    cardTypeId: string | null
    quantity: number | null
    lastUpdate: Date | null
  }

  export type StockMaxAggregateOutputType = {
    id: string | null
    locationId: string | null
    cardTypeId: string | null
    quantity: number | null
    lastUpdate: Date | null
  }

  export type StockCountAggregateOutputType = {
    id: number
    locationId: number
    cardTypeId: number
    quantity: number
    lastUpdate: number
    _all: number
  }


  export type StockAvgAggregateInputType = {
    quantity?: true
  }

  export type StockSumAggregateInputType = {
    quantity?: true
  }

  export type StockMinAggregateInputType = {
    id?: true
    locationId?: true
    cardTypeId?: true
    quantity?: true
    lastUpdate?: true
  }

  export type StockMaxAggregateInputType = {
    id?: true
    locationId?: true
    cardTypeId?: true
    quantity?: true
    lastUpdate?: true
  }

  export type StockCountAggregateInputType = {
    id?: true
    locationId?: true
    cardTypeId?: true
    quantity?: true
    lastUpdate?: true
    _all?: true
  }

  export type StockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stock to aggregate.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Stocks
    **/
    _count?: true | StockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StockMaxAggregateInputType
  }

  export type GetStockAggregateType<T extends StockAggregateArgs> = {
        [P in keyof T & keyof AggregateStock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStock[P]>
      : GetScalarType<T[P], AggregateStock[P]>
  }




  export type StockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StockWhereInput
    orderBy?: StockOrderByWithAggregationInput | StockOrderByWithAggregationInput[]
    by: StockScalarFieldEnum[] | StockScalarFieldEnum
    having?: StockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StockCountAggregateInputType | true
    _avg?: StockAvgAggregateInputType
    _sum?: StockSumAggregateInputType
    _min?: StockMinAggregateInputType
    _max?: StockMaxAggregateInputType
  }

  export type StockGroupByOutputType = {
    id: string
    locationId: string
    cardTypeId: string
    quantity: number
    lastUpdate: Date
    _count: StockCountAggregateOutputType | null
    _avg: StockAvgAggregateOutputType | null
    _sum: StockSumAggregateOutputType | null
    _min: StockMinAggregateOutputType | null
    _max: StockMaxAggregateOutputType | null
  }

  type GetStockGroupByPayload<T extends StockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StockGroupByOutputType[P]>
            : GetScalarType<T[P], StockGroupByOutputType[P]>
        }
      >
    >


  export type StockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    locationId?: boolean
    cardTypeId?: boolean
    quantity?: boolean
    lastUpdate?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
    cardType?: boolean | CardTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stock"]>

  export type StockSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    locationId?: boolean
    cardTypeId?: boolean
    quantity?: boolean
    lastUpdate?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
    cardType?: boolean | CardTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stock"]>

  export type StockSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    locationId?: boolean
    cardTypeId?: boolean
    quantity?: boolean
    lastUpdate?: boolean
    location?: boolean | LocationDefaultArgs<ExtArgs>
    cardType?: boolean | CardTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stock"]>

  export type StockSelectScalar = {
    id?: boolean
    locationId?: boolean
    cardTypeId?: boolean
    quantity?: boolean
    lastUpdate?: boolean
  }

  export type StockOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "locationId" | "cardTypeId" | "quantity" | "lastUpdate", ExtArgs["result"]["stock"]>
  export type StockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
    cardType?: boolean | CardTypeDefaultArgs<ExtArgs>
  }
  export type StockIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
    cardType?: boolean | CardTypeDefaultArgs<ExtArgs>
  }
  export type StockIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    location?: boolean | LocationDefaultArgs<ExtArgs>
    cardType?: boolean | CardTypeDefaultArgs<ExtArgs>
  }

  export type $StockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stock"
    objects: {
      location: Prisma.$LocationPayload<ExtArgs>
      cardType: Prisma.$CardTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      locationId: string
      cardTypeId: string
      quantity: number
      lastUpdate: Date
    }, ExtArgs["result"]["stock"]>
    composites: {}
  }

  type StockGetPayload<S extends boolean | null | undefined | StockDefaultArgs> = $Result.GetResult<Prisma.$StockPayload, S>

  type StockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StockFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StockCountAggregateInputType | true
    }

  export interface StockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stock'], meta: { name: 'Stock' } }
    /**
     * Find zero or one Stock that matches the filter.
     * @param {StockFindUniqueArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StockFindUniqueArgs>(args: SelectSubset<T, StockFindUniqueArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Stock that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StockFindUniqueOrThrowArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StockFindUniqueOrThrowArgs>(args: SelectSubset<T, StockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindFirstArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StockFindFirstArgs>(args?: SelectSubset<T, StockFindFirstArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stock that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindFirstOrThrowArgs} args - Arguments to find a Stock
     * @example
     * // Get one Stock
     * const stock = await prisma.stock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StockFindFirstOrThrowArgs>(args?: SelectSubset<T, StockFindFirstOrThrowArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Stocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stocks
     * const stocks = await prisma.stock.findMany()
     * 
     * // Get first 10 Stocks
     * const stocks = await prisma.stock.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stockWithIdOnly = await prisma.stock.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StockFindManyArgs>(args?: SelectSubset<T, StockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Stock.
     * @param {StockCreateArgs} args - Arguments to create a Stock.
     * @example
     * // Create one Stock
     * const Stock = await prisma.stock.create({
     *   data: {
     *     // ... data to create a Stock
     *   }
     * })
     * 
     */
    create<T extends StockCreateArgs>(args: SelectSubset<T, StockCreateArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Stocks.
     * @param {StockCreateManyArgs} args - Arguments to create many Stocks.
     * @example
     * // Create many Stocks
     * const stock = await prisma.stock.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StockCreateManyArgs>(args?: SelectSubset<T, StockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Stocks and returns the data saved in the database.
     * @param {StockCreateManyAndReturnArgs} args - Arguments to create many Stocks.
     * @example
     * // Create many Stocks
     * const stock = await prisma.stock.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Stocks and only return the `id`
     * const stockWithIdOnly = await prisma.stock.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StockCreateManyAndReturnArgs>(args?: SelectSubset<T, StockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Stock.
     * @param {StockDeleteArgs} args - Arguments to delete one Stock.
     * @example
     * // Delete one Stock
     * const Stock = await prisma.stock.delete({
     *   where: {
     *     // ... filter to delete one Stock
     *   }
     * })
     * 
     */
    delete<T extends StockDeleteArgs>(args: SelectSubset<T, StockDeleteArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Stock.
     * @param {StockUpdateArgs} args - Arguments to update one Stock.
     * @example
     * // Update one Stock
     * const stock = await prisma.stock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StockUpdateArgs>(args: SelectSubset<T, StockUpdateArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Stocks.
     * @param {StockDeleteManyArgs} args - Arguments to filter Stocks to delete.
     * @example
     * // Delete a few Stocks
     * const { count } = await prisma.stock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StockDeleteManyArgs>(args?: SelectSubset<T, StockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stocks
     * const stock = await prisma.stock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StockUpdateManyArgs>(args: SelectSubset<T, StockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stocks and returns the data updated in the database.
     * @param {StockUpdateManyAndReturnArgs} args - Arguments to update many Stocks.
     * @example
     * // Update many Stocks
     * const stock = await prisma.stock.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Stocks and only return the `id`
     * const stockWithIdOnly = await prisma.stock.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StockUpdateManyAndReturnArgs>(args: SelectSubset<T, StockUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Stock.
     * @param {StockUpsertArgs} args - Arguments to update or create a Stock.
     * @example
     * // Update or create a Stock
     * const stock = await prisma.stock.upsert({
     *   create: {
     *     // ... data to create a Stock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stock we want to update
     *   }
     * })
     */
    upsert<T extends StockUpsertArgs>(args: SelectSubset<T, StockUpsertArgs<ExtArgs>>): Prisma__StockClient<$Result.GetResult<Prisma.$StockPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Stocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockCountArgs} args - Arguments to filter Stocks to count.
     * @example
     * // Count the number of Stocks
     * const count = await prisma.stock.count({
     *   where: {
     *     // ... the filter for the Stocks we want to count
     *   }
     * })
    **/
    count<T extends StockCountArgs>(
      args?: Subset<T, StockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StockAggregateArgs>(args: Subset<T, StockAggregateArgs>): Prisma.PrismaPromise<GetStockAggregateType<T>>

    /**
     * Group by Stock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StockGroupByArgs} args - Group by arguments.
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
      T extends StockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StockGroupByArgs['orderBy'] }
        : { orderBy?: StockGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stock model
   */
  readonly fields: StockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    location<T extends LocationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LocationDefaultArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cardType<T extends CardTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CardTypeDefaultArgs<ExtArgs>>): Prisma__CardTypeClient<$Result.GetResult<Prisma.$CardTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Stock model
   */
  interface StockFieldRefs {
    readonly id: FieldRef<"Stock", 'String'>
    readonly locationId: FieldRef<"Stock", 'String'>
    readonly cardTypeId: FieldRef<"Stock", 'String'>
    readonly quantity: FieldRef<"Stock", 'Int'>
    readonly lastUpdate: FieldRef<"Stock", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Stock findUnique
   */
  export type StockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock findUniqueOrThrow
   */
  export type StockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock findFirst
   */
  export type StockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock findFirstOrThrow
   */
  export type StockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stock to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Stocks.
     */
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock findMany
   */
  export type StockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter, which Stocks to fetch.
     */
    where?: StockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Stocks to fetch.
     */
    orderBy?: StockOrderByWithRelationInput | StockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Stocks.
     */
    cursor?: StockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Stocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Stocks.
     */
    skip?: number
    distinct?: StockScalarFieldEnum | StockScalarFieldEnum[]
  }

  /**
   * Stock create
   */
  export type StockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The data needed to create a Stock.
     */
    data: XOR<StockCreateInput, StockUncheckedCreateInput>
  }

  /**
   * Stock createMany
   */
  export type StockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Stocks.
     */
    data: StockCreateManyInput | StockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Stock createManyAndReturn
   */
  export type StockCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * The data used to create many Stocks.
     */
    data: StockCreateManyInput | StockCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stock update
   */
  export type StockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The data needed to update a Stock.
     */
    data: XOR<StockUpdateInput, StockUncheckedUpdateInput>
    /**
     * Choose, which Stock to update.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock updateMany
   */
  export type StockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Stocks.
     */
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyInput>
    /**
     * Filter which Stocks to update
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to update.
     */
    limit?: number
  }

  /**
   * Stock updateManyAndReturn
   */
  export type StockUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * The data used to update Stocks.
     */
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyInput>
    /**
     * Filter which Stocks to update
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stock upsert
   */
  export type StockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * The filter to search for the Stock to update in case it exists.
     */
    where: StockWhereUniqueInput
    /**
     * In case the Stock found by the `where` argument doesn't exist, create a new Stock with this data.
     */
    create: XOR<StockCreateInput, StockUncheckedCreateInput>
    /**
     * In case the Stock was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StockUpdateInput, StockUncheckedUpdateInput>
  }

  /**
   * Stock delete
   */
  export type StockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
    /**
     * Filter which Stock to delete.
     */
    where: StockWhereUniqueInput
  }

  /**
   * Stock deleteMany
   */
  export type StockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stocks to delete
     */
    where?: StockWhereInput
    /**
     * Limit how many Stocks to delete.
     */
    limit?: number
  }

  /**
   * Stock without action
   */
  export type StockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stock
     */
    select?: StockSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stock
     */
    omit?: StockOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StockInclude<ExtArgs> | null
  }


  /**
   * Model Movement
   */

  export type AggregateMovement = {
    _count: MovementCountAggregateOutputType | null
    _avg: MovementAvgAggregateOutputType | null
    _sum: MovementSumAggregateOutputType | null
    _min: MovementMinAggregateOutputType | null
    _max: MovementMaxAggregateOutputType | null
  }

  export type MovementAvgAggregateOutputType = {
    quantity: number | null
  }

  export type MovementSumAggregateOutputType = {
    quantity: number | null
  }

  export type MovementMinAggregateOutputType = {
    id: string | null
    type: string | null
    quantity: number | null
    userId: string | null
    cardTypeId: string | null
    locationId: string | null
    destLocationId: string | null
    createdAt: Date | null
  }

  export type MovementMaxAggregateOutputType = {
    id: string | null
    type: string | null
    quantity: number | null
    userId: string | null
    cardTypeId: string | null
    locationId: string | null
    destLocationId: string | null
    createdAt: Date | null
  }

  export type MovementCountAggregateOutputType = {
    id: number
    type: number
    quantity: number
    userId: number
    cardTypeId: number
    locationId: number
    destLocationId: number
    createdAt: number
    _all: number
  }


  export type MovementAvgAggregateInputType = {
    quantity?: true
  }

  export type MovementSumAggregateInputType = {
    quantity?: true
  }

  export type MovementMinAggregateInputType = {
    id?: true
    type?: true
    quantity?: true
    userId?: true
    cardTypeId?: true
    locationId?: true
    destLocationId?: true
    createdAt?: true
  }

  export type MovementMaxAggregateInputType = {
    id?: true
    type?: true
    quantity?: true
    userId?: true
    cardTypeId?: true
    locationId?: true
    destLocationId?: true
    createdAt?: true
  }

  export type MovementCountAggregateInputType = {
    id?: true
    type?: true
    quantity?: true
    userId?: true
    cardTypeId?: true
    locationId?: true
    destLocationId?: true
    createdAt?: true
    _all?: true
  }

  export type MovementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Movement to aggregate.
     */
    where?: MovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movements to fetch.
     */
    orderBy?: MovementOrderByWithRelationInput | MovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Movements
    **/
    _count?: true | MovementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MovementAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MovementSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MovementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MovementMaxAggregateInputType
  }

  export type GetMovementAggregateType<T extends MovementAggregateArgs> = {
        [P in keyof T & keyof AggregateMovement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMovement[P]>
      : GetScalarType<T[P], AggregateMovement[P]>
  }




  export type MovementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MovementWhereInput
    orderBy?: MovementOrderByWithAggregationInput | MovementOrderByWithAggregationInput[]
    by: MovementScalarFieldEnum[] | MovementScalarFieldEnum
    having?: MovementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MovementCountAggregateInputType | true
    _avg?: MovementAvgAggregateInputType
    _sum?: MovementSumAggregateInputType
    _min?: MovementMinAggregateInputType
    _max?: MovementMaxAggregateInputType
  }

  export type MovementGroupByOutputType = {
    id: string
    type: string
    quantity: number
    userId: string
    cardTypeId: string
    locationId: string
    destLocationId: string | null
    createdAt: Date
    _count: MovementCountAggregateOutputType | null
    _avg: MovementAvgAggregateOutputType | null
    _sum: MovementSumAggregateOutputType | null
    _min: MovementMinAggregateOutputType | null
    _max: MovementMaxAggregateOutputType | null
  }

  type GetMovementGroupByPayload<T extends MovementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MovementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MovementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MovementGroupByOutputType[P]>
            : GetScalarType<T[P], MovementGroupByOutputType[P]>
        }
      >
    >


  export type MovementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    quantity?: boolean
    userId?: boolean
    cardTypeId?: boolean
    locationId?: boolean
    destLocationId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    cardType?: boolean | CardTypeDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
    destLocation?: boolean | Movement$destLocationArgs<ExtArgs>
  }, ExtArgs["result"]["movement"]>

  export type MovementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    quantity?: boolean
    userId?: boolean
    cardTypeId?: boolean
    locationId?: boolean
    destLocationId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    cardType?: boolean | CardTypeDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
    destLocation?: boolean | Movement$destLocationArgs<ExtArgs>
  }, ExtArgs["result"]["movement"]>

  export type MovementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    quantity?: boolean
    userId?: boolean
    cardTypeId?: boolean
    locationId?: boolean
    destLocationId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    cardType?: boolean | CardTypeDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
    destLocation?: boolean | Movement$destLocationArgs<ExtArgs>
  }, ExtArgs["result"]["movement"]>

  export type MovementSelectScalar = {
    id?: boolean
    type?: boolean
    quantity?: boolean
    userId?: boolean
    cardTypeId?: boolean
    locationId?: boolean
    destLocationId?: boolean
    createdAt?: boolean
  }

  export type MovementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "quantity" | "userId" | "cardTypeId" | "locationId" | "destLocationId" | "createdAt", ExtArgs["result"]["movement"]>
  export type MovementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    cardType?: boolean | CardTypeDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
    destLocation?: boolean | Movement$destLocationArgs<ExtArgs>
  }
  export type MovementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    cardType?: boolean | CardTypeDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
    destLocation?: boolean | Movement$destLocationArgs<ExtArgs>
  }
  export type MovementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    cardType?: boolean | CardTypeDefaultArgs<ExtArgs>
    location?: boolean | LocationDefaultArgs<ExtArgs>
    destLocation?: boolean | Movement$destLocationArgs<ExtArgs>
  }

  export type $MovementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Movement"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      cardType: Prisma.$CardTypePayload<ExtArgs>
      location: Prisma.$LocationPayload<ExtArgs>
      destLocation: Prisma.$LocationPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      quantity: number
      userId: string
      cardTypeId: string
      locationId: string
      destLocationId: string | null
      createdAt: Date
    }, ExtArgs["result"]["movement"]>
    composites: {}
  }

  type MovementGetPayload<S extends boolean | null | undefined | MovementDefaultArgs> = $Result.GetResult<Prisma.$MovementPayload, S>

  type MovementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MovementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MovementCountAggregateInputType | true
    }

  export interface MovementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Movement'], meta: { name: 'Movement' } }
    /**
     * Find zero or one Movement that matches the filter.
     * @param {MovementFindUniqueArgs} args - Arguments to find a Movement
     * @example
     * // Get one Movement
     * const movement = await prisma.movement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MovementFindUniqueArgs>(args: SelectSubset<T, MovementFindUniqueArgs<ExtArgs>>): Prisma__MovementClient<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Movement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MovementFindUniqueOrThrowArgs} args - Arguments to find a Movement
     * @example
     * // Get one Movement
     * const movement = await prisma.movement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MovementFindUniqueOrThrowArgs>(args: SelectSubset<T, MovementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MovementClient<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovementFindFirstArgs} args - Arguments to find a Movement
     * @example
     * // Get one Movement
     * const movement = await prisma.movement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MovementFindFirstArgs>(args?: SelectSubset<T, MovementFindFirstArgs<ExtArgs>>): Prisma__MovementClient<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Movement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovementFindFirstOrThrowArgs} args - Arguments to find a Movement
     * @example
     * // Get one Movement
     * const movement = await prisma.movement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MovementFindFirstOrThrowArgs>(args?: SelectSubset<T, MovementFindFirstOrThrowArgs<ExtArgs>>): Prisma__MovementClient<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Movements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Movements
     * const movements = await prisma.movement.findMany()
     * 
     * // Get first 10 Movements
     * const movements = await prisma.movement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const movementWithIdOnly = await prisma.movement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MovementFindManyArgs>(args?: SelectSubset<T, MovementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Movement.
     * @param {MovementCreateArgs} args - Arguments to create a Movement.
     * @example
     * // Create one Movement
     * const Movement = await prisma.movement.create({
     *   data: {
     *     // ... data to create a Movement
     *   }
     * })
     * 
     */
    create<T extends MovementCreateArgs>(args: SelectSubset<T, MovementCreateArgs<ExtArgs>>): Prisma__MovementClient<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Movements.
     * @param {MovementCreateManyArgs} args - Arguments to create many Movements.
     * @example
     * // Create many Movements
     * const movement = await prisma.movement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MovementCreateManyArgs>(args?: SelectSubset<T, MovementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Movements and returns the data saved in the database.
     * @param {MovementCreateManyAndReturnArgs} args - Arguments to create many Movements.
     * @example
     * // Create many Movements
     * const movement = await prisma.movement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Movements and only return the `id`
     * const movementWithIdOnly = await prisma.movement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MovementCreateManyAndReturnArgs>(args?: SelectSubset<T, MovementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Movement.
     * @param {MovementDeleteArgs} args - Arguments to delete one Movement.
     * @example
     * // Delete one Movement
     * const Movement = await prisma.movement.delete({
     *   where: {
     *     // ... filter to delete one Movement
     *   }
     * })
     * 
     */
    delete<T extends MovementDeleteArgs>(args: SelectSubset<T, MovementDeleteArgs<ExtArgs>>): Prisma__MovementClient<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Movement.
     * @param {MovementUpdateArgs} args - Arguments to update one Movement.
     * @example
     * // Update one Movement
     * const movement = await prisma.movement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MovementUpdateArgs>(args: SelectSubset<T, MovementUpdateArgs<ExtArgs>>): Prisma__MovementClient<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Movements.
     * @param {MovementDeleteManyArgs} args - Arguments to filter Movements to delete.
     * @example
     * // Delete a few Movements
     * const { count } = await prisma.movement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MovementDeleteManyArgs>(args?: SelectSubset<T, MovementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Movements
     * const movement = await prisma.movement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MovementUpdateManyArgs>(args: SelectSubset<T, MovementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Movements and returns the data updated in the database.
     * @param {MovementUpdateManyAndReturnArgs} args - Arguments to update many Movements.
     * @example
     * // Update many Movements
     * const movement = await prisma.movement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Movements and only return the `id`
     * const movementWithIdOnly = await prisma.movement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MovementUpdateManyAndReturnArgs>(args: SelectSubset<T, MovementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Movement.
     * @param {MovementUpsertArgs} args - Arguments to update or create a Movement.
     * @example
     * // Update or create a Movement
     * const movement = await prisma.movement.upsert({
     *   create: {
     *     // ... data to create a Movement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Movement we want to update
     *   }
     * })
     */
    upsert<T extends MovementUpsertArgs>(args: SelectSubset<T, MovementUpsertArgs<ExtArgs>>): Prisma__MovementClient<$Result.GetResult<Prisma.$MovementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Movements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovementCountArgs} args - Arguments to filter Movements to count.
     * @example
     * // Count the number of Movements
     * const count = await prisma.movement.count({
     *   where: {
     *     // ... the filter for the Movements we want to count
     *   }
     * })
    **/
    count<T extends MovementCountArgs>(
      args?: Subset<T, MovementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MovementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Movement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MovementAggregateArgs>(args: Subset<T, MovementAggregateArgs>): Prisma.PrismaPromise<GetMovementAggregateType<T>>

    /**
     * Group by Movement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MovementGroupByArgs} args - Group by arguments.
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
      T extends MovementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MovementGroupByArgs['orderBy'] }
        : { orderBy?: MovementGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MovementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMovementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Movement model
   */
  readonly fields: MovementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Movement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MovementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    cardType<T extends CardTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CardTypeDefaultArgs<ExtArgs>>): Prisma__CardTypeClient<$Result.GetResult<Prisma.$CardTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    location<T extends LocationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LocationDefaultArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    destLocation<T extends Movement$destLocationArgs<ExtArgs> = {}>(args?: Subset<T, Movement$destLocationArgs<ExtArgs>>): Prisma__LocationClient<$Result.GetResult<Prisma.$LocationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Movement model
   */
  interface MovementFieldRefs {
    readonly id: FieldRef<"Movement", 'String'>
    readonly type: FieldRef<"Movement", 'String'>
    readonly quantity: FieldRef<"Movement", 'Int'>
    readonly userId: FieldRef<"Movement", 'String'>
    readonly cardTypeId: FieldRef<"Movement", 'String'>
    readonly locationId: FieldRef<"Movement", 'String'>
    readonly destLocationId: FieldRef<"Movement", 'String'>
    readonly createdAt: FieldRef<"Movement", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Movement findUnique
   */
  export type MovementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * Filter, which Movement to fetch.
     */
    where: MovementWhereUniqueInput
  }

  /**
   * Movement findUniqueOrThrow
   */
  export type MovementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * Filter, which Movement to fetch.
     */
    where: MovementWhereUniqueInput
  }

  /**
   * Movement findFirst
   */
  export type MovementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * Filter, which Movement to fetch.
     */
    where?: MovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movements to fetch.
     */
    orderBy?: MovementOrderByWithRelationInput | MovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movements.
     */
    cursor?: MovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movements.
     */
    distinct?: MovementScalarFieldEnum | MovementScalarFieldEnum[]
  }

  /**
   * Movement findFirstOrThrow
   */
  export type MovementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * Filter, which Movement to fetch.
     */
    where?: MovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movements to fetch.
     */
    orderBy?: MovementOrderByWithRelationInput | MovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Movements.
     */
    cursor?: MovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Movements.
     */
    distinct?: MovementScalarFieldEnum | MovementScalarFieldEnum[]
  }

  /**
   * Movement findMany
   */
  export type MovementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * Filter, which Movements to fetch.
     */
    where?: MovementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Movements to fetch.
     */
    orderBy?: MovementOrderByWithRelationInput | MovementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Movements.
     */
    cursor?: MovementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Movements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Movements.
     */
    skip?: number
    distinct?: MovementScalarFieldEnum | MovementScalarFieldEnum[]
  }

  /**
   * Movement create
   */
  export type MovementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * The data needed to create a Movement.
     */
    data: XOR<MovementCreateInput, MovementUncheckedCreateInput>
  }

  /**
   * Movement createMany
   */
  export type MovementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Movements.
     */
    data: MovementCreateManyInput | MovementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Movement createManyAndReturn
   */
  export type MovementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * The data used to create many Movements.
     */
    data: MovementCreateManyInput | MovementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Movement update
   */
  export type MovementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * The data needed to update a Movement.
     */
    data: XOR<MovementUpdateInput, MovementUncheckedUpdateInput>
    /**
     * Choose, which Movement to update.
     */
    where: MovementWhereUniqueInput
  }

  /**
   * Movement updateMany
   */
  export type MovementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Movements.
     */
    data: XOR<MovementUpdateManyMutationInput, MovementUncheckedUpdateManyInput>
    /**
     * Filter which Movements to update
     */
    where?: MovementWhereInput
    /**
     * Limit how many Movements to update.
     */
    limit?: number
  }

  /**
   * Movement updateManyAndReturn
   */
  export type MovementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * The data used to update Movements.
     */
    data: XOR<MovementUpdateManyMutationInput, MovementUncheckedUpdateManyInput>
    /**
     * Filter which Movements to update
     */
    where?: MovementWhereInput
    /**
     * Limit how many Movements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Movement upsert
   */
  export type MovementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * The filter to search for the Movement to update in case it exists.
     */
    where: MovementWhereUniqueInput
    /**
     * In case the Movement found by the `where` argument doesn't exist, create a new Movement with this data.
     */
    create: XOR<MovementCreateInput, MovementUncheckedCreateInput>
    /**
     * In case the Movement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MovementUpdateInput, MovementUncheckedUpdateInput>
  }

  /**
   * Movement delete
   */
  export type MovementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
    /**
     * Filter which Movement to delete.
     */
    where: MovementWhereUniqueInput
  }

  /**
   * Movement deleteMany
   */
  export type MovementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Movements to delete
     */
    where?: MovementWhereInput
    /**
     * Limit how many Movements to delete.
     */
    limit?: number
  }

  /**
   * Movement.destLocation
   */
  export type Movement$destLocationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Location
     */
    select?: LocationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Location
     */
    omit?: LocationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LocationInclude<ExtArgs> | null
    where?: LocationWhereInput
  }

  /**
   * Movement without action
   */
  export type MovementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Movement
     */
    select?: MovementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Movement
     */
    omit?: MovementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MovementInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    resource: string | null
    details: string | null
    ip: string | null
    type: string | null
    timestamp: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    action: string | null
    resource: string | null
    details: string | null
    ip: string | null
    type: string | null
    timestamp: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    resource: number
    details: number
    ip: number
    type: number
    timestamp: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    resource?: true
    details?: true
    ip?: true
    type?: true
    timestamp?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    resource?: true
    details?: true
    ip?: true
    type?: true
    timestamp?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    resource?: true
    details?: true
    ip?: true
    type?: true
    timestamp?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: string
    userId: string | null
    action: string
    resource: string
    details: string | null
    ip: string | null
    type: string
    timestamp: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    resource?: boolean
    details?: boolean
    ip?: boolean
    type?: boolean
    timestamp?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    resource?: boolean
    details?: boolean
    ip?: boolean
    type?: boolean
    timestamp?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    resource?: boolean
    details?: boolean
    ip?: boolean
    type?: boolean
    timestamp?: boolean
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    resource?: boolean
    details?: boolean
    ip?: boolean
    type?: boolean
    timestamp?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "action" | "resource" | "details" | "ip" | "type" | "timestamp", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuditLog$userArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      action: string
      resource: string
      details: string | null
      ip: string | null
      type: string
      timestamp: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuditLog$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'String'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly resource: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'String'>
    readonly ip: FieldRef<"AuditLog", 'String'>
    readonly type: FieldRef<"AuditLog", 'String'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog.user
   */
  export type AuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
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
    firstName: 'firstName',
    lastName: 'lastName',
    role: 'role',
    bankId: 'bankId',
    createdAt: 'createdAt',
    lastLogin: 'lastLogin'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const BankScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type BankScalarFieldEnum = (typeof BankScalarFieldEnum)[keyof typeof BankScalarFieldEnum]


  export const LocationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    bankId: 'bankId',
    createdAt: 'createdAt'
  };

  export type LocationScalarFieldEnum = (typeof LocationScalarFieldEnum)[keyof typeof LocationScalarFieldEnum]


  export const CardTypeScalarFieldEnum: {
    id: 'id',
    name: 'name',
    bankId: 'bankId',
    alertThreshold: 'alertThreshold',
    createdAt: 'createdAt'
  };

  export type CardTypeScalarFieldEnum = (typeof CardTypeScalarFieldEnum)[keyof typeof CardTypeScalarFieldEnum]


  export const StockScalarFieldEnum: {
    id: 'id',
    locationId: 'locationId',
    cardTypeId: 'cardTypeId',
    quantity: 'quantity',
    lastUpdate: 'lastUpdate'
  };

  export type StockScalarFieldEnum = (typeof StockScalarFieldEnum)[keyof typeof StockScalarFieldEnum]


  export const MovementScalarFieldEnum: {
    id: 'id',
    type: 'type',
    quantity: 'quantity',
    userId: 'userId',
    cardTypeId: 'cardTypeId',
    locationId: 'locationId',
    destLocationId: 'destLocationId',
    createdAt: 'createdAt'
  };

  export type MovementScalarFieldEnum = (typeof MovementScalarFieldEnum)[keyof typeof MovementScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    resource: 'resource',
    details: 'details',
    ip: 'ip',
    type: 'type',
    timestamp: 'timestamp'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


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
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    bankId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    bank?: XOR<BankNullableScalarRelationFilter, BankWhereInput> | null
    movements?: MovementListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    bankId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    bank?: BankOrderByWithRelationInput
    movements?: MovementOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    bankId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    bank?: XOR<BankNullableScalarRelationFilter, BankWhereInput> | null
    movements?: MovementListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    bankId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    bankId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type BankWhereInput = {
    AND?: BankWhereInput | BankWhereInput[]
    OR?: BankWhereInput[]
    NOT?: BankWhereInput | BankWhereInput[]
    id?: StringFilter<"Bank"> | string
    name?: StringFilter<"Bank"> | string
    createdAt?: DateTimeFilter<"Bank"> | Date | string
    locations?: LocationListRelationFilter
    users?: UserListRelationFilter
    cardTypes?: CardTypeListRelationFilter
  }

  export type BankOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    locations?: LocationOrderByRelationAggregateInput
    users?: UserOrderByRelationAggregateInput
    cardTypes?: CardTypeOrderByRelationAggregateInput
  }

  export type BankWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BankWhereInput | BankWhereInput[]
    OR?: BankWhereInput[]
    NOT?: BankWhereInput | BankWhereInput[]
    name?: StringFilter<"Bank"> | string
    createdAt?: DateTimeFilter<"Bank"> | Date | string
    locations?: LocationListRelationFilter
    users?: UserListRelationFilter
    cardTypes?: CardTypeListRelationFilter
  }, "id">

  export type BankOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: BankCountOrderByAggregateInput
    _max?: BankMaxOrderByAggregateInput
    _min?: BankMinOrderByAggregateInput
  }

  export type BankScalarWhereWithAggregatesInput = {
    AND?: BankScalarWhereWithAggregatesInput | BankScalarWhereWithAggregatesInput[]
    OR?: BankScalarWhereWithAggregatesInput[]
    NOT?: BankScalarWhereWithAggregatesInput | BankScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Bank"> | string
    name?: StringWithAggregatesFilter<"Bank"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Bank"> | Date | string
  }

  export type LocationWhereInput = {
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    id?: StringFilter<"Location"> | string
    name?: StringFilter<"Location"> | string
    bankId?: StringFilter<"Location"> | string
    createdAt?: DateTimeFilter<"Location"> | Date | string
    bank?: XOR<BankScalarRelationFilter, BankWhereInput>
    stock?: StockListRelationFilter
    movements?: MovementListRelationFilter
    destMovements?: MovementListRelationFilter
  }

  export type LocationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    bankId?: SortOrder
    createdAt?: SortOrder
    bank?: BankOrderByWithRelationInput
    stock?: StockOrderByRelationAggregateInput
    movements?: MovementOrderByRelationAggregateInput
    destMovements?: MovementOrderByRelationAggregateInput
  }

  export type LocationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LocationWhereInput | LocationWhereInput[]
    OR?: LocationWhereInput[]
    NOT?: LocationWhereInput | LocationWhereInput[]
    name?: StringFilter<"Location"> | string
    bankId?: StringFilter<"Location"> | string
    createdAt?: DateTimeFilter<"Location"> | Date | string
    bank?: XOR<BankScalarRelationFilter, BankWhereInput>
    stock?: StockListRelationFilter
    movements?: MovementListRelationFilter
    destMovements?: MovementListRelationFilter
  }, "id">

  export type LocationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    bankId?: SortOrder
    createdAt?: SortOrder
    _count?: LocationCountOrderByAggregateInput
    _max?: LocationMaxOrderByAggregateInput
    _min?: LocationMinOrderByAggregateInput
  }

  export type LocationScalarWhereWithAggregatesInput = {
    AND?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    OR?: LocationScalarWhereWithAggregatesInput[]
    NOT?: LocationScalarWhereWithAggregatesInput | LocationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Location"> | string
    name?: StringWithAggregatesFilter<"Location"> | string
    bankId?: StringWithAggregatesFilter<"Location"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Location"> | Date | string
  }

  export type CardTypeWhereInput = {
    AND?: CardTypeWhereInput | CardTypeWhereInput[]
    OR?: CardTypeWhereInput[]
    NOT?: CardTypeWhereInput | CardTypeWhereInput[]
    id?: StringFilter<"CardType"> | string
    name?: StringFilter<"CardType"> | string
    bankId?: StringFilter<"CardType"> | string
    alertThreshold?: IntNullableFilter<"CardType"> | number | null
    createdAt?: DateTimeFilter<"CardType"> | Date | string
    bank?: XOR<BankScalarRelationFilter, BankWhereInput>
    stock?: StockListRelationFilter
    movements?: MovementListRelationFilter
  }

  export type CardTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    bankId?: SortOrder
    alertThreshold?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    bank?: BankOrderByWithRelationInput
    stock?: StockOrderByRelationAggregateInput
    movements?: MovementOrderByRelationAggregateInput
  }

  export type CardTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CardTypeWhereInput | CardTypeWhereInput[]
    OR?: CardTypeWhereInput[]
    NOT?: CardTypeWhereInput | CardTypeWhereInput[]
    name?: StringFilter<"CardType"> | string
    bankId?: StringFilter<"CardType"> | string
    alertThreshold?: IntNullableFilter<"CardType"> | number | null
    createdAt?: DateTimeFilter<"CardType"> | Date | string
    bank?: XOR<BankScalarRelationFilter, BankWhereInput>
    stock?: StockListRelationFilter
    movements?: MovementListRelationFilter
  }, "id">

  export type CardTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    bankId?: SortOrder
    alertThreshold?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CardTypeCountOrderByAggregateInput
    _avg?: CardTypeAvgOrderByAggregateInput
    _max?: CardTypeMaxOrderByAggregateInput
    _min?: CardTypeMinOrderByAggregateInput
    _sum?: CardTypeSumOrderByAggregateInput
  }

  export type CardTypeScalarWhereWithAggregatesInput = {
    AND?: CardTypeScalarWhereWithAggregatesInput | CardTypeScalarWhereWithAggregatesInput[]
    OR?: CardTypeScalarWhereWithAggregatesInput[]
    NOT?: CardTypeScalarWhereWithAggregatesInput | CardTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CardType"> | string
    name?: StringWithAggregatesFilter<"CardType"> | string
    bankId?: StringWithAggregatesFilter<"CardType"> | string
    alertThreshold?: IntNullableWithAggregatesFilter<"CardType"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"CardType"> | Date | string
  }

  export type StockWhereInput = {
    AND?: StockWhereInput | StockWhereInput[]
    OR?: StockWhereInput[]
    NOT?: StockWhereInput | StockWhereInput[]
    id?: StringFilter<"Stock"> | string
    locationId?: StringFilter<"Stock"> | string
    cardTypeId?: StringFilter<"Stock"> | string
    quantity?: IntFilter<"Stock"> | number
    lastUpdate?: DateTimeFilter<"Stock"> | Date | string
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    cardType?: XOR<CardTypeScalarRelationFilter, CardTypeWhereInput>
  }

  export type StockOrderByWithRelationInput = {
    id?: SortOrder
    locationId?: SortOrder
    cardTypeId?: SortOrder
    quantity?: SortOrder
    lastUpdate?: SortOrder
    location?: LocationOrderByWithRelationInput
    cardType?: CardTypeOrderByWithRelationInput
  }

  export type StockWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StockWhereInput | StockWhereInput[]
    OR?: StockWhereInput[]
    NOT?: StockWhereInput | StockWhereInput[]
    locationId?: StringFilter<"Stock"> | string
    cardTypeId?: StringFilter<"Stock"> | string
    quantity?: IntFilter<"Stock"> | number
    lastUpdate?: DateTimeFilter<"Stock"> | Date | string
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    cardType?: XOR<CardTypeScalarRelationFilter, CardTypeWhereInput>
  }, "id">

  export type StockOrderByWithAggregationInput = {
    id?: SortOrder
    locationId?: SortOrder
    cardTypeId?: SortOrder
    quantity?: SortOrder
    lastUpdate?: SortOrder
    _count?: StockCountOrderByAggregateInput
    _avg?: StockAvgOrderByAggregateInput
    _max?: StockMaxOrderByAggregateInput
    _min?: StockMinOrderByAggregateInput
    _sum?: StockSumOrderByAggregateInput
  }

  export type StockScalarWhereWithAggregatesInput = {
    AND?: StockScalarWhereWithAggregatesInput | StockScalarWhereWithAggregatesInput[]
    OR?: StockScalarWhereWithAggregatesInput[]
    NOT?: StockScalarWhereWithAggregatesInput | StockScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Stock"> | string
    locationId?: StringWithAggregatesFilter<"Stock"> | string
    cardTypeId?: StringWithAggregatesFilter<"Stock"> | string
    quantity?: IntWithAggregatesFilter<"Stock"> | number
    lastUpdate?: DateTimeWithAggregatesFilter<"Stock"> | Date | string
  }

  export type MovementWhereInput = {
    AND?: MovementWhereInput | MovementWhereInput[]
    OR?: MovementWhereInput[]
    NOT?: MovementWhereInput | MovementWhereInput[]
    id?: StringFilter<"Movement"> | string
    type?: StringFilter<"Movement"> | string
    quantity?: IntFilter<"Movement"> | number
    userId?: StringFilter<"Movement"> | string
    cardTypeId?: StringFilter<"Movement"> | string
    locationId?: StringFilter<"Movement"> | string
    destLocationId?: StringNullableFilter<"Movement"> | string | null
    createdAt?: DateTimeFilter<"Movement"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    cardType?: XOR<CardTypeScalarRelationFilter, CardTypeWhereInput>
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    destLocation?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
  }

  export type MovementOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    userId?: SortOrder
    cardTypeId?: SortOrder
    locationId?: SortOrder
    destLocationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    cardType?: CardTypeOrderByWithRelationInput
    location?: LocationOrderByWithRelationInput
    destLocation?: LocationOrderByWithRelationInput
  }

  export type MovementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MovementWhereInput | MovementWhereInput[]
    OR?: MovementWhereInput[]
    NOT?: MovementWhereInput | MovementWhereInput[]
    type?: StringFilter<"Movement"> | string
    quantity?: IntFilter<"Movement"> | number
    userId?: StringFilter<"Movement"> | string
    cardTypeId?: StringFilter<"Movement"> | string
    locationId?: StringFilter<"Movement"> | string
    destLocationId?: StringNullableFilter<"Movement"> | string | null
    createdAt?: DateTimeFilter<"Movement"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    cardType?: XOR<CardTypeScalarRelationFilter, CardTypeWhereInput>
    location?: XOR<LocationScalarRelationFilter, LocationWhereInput>
    destLocation?: XOR<LocationNullableScalarRelationFilter, LocationWhereInput> | null
  }, "id">

  export type MovementOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    userId?: SortOrder
    cardTypeId?: SortOrder
    locationId?: SortOrder
    destLocationId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MovementCountOrderByAggregateInput
    _avg?: MovementAvgOrderByAggregateInput
    _max?: MovementMaxOrderByAggregateInput
    _min?: MovementMinOrderByAggregateInput
    _sum?: MovementSumOrderByAggregateInput
  }

  export type MovementScalarWhereWithAggregatesInput = {
    AND?: MovementScalarWhereWithAggregatesInput | MovementScalarWhereWithAggregatesInput[]
    OR?: MovementScalarWhereWithAggregatesInput[]
    NOT?: MovementScalarWhereWithAggregatesInput | MovementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Movement"> | string
    type?: StringWithAggregatesFilter<"Movement"> | string
    quantity?: IntWithAggregatesFilter<"Movement"> | number
    userId?: StringWithAggregatesFilter<"Movement"> | string
    cardTypeId?: StringWithAggregatesFilter<"Movement"> | string
    locationId?: StringWithAggregatesFilter<"Movement"> | string
    destLocationId?: StringNullableWithAggregatesFilter<"Movement"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Movement"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    resource?: StringFilter<"AuditLog"> | string
    details?: StringNullableFilter<"AuditLog"> | string | null
    ip?: StringNullableFilter<"AuditLog"> | string | null
    type?: StringFilter<"AuditLog"> | string
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    resource?: SortOrder
    details?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    type?: SortOrder
    timestamp?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    userId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    resource?: StringFilter<"AuditLog"> | string
    details?: StringNullableFilter<"AuditLog"> | string | null
    ip?: StringNullableFilter<"AuditLog"> | string | null
    type?: StringFilter<"AuditLog"> | string
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    action?: SortOrder
    resource?: SortOrder
    details?: SortOrderInput | SortOrder
    ip?: SortOrderInput | SortOrder
    type?: SortOrder
    timestamp?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AuditLog"> | string
    userId?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    resource?: StringWithAggregatesFilter<"AuditLog"> | string
    details?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    ip?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    type?: StringWithAggregatesFilter<"AuditLog"> | string
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
    createdAt?: Date | string
    lastLogin?: Date | string | null
    bank?: BankCreateNestedOneWithoutUsersInput
    movements?: MovementCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
    bankId?: string | null
    createdAt?: Date | string
    lastLogin?: Date | string | null
    movements?: MovementUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bank?: BankUpdateOneWithoutUsersNestedInput
    movements?: MovementUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    movements?: MovementUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
    bankId?: string | null
    createdAt?: Date | string
    lastLogin?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BankCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    locations?: LocationCreateNestedManyWithoutBankInput
    users?: UserCreateNestedManyWithoutBankInput
    cardTypes?: CardTypeCreateNestedManyWithoutBankInput
  }

  export type BankUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    locations?: LocationUncheckedCreateNestedManyWithoutBankInput
    users?: UserUncheckedCreateNestedManyWithoutBankInput
    cardTypes?: CardTypeUncheckedCreateNestedManyWithoutBankInput
  }

  export type BankUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: LocationUpdateManyWithoutBankNestedInput
    users?: UserUpdateManyWithoutBankNestedInput
    cardTypes?: CardTypeUpdateManyWithoutBankNestedInput
  }

  export type BankUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: LocationUncheckedUpdateManyWithoutBankNestedInput
    users?: UserUncheckedUpdateManyWithoutBankNestedInput
    cardTypes?: CardTypeUncheckedUpdateManyWithoutBankNestedInput
  }

  export type BankCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type BankUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BankUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    bank: BankCreateNestedOneWithoutLocationsInput
    stock?: StockCreateNestedManyWithoutLocationInput
    movements?: MovementCreateNestedManyWithoutLocationInput
    destMovements?: MovementCreateNestedManyWithoutDestLocationInput
  }

  export type LocationUncheckedCreateInput = {
    id?: string
    name: string
    bankId: string
    createdAt?: Date | string
    stock?: StockUncheckedCreateNestedManyWithoutLocationInput
    movements?: MovementUncheckedCreateNestedManyWithoutLocationInput
    destMovements?: MovementUncheckedCreateNestedManyWithoutDestLocationInput
  }

  export type LocationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bank?: BankUpdateOneRequiredWithoutLocationsNestedInput
    stock?: StockUpdateManyWithoutLocationNestedInput
    movements?: MovementUpdateManyWithoutLocationNestedInput
    destMovements?: MovementUpdateManyWithoutDestLocationNestedInput
  }

  export type LocationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bankId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUncheckedUpdateManyWithoutLocationNestedInput
    movements?: MovementUncheckedUpdateManyWithoutLocationNestedInput
    destMovements?: MovementUncheckedUpdateManyWithoutDestLocationNestedInput
  }

  export type LocationCreateManyInput = {
    id?: string
    name: string
    bankId: string
    createdAt?: Date | string
  }

  export type LocationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bankId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardTypeCreateInput = {
    id?: string
    name: string
    alertThreshold?: number | null
    createdAt?: Date | string
    bank: BankCreateNestedOneWithoutCardTypesInput
    stock?: StockCreateNestedManyWithoutCardTypeInput
    movements?: MovementCreateNestedManyWithoutCardTypeInput
  }

  export type CardTypeUncheckedCreateInput = {
    id?: string
    name: string
    bankId: string
    alertThreshold?: number | null
    createdAt?: Date | string
    stock?: StockUncheckedCreateNestedManyWithoutCardTypeInput
    movements?: MovementUncheckedCreateNestedManyWithoutCardTypeInput
  }

  export type CardTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    alertThreshold?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bank?: BankUpdateOneRequiredWithoutCardTypesNestedInput
    stock?: StockUpdateManyWithoutCardTypeNestedInput
    movements?: MovementUpdateManyWithoutCardTypeNestedInput
  }

  export type CardTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bankId?: StringFieldUpdateOperationsInput | string
    alertThreshold?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUncheckedUpdateManyWithoutCardTypeNestedInput
    movements?: MovementUncheckedUpdateManyWithoutCardTypeNestedInput
  }

  export type CardTypeCreateManyInput = {
    id?: string
    name: string
    bankId: string
    alertThreshold?: number | null
    createdAt?: Date | string
  }

  export type CardTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    alertThreshold?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CardTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bankId?: StringFieldUpdateOperationsInput | string
    alertThreshold?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockCreateInput = {
    id?: string
    quantity: number
    lastUpdate?: Date | string
    location: LocationCreateNestedOneWithoutStockInput
    cardType: CardTypeCreateNestedOneWithoutStockInput
  }

  export type StockUncheckedCreateInput = {
    id?: string
    locationId: string
    cardTypeId: string
    quantity: number
    lastUpdate?: Date | string
  }

  export type StockUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    lastUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutStockNestedInput
    cardType?: CardTypeUpdateOneRequiredWithoutStockNestedInput
  }

  export type StockUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    cardTypeId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    lastUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockCreateManyInput = {
    id?: string
    locationId: string
    cardTypeId: string
    quantity: number
    lastUpdate?: Date | string
  }

  export type StockUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    lastUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    cardTypeId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    lastUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementCreateInput = {
    id?: string
    type: string
    quantity: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMovementsInput
    cardType: CardTypeCreateNestedOneWithoutMovementsInput
    location: LocationCreateNestedOneWithoutMovementsInput
    destLocation?: LocationCreateNestedOneWithoutDestMovementsInput
  }

  export type MovementUncheckedCreateInput = {
    id?: string
    type: string
    quantity: number
    userId: string
    cardTypeId: string
    locationId: string
    destLocationId?: string | null
    createdAt?: Date | string
  }

  export type MovementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMovementsNestedInput
    cardType?: CardTypeUpdateOneRequiredWithoutMovementsNestedInput
    location?: LocationUpdateOneRequiredWithoutMovementsNestedInput
    destLocation?: LocationUpdateOneWithoutDestMovementsNestedInput
  }

  export type MovementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    cardTypeId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    destLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementCreateManyInput = {
    id?: string
    type: string
    quantity: number
    userId: string
    cardTypeId: string
    locationId: string
    destLocationId?: string | null
    createdAt?: Date | string
  }

  export type MovementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    cardTypeId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    destLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    id?: string
    action: string
    resource: string
    details?: string | null
    ip?: string | null
    type: string
    timestamp?: Date | string
    user?: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: string
    userId?: string | null
    action: string
    resource: string
    details?: string | null
    ip?: string | null
    type: string
    timestamp?: Date | string
  }

  export type AuditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    id?: string
    userId?: string | null
    action: string
    resource: string
    details?: string | null
    ip?: string | null
    type: string
    timestamp?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type BankNullableScalarRelationFilter = {
    is?: BankWhereInput | null
    isNot?: BankWhereInput | null
  }

  export type MovementListRelationFilter = {
    every?: MovementWhereInput
    some?: MovementWhereInput
    none?: MovementWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MovementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    bankId?: SortOrder
    createdAt?: SortOrder
    lastLogin?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    bankId?: SortOrder
    createdAt?: SortOrder
    lastLogin?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    bankId?: SortOrder
    createdAt?: SortOrder
    lastLogin?: SortOrder
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

  export type LocationListRelationFilter = {
    every?: LocationWhereInput
    some?: LocationWhereInput
    none?: LocationWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type CardTypeListRelationFilter = {
    every?: CardTypeWhereInput
    some?: CardTypeWhereInput
    none?: CardTypeWhereInput
  }

  export type LocationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CardTypeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BankCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type BankMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type BankMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type BankScalarRelationFilter = {
    is?: BankWhereInput
    isNot?: BankWhereInput
  }

  export type StockListRelationFilter = {
    every?: StockWhereInput
    some?: StockWhereInput
    none?: StockWhereInput
  }

  export type StockOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LocationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    bankId?: SortOrder
    createdAt?: SortOrder
  }

  export type LocationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    bankId?: SortOrder
    createdAt?: SortOrder
  }

  export type LocationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    bankId?: SortOrder
    createdAt?: SortOrder
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

  export type CardTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    bankId?: SortOrder
    alertThreshold?: SortOrder
    createdAt?: SortOrder
  }

  export type CardTypeAvgOrderByAggregateInput = {
    alertThreshold?: SortOrder
  }

  export type CardTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    bankId?: SortOrder
    alertThreshold?: SortOrder
    createdAt?: SortOrder
  }

  export type CardTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    bankId?: SortOrder
    alertThreshold?: SortOrder
    createdAt?: SortOrder
  }

  export type CardTypeSumOrderByAggregateInput = {
    alertThreshold?: SortOrder
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

  export type LocationScalarRelationFilter = {
    is?: LocationWhereInput
    isNot?: LocationWhereInput
  }

  export type CardTypeScalarRelationFilter = {
    is?: CardTypeWhereInput
    isNot?: CardTypeWhereInput
  }

  export type StockCountOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
    cardTypeId?: SortOrder
    quantity?: SortOrder
    lastUpdate?: SortOrder
  }

  export type StockAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type StockMaxOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
    cardTypeId?: SortOrder
    quantity?: SortOrder
    lastUpdate?: SortOrder
  }

  export type StockMinOrderByAggregateInput = {
    id?: SortOrder
    locationId?: SortOrder
    cardTypeId?: SortOrder
    quantity?: SortOrder
    lastUpdate?: SortOrder
  }

  export type StockSumOrderByAggregateInput = {
    quantity?: SortOrder
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type LocationNullableScalarRelationFilter = {
    is?: LocationWhereInput | null
    isNot?: LocationWhereInput | null
  }

  export type MovementCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    userId?: SortOrder
    cardTypeId?: SortOrder
    locationId?: SortOrder
    destLocationId?: SortOrder
    createdAt?: SortOrder
  }

  export type MovementAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type MovementMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    userId?: SortOrder
    cardTypeId?: SortOrder
    locationId?: SortOrder
    destLocationId?: SortOrder
    createdAt?: SortOrder
  }

  export type MovementMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    quantity?: SortOrder
    userId?: SortOrder
    cardTypeId?: SortOrder
    locationId?: SortOrder
    destLocationId?: SortOrder
    createdAt?: SortOrder
  }

  export type MovementSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    details?: SortOrder
    ip?: SortOrder
    type?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    details?: SortOrder
    ip?: SortOrder
    type?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    resource?: SortOrder
    details?: SortOrder
    ip?: SortOrder
    type?: SortOrder
    timestamp?: SortOrder
  }

  export type BankCreateNestedOneWithoutUsersInput = {
    create?: XOR<BankCreateWithoutUsersInput, BankUncheckedCreateWithoutUsersInput>
    connectOrCreate?: BankCreateOrConnectWithoutUsersInput
    connect?: BankWhereUniqueInput
  }

  export type MovementCreateNestedManyWithoutUserInput = {
    create?: XOR<MovementCreateWithoutUserInput, MovementUncheckedCreateWithoutUserInput> | MovementCreateWithoutUserInput[] | MovementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutUserInput | MovementCreateOrConnectWithoutUserInput[]
    createMany?: MovementCreateManyUserInputEnvelope
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type MovementUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<MovementCreateWithoutUserInput, MovementUncheckedCreateWithoutUserInput> | MovementCreateWithoutUserInput[] | MovementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutUserInput | MovementCreateOrConnectWithoutUserInput[]
    createMany?: MovementCreateManyUserInputEnvelope
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BankUpdateOneWithoutUsersNestedInput = {
    create?: XOR<BankCreateWithoutUsersInput, BankUncheckedCreateWithoutUsersInput>
    connectOrCreate?: BankCreateOrConnectWithoutUsersInput
    upsert?: BankUpsertWithoutUsersInput
    disconnect?: BankWhereInput | boolean
    delete?: BankWhereInput | boolean
    connect?: BankWhereUniqueInput
    update?: XOR<XOR<BankUpdateToOneWithWhereWithoutUsersInput, BankUpdateWithoutUsersInput>, BankUncheckedUpdateWithoutUsersInput>
  }

  export type MovementUpdateManyWithoutUserNestedInput = {
    create?: XOR<MovementCreateWithoutUserInput, MovementUncheckedCreateWithoutUserInput> | MovementCreateWithoutUserInput[] | MovementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutUserInput | MovementCreateOrConnectWithoutUserInput[]
    upsert?: MovementUpsertWithWhereUniqueWithoutUserInput | MovementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MovementCreateManyUserInputEnvelope
    set?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    disconnect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    delete?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    update?: MovementUpdateWithWhereUniqueWithoutUserInput | MovementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MovementUpdateManyWithWhereWithoutUserInput | MovementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MovementScalarWhereInput | MovementScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type MovementUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<MovementCreateWithoutUserInput, MovementUncheckedCreateWithoutUserInput> | MovementCreateWithoutUserInput[] | MovementUncheckedCreateWithoutUserInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutUserInput | MovementCreateOrConnectWithoutUserInput[]
    upsert?: MovementUpsertWithWhereUniqueWithoutUserInput | MovementUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: MovementCreateManyUserInputEnvelope
    set?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    disconnect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    delete?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    update?: MovementUpdateWithWhereUniqueWithoutUserInput | MovementUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: MovementUpdateManyWithWhereWithoutUserInput | MovementUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: MovementScalarWhereInput | MovementScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput> | AuditLogCreateWithoutUserInput[] | AuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutUserInput | AuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutUserInput | AuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuditLogCreateManyUserInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutUserInput | AuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutUserInput | AuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type LocationCreateNestedManyWithoutBankInput = {
    create?: XOR<LocationCreateWithoutBankInput, LocationUncheckedCreateWithoutBankInput> | LocationCreateWithoutBankInput[] | LocationUncheckedCreateWithoutBankInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutBankInput | LocationCreateOrConnectWithoutBankInput[]
    createMany?: LocationCreateManyBankInputEnvelope
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
  }

  export type UserCreateNestedManyWithoutBankInput = {
    create?: XOR<UserCreateWithoutBankInput, UserUncheckedCreateWithoutBankInput> | UserCreateWithoutBankInput[] | UserUncheckedCreateWithoutBankInput[]
    connectOrCreate?: UserCreateOrConnectWithoutBankInput | UserCreateOrConnectWithoutBankInput[]
    createMany?: UserCreateManyBankInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type CardTypeCreateNestedManyWithoutBankInput = {
    create?: XOR<CardTypeCreateWithoutBankInput, CardTypeUncheckedCreateWithoutBankInput> | CardTypeCreateWithoutBankInput[] | CardTypeUncheckedCreateWithoutBankInput[]
    connectOrCreate?: CardTypeCreateOrConnectWithoutBankInput | CardTypeCreateOrConnectWithoutBankInput[]
    createMany?: CardTypeCreateManyBankInputEnvelope
    connect?: CardTypeWhereUniqueInput | CardTypeWhereUniqueInput[]
  }

  export type LocationUncheckedCreateNestedManyWithoutBankInput = {
    create?: XOR<LocationCreateWithoutBankInput, LocationUncheckedCreateWithoutBankInput> | LocationCreateWithoutBankInput[] | LocationUncheckedCreateWithoutBankInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutBankInput | LocationCreateOrConnectWithoutBankInput[]
    createMany?: LocationCreateManyBankInputEnvelope
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutBankInput = {
    create?: XOR<UserCreateWithoutBankInput, UserUncheckedCreateWithoutBankInput> | UserCreateWithoutBankInput[] | UserUncheckedCreateWithoutBankInput[]
    connectOrCreate?: UserCreateOrConnectWithoutBankInput | UserCreateOrConnectWithoutBankInput[]
    createMany?: UserCreateManyBankInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type CardTypeUncheckedCreateNestedManyWithoutBankInput = {
    create?: XOR<CardTypeCreateWithoutBankInput, CardTypeUncheckedCreateWithoutBankInput> | CardTypeCreateWithoutBankInput[] | CardTypeUncheckedCreateWithoutBankInput[]
    connectOrCreate?: CardTypeCreateOrConnectWithoutBankInput | CardTypeCreateOrConnectWithoutBankInput[]
    createMany?: CardTypeCreateManyBankInputEnvelope
    connect?: CardTypeWhereUniqueInput | CardTypeWhereUniqueInput[]
  }

  export type LocationUpdateManyWithoutBankNestedInput = {
    create?: XOR<LocationCreateWithoutBankInput, LocationUncheckedCreateWithoutBankInput> | LocationCreateWithoutBankInput[] | LocationUncheckedCreateWithoutBankInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutBankInput | LocationCreateOrConnectWithoutBankInput[]
    upsert?: LocationUpsertWithWhereUniqueWithoutBankInput | LocationUpsertWithWhereUniqueWithoutBankInput[]
    createMany?: LocationCreateManyBankInputEnvelope
    set?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    disconnect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    delete?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    update?: LocationUpdateWithWhereUniqueWithoutBankInput | LocationUpdateWithWhereUniqueWithoutBankInput[]
    updateMany?: LocationUpdateManyWithWhereWithoutBankInput | LocationUpdateManyWithWhereWithoutBankInput[]
    deleteMany?: LocationScalarWhereInput | LocationScalarWhereInput[]
  }

  export type UserUpdateManyWithoutBankNestedInput = {
    create?: XOR<UserCreateWithoutBankInput, UserUncheckedCreateWithoutBankInput> | UserCreateWithoutBankInput[] | UserUncheckedCreateWithoutBankInput[]
    connectOrCreate?: UserCreateOrConnectWithoutBankInput | UserCreateOrConnectWithoutBankInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutBankInput | UserUpsertWithWhereUniqueWithoutBankInput[]
    createMany?: UserCreateManyBankInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutBankInput | UserUpdateWithWhereUniqueWithoutBankInput[]
    updateMany?: UserUpdateManyWithWhereWithoutBankInput | UserUpdateManyWithWhereWithoutBankInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CardTypeUpdateManyWithoutBankNestedInput = {
    create?: XOR<CardTypeCreateWithoutBankInput, CardTypeUncheckedCreateWithoutBankInput> | CardTypeCreateWithoutBankInput[] | CardTypeUncheckedCreateWithoutBankInput[]
    connectOrCreate?: CardTypeCreateOrConnectWithoutBankInput | CardTypeCreateOrConnectWithoutBankInput[]
    upsert?: CardTypeUpsertWithWhereUniqueWithoutBankInput | CardTypeUpsertWithWhereUniqueWithoutBankInput[]
    createMany?: CardTypeCreateManyBankInputEnvelope
    set?: CardTypeWhereUniqueInput | CardTypeWhereUniqueInput[]
    disconnect?: CardTypeWhereUniqueInput | CardTypeWhereUniqueInput[]
    delete?: CardTypeWhereUniqueInput | CardTypeWhereUniqueInput[]
    connect?: CardTypeWhereUniqueInput | CardTypeWhereUniqueInput[]
    update?: CardTypeUpdateWithWhereUniqueWithoutBankInput | CardTypeUpdateWithWhereUniqueWithoutBankInput[]
    updateMany?: CardTypeUpdateManyWithWhereWithoutBankInput | CardTypeUpdateManyWithWhereWithoutBankInput[]
    deleteMany?: CardTypeScalarWhereInput | CardTypeScalarWhereInput[]
  }

  export type LocationUncheckedUpdateManyWithoutBankNestedInput = {
    create?: XOR<LocationCreateWithoutBankInput, LocationUncheckedCreateWithoutBankInput> | LocationCreateWithoutBankInput[] | LocationUncheckedCreateWithoutBankInput[]
    connectOrCreate?: LocationCreateOrConnectWithoutBankInput | LocationCreateOrConnectWithoutBankInput[]
    upsert?: LocationUpsertWithWhereUniqueWithoutBankInput | LocationUpsertWithWhereUniqueWithoutBankInput[]
    createMany?: LocationCreateManyBankInputEnvelope
    set?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    disconnect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    delete?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    connect?: LocationWhereUniqueInput | LocationWhereUniqueInput[]
    update?: LocationUpdateWithWhereUniqueWithoutBankInput | LocationUpdateWithWhereUniqueWithoutBankInput[]
    updateMany?: LocationUpdateManyWithWhereWithoutBankInput | LocationUpdateManyWithWhereWithoutBankInput[]
    deleteMany?: LocationScalarWhereInput | LocationScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutBankNestedInput = {
    create?: XOR<UserCreateWithoutBankInput, UserUncheckedCreateWithoutBankInput> | UserCreateWithoutBankInput[] | UserUncheckedCreateWithoutBankInput[]
    connectOrCreate?: UserCreateOrConnectWithoutBankInput | UserCreateOrConnectWithoutBankInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutBankInput | UserUpsertWithWhereUniqueWithoutBankInput[]
    createMany?: UserCreateManyBankInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutBankInput | UserUpdateWithWhereUniqueWithoutBankInput[]
    updateMany?: UserUpdateManyWithWhereWithoutBankInput | UserUpdateManyWithWhereWithoutBankInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type CardTypeUncheckedUpdateManyWithoutBankNestedInput = {
    create?: XOR<CardTypeCreateWithoutBankInput, CardTypeUncheckedCreateWithoutBankInput> | CardTypeCreateWithoutBankInput[] | CardTypeUncheckedCreateWithoutBankInput[]
    connectOrCreate?: CardTypeCreateOrConnectWithoutBankInput | CardTypeCreateOrConnectWithoutBankInput[]
    upsert?: CardTypeUpsertWithWhereUniqueWithoutBankInput | CardTypeUpsertWithWhereUniqueWithoutBankInput[]
    createMany?: CardTypeCreateManyBankInputEnvelope
    set?: CardTypeWhereUniqueInput | CardTypeWhereUniqueInput[]
    disconnect?: CardTypeWhereUniqueInput | CardTypeWhereUniqueInput[]
    delete?: CardTypeWhereUniqueInput | CardTypeWhereUniqueInput[]
    connect?: CardTypeWhereUniqueInput | CardTypeWhereUniqueInput[]
    update?: CardTypeUpdateWithWhereUniqueWithoutBankInput | CardTypeUpdateWithWhereUniqueWithoutBankInput[]
    updateMany?: CardTypeUpdateManyWithWhereWithoutBankInput | CardTypeUpdateManyWithWhereWithoutBankInput[]
    deleteMany?: CardTypeScalarWhereInput | CardTypeScalarWhereInput[]
  }

  export type BankCreateNestedOneWithoutLocationsInput = {
    create?: XOR<BankCreateWithoutLocationsInput, BankUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: BankCreateOrConnectWithoutLocationsInput
    connect?: BankWhereUniqueInput
  }

  export type StockCreateNestedManyWithoutLocationInput = {
    create?: XOR<StockCreateWithoutLocationInput, StockUncheckedCreateWithoutLocationInput> | StockCreateWithoutLocationInput[] | StockUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: StockCreateOrConnectWithoutLocationInput | StockCreateOrConnectWithoutLocationInput[]
    createMany?: StockCreateManyLocationInputEnvelope
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
  }

  export type MovementCreateNestedManyWithoutLocationInput = {
    create?: XOR<MovementCreateWithoutLocationInput, MovementUncheckedCreateWithoutLocationInput> | MovementCreateWithoutLocationInput[] | MovementUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutLocationInput | MovementCreateOrConnectWithoutLocationInput[]
    createMany?: MovementCreateManyLocationInputEnvelope
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
  }

  export type MovementCreateNestedManyWithoutDestLocationInput = {
    create?: XOR<MovementCreateWithoutDestLocationInput, MovementUncheckedCreateWithoutDestLocationInput> | MovementCreateWithoutDestLocationInput[] | MovementUncheckedCreateWithoutDestLocationInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutDestLocationInput | MovementCreateOrConnectWithoutDestLocationInput[]
    createMany?: MovementCreateManyDestLocationInputEnvelope
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
  }

  export type StockUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<StockCreateWithoutLocationInput, StockUncheckedCreateWithoutLocationInput> | StockCreateWithoutLocationInput[] | StockUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: StockCreateOrConnectWithoutLocationInput | StockCreateOrConnectWithoutLocationInput[]
    createMany?: StockCreateManyLocationInputEnvelope
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
  }

  export type MovementUncheckedCreateNestedManyWithoutLocationInput = {
    create?: XOR<MovementCreateWithoutLocationInput, MovementUncheckedCreateWithoutLocationInput> | MovementCreateWithoutLocationInput[] | MovementUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutLocationInput | MovementCreateOrConnectWithoutLocationInput[]
    createMany?: MovementCreateManyLocationInputEnvelope
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
  }

  export type MovementUncheckedCreateNestedManyWithoutDestLocationInput = {
    create?: XOR<MovementCreateWithoutDestLocationInput, MovementUncheckedCreateWithoutDestLocationInput> | MovementCreateWithoutDestLocationInput[] | MovementUncheckedCreateWithoutDestLocationInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutDestLocationInput | MovementCreateOrConnectWithoutDestLocationInput[]
    createMany?: MovementCreateManyDestLocationInputEnvelope
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
  }

  export type BankUpdateOneRequiredWithoutLocationsNestedInput = {
    create?: XOR<BankCreateWithoutLocationsInput, BankUncheckedCreateWithoutLocationsInput>
    connectOrCreate?: BankCreateOrConnectWithoutLocationsInput
    upsert?: BankUpsertWithoutLocationsInput
    connect?: BankWhereUniqueInput
    update?: XOR<XOR<BankUpdateToOneWithWhereWithoutLocationsInput, BankUpdateWithoutLocationsInput>, BankUncheckedUpdateWithoutLocationsInput>
  }

  export type StockUpdateManyWithoutLocationNestedInput = {
    create?: XOR<StockCreateWithoutLocationInput, StockUncheckedCreateWithoutLocationInput> | StockCreateWithoutLocationInput[] | StockUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: StockCreateOrConnectWithoutLocationInput | StockCreateOrConnectWithoutLocationInput[]
    upsert?: StockUpsertWithWhereUniqueWithoutLocationInput | StockUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: StockCreateManyLocationInputEnvelope
    set?: StockWhereUniqueInput | StockWhereUniqueInput[]
    disconnect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    delete?: StockWhereUniqueInput | StockWhereUniqueInput[]
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    update?: StockUpdateWithWhereUniqueWithoutLocationInput | StockUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: StockUpdateManyWithWhereWithoutLocationInput | StockUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: StockScalarWhereInput | StockScalarWhereInput[]
  }

  export type MovementUpdateManyWithoutLocationNestedInput = {
    create?: XOR<MovementCreateWithoutLocationInput, MovementUncheckedCreateWithoutLocationInput> | MovementCreateWithoutLocationInput[] | MovementUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutLocationInput | MovementCreateOrConnectWithoutLocationInput[]
    upsert?: MovementUpsertWithWhereUniqueWithoutLocationInput | MovementUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: MovementCreateManyLocationInputEnvelope
    set?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    disconnect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    delete?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    update?: MovementUpdateWithWhereUniqueWithoutLocationInput | MovementUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: MovementUpdateManyWithWhereWithoutLocationInput | MovementUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: MovementScalarWhereInput | MovementScalarWhereInput[]
  }

  export type MovementUpdateManyWithoutDestLocationNestedInput = {
    create?: XOR<MovementCreateWithoutDestLocationInput, MovementUncheckedCreateWithoutDestLocationInput> | MovementCreateWithoutDestLocationInput[] | MovementUncheckedCreateWithoutDestLocationInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutDestLocationInput | MovementCreateOrConnectWithoutDestLocationInput[]
    upsert?: MovementUpsertWithWhereUniqueWithoutDestLocationInput | MovementUpsertWithWhereUniqueWithoutDestLocationInput[]
    createMany?: MovementCreateManyDestLocationInputEnvelope
    set?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    disconnect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    delete?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    update?: MovementUpdateWithWhereUniqueWithoutDestLocationInput | MovementUpdateWithWhereUniqueWithoutDestLocationInput[]
    updateMany?: MovementUpdateManyWithWhereWithoutDestLocationInput | MovementUpdateManyWithWhereWithoutDestLocationInput[]
    deleteMany?: MovementScalarWhereInput | MovementScalarWhereInput[]
  }

  export type StockUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<StockCreateWithoutLocationInput, StockUncheckedCreateWithoutLocationInput> | StockCreateWithoutLocationInput[] | StockUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: StockCreateOrConnectWithoutLocationInput | StockCreateOrConnectWithoutLocationInput[]
    upsert?: StockUpsertWithWhereUniqueWithoutLocationInput | StockUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: StockCreateManyLocationInputEnvelope
    set?: StockWhereUniqueInput | StockWhereUniqueInput[]
    disconnect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    delete?: StockWhereUniqueInput | StockWhereUniqueInput[]
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    update?: StockUpdateWithWhereUniqueWithoutLocationInput | StockUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: StockUpdateManyWithWhereWithoutLocationInput | StockUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: StockScalarWhereInput | StockScalarWhereInput[]
  }

  export type MovementUncheckedUpdateManyWithoutLocationNestedInput = {
    create?: XOR<MovementCreateWithoutLocationInput, MovementUncheckedCreateWithoutLocationInput> | MovementCreateWithoutLocationInput[] | MovementUncheckedCreateWithoutLocationInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutLocationInput | MovementCreateOrConnectWithoutLocationInput[]
    upsert?: MovementUpsertWithWhereUniqueWithoutLocationInput | MovementUpsertWithWhereUniqueWithoutLocationInput[]
    createMany?: MovementCreateManyLocationInputEnvelope
    set?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    disconnect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    delete?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    update?: MovementUpdateWithWhereUniqueWithoutLocationInput | MovementUpdateWithWhereUniqueWithoutLocationInput[]
    updateMany?: MovementUpdateManyWithWhereWithoutLocationInput | MovementUpdateManyWithWhereWithoutLocationInput[]
    deleteMany?: MovementScalarWhereInput | MovementScalarWhereInput[]
  }

  export type MovementUncheckedUpdateManyWithoutDestLocationNestedInput = {
    create?: XOR<MovementCreateWithoutDestLocationInput, MovementUncheckedCreateWithoutDestLocationInput> | MovementCreateWithoutDestLocationInput[] | MovementUncheckedCreateWithoutDestLocationInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutDestLocationInput | MovementCreateOrConnectWithoutDestLocationInput[]
    upsert?: MovementUpsertWithWhereUniqueWithoutDestLocationInput | MovementUpsertWithWhereUniqueWithoutDestLocationInput[]
    createMany?: MovementCreateManyDestLocationInputEnvelope
    set?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    disconnect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    delete?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    update?: MovementUpdateWithWhereUniqueWithoutDestLocationInput | MovementUpdateWithWhereUniqueWithoutDestLocationInput[]
    updateMany?: MovementUpdateManyWithWhereWithoutDestLocationInput | MovementUpdateManyWithWhereWithoutDestLocationInput[]
    deleteMany?: MovementScalarWhereInput | MovementScalarWhereInput[]
  }

  export type BankCreateNestedOneWithoutCardTypesInput = {
    create?: XOR<BankCreateWithoutCardTypesInput, BankUncheckedCreateWithoutCardTypesInput>
    connectOrCreate?: BankCreateOrConnectWithoutCardTypesInput
    connect?: BankWhereUniqueInput
  }

  export type StockCreateNestedManyWithoutCardTypeInput = {
    create?: XOR<StockCreateWithoutCardTypeInput, StockUncheckedCreateWithoutCardTypeInput> | StockCreateWithoutCardTypeInput[] | StockUncheckedCreateWithoutCardTypeInput[]
    connectOrCreate?: StockCreateOrConnectWithoutCardTypeInput | StockCreateOrConnectWithoutCardTypeInput[]
    createMany?: StockCreateManyCardTypeInputEnvelope
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
  }

  export type MovementCreateNestedManyWithoutCardTypeInput = {
    create?: XOR<MovementCreateWithoutCardTypeInput, MovementUncheckedCreateWithoutCardTypeInput> | MovementCreateWithoutCardTypeInput[] | MovementUncheckedCreateWithoutCardTypeInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutCardTypeInput | MovementCreateOrConnectWithoutCardTypeInput[]
    createMany?: MovementCreateManyCardTypeInputEnvelope
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
  }

  export type StockUncheckedCreateNestedManyWithoutCardTypeInput = {
    create?: XOR<StockCreateWithoutCardTypeInput, StockUncheckedCreateWithoutCardTypeInput> | StockCreateWithoutCardTypeInput[] | StockUncheckedCreateWithoutCardTypeInput[]
    connectOrCreate?: StockCreateOrConnectWithoutCardTypeInput | StockCreateOrConnectWithoutCardTypeInput[]
    createMany?: StockCreateManyCardTypeInputEnvelope
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
  }

  export type MovementUncheckedCreateNestedManyWithoutCardTypeInput = {
    create?: XOR<MovementCreateWithoutCardTypeInput, MovementUncheckedCreateWithoutCardTypeInput> | MovementCreateWithoutCardTypeInput[] | MovementUncheckedCreateWithoutCardTypeInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutCardTypeInput | MovementCreateOrConnectWithoutCardTypeInput[]
    createMany?: MovementCreateManyCardTypeInputEnvelope
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BankUpdateOneRequiredWithoutCardTypesNestedInput = {
    create?: XOR<BankCreateWithoutCardTypesInput, BankUncheckedCreateWithoutCardTypesInput>
    connectOrCreate?: BankCreateOrConnectWithoutCardTypesInput
    upsert?: BankUpsertWithoutCardTypesInput
    connect?: BankWhereUniqueInput
    update?: XOR<XOR<BankUpdateToOneWithWhereWithoutCardTypesInput, BankUpdateWithoutCardTypesInput>, BankUncheckedUpdateWithoutCardTypesInput>
  }

  export type StockUpdateManyWithoutCardTypeNestedInput = {
    create?: XOR<StockCreateWithoutCardTypeInput, StockUncheckedCreateWithoutCardTypeInput> | StockCreateWithoutCardTypeInput[] | StockUncheckedCreateWithoutCardTypeInput[]
    connectOrCreate?: StockCreateOrConnectWithoutCardTypeInput | StockCreateOrConnectWithoutCardTypeInput[]
    upsert?: StockUpsertWithWhereUniqueWithoutCardTypeInput | StockUpsertWithWhereUniqueWithoutCardTypeInput[]
    createMany?: StockCreateManyCardTypeInputEnvelope
    set?: StockWhereUniqueInput | StockWhereUniqueInput[]
    disconnect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    delete?: StockWhereUniqueInput | StockWhereUniqueInput[]
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    update?: StockUpdateWithWhereUniqueWithoutCardTypeInput | StockUpdateWithWhereUniqueWithoutCardTypeInput[]
    updateMany?: StockUpdateManyWithWhereWithoutCardTypeInput | StockUpdateManyWithWhereWithoutCardTypeInput[]
    deleteMany?: StockScalarWhereInput | StockScalarWhereInput[]
  }

  export type MovementUpdateManyWithoutCardTypeNestedInput = {
    create?: XOR<MovementCreateWithoutCardTypeInput, MovementUncheckedCreateWithoutCardTypeInput> | MovementCreateWithoutCardTypeInput[] | MovementUncheckedCreateWithoutCardTypeInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutCardTypeInput | MovementCreateOrConnectWithoutCardTypeInput[]
    upsert?: MovementUpsertWithWhereUniqueWithoutCardTypeInput | MovementUpsertWithWhereUniqueWithoutCardTypeInput[]
    createMany?: MovementCreateManyCardTypeInputEnvelope
    set?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    disconnect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    delete?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    update?: MovementUpdateWithWhereUniqueWithoutCardTypeInput | MovementUpdateWithWhereUniqueWithoutCardTypeInput[]
    updateMany?: MovementUpdateManyWithWhereWithoutCardTypeInput | MovementUpdateManyWithWhereWithoutCardTypeInput[]
    deleteMany?: MovementScalarWhereInput | MovementScalarWhereInput[]
  }

  export type StockUncheckedUpdateManyWithoutCardTypeNestedInput = {
    create?: XOR<StockCreateWithoutCardTypeInput, StockUncheckedCreateWithoutCardTypeInput> | StockCreateWithoutCardTypeInput[] | StockUncheckedCreateWithoutCardTypeInput[]
    connectOrCreate?: StockCreateOrConnectWithoutCardTypeInput | StockCreateOrConnectWithoutCardTypeInput[]
    upsert?: StockUpsertWithWhereUniqueWithoutCardTypeInput | StockUpsertWithWhereUniqueWithoutCardTypeInput[]
    createMany?: StockCreateManyCardTypeInputEnvelope
    set?: StockWhereUniqueInput | StockWhereUniqueInput[]
    disconnect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    delete?: StockWhereUniqueInput | StockWhereUniqueInput[]
    connect?: StockWhereUniqueInput | StockWhereUniqueInput[]
    update?: StockUpdateWithWhereUniqueWithoutCardTypeInput | StockUpdateWithWhereUniqueWithoutCardTypeInput[]
    updateMany?: StockUpdateManyWithWhereWithoutCardTypeInput | StockUpdateManyWithWhereWithoutCardTypeInput[]
    deleteMany?: StockScalarWhereInput | StockScalarWhereInput[]
  }

  export type MovementUncheckedUpdateManyWithoutCardTypeNestedInput = {
    create?: XOR<MovementCreateWithoutCardTypeInput, MovementUncheckedCreateWithoutCardTypeInput> | MovementCreateWithoutCardTypeInput[] | MovementUncheckedCreateWithoutCardTypeInput[]
    connectOrCreate?: MovementCreateOrConnectWithoutCardTypeInput | MovementCreateOrConnectWithoutCardTypeInput[]
    upsert?: MovementUpsertWithWhereUniqueWithoutCardTypeInput | MovementUpsertWithWhereUniqueWithoutCardTypeInput[]
    createMany?: MovementCreateManyCardTypeInputEnvelope
    set?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    disconnect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    delete?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    connect?: MovementWhereUniqueInput | MovementWhereUniqueInput[]
    update?: MovementUpdateWithWhereUniqueWithoutCardTypeInput | MovementUpdateWithWhereUniqueWithoutCardTypeInput[]
    updateMany?: MovementUpdateManyWithWhereWithoutCardTypeInput | MovementUpdateManyWithWhereWithoutCardTypeInput[]
    deleteMany?: MovementScalarWhereInput | MovementScalarWhereInput[]
  }

  export type LocationCreateNestedOneWithoutStockInput = {
    create?: XOR<LocationCreateWithoutStockInput, LocationUncheckedCreateWithoutStockInput>
    connectOrCreate?: LocationCreateOrConnectWithoutStockInput
    connect?: LocationWhereUniqueInput
  }

  export type CardTypeCreateNestedOneWithoutStockInput = {
    create?: XOR<CardTypeCreateWithoutStockInput, CardTypeUncheckedCreateWithoutStockInput>
    connectOrCreate?: CardTypeCreateOrConnectWithoutStockInput
    connect?: CardTypeWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LocationUpdateOneRequiredWithoutStockNestedInput = {
    create?: XOR<LocationCreateWithoutStockInput, LocationUncheckedCreateWithoutStockInput>
    connectOrCreate?: LocationCreateOrConnectWithoutStockInput
    upsert?: LocationUpsertWithoutStockInput
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutStockInput, LocationUpdateWithoutStockInput>, LocationUncheckedUpdateWithoutStockInput>
  }

  export type CardTypeUpdateOneRequiredWithoutStockNestedInput = {
    create?: XOR<CardTypeCreateWithoutStockInput, CardTypeUncheckedCreateWithoutStockInput>
    connectOrCreate?: CardTypeCreateOrConnectWithoutStockInput
    upsert?: CardTypeUpsertWithoutStockInput
    connect?: CardTypeWhereUniqueInput
    update?: XOR<XOR<CardTypeUpdateToOneWithWhereWithoutStockInput, CardTypeUpdateWithoutStockInput>, CardTypeUncheckedUpdateWithoutStockInput>
  }

  export type UserCreateNestedOneWithoutMovementsInput = {
    create?: XOR<UserCreateWithoutMovementsInput, UserUncheckedCreateWithoutMovementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMovementsInput
    connect?: UserWhereUniqueInput
  }

  export type CardTypeCreateNestedOneWithoutMovementsInput = {
    create?: XOR<CardTypeCreateWithoutMovementsInput, CardTypeUncheckedCreateWithoutMovementsInput>
    connectOrCreate?: CardTypeCreateOrConnectWithoutMovementsInput
    connect?: CardTypeWhereUniqueInput
  }

  export type LocationCreateNestedOneWithoutMovementsInput = {
    create?: XOR<LocationCreateWithoutMovementsInput, LocationUncheckedCreateWithoutMovementsInput>
    connectOrCreate?: LocationCreateOrConnectWithoutMovementsInput
    connect?: LocationWhereUniqueInput
  }

  export type LocationCreateNestedOneWithoutDestMovementsInput = {
    create?: XOR<LocationCreateWithoutDestMovementsInput, LocationUncheckedCreateWithoutDestMovementsInput>
    connectOrCreate?: LocationCreateOrConnectWithoutDestMovementsInput
    connect?: LocationWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutMovementsNestedInput = {
    create?: XOR<UserCreateWithoutMovementsInput, UserUncheckedCreateWithoutMovementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutMovementsInput
    upsert?: UserUpsertWithoutMovementsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutMovementsInput, UserUpdateWithoutMovementsInput>, UserUncheckedUpdateWithoutMovementsInput>
  }

  export type CardTypeUpdateOneRequiredWithoutMovementsNestedInput = {
    create?: XOR<CardTypeCreateWithoutMovementsInput, CardTypeUncheckedCreateWithoutMovementsInput>
    connectOrCreate?: CardTypeCreateOrConnectWithoutMovementsInput
    upsert?: CardTypeUpsertWithoutMovementsInput
    connect?: CardTypeWhereUniqueInput
    update?: XOR<XOR<CardTypeUpdateToOneWithWhereWithoutMovementsInput, CardTypeUpdateWithoutMovementsInput>, CardTypeUncheckedUpdateWithoutMovementsInput>
  }

  export type LocationUpdateOneRequiredWithoutMovementsNestedInput = {
    create?: XOR<LocationCreateWithoutMovementsInput, LocationUncheckedCreateWithoutMovementsInput>
    connectOrCreate?: LocationCreateOrConnectWithoutMovementsInput
    upsert?: LocationUpsertWithoutMovementsInput
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutMovementsInput, LocationUpdateWithoutMovementsInput>, LocationUncheckedUpdateWithoutMovementsInput>
  }

  export type LocationUpdateOneWithoutDestMovementsNestedInput = {
    create?: XOR<LocationCreateWithoutDestMovementsInput, LocationUncheckedCreateWithoutDestMovementsInput>
    connectOrCreate?: LocationCreateOrConnectWithoutDestMovementsInput
    upsert?: LocationUpsertWithoutDestMovementsInput
    disconnect?: LocationWhereInput | boolean
    delete?: LocationWhereInput | boolean
    connect?: LocationWhereUniqueInput
    update?: XOR<XOR<LocationUpdateToOneWithWhereWithoutDestMovementsInput, LocationUpdateWithoutDestMovementsInput>, LocationUncheckedUpdateWithoutDestMovementsInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
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

  export type BankCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    locations?: LocationCreateNestedManyWithoutBankInput
    cardTypes?: CardTypeCreateNestedManyWithoutBankInput
  }

  export type BankUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    locations?: LocationUncheckedCreateNestedManyWithoutBankInput
    cardTypes?: CardTypeUncheckedCreateNestedManyWithoutBankInput
  }

  export type BankCreateOrConnectWithoutUsersInput = {
    where: BankWhereUniqueInput
    create: XOR<BankCreateWithoutUsersInput, BankUncheckedCreateWithoutUsersInput>
  }

  export type MovementCreateWithoutUserInput = {
    id?: string
    type: string
    quantity: number
    createdAt?: Date | string
    cardType: CardTypeCreateNestedOneWithoutMovementsInput
    location: LocationCreateNestedOneWithoutMovementsInput
    destLocation?: LocationCreateNestedOneWithoutDestMovementsInput
  }

  export type MovementUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    quantity: number
    cardTypeId: string
    locationId: string
    destLocationId?: string | null
    createdAt?: Date | string
  }

  export type MovementCreateOrConnectWithoutUserInput = {
    where: MovementWhereUniqueInput
    create: XOR<MovementCreateWithoutUserInput, MovementUncheckedCreateWithoutUserInput>
  }

  export type MovementCreateManyUserInputEnvelope = {
    data: MovementCreateManyUserInput | MovementCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutUserInput = {
    id?: string
    action: string
    resource: string
    details?: string | null
    ip?: string | null
    type: string
    timestamp?: Date | string
  }

  export type AuditLogUncheckedCreateWithoutUserInput = {
    id?: string
    action: string
    resource: string
    details?: string | null
    ip?: string | null
    type: string
    timestamp?: Date | string
  }

  export type AuditLogCreateOrConnectWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogCreateManyUserInputEnvelope = {
    data: AuditLogCreateManyUserInput | AuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BankUpsertWithoutUsersInput = {
    update: XOR<BankUpdateWithoutUsersInput, BankUncheckedUpdateWithoutUsersInput>
    create: XOR<BankCreateWithoutUsersInput, BankUncheckedCreateWithoutUsersInput>
    where?: BankWhereInput
  }

  export type BankUpdateToOneWithWhereWithoutUsersInput = {
    where?: BankWhereInput
    data: XOR<BankUpdateWithoutUsersInput, BankUncheckedUpdateWithoutUsersInput>
  }

  export type BankUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: LocationUpdateManyWithoutBankNestedInput
    cardTypes?: CardTypeUpdateManyWithoutBankNestedInput
  }

  export type BankUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: LocationUncheckedUpdateManyWithoutBankNestedInput
    cardTypes?: CardTypeUncheckedUpdateManyWithoutBankNestedInput
  }

  export type MovementUpsertWithWhereUniqueWithoutUserInput = {
    where: MovementWhereUniqueInput
    update: XOR<MovementUpdateWithoutUserInput, MovementUncheckedUpdateWithoutUserInput>
    create: XOR<MovementCreateWithoutUserInput, MovementUncheckedCreateWithoutUserInput>
  }

  export type MovementUpdateWithWhereUniqueWithoutUserInput = {
    where: MovementWhereUniqueInput
    data: XOR<MovementUpdateWithoutUserInput, MovementUncheckedUpdateWithoutUserInput>
  }

  export type MovementUpdateManyWithWhereWithoutUserInput = {
    where: MovementScalarWhereInput
    data: XOR<MovementUpdateManyMutationInput, MovementUncheckedUpdateManyWithoutUserInput>
  }

  export type MovementScalarWhereInput = {
    AND?: MovementScalarWhereInput | MovementScalarWhereInput[]
    OR?: MovementScalarWhereInput[]
    NOT?: MovementScalarWhereInput | MovementScalarWhereInput[]
    id?: StringFilter<"Movement"> | string
    type?: StringFilter<"Movement"> | string
    quantity?: IntFilter<"Movement"> | number
    userId?: StringFilter<"Movement"> | string
    cardTypeId?: StringFilter<"Movement"> | string
    locationId?: StringFilter<"Movement"> | string
    destLocationId?: StringNullableFilter<"Movement"> | string | null
    createdAt?: DateTimeFilter<"Movement"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuditLogCreateWithoutUserInput, AuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutUserInput, AuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: StringFilter<"AuditLog"> | string
    userId?: StringNullableFilter<"AuditLog"> | string | null
    action?: StringFilter<"AuditLog"> | string
    resource?: StringFilter<"AuditLog"> | string
    details?: StringNullableFilter<"AuditLog"> | string | null
    ip?: StringNullableFilter<"AuditLog"> | string | null
    type?: StringFilter<"AuditLog"> | string
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type LocationCreateWithoutBankInput = {
    id?: string
    name: string
    createdAt?: Date | string
    stock?: StockCreateNestedManyWithoutLocationInput
    movements?: MovementCreateNestedManyWithoutLocationInput
    destMovements?: MovementCreateNestedManyWithoutDestLocationInput
  }

  export type LocationUncheckedCreateWithoutBankInput = {
    id?: string
    name: string
    createdAt?: Date | string
    stock?: StockUncheckedCreateNestedManyWithoutLocationInput
    movements?: MovementUncheckedCreateNestedManyWithoutLocationInput
    destMovements?: MovementUncheckedCreateNestedManyWithoutDestLocationInput
  }

  export type LocationCreateOrConnectWithoutBankInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutBankInput, LocationUncheckedCreateWithoutBankInput>
  }

  export type LocationCreateManyBankInputEnvelope = {
    data: LocationCreateManyBankInput | LocationCreateManyBankInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutBankInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
    createdAt?: Date | string
    lastLogin?: Date | string | null
    movements?: MovementCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBankInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
    createdAt?: Date | string
    lastLogin?: Date | string | null
    movements?: MovementUncheckedCreateNestedManyWithoutUserInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBankInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBankInput, UserUncheckedCreateWithoutBankInput>
  }

  export type UserCreateManyBankInputEnvelope = {
    data: UserCreateManyBankInput | UserCreateManyBankInput[]
    skipDuplicates?: boolean
  }

  export type CardTypeCreateWithoutBankInput = {
    id?: string
    name: string
    alertThreshold?: number | null
    createdAt?: Date | string
    stock?: StockCreateNestedManyWithoutCardTypeInput
    movements?: MovementCreateNestedManyWithoutCardTypeInput
  }

  export type CardTypeUncheckedCreateWithoutBankInput = {
    id?: string
    name: string
    alertThreshold?: number | null
    createdAt?: Date | string
    stock?: StockUncheckedCreateNestedManyWithoutCardTypeInput
    movements?: MovementUncheckedCreateNestedManyWithoutCardTypeInput
  }

  export type CardTypeCreateOrConnectWithoutBankInput = {
    where: CardTypeWhereUniqueInput
    create: XOR<CardTypeCreateWithoutBankInput, CardTypeUncheckedCreateWithoutBankInput>
  }

  export type CardTypeCreateManyBankInputEnvelope = {
    data: CardTypeCreateManyBankInput | CardTypeCreateManyBankInput[]
    skipDuplicates?: boolean
  }

  export type LocationUpsertWithWhereUniqueWithoutBankInput = {
    where: LocationWhereUniqueInput
    update: XOR<LocationUpdateWithoutBankInput, LocationUncheckedUpdateWithoutBankInput>
    create: XOR<LocationCreateWithoutBankInput, LocationUncheckedCreateWithoutBankInput>
  }

  export type LocationUpdateWithWhereUniqueWithoutBankInput = {
    where: LocationWhereUniqueInput
    data: XOR<LocationUpdateWithoutBankInput, LocationUncheckedUpdateWithoutBankInput>
  }

  export type LocationUpdateManyWithWhereWithoutBankInput = {
    where: LocationScalarWhereInput
    data: XOR<LocationUpdateManyMutationInput, LocationUncheckedUpdateManyWithoutBankInput>
  }

  export type LocationScalarWhereInput = {
    AND?: LocationScalarWhereInput | LocationScalarWhereInput[]
    OR?: LocationScalarWhereInput[]
    NOT?: LocationScalarWhereInput | LocationScalarWhereInput[]
    id?: StringFilter<"Location"> | string
    name?: StringFilter<"Location"> | string
    bankId?: StringFilter<"Location"> | string
    createdAt?: DateTimeFilter<"Location"> | Date | string
  }

  export type UserUpsertWithWhereUniqueWithoutBankInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutBankInput, UserUncheckedUpdateWithoutBankInput>
    create: XOR<UserCreateWithoutBankInput, UserUncheckedCreateWithoutBankInput>
  }

  export type UserUpdateWithWhereUniqueWithoutBankInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutBankInput, UserUncheckedUpdateWithoutBankInput>
  }

  export type UserUpdateManyWithWhereWithoutBankInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutBankInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    bankId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
  }

  export type CardTypeUpsertWithWhereUniqueWithoutBankInput = {
    where: CardTypeWhereUniqueInput
    update: XOR<CardTypeUpdateWithoutBankInput, CardTypeUncheckedUpdateWithoutBankInput>
    create: XOR<CardTypeCreateWithoutBankInput, CardTypeUncheckedCreateWithoutBankInput>
  }

  export type CardTypeUpdateWithWhereUniqueWithoutBankInput = {
    where: CardTypeWhereUniqueInput
    data: XOR<CardTypeUpdateWithoutBankInput, CardTypeUncheckedUpdateWithoutBankInput>
  }

  export type CardTypeUpdateManyWithWhereWithoutBankInput = {
    where: CardTypeScalarWhereInput
    data: XOR<CardTypeUpdateManyMutationInput, CardTypeUncheckedUpdateManyWithoutBankInput>
  }

  export type CardTypeScalarWhereInput = {
    AND?: CardTypeScalarWhereInput | CardTypeScalarWhereInput[]
    OR?: CardTypeScalarWhereInput[]
    NOT?: CardTypeScalarWhereInput | CardTypeScalarWhereInput[]
    id?: StringFilter<"CardType"> | string
    name?: StringFilter<"CardType"> | string
    bankId?: StringFilter<"CardType"> | string
    alertThreshold?: IntNullableFilter<"CardType"> | number | null
    createdAt?: DateTimeFilter<"CardType"> | Date | string
  }

  export type BankCreateWithoutLocationsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    users?: UserCreateNestedManyWithoutBankInput
    cardTypes?: CardTypeCreateNestedManyWithoutBankInput
  }

  export type BankUncheckedCreateWithoutLocationsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutBankInput
    cardTypes?: CardTypeUncheckedCreateNestedManyWithoutBankInput
  }

  export type BankCreateOrConnectWithoutLocationsInput = {
    where: BankWhereUniqueInput
    create: XOR<BankCreateWithoutLocationsInput, BankUncheckedCreateWithoutLocationsInput>
  }

  export type StockCreateWithoutLocationInput = {
    id?: string
    quantity: number
    lastUpdate?: Date | string
    cardType: CardTypeCreateNestedOneWithoutStockInput
  }

  export type StockUncheckedCreateWithoutLocationInput = {
    id?: string
    cardTypeId: string
    quantity: number
    lastUpdate?: Date | string
  }

  export type StockCreateOrConnectWithoutLocationInput = {
    where: StockWhereUniqueInput
    create: XOR<StockCreateWithoutLocationInput, StockUncheckedCreateWithoutLocationInput>
  }

  export type StockCreateManyLocationInputEnvelope = {
    data: StockCreateManyLocationInput | StockCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type MovementCreateWithoutLocationInput = {
    id?: string
    type: string
    quantity: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMovementsInput
    cardType: CardTypeCreateNestedOneWithoutMovementsInput
    destLocation?: LocationCreateNestedOneWithoutDestMovementsInput
  }

  export type MovementUncheckedCreateWithoutLocationInput = {
    id?: string
    type: string
    quantity: number
    userId: string
    cardTypeId: string
    destLocationId?: string | null
    createdAt?: Date | string
  }

  export type MovementCreateOrConnectWithoutLocationInput = {
    where: MovementWhereUniqueInput
    create: XOR<MovementCreateWithoutLocationInput, MovementUncheckedCreateWithoutLocationInput>
  }

  export type MovementCreateManyLocationInputEnvelope = {
    data: MovementCreateManyLocationInput | MovementCreateManyLocationInput[]
    skipDuplicates?: boolean
  }

  export type MovementCreateWithoutDestLocationInput = {
    id?: string
    type: string
    quantity: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMovementsInput
    cardType: CardTypeCreateNestedOneWithoutMovementsInput
    location: LocationCreateNestedOneWithoutMovementsInput
  }

  export type MovementUncheckedCreateWithoutDestLocationInput = {
    id?: string
    type: string
    quantity: number
    userId: string
    cardTypeId: string
    locationId: string
    createdAt?: Date | string
  }

  export type MovementCreateOrConnectWithoutDestLocationInput = {
    where: MovementWhereUniqueInput
    create: XOR<MovementCreateWithoutDestLocationInput, MovementUncheckedCreateWithoutDestLocationInput>
  }

  export type MovementCreateManyDestLocationInputEnvelope = {
    data: MovementCreateManyDestLocationInput | MovementCreateManyDestLocationInput[]
    skipDuplicates?: boolean
  }

  export type BankUpsertWithoutLocationsInput = {
    update: XOR<BankUpdateWithoutLocationsInput, BankUncheckedUpdateWithoutLocationsInput>
    create: XOR<BankCreateWithoutLocationsInput, BankUncheckedCreateWithoutLocationsInput>
    where?: BankWhereInput
  }

  export type BankUpdateToOneWithWhereWithoutLocationsInput = {
    where?: BankWhereInput
    data: XOR<BankUpdateWithoutLocationsInput, BankUncheckedUpdateWithoutLocationsInput>
  }

  export type BankUpdateWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutBankNestedInput
    cardTypes?: CardTypeUpdateManyWithoutBankNestedInput
  }

  export type BankUncheckedUpdateWithoutLocationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutBankNestedInput
    cardTypes?: CardTypeUncheckedUpdateManyWithoutBankNestedInput
  }

  export type StockUpsertWithWhereUniqueWithoutLocationInput = {
    where: StockWhereUniqueInput
    update: XOR<StockUpdateWithoutLocationInput, StockUncheckedUpdateWithoutLocationInput>
    create: XOR<StockCreateWithoutLocationInput, StockUncheckedCreateWithoutLocationInput>
  }

  export type StockUpdateWithWhereUniqueWithoutLocationInput = {
    where: StockWhereUniqueInput
    data: XOR<StockUpdateWithoutLocationInput, StockUncheckedUpdateWithoutLocationInput>
  }

  export type StockUpdateManyWithWhereWithoutLocationInput = {
    where: StockScalarWhereInput
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyWithoutLocationInput>
  }

  export type StockScalarWhereInput = {
    AND?: StockScalarWhereInput | StockScalarWhereInput[]
    OR?: StockScalarWhereInput[]
    NOT?: StockScalarWhereInput | StockScalarWhereInput[]
    id?: StringFilter<"Stock"> | string
    locationId?: StringFilter<"Stock"> | string
    cardTypeId?: StringFilter<"Stock"> | string
    quantity?: IntFilter<"Stock"> | number
    lastUpdate?: DateTimeFilter<"Stock"> | Date | string
  }

  export type MovementUpsertWithWhereUniqueWithoutLocationInput = {
    where: MovementWhereUniqueInput
    update: XOR<MovementUpdateWithoutLocationInput, MovementUncheckedUpdateWithoutLocationInput>
    create: XOR<MovementCreateWithoutLocationInput, MovementUncheckedCreateWithoutLocationInput>
  }

  export type MovementUpdateWithWhereUniqueWithoutLocationInput = {
    where: MovementWhereUniqueInput
    data: XOR<MovementUpdateWithoutLocationInput, MovementUncheckedUpdateWithoutLocationInput>
  }

  export type MovementUpdateManyWithWhereWithoutLocationInput = {
    where: MovementScalarWhereInput
    data: XOR<MovementUpdateManyMutationInput, MovementUncheckedUpdateManyWithoutLocationInput>
  }

  export type MovementUpsertWithWhereUniqueWithoutDestLocationInput = {
    where: MovementWhereUniqueInput
    update: XOR<MovementUpdateWithoutDestLocationInput, MovementUncheckedUpdateWithoutDestLocationInput>
    create: XOR<MovementCreateWithoutDestLocationInput, MovementUncheckedCreateWithoutDestLocationInput>
  }

  export type MovementUpdateWithWhereUniqueWithoutDestLocationInput = {
    where: MovementWhereUniqueInput
    data: XOR<MovementUpdateWithoutDestLocationInput, MovementUncheckedUpdateWithoutDestLocationInput>
  }

  export type MovementUpdateManyWithWhereWithoutDestLocationInput = {
    where: MovementScalarWhereInput
    data: XOR<MovementUpdateManyMutationInput, MovementUncheckedUpdateManyWithoutDestLocationInput>
  }

  export type BankCreateWithoutCardTypesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    locations?: LocationCreateNestedManyWithoutBankInput
    users?: UserCreateNestedManyWithoutBankInput
  }

  export type BankUncheckedCreateWithoutCardTypesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    locations?: LocationUncheckedCreateNestedManyWithoutBankInput
    users?: UserUncheckedCreateNestedManyWithoutBankInput
  }

  export type BankCreateOrConnectWithoutCardTypesInput = {
    where: BankWhereUniqueInput
    create: XOR<BankCreateWithoutCardTypesInput, BankUncheckedCreateWithoutCardTypesInput>
  }

  export type StockCreateWithoutCardTypeInput = {
    id?: string
    quantity: number
    lastUpdate?: Date | string
    location: LocationCreateNestedOneWithoutStockInput
  }

  export type StockUncheckedCreateWithoutCardTypeInput = {
    id?: string
    locationId: string
    quantity: number
    lastUpdate?: Date | string
  }

  export type StockCreateOrConnectWithoutCardTypeInput = {
    where: StockWhereUniqueInput
    create: XOR<StockCreateWithoutCardTypeInput, StockUncheckedCreateWithoutCardTypeInput>
  }

  export type StockCreateManyCardTypeInputEnvelope = {
    data: StockCreateManyCardTypeInput | StockCreateManyCardTypeInput[]
    skipDuplicates?: boolean
  }

  export type MovementCreateWithoutCardTypeInput = {
    id?: string
    type: string
    quantity: number
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutMovementsInput
    location: LocationCreateNestedOneWithoutMovementsInput
    destLocation?: LocationCreateNestedOneWithoutDestMovementsInput
  }

  export type MovementUncheckedCreateWithoutCardTypeInput = {
    id?: string
    type: string
    quantity: number
    userId: string
    locationId: string
    destLocationId?: string | null
    createdAt?: Date | string
  }

  export type MovementCreateOrConnectWithoutCardTypeInput = {
    where: MovementWhereUniqueInput
    create: XOR<MovementCreateWithoutCardTypeInput, MovementUncheckedCreateWithoutCardTypeInput>
  }

  export type MovementCreateManyCardTypeInputEnvelope = {
    data: MovementCreateManyCardTypeInput | MovementCreateManyCardTypeInput[]
    skipDuplicates?: boolean
  }

  export type BankUpsertWithoutCardTypesInput = {
    update: XOR<BankUpdateWithoutCardTypesInput, BankUncheckedUpdateWithoutCardTypesInput>
    create: XOR<BankCreateWithoutCardTypesInput, BankUncheckedCreateWithoutCardTypesInput>
    where?: BankWhereInput
  }

  export type BankUpdateToOneWithWhereWithoutCardTypesInput = {
    where?: BankWhereInput
    data: XOR<BankUpdateWithoutCardTypesInput, BankUncheckedUpdateWithoutCardTypesInput>
  }

  export type BankUpdateWithoutCardTypesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: LocationUpdateManyWithoutBankNestedInput
    users?: UserUpdateManyWithoutBankNestedInput
  }

  export type BankUncheckedUpdateWithoutCardTypesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    locations?: LocationUncheckedUpdateManyWithoutBankNestedInput
    users?: UserUncheckedUpdateManyWithoutBankNestedInput
  }

  export type StockUpsertWithWhereUniqueWithoutCardTypeInput = {
    where: StockWhereUniqueInput
    update: XOR<StockUpdateWithoutCardTypeInput, StockUncheckedUpdateWithoutCardTypeInput>
    create: XOR<StockCreateWithoutCardTypeInput, StockUncheckedCreateWithoutCardTypeInput>
  }

  export type StockUpdateWithWhereUniqueWithoutCardTypeInput = {
    where: StockWhereUniqueInput
    data: XOR<StockUpdateWithoutCardTypeInput, StockUncheckedUpdateWithoutCardTypeInput>
  }

  export type StockUpdateManyWithWhereWithoutCardTypeInput = {
    where: StockScalarWhereInput
    data: XOR<StockUpdateManyMutationInput, StockUncheckedUpdateManyWithoutCardTypeInput>
  }

  export type MovementUpsertWithWhereUniqueWithoutCardTypeInput = {
    where: MovementWhereUniqueInput
    update: XOR<MovementUpdateWithoutCardTypeInput, MovementUncheckedUpdateWithoutCardTypeInput>
    create: XOR<MovementCreateWithoutCardTypeInput, MovementUncheckedCreateWithoutCardTypeInput>
  }

  export type MovementUpdateWithWhereUniqueWithoutCardTypeInput = {
    where: MovementWhereUniqueInput
    data: XOR<MovementUpdateWithoutCardTypeInput, MovementUncheckedUpdateWithoutCardTypeInput>
  }

  export type MovementUpdateManyWithWhereWithoutCardTypeInput = {
    where: MovementScalarWhereInput
    data: XOR<MovementUpdateManyMutationInput, MovementUncheckedUpdateManyWithoutCardTypeInput>
  }

  export type LocationCreateWithoutStockInput = {
    id?: string
    name: string
    createdAt?: Date | string
    bank: BankCreateNestedOneWithoutLocationsInput
    movements?: MovementCreateNestedManyWithoutLocationInput
    destMovements?: MovementCreateNestedManyWithoutDestLocationInput
  }

  export type LocationUncheckedCreateWithoutStockInput = {
    id?: string
    name: string
    bankId: string
    createdAt?: Date | string
    movements?: MovementUncheckedCreateNestedManyWithoutLocationInput
    destMovements?: MovementUncheckedCreateNestedManyWithoutDestLocationInput
  }

  export type LocationCreateOrConnectWithoutStockInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutStockInput, LocationUncheckedCreateWithoutStockInput>
  }

  export type CardTypeCreateWithoutStockInput = {
    id?: string
    name: string
    alertThreshold?: number | null
    createdAt?: Date | string
    bank: BankCreateNestedOneWithoutCardTypesInput
    movements?: MovementCreateNestedManyWithoutCardTypeInput
  }

  export type CardTypeUncheckedCreateWithoutStockInput = {
    id?: string
    name: string
    bankId: string
    alertThreshold?: number | null
    createdAt?: Date | string
    movements?: MovementUncheckedCreateNestedManyWithoutCardTypeInput
  }

  export type CardTypeCreateOrConnectWithoutStockInput = {
    where: CardTypeWhereUniqueInput
    create: XOR<CardTypeCreateWithoutStockInput, CardTypeUncheckedCreateWithoutStockInput>
  }

  export type LocationUpsertWithoutStockInput = {
    update: XOR<LocationUpdateWithoutStockInput, LocationUncheckedUpdateWithoutStockInput>
    create: XOR<LocationCreateWithoutStockInput, LocationUncheckedCreateWithoutStockInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutStockInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutStockInput, LocationUncheckedUpdateWithoutStockInput>
  }

  export type LocationUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bank?: BankUpdateOneRequiredWithoutLocationsNestedInput
    movements?: MovementUpdateManyWithoutLocationNestedInput
    destMovements?: MovementUpdateManyWithoutDestLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bankId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movements?: MovementUncheckedUpdateManyWithoutLocationNestedInput
    destMovements?: MovementUncheckedUpdateManyWithoutDestLocationNestedInput
  }

  export type CardTypeUpsertWithoutStockInput = {
    update: XOR<CardTypeUpdateWithoutStockInput, CardTypeUncheckedUpdateWithoutStockInput>
    create: XOR<CardTypeCreateWithoutStockInput, CardTypeUncheckedCreateWithoutStockInput>
    where?: CardTypeWhereInput
  }

  export type CardTypeUpdateToOneWithWhereWithoutStockInput = {
    where?: CardTypeWhereInput
    data: XOR<CardTypeUpdateWithoutStockInput, CardTypeUncheckedUpdateWithoutStockInput>
  }

  export type CardTypeUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    alertThreshold?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bank?: BankUpdateOneRequiredWithoutCardTypesNestedInput
    movements?: MovementUpdateManyWithoutCardTypeNestedInput
  }

  export type CardTypeUncheckedUpdateWithoutStockInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bankId?: StringFieldUpdateOperationsInput | string
    alertThreshold?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    movements?: MovementUncheckedUpdateManyWithoutCardTypeNestedInput
  }

  export type UserCreateWithoutMovementsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
    createdAt?: Date | string
    lastLogin?: Date | string | null
    bank?: BankCreateNestedOneWithoutUsersInput
    auditLogs?: AuditLogCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutMovementsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
    bankId?: string | null
    createdAt?: Date | string
    lastLogin?: Date | string | null
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutMovementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutMovementsInput, UserUncheckedCreateWithoutMovementsInput>
  }

  export type CardTypeCreateWithoutMovementsInput = {
    id?: string
    name: string
    alertThreshold?: number | null
    createdAt?: Date | string
    bank: BankCreateNestedOneWithoutCardTypesInput
    stock?: StockCreateNestedManyWithoutCardTypeInput
  }

  export type CardTypeUncheckedCreateWithoutMovementsInput = {
    id?: string
    name: string
    bankId: string
    alertThreshold?: number | null
    createdAt?: Date | string
    stock?: StockUncheckedCreateNestedManyWithoutCardTypeInput
  }

  export type CardTypeCreateOrConnectWithoutMovementsInput = {
    where: CardTypeWhereUniqueInput
    create: XOR<CardTypeCreateWithoutMovementsInput, CardTypeUncheckedCreateWithoutMovementsInput>
  }

  export type LocationCreateWithoutMovementsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    bank: BankCreateNestedOneWithoutLocationsInput
    stock?: StockCreateNestedManyWithoutLocationInput
    destMovements?: MovementCreateNestedManyWithoutDestLocationInput
  }

  export type LocationUncheckedCreateWithoutMovementsInput = {
    id?: string
    name: string
    bankId: string
    createdAt?: Date | string
    stock?: StockUncheckedCreateNestedManyWithoutLocationInput
    destMovements?: MovementUncheckedCreateNestedManyWithoutDestLocationInput
  }

  export type LocationCreateOrConnectWithoutMovementsInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutMovementsInput, LocationUncheckedCreateWithoutMovementsInput>
  }

  export type LocationCreateWithoutDestMovementsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    bank: BankCreateNestedOneWithoutLocationsInput
    stock?: StockCreateNestedManyWithoutLocationInput
    movements?: MovementCreateNestedManyWithoutLocationInput
  }

  export type LocationUncheckedCreateWithoutDestMovementsInput = {
    id?: string
    name: string
    bankId: string
    createdAt?: Date | string
    stock?: StockUncheckedCreateNestedManyWithoutLocationInput
    movements?: MovementUncheckedCreateNestedManyWithoutLocationInput
  }

  export type LocationCreateOrConnectWithoutDestMovementsInput = {
    where: LocationWhereUniqueInput
    create: XOR<LocationCreateWithoutDestMovementsInput, LocationUncheckedCreateWithoutDestMovementsInput>
  }

  export type UserUpsertWithoutMovementsInput = {
    update: XOR<UserUpdateWithoutMovementsInput, UserUncheckedUpdateWithoutMovementsInput>
    create: XOR<UserCreateWithoutMovementsInput, UserUncheckedCreateWithoutMovementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutMovementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutMovementsInput, UserUncheckedUpdateWithoutMovementsInput>
  }

  export type UserUpdateWithoutMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bank?: BankUpdateOneWithoutUsersNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CardTypeUpsertWithoutMovementsInput = {
    update: XOR<CardTypeUpdateWithoutMovementsInput, CardTypeUncheckedUpdateWithoutMovementsInput>
    create: XOR<CardTypeCreateWithoutMovementsInput, CardTypeUncheckedCreateWithoutMovementsInput>
    where?: CardTypeWhereInput
  }

  export type CardTypeUpdateToOneWithWhereWithoutMovementsInput = {
    where?: CardTypeWhereInput
    data: XOR<CardTypeUpdateWithoutMovementsInput, CardTypeUncheckedUpdateWithoutMovementsInput>
  }

  export type CardTypeUpdateWithoutMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    alertThreshold?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bank?: BankUpdateOneRequiredWithoutCardTypesNestedInput
    stock?: StockUpdateManyWithoutCardTypeNestedInput
  }

  export type CardTypeUncheckedUpdateWithoutMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bankId?: StringFieldUpdateOperationsInput | string
    alertThreshold?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUncheckedUpdateManyWithoutCardTypeNestedInput
  }

  export type LocationUpsertWithoutMovementsInput = {
    update: XOR<LocationUpdateWithoutMovementsInput, LocationUncheckedUpdateWithoutMovementsInput>
    create: XOR<LocationCreateWithoutMovementsInput, LocationUncheckedCreateWithoutMovementsInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutMovementsInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutMovementsInput, LocationUncheckedUpdateWithoutMovementsInput>
  }

  export type LocationUpdateWithoutMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bank?: BankUpdateOneRequiredWithoutLocationsNestedInput
    stock?: StockUpdateManyWithoutLocationNestedInput
    destMovements?: MovementUpdateManyWithoutDestLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bankId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUncheckedUpdateManyWithoutLocationNestedInput
    destMovements?: MovementUncheckedUpdateManyWithoutDestLocationNestedInput
  }

  export type LocationUpsertWithoutDestMovementsInput = {
    update: XOR<LocationUpdateWithoutDestMovementsInput, LocationUncheckedUpdateWithoutDestMovementsInput>
    create: XOR<LocationCreateWithoutDestMovementsInput, LocationUncheckedCreateWithoutDestMovementsInput>
    where?: LocationWhereInput
  }

  export type LocationUpdateToOneWithWhereWithoutDestMovementsInput = {
    where?: LocationWhereInput
    data: XOR<LocationUpdateWithoutDestMovementsInput, LocationUncheckedUpdateWithoutDestMovementsInput>
  }

  export type LocationUpdateWithoutDestMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    bank?: BankUpdateOneRequiredWithoutLocationsNestedInput
    stock?: StockUpdateManyWithoutLocationNestedInput
    movements?: MovementUpdateManyWithoutLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutDestMovementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    bankId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUncheckedUpdateManyWithoutLocationNestedInput
    movements?: MovementUncheckedUpdateManyWithoutLocationNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
    createdAt?: Date | string
    lastLogin?: Date | string | null
    bank?: BankCreateNestedOneWithoutUsersInput
    movements?: MovementCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
    bankId?: string | null
    createdAt?: Date | string
    lastLogin?: Date | string | null
    movements?: MovementUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    bank?: BankUpdateOneWithoutUsersNestedInput
    movements?: MovementUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    bankId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    movements?: MovementUncheckedUpdateManyWithoutUserNestedInput
  }

  export type MovementCreateManyUserInput = {
    id?: string
    type: string
    quantity: number
    cardTypeId: string
    locationId: string
    destLocationId?: string | null
    createdAt?: Date | string
  }

  export type AuditLogCreateManyUserInput = {
    id?: string
    action: string
    resource: string
    details?: string | null
    ip?: string | null
    type: string
    timestamp?: Date | string
  }

  export type MovementUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cardType?: CardTypeUpdateOneRequiredWithoutMovementsNestedInput
    location?: LocationUpdateOneRequiredWithoutMovementsNestedInput
    destLocation?: LocationUpdateOneWithoutDestMovementsNestedInput
  }

  export type MovementUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    cardTypeId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    destLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    cardTypeId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    destLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    resource?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ip?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LocationCreateManyBankInput = {
    id?: string
    name: string
    createdAt?: Date | string
  }

  export type UserCreateManyBankInput = {
    id?: string
    email: string
    password: string
    firstName: string
    lastName: string
    role: string
    createdAt?: Date | string
    lastLogin?: Date | string | null
  }

  export type CardTypeCreateManyBankInput = {
    id?: string
    name: string
    alertThreshold?: number | null
    createdAt?: Date | string
  }

  export type LocationUpdateWithoutBankInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUpdateManyWithoutLocationNestedInput
    movements?: MovementUpdateManyWithoutLocationNestedInput
    destMovements?: MovementUpdateManyWithoutDestLocationNestedInput
  }

  export type LocationUncheckedUpdateWithoutBankInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUncheckedUpdateManyWithoutLocationNestedInput
    movements?: MovementUncheckedUpdateManyWithoutLocationNestedInput
    destMovements?: MovementUncheckedUpdateManyWithoutDestLocationNestedInput
  }

  export type LocationUncheckedUpdateManyWithoutBankInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpdateWithoutBankInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    movements?: MovementUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBankInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    movements?: MovementUncheckedUpdateManyWithoutUserNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutBankInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CardTypeUpdateWithoutBankInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    alertThreshold?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUpdateManyWithoutCardTypeNestedInput
    movements?: MovementUpdateManyWithoutCardTypeNestedInput
  }

  export type CardTypeUncheckedUpdateWithoutBankInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    alertThreshold?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stock?: StockUncheckedUpdateManyWithoutCardTypeNestedInput
    movements?: MovementUncheckedUpdateManyWithoutCardTypeNestedInput
  }

  export type CardTypeUncheckedUpdateManyWithoutBankInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    alertThreshold?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockCreateManyLocationInput = {
    id?: string
    cardTypeId: string
    quantity: number
    lastUpdate?: Date | string
  }

  export type MovementCreateManyLocationInput = {
    id?: string
    type: string
    quantity: number
    userId: string
    cardTypeId: string
    destLocationId?: string | null
    createdAt?: Date | string
  }

  export type MovementCreateManyDestLocationInput = {
    id?: string
    type: string
    quantity: number
    userId: string
    cardTypeId: string
    locationId: string
    createdAt?: Date | string
  }

  export type StockUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    lastUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
    cardType?: CardTypeUpdateOneRequiredWithoutStockNestedInput
  }

  export type StockUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardTypeId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    lastUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockUncheckedUpdateManyWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    cardTypeId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    lastUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMovementsNestedInput
    cardType?: CardTypeUpdateOneRequiredWithoutMovementsNestedInput
    destLocation?: LocationUpdateOneWithoutDestMovementsNestedInput
  }

  export type MovementUncheckedUpdateWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    cardTypeId?: StringFieldUpdateOperationsInput | string
    destLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementUncheckedUpdateManyWithoutLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    cardTypeId?: StringFieldUpdateOperationsInput | string
    destLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementUpdateWithoutDestLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMovementsNestedInput
    cardType?: CardTypeUpdateOneRequiredWithoutMovementsNestedInput
    location?: LocationUpdateOneRequiredWithoutMovementsNestedInput
  }

  export type MovementUncheckedUpdateWithoutDestLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    cardTypeId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementUncheckedUpdateManyWithoutDestLocationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    cardTypeId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockCreateManyCardTypeInput = {
    id?: string
    locationId: string
    quantity: number
    lastUpdate?: Date | string
  }

  export type MovementCreateManyCardTypeInput = {
    id?: string
    type: string
    quantity: number
    userId: string
    locationId: string
    destLocationId?: string | null
    createdAt?: Date | string
  }

  export type StockUpdateWithoutCardTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    lastUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
    location?: LocationUpdateOneRequiredWithoutStockNestedInput
  }

  export type StockUncheckedUpdateWithoutCardTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    lastUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StockUncheckedUpdateManyWithoutCardTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    lastUpdate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementUpdateWithoutCardTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutMovementsNestedInput
    location?: LocationUpdateOneRequiredWithoutMovementsNestedInput
    destLocation?: LocationUpdateOneWithoutDestMovementsNestedInput
  }

  export type MovementUncheckedUpdateWithoutCardTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    destLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MovementUncheckedUpdateManyWithoutCardTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    locationId?: StringFieldUpdateOperationsInput | string
    destLocationId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



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