
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
 * Model Aircraft
 * 
 */
export type Aircraft = $Result.DefaultSelection<Prisma.$AircraftPayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>
/**
 * Model AircraftVote
 * 
 */
export type AircraftVote = $Result.DefaultSelection<Prisma.$AircraftVotePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CompatibilityStatus: {
  Native: 'Native',
  Compatible: 'Compatible',
  Not_Compatible: 'Not_Compatible'
};

export type CompatibilityStatus = (typeof CompatibilityStatus)[keyof typeof CompatibilityStatus]


export const ReportType: {
  monthly: 'monthly',
  yearly: 'yearly'
};

export type ReportType = (typeof ReportType)[keyof typeof ReportType]

}

export type CompatibilityStatus = $Enums.CompatibilityStatus

export const CompatibilityStatus: typeof $Enums.CompatibilityStatus

export type ReportType = $Enums.ReportType

export const ReportType: typeof $Enums.ReportType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Aircraft
 * const aircraft = await prisma.aircraft.findMany()
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
   * // Fetch zero or more Aircraft
   * const aircraft = await prisma.aircraft.findMany()
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
   * `prisma.aircraft`: Exposes CRUD operations for the **Aircraft** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Aircraft
    * const aircraft = await prisma.aircraft.findMany()
    * ```
    */
  get aircraft(): Prisma.AircraftDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aircraftVote`: Exposes CRUD operations for the **AircraftVote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AircraftVotes
    * const aircraftVotes = await prisma.aircraftVote.findMany()
    * ```
    */
  get aircraftVote(): Prisma.AircraftVoteDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
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
    Aircraft: 'Aircraft',
    Report: 'Report',
    AircraftVote: 'AircraftVote'
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
      modelProps: "aircraft" | "report" | "aircraftVote"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Aircraft: {
        payload: Prisma.$AircraftPayload<ExtArgs>
        fields: Prisma.AircraftFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AircraftFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AircraftFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          findFirst: {
            args: Prisma.AircraftFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AircraftFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          findMany: {
            args: Prisma.AircraftFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>[]
          }
          create: {
            args: Prisma.AircraftCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          createMany: {
            args: Prisma.AircraftCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AircraftCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>[]
          }
          delete: {
            args: Prisma.AircraftDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          update: {
            args: Prisma.AircraftUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          deleteMany: {
            args: Prisma.AircraftDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AircraftUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AircraftUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>[]
          }
          upsert: {
            args: Prisma.AircraftUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftPayload>
          }
          aggregate: {
            args: Prisma.AircraftAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAircraft>
          }
          groupBy: {
            args: Prisma.AircraftGroupByArgs<ExtArgs>
            result: $Utils.Optional<AircraftGroupByOutputType>[]
          }
          count: {
            args: Prisma.AircraftCountArgs<ExtArgs>
            result: $Utils.Optional<AircraftCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      AircraftVote: {
        payload: Prisma.$AircraftVotePayload<ExtArgs>
        fields: Prisma.AircraftVoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AircraftVoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftVotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AircraftVoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftVotePayload>
          }
          findFirst: {
            args: Prisma.AircraftVoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftVotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AircraftVoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftVotePayload>
          }
          findMany: {
            args: Prisma.AircraftVoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftVotePayload>[]
          }
          create: {
            args: Prisma.AircraftVoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftVotePayload>
          }
          createMany: {
            args: Prisma.AircraftVoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AircraftVoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftVotePayload>[]
          }
          delete: {
            args: Prisma.AircraftVoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftVotePayload>
          }
          update: {
            args: Prisma.AircraftVoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftVotePayload>
          }
          deleteMany: {
            args: Prisma.AircraftVoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AircraftVoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AircraftVoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftVotePayload>[]
          }
          upsert: {
            args: Prisma.AircraftVoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AircraftVotePayload>
          }
          aggregate: {
            args: Prisma.AircraftVoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAircraftVote>
          }
          groupBy: {
            args: Prisma.AircraftVoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<AircraftVoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.AircraftVoteCountArgs<ExtArgs>
            result: $Utils.Optional<AircraftVoteCountAggregateOutputType> | number
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
    aircraft?: AircraftOmit
    report?: ReportOmit
    aircraftVote?: AircraftVoteOmit
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
   * Count Type AircraftCountOutputType
   */

  export type AircraftCountOutputType = {
    votes: number
  }

  export type AircraftCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    votes?: boolean | AircraftCountOutputTypeCountVotesArgs
  }

  // Custom InputTypes
  /**
   * AircraftCountOutputType without action
   */
  export type AircraftCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftCountOutputType
     */
    select?: AircraftCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AircraftCountOutputType without action
   */
  export type AircraftCountOutputTypeCountVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AircraftVoteWhereInput
  }


  /**
   * Count Type ReportCountOutputType
   */

  export type ReportCountOutputType = {
    votes: number
  }

  export type ReportCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    votes?: boolean | ReportCountOutputTypeCountVotesArgs
  }

  // Custom InputTypes
  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportCountOutputType
     */
    select?: ReportCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountVotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AircraftVoteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Aircraft
   */

  export type AggregateAircraft = {
    _count: AircraftCountAggregateOutputType | null
    _avg: AircraftAvgAggregateOutputType | null
    _sum: AircraftSumAggregateOutputType | null
    _min: AircraftMinAggregateOutputType | null
    _max: AircraftMaxAggregateOutputType | null
  }

  export type AircraftAvgAggregateOutputType = {
    msrp: number | null
  }

  export type AircraftSumAggregateOutputType = {
    msrp: number | null
  }

  export type AircraftMinAggregateOutputType = {
    id: string | null
    name: string | null
    manufacturer: string | null
    category: string | null
    payware: string | null
    msrp: number | null
    buyUrl: string | null
    previewImageUrl: string | null
    description: string | null
    dateAdded: Date | null
    msfs2020Compatibility: $Enums.CompatibilityStatus | null
    msfs2024Compatibility: $Enums.CompatibilityStatus | null
  }

  export type AircraftMaxAggregateOutputType = {
    id: string | null
    name: string | null
    manufacturer: string | null
    category: string | null
    payware: string | null
    msrp: number | null
    buyUrl: string | null
    previewImageUrl: string | null
    description: string | null
    dateAdded: Date | null
    msfs2020Compatibility: $Enums.CompatibilityStatus | null
    msfs2024Compatibility: $Enums.CompatibilityStatus | null
  }

  export type AircraftCountAggregateOutputType = {
    id: number
    name: number
    manufacturer: number
    category: number
    payware: number
    msrp: number
    buyUrl: number
    previewImageUrl: number
    description: number
    tags: number
    dateAdded: number
    msfs2020Compatibility: number
    msfs2024Compatibility: number
    _all: number
  }


  export type AircraftAvgAggregateInputType = {
    msrp?: true
  }

  export type AircraftSumAggregateInputType = {
    msrp?: true
  }

  export type AircraftMinAggregateInputType = {
    id?: true
    name?: true
    manufacturer?: true
    category?: true
    payware?: true
    msrp?: true
    buyUrl?: true
    previewImageUrl?: true
    description?: true
    dateAdded?: true
    msfs2020Compatibility?: true
    msfs2024Compatibility?: true
  }

  export type AircraftMaxAggregateInputType = {
    id?: true
    name?: true
    manufacturer?: true
    category?: true
    payware?: true
    msrp?: true
    buyUrl?: true
    previewImageUrl?: true
    description?: true
    dateAdded?: true
    msfs2020Compatibility?: true
    msfs2024Compatibility?: true
  }

  export type AircraftCountAggregateInputType = {
    id?: true
    name?: true
    manufacturer?: true
    category?: true
    payware?: true
    msrp?: true
    buyUrl?: true
    previewImageUrl?: true
    description?: true
    tags?: true
    dateAdded?: true
    msfs2020Compatibility?: true
    msfs2024Compatibility?: true
    _all?: true
  }

  export type AircraftAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Aircraft to aggregate.
     */
    where?: AircraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aircraft to fetch.
     */
    orderBy?: AircraftOrderByWithRelationInput | AircraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AircraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aircraft from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aircraft.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Aircraft
    **/
    _count?: true | AircraftCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AircraftAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AircraftSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AircraftMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AircraftMaxAggregateInputType
  }

  export type GetAircraftAggregateType<T extends AircraftAggregateArgs> = {
        [P in keyof T & keyof AggregateAircraft]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAircraft[P]>
      : GetScalarType<T[P], AggregateAircraft[P]>
  }




  export type AircraftGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AircraftWhereInput
    orderBy?: AircraftOrderByWithAggregationInput | AircraftOrderByWithAggregationInput[]
    by: AircraftScalarFieldEnum[] | AircraftScalarFieldEnum
    having?: AircraftScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AircraftCountAggregateInputType | true
    _avg?: AircraftAvgAggregateInputType
    _sum?: AircraftSumAggregateInputType
    _min?: AircraftMinAggregateInputType
    _max?: AircraftMaxAggregateInputType
  }

  export type AircraftGroupByOutputType = {
    id: string
    name: string
    manufacturer: string
    category: string
    payware: string
    msrp: number | null
    buyUrl: string
    previewImageUrl: string | null
    description: string | null
    tags: string[]
    dateAdded: Date | null
    msfs2020Compatibility: $Enums.CompatibilityStatus | null
    msfs2024Compatibility: $Enums.CompatibilityStatus | null
    _count: AircraftCountAggregateOutputType | null
    _avg: AircraftAvgAggregateOutputType | null
    _sum: AircraftSumAggregateOutputType | null
    _min: AircraftMinAggregateOutputType | null
    _max: AircraftMaxAggregateOutputType | null
  }

  type GetAircraftGroupByPayload<T extends AircraftGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AircraftGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AircraftGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AircraftGroupByOutputType[P]>
            : GetScalarType<T[P], AircraftGroupByOutputType[P]>
        }
      >
    >


  export type AircraftSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    manufacturer?: boolean
    category?: boolean
    payware?: boolean
    msrp?: boolean
    buyUrl?: boolean
    previewImageUrl?: boolean
    description?: boolean
    tags?: boolean
    dateAdded?: boolean
    msfs2020Compatibility?: boolean
    msfs2024Compatibility?: boolean
    votes?: boolean | Aircraft$votesArgs<ExtArgs>
    _count?: boolean | AircraftCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aircraft"]>

  export type AircraftSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    manufacturer?: boolean
    category?: boolean
    payware?: boolean
    msrp?: boolean
    buyUrl?: boolean
    previewImageUrl?: boolean
    description?: boolean
    tags?: boolean
    dateAdded?: boolean
    msfs2020Compatibility?: boolean
    msfs2024Compatibility?: boolean
  }, ExtArgs["result"]["aircraft"]>

  export type AircraftSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    manufacturer?: boolean
    category?: boolean
    payware?: boolean
    msrp?: boolean
    buyUrl?: boolean
    previewImageUrl?: boolean
    description?: boolean
    tags?: boolean
    dateAdded?: boolean
    msfs2020Compatibility?: boolean
    msfs2024Compatibility?: boolean
  }, ExtArgs["result"]["aircraft"]>

  export type AircraftSelectScalar = {
    id?: boolean
    name?: boolean
    manufacturer?: boolean
    category?: boolean
    payware?: boolean
    msrp?: boolean
    buyUrl?: boolean
    previewImageUrl?: boolean
    description?: boolean
    tags?: boolean
    dateAdded?: boolean
    msfs2020Compatibility?: boolean
    msfs2024Compatibility?: boolean
  }

  export type AircraftOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "manufacturer" | "category" | "payware" | "msrp" | "buyUrl" | "previewImageUrl" | "description" | "tags" | "dateAdded" | "msfs2020Compatibility" | "msfs2024Compatibility", ExtArgs["result"]["aircraft"]>
  export type AircraftInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    votes?: boolean | Aircraft$votesArgs<ExtArgs>
    _count?: boolean | AircraftCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AircraftIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AircraftIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AircraftPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Aircraft"
    objects: {
      votes: Prisma.$AircraftVotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      manufacturer: string
      category: string
      payware: string
      msrp: number | null
      buyUrl: string
      previewImageUrl: string | null
      description: string | null
      tags: string[]
      dateAdded: Date | null
      msfs2020Compatibility: $Enums.CompatibilityStatus | null
      msfs2024Compatibility: $Enums.CompatibilityStatus | null
    }, ExtArgs["result"]["aircraft"]>
    composites: {}
  }

  type AircraftGetPayload<S extends boolean | null | undefined | AircraftDefaultArgs> = $Result.GetResult<Prisma.$AircraftPayload, S>

  type AircraftCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AircraftFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AircraftCountAggregateInputType | true
    }

  export interface AircraftDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Aircraft'], meta: { name: 'Aircraft' } }
    /**
     * Find zero or one Aircraft that matches the filter.
     * @param {AircraftFindUniqueArgs} args - Arguments to find a Aircraft
     * @example
     * // Get one Aircraft
     * const aircraft = await prisma.aircraft.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AircraftFindUniqueArgs>(args: SelectSubset<T, AircraftFindUniqueArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Aircraft that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AircraftFindUniqueOrThrowArgs} args - Arguments to find a Aircraft
     * @example
     * // Get one Aircraft
     * const aircraft = await prisma.aircraft.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AircraftFindUniqueOrThrowArgs>(args: SelectSubset<T, AircraftFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Aircraft that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftFindFirstArgs} args - Arguments to find a Aircraft
     * @example
     * // Get one Aircraft
     * const aircraft = await prisma.aircraft.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AircraftFindFirstArgs>(args?: SelectSubset<T, AircraftFindFirstArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Aircraft that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftFindFirstOrThrowArgs} args - Arguments to find a Aircraft
     * @example
     * // Get one Aircraft
     * const aircraft = await prisma.aircraft.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AircraftFindFirstOrThrowArgs>(args?: SelectSubset<T, AircraftFindFirstOrThrowArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Aircraft that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Aircraft
     * const aircraft = await prisma.aircraft.findMany()
     * 
     * // Get first 10 Aircraft
     * const aircraft = await prisma.aircraft.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aircraftWithIdOnly = await prisma.aircraft.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AircraftFindManyArgs>(args?: SelectSubset<T, AircraftFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Aircraft.
     * @param {AircraftCreateArgs} args - Arguments to create a Aircraft.
     * @example
     * // Create one Aircraft
     * const Aircraft = await prisma.aircraft.create({
     *   data: {
     *     // ... data to create a Aircraft
     *   }
     * })
     * 
     */
    create<T extends AircraftCreateArgs>(args: SelectSubset<T, AircraftCreateArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Aircraft.
     * @param {AircraftCreateManyArgs} args - Arguments to create many Aircraft.
     * @example
     * // Create many Aircraft
     * const aircraft = await prisma.aircraft.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AircraftCreateManyArgs>(args?: SelectSubset<T, AircraftCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Aircraft and returns the data saved in the database.
     * @param {AircraftCreateManyAndReturnArgs} args - Arguments to create many Aircraft.
     * @example
     * // Create many Aircraft
     * const aircraft = await prisma.aircraft.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Aircraft and only return the `id`
     * const aircraftWithIdOnly = await prisma.aircraft.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AircraftCreateManyAndReturnArgs>(args?: SelectSubset<T, AircraftCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Aircraft.
     * @param {AircraftDeleteArgs} args - Arguments to delete one Aircraft.
     * @example
     * // Delete one Aircraft
     * const Aircraft = await prisma.aircraft.delete({
     *   where: {
     *     // ... filter to delete one Aircraft
     *   }
     * })
     * 
     */
    delete<T extends AircraftDeleteArgs>(args: SelectSubset<T, AircraftDeleteArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Aircraft.
     * @param {AircraftUpdateArgs} args - Arguments to update one Aircraft.
     * @example
     * // Update one Aircraft
     * const aircraft = await prisma.aircraft.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AircraftUpdateArgs>(args: SelectSubset<T, AircraftUpdateArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Aircraft.
     * @param {AircraftDeleteManyArgs} args - Arguments to filter Aircraft to delete.
     * @example
     * // Delete a few Aircraft
     * const { count } = await prisma.aircraft.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AircraftDeleteManyArgs>(args?: SelectSubset<T, AircraftDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Aircraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Aircraft
     * const aircraft = await prisma.aircraft.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AircraftUpdateManyArgs>(args: SelectSubset<T, AircraftUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Aircraft and returns the data updated in the database.
     * @param {AircraftUpdateManyAndReturnArgs} args - Arguments to update many Aircraft.
     * @example
     * // Update many Aircraft
     * const aircraft = await prisma.aircraft.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Aircraft and only return the `id`
     * const aircraftWithIdOnly = await prisma.aircraft.updateManyAndReturn({
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
    updateManyAndReturn<T extends AircraftUpdateManyAndReturnArgs>(args: SelectSubset<T, AircraftUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Aircraft.
     * @param {AircraftUpsertArgs} args - Arguments to update or create a Aircraft.
     * @example
     * // Update or create a Aircraft
     * const aircraft = await prisma.aircraft.upsert({
     *   create: {
     *     // ... data to create a Aircraft
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Aircraft we want to update
     *   }
     * })
     */
    upsert<T extends AircraftUpsertArgs>(args: SelectSubset<T, AircraftUpsertArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Aircraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftCountArgs} args - Arguments to filter Aircraft to count.
     * @example
     * // Count the number of Aircraft
     * const count = await prisma.aircraft.count({
     *   where: {
     *     // ... the filter for the Aircraft we want to count
     *   }
     * })
    **/
    count<T extends AircraftCountArgs>(
      args?: Subset<T, AircraftCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AircraftCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Aircraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AircraftAggregateArgs>(args: Subset<T, AircraftAggregateArgs>): Prisma.PrismaPromise<GetAircraftAggregateType<T>>

    /**
     * Group by Aircraft.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftGroupByArgs} args - Group by arguments.
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
      T extends AircraftGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AircraftGroupByArgs['orderBy'] }
        : { orderBy?: AircraftGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AircraftGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAircraftGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Aircraft model
   */
  readonly fields: AircraftFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Aircraft.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AircraftClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    votes<T extends Aircraft$votesArgs<ExtArgs> = {}>(args?: Subset<T, Aircraft$votesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AircraftVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Aircraft model
   */
  interface AircraftFieldRefs {
    readonly id: FieldRef<"Aircraft", 'String'>
    readonly name: FieldRef<"Aircraft", 'String'>
    readonly manufacturer: FieldRef<"Aircraft", 'String'>
    readonly category: FieldRef<"Aircraft", 'String'>
    readonly payware: FieldRef<"Aircraft", 'String'>
    readonly msrp: FieldRef<"Aircraft", 'Int'>
    readonly buyUrl: FieldRef<"Aircraft", 'String'>
    readonly previewImageUrl: FieldRef<"Aircraft", 'String'>
    readonly description: FieldRef<"Aircraft", 'String'>
    readonly tags: FieldRef<"Aircraft", 'String[]'>
    readonly dateAdded: FieldRef<"Aircraft", 'DateTime'>
    readonly msfs2020Compatibility: FieldRef<"Aircraft", 'CompatibilityStatus'>
    readonly msfs2024Compatibility: FieldRef<"Aircraft", 'CompatibilityStatus'>
  }
    

  // Custom InputTypes
  /**
   * Aircraft findUnique
   */
  export type AircraftFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter, which Aircraft to fetch.
     */
    where: AircraftWhereUniqueInput
  }

  /**
   * Aircraft findUniqueOrThrow
   */
  export type AircraftFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter, which Aircraft to fetch.
     */
    where: AircraftWhereUniqueInput
  }

  /**
   * Aircraft findFirst
   */
  export type AircraftFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter, which Aircraft to fetch.
     */
    where?: AircraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aircraft to fetch.
     */
    orderBy?: AircraftOrderByWithRelationInput | AircraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Aircraft.
     */
    cursor?: AircraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aircraft from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aircraft.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Aircraft.
     */
    distinct?: AircraftScalarFieldEnum | AircraftScalarFieldEnum[]
  }

  /**
   * Aircraft findFirstOrThrow
   */
  export type AircraftFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter, which Aircraft to fetch.
     */
    where?: AircraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aircraft to fetch.
     */
    orderBy?: AircraftOrderByWithRelationInput | AircraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Aircraft.
     */
    cursor?: AircraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aircraft from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aircraft.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Aircraft.
     */
    distinct?: AircraftScalarFieldEnum | AircraftScalarFieldEnum[]
  }

  /**
   * Aircraft findMany
   */
  export type AircraftFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter, which Aircraft to fetch.
     */
    where?: AircraftWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Aircraft to fetch.
     */
    orderBy?: AircraftOrderByWithRelationInput | AircraftOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Aircraft.
     */
    cursor?: AircraftWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Aircraft from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Aircraft.
     */
    skip?: number
    distinct?: AircraftScalarFieldEnum | AircraftScalarFieldEnum[]
  }

  /**
   * Aircraft create
   */
  export type AircraftCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * The data needed to create a Aircraft.
     */
    data: XOR<AircraftCreateInput, AircraftUncheckedCreateInput>
  }

  /**
   * Aircraft createMany
   */
  export type AircraftCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Aircraft.
     */
    data: AircraftCreateManyInput | AircraftCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Aircraft createManyAndReturn
   */
  export type AircraftCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * The data used to create many Aircraft.
     */
    data: AircraftCreateManyInput | AircraftCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Aircraft update
   */
  export type AircraftUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * The data needed to update a Aircraft.
     */
    data: XOR<AircraftUpdateInput, AircraftUncheckedUpdateInput>
    /**
     * Choose, which Aircraft to update.
     */
    where: AircraftWhereUniqueInput
  }

  /**
   * Aircraft updateMany
   */
  export type AircraftUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Aircraft.
     */
    data: XOR<AircraftUpdateManyMutationInput, AircraftUncheckedUpdateManyInput>
    /**
     * Filter which Aircraft to update
     */
    where?: AircraftWhereInput
    /**
     * Limit how many Aircraft to update.
     */
    limit?: number
  }

  /**
   * Aircraft updateManyAndReturn
   */
  export type AircraftUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * The data used to update Aircraft.
     */
    data: XOR<AircraftUpdateManyMutationInput, AircraftUncheckedUpdateManyInput>
    /**
     * Filter which Aircraft to update
     */
    where?: AircraftWhereInput
    /**
     * Limit how many Aircraft to update.
     */
    limit?: number
  }

  /**
   * Aircraft upsert
   */
  export type AircraftUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * The filter to search for the Aircraft to update in case it exists.
     */
    where: AircraftWhereUniqueInput
    /**
     * In case the Aircraft found by the `where` argument doesn't exist, create a new Aircraft with this data.
     */
    create: XOR<AircraftCreateInput, AircraftUncheckedCreateInput>
    /**
     * In case the Aircraft was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AircraftUpdateInput, AircraftUncheckedUpdateInput>
  }

  /**
   * Aircraft delete
   */
  export type AircraftDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
    /**
     * Filter which Aircraft to delete.
     */
    where: AircraftWhereUniqueInput
  }

  /**
   * Aircraft deleteMany
   */
  export type AircraftDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Aircraft to delete
     */
    where?: AircraftWhereInput
    /**
     * Limit how many Aircraft to delete.
     */
    limit?: number
  }

  /**
   * Aircraft.votes
   */
  export type Aircraft$votesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftVote
     */
    select?: AircraftVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AircraftVote
     */
    omit?: AircraftVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftVoteInclude<ExtArgs> | null
    where?: AircraftVoteWhereInput
    orderBy?: AircraftVoteOrderByWithRelationInput | AircraftVoteOrderByWithRelationInput[]
    cursor?: AircraftVoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AircraftVoteScalarFieldEnum | AircraftVoteScalarFieldEnum[]
  }

  /**
   * Aircraft without action
   */
  export type AircraftDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Aircraft
     */
    select?: AircraftSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Aircraft
     */
    omit?: AircraftOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftInclude<ExtArgs> | null
  }


  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportAvgAggregateOutputType = {
    year: number | null
    month: number | null
  }

  export type ReportSumAggregateOutputType = {
    year: number | null
    month: number | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    type: $Enums.ReportType | null
    year: number | null
    month: number | null
    title: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    type: $Enums.ReportType | null
    year: number | null
    month: number | null
    title: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    type: number
    year: number
    month: number
    title: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReportAvgAggregateInputType = {
    year?: true
    month?: true
  }

  export type ReportSumAggregateInputType = {
    year?: true
    month?: true
  }

  export type ReportMinAggregateInputType = {
    id?: true
    type?: true
    year?: true
    month?: true
    title?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    type?: true
    year?: true
    month?: true
    title?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    type?: true
    year?: true
    month?: true
    title?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReportSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _avg?: ReportAvgAggregateInputType
    _sum?: ReportSumAggregateInputType
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    id: string
    type: $Enums.ReportType
    year: number
    month: number | null
    title: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    year?: boolean
    month?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    votes?: boolean | Report$votesArgs<ExtArgs>
    _count?: boolean | ReportCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    year?: boolean
    month?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["report"]>

  export type ReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    year?: boolean
    month?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    type?: boolean
    year?: boolean
    month?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "year" | "month" | "title" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["report"]>
  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    votes?: boolean | Report$votesArgs<ExtArgs>
    _count?: boolean | ReportCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      votes: Prisma.$AircraftVotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.ReportType
      year: number
      month: number | null
      title: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reports and returns the data saved in the database.
     * @param {ReportCreateManyAndReturnArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports and returns the data updated in the database.
     * @param {ReportUpdateManyAndReturnArgs} args - Arguments to update many Reports.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.updateManyAndReturn({
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
    updateManyAndReturn<T extends ReportUpdateManyAndReturnArgs>(args: SelectSubset<T, ReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
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
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    votes<T extends Report$votesArgs<ExtArgs> = {}>(args?: Subset<T, Report$votesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AircraftVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Report model
   */
  interface ReportFieldRefs {
    readonly id: FieldRef<"Report", 'String'>
    readonly type: FieldRef<"Report", 'ReportType'>
    readonly year: FieldRef<"Report", 'Int'>
    readonly month: FieldRef<"Report", 'Int'>
    readonly title: FieldRef<"Report", 'String'>
    readonly description: FieldRef<"Report", 'String'>
    readonly createdAt: FieldRef<"Report", 'DateTime'>
    readonly updatedAt: FieldRef<"Report", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Report createManyAndReturn
   */
  export type ReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
  }

  /**
   * Report updateManyAndReturn
   */
  export type ReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to delete.
     */
    limit?: number
  }

  /**
   * Report.votes
   */
  export type Report$votesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftVote
     */
    select?: AircraftVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AircraftVote
     */
    omit?: AircraftVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftVoteInclude<ExtArgs> | null
    where?: AircraftVoteWhereInput
    orderBy?: AircraftVoteOrderByWithRelationInput | AircraftVoteOrderByWithRelationInput[]
    cursor?: AircraftVoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AircraftVoteScalarFieldEnum | AircraftVoteScalarFieldEnum[]
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Model AircraftVote
   */

  export type AggregateAircraftVote = {
    _count: AircraftVoteCountAggregateOutputType | null
    _avg: AircraftVoteAvgAggregateOutputType | null
    _sum: AircraftVoteSumAggregateOutputType | null
    _min: AircraftVoteMinAggregateOutputType | null
    _max: AircraftVoteMaxAggregateOutputType | null
  }

  export type AircraftVoteAvgAggregateOutputType = {
    votes: number | null
    daysOnList: number | null
    weeksInChart: number | null
    positionChange: number | null
    rank: number | null
  }

  export type AircraftVoteSumAggregateOutputType = {
    votes: number | null
    daysOnList: number | null
    weeksInChart: number | null
    positionChange: number | null
    rank: number | null
  }

  export type AircraftVoteMinAggregateOutputType = {
    id: string | null
    reportId: string | null
    aircraftId: string | null
    votes: number | null
    daysOnList: number | null
    weeksInChart: number | null
    positionChange: number | null
    rank: number | null
  }

  export type AircraftVoteMaxAggregateOutputType = {
    id: string | null
    reportId: string | null
    aircraftId: string | null
    votes: number | null
    daysOnList: number | null
    weeksInChart: number | null
    positionChange: number | null
    rank: number | null
  }

  export type AircraftVoteCountAggregateOutputType = {
    id: number
    reportId: number
    aircraftId: number
    votes: number
    daysOnList: number
    weeksInChart: number
    positionChange: number
    rank: number
    _all: number
  }


  export type AircraftVoteAvgAggregateInputType = {
    votes?: true
    daysOnList?: true
    weeksInChart?: true
    positionChange?: true
    rank?: true
  }

  export type AircraftVoteSumAggregateInputType = {
    votes?: true
    daysOnList?: true
    weeksInChart?: true
    positionChange?: true
    rank?: true
  }

  export type AircraftVoteMinAggregateInputType = {
    id?: true
    reportId?: true
    aircraftId?: true
    votes?: true
    daysOnList?: true
    weeksInChart?: true
    positionChange?: true
    rank?: true
  }

  export type AircraftVoteMaxAggregateInputType = {
    id?: true
    reportId?: true
    aircraftId?: true
    votes?: true
    daysOnList?: true
    weeksInChart?: true
    positionChange?: true
    rank?: true
  }

  export type AircraftVoteCountAggregateInputType = {
    id?: true
    reportId?: true
    aircraftId?: true
    votes?: true
    daysOnList?: true
    weeksInChart?: true
    positionChange?: true
    rank?: true
    _all?: true
  }

  export type AircraftVoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AircraftVote to aggregate.
     */
    where?: AircraftVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AircraftVotes to fetch.
     */
    orderBy?: AircraftVoteOrderByWithRelationInput | AircraftVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AircraftVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AircraftVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AircraftVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AircraftVotes
    **/
    _count?: true | AircraftVoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AircraftVoteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AircraftVoteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AircraftVoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AircraftVoteMaxAggregateInputType
  }

  export type GetAircraftVoteAggregateType<T extends AircraftVoteAggregateArgs> = {
        [P in keyof T & keyof AggregateAircraftVote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAircraftVote[P]>
      : GetScalarType<T[P], AggregateAircraftVote[P]>
  }




  export type AircraftVoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AircraftVoteWhereInput
    orderBy?: AircraftVoteOrderByWithAggregationInput | AircraftVoteOrderByWithAggregationInput[]
    by: AircraftVoteScalarFieldEnum[] | AircraftVoteScalarFieldEnum
    having?: AircraftVoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AircraftVoteCountAggregateInputType | true
    _avg?: AircraftVoteAvgAggregateInputType
    _sum?: AircraftVoteSumAggregateInputType
    _min?: AircraftVoteMinAggregateInputType
    _max?: AircraftVoteMaxAggregateInputType
  }

  export type AircraftVoteGroupByOutputType = {
    id: string
    reportId: string
    aircraftId: string
    votes: number
    daysOnList: number
    weeksInChart: number
    positionChange: number | null
    rank: number | null
    _count: AircraftVoteCountAggregateOutputType | null
    _avg: AircraftVoteAvgAggregateOutputType | null
    _sum: AircraftVoteSumAggregateOutputType | null
    _min: AircraftVoteMinAggregateOutputType | null
    _max: AircraftVoteMaxAggregateOutputType | null
  }

  type GetAircraftVoteGroupByPayload<T extends AircraftVoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AircraftVoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AircraftVoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AircraftVoteGroupByOutputType[P]>
            : GetScalarType<T[P], AircraftVoteGroupByOutputType[P]>
        }
      >
    >


  export type AircraftVoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    aircraftId?: boolean
    votes?: boolean
    daysOnList?: boolean
    weeksInChart?: boolean
    positionChange?: boolean
    rank?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    aircraft?: boolean | AircraftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aircraftVote"]>

  export type AircraftVoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    aircraftId?: boolean
    votes?: boolean
    daysOnList?: boolean
    weeksInChart?: boolean
    positionChange?: boolean
    rank?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    aircraft?: boolean | AircraftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aircraftVote"]>

  export type AircraftVoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    reportId?: boolean
    aircraftId?: boolean
    votes?: boolean
    daysOnList?: boolean
    weeksInChart?: boolean
    positionChange?: boolean
    rank?: boolean
    report?: boolean | ReportDefaultArgs<ExtArgs>
    aircraft?: boolean | AircraftDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aircraftVote"]>

  export type AircraftVoteSelectScalar = {
    id?: boolean
    reportId?: boolean
    aircraftId?: boolean
    votes?: boolean
    daysOnList?: boolean
    weeksInChart?: boolean
    positionChange?: boolean
    rank?: boolean
  }

  export type AircraftVoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "reportId" | "aircraftId" | "votes" | "daysOnList" | "weeksInChart" | "positionChange" | "rank", ExtArgs["result"]["aircraftVote"]>
  export type AircraftVoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    aircraft?: boolean | AircraftDefaultArgs<ExtArgs>
  }
  export type AircraftVoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    aircraft?: boolean | AircraftDefaultArgs<ExtArgs>
  }
  export type AircraftVoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    report?: boolean | ReportDefaultArgs<ExtArgs>
    aircraft?: boolean | AircraftDefaultArgs<ExtArgs>
  }

  export type $AircraftVotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AircraftVote"
    objects: {
      report: Prisma.$ReportPayload<ExtArgs>
      aircraft: Prisma.$AircraftPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      reportId: string
      aircraftId: string
      votes: number
      daysOnList: number
      weeksInChart: number
      positionChange: number | null
      rank: number | null
    }, ExtArgs["result"]["aircraftVote"]>
    composites: {}
  }

  type AircraftVoteGetPayload<S extends boolean | null | undefined | AircraftVoteDefaultArgs> = $Result.GetResult<Prisma.$AircraftVotePayload, S>

  type AircraftVoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AircraftVoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AircraftVoteCountAggregateInputType | true
    }

  export interface AircraftVoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AircraftVote'], meta: { name: 'AircraftVote' } }
    /**
     * Find zero or one AircraftVote that matches the filter.
     * @param {AircraftVoteFindUniqueArgs} args - Arguments to find a AircraftVote
     * @example
     * // Get one AircraftVote
     * const aircraftVote = await prisma.aircraftVote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AircraftVoteFindUniqueArgs>(args: SelectSubset<T, AircraftVoteFindUniqueArgs<ExtArgs>>): Prisma__AircraftVoteClient<$Result.GetResult<Prisma.$AircraftVotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AircraftVote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AircraftVoteFindUniqueOrThrowArgs} args - Arguments to find a AircraftVote
     * @example
     * // Get one AircraftVote
     * const aircraftVote = await prisma.aircraftVote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AircraftVoteFindUniqueOrThrowArgs>(args: SelectSubset<T, AircraftVoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AircraftVoteClient<$Result.GetResult<Prisma.$AircraftVotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AircraftVote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftVoteFindFirstArgs} args - Arguments to find a AircraftVote
     * @example
     * // Get one AircraftVote
     * const aircraftVote = await prisma.aircraftVote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AircraftVoteFindFirstArgs>(args?: SelectSubset<T, AircraftVoteFindFirstArgs<ExtArgs>>): Prisma__AircraftVoteClient<$Result.GetResult<Prisma.$AircraftVotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AircraftVote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftVoteFindFirstOrThrowArgs} args - Arguments to find a AircraftVote
     * @example
     * // Get one AircraftVote
     * const aircraftVote = await prisma.aircraftVote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AircraftVoteFindFirstOrThrowArgs>(args?: SelectSubset<T, AircraftVoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__AircraftVoteClient<$Result.GetResult<Prisma.$AircraftVotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AircraftVotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftVoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AircraftVotes
     * const aircraftVotes = await prisma.aircraftVote.findMany()
     * 
     * // Get first 10 AircraftVotes
     * const aircraftVotes = await prisma.aircraftVote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aircraftVoteWithIdOnly = await prisma.aircraftVote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AircraftVoteFindManyArgs>(args?: SelectSubset<T, AircraftVoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AircraftVotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AircraftVote.
     * @param {AircraftVoteCreateArgs} args - Arguments to create a AircraftVote.
     * @example
     * // Create one AircraftVote
     * const AircraftVote = await prisma.aircraftVote.create({
     *   data: {
     *     // ... data to create a AircraftVote
     *   }
     * })
     * 
     */
    create<T extends AircraftVoteCreateArgs>(args: SelectSubset<T, AircraftVoteCreateArgs<ExtArgs>>): Prisma__AircraftVoteClient<$Result.GetResult<Prisma.$AircraftVotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AircraftVotes.
     * @param {AircraftVoteCreateManyArgs} args - Arguments to create many AircraftVotes.
     * @example
     * // Create many AircraftVotes
     * const aircraftVote = await prisma.aircraftVote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AircraftVoteCreateManyArgs>(args?: SelectSubset<T, AircraftVoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AircraftVotes and returns the data saved in the database.
     * @param {AircraftVoteCreateManyAndReturnArgs} args - Arguments to create many AircraftVotes.
     * @example
     * // Create many AircraftVotes
     * const aircraftVote = await prisma.aircraftVote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AircraftVotes and only return the `id`
     * const aircraftVoteWithIdOnly = await prisma.aircraftVote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AircraftVoteCreateManyAndReturnArgs>(args?: SelectSubset<T, AircraftVoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AircraftVotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AircraftVote.
     * @param {AircraftVoteDeleteArgs} args - Arguments to delete one AircraftVote.
     * @example
     * // Delete one AircraftVote
     * const AircraftVote = await prisma.aircraftVote.delete({
     *   where: {
     *     // ... filter to delete one AircraftVote
     *   }
     * })
     * 
     */
    delete<T extends AircraftVoteDeleteArgs>(args: SelectSubset<T, AircraftVoteDeleteArgs<ExtArgs>>): Prisma__AircraftVoteClient<$Result.GetResult<Prisma.$AircraftVotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AircraftVote.
     * @param {AircraftVoteUpdateArgs} args - Arguments to update one AircraftVote.
     * @example
     * // Update one AircraftVote
     * const aircraftVote = await prisma.aircraftVote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AircraftVoteUpdateArgs>(args: SelectSubset<T, AircraftVoteUpdateArgs<ExtArgs>>): Prisma__AircraftVoteClient<$Result.GetResult<Prisma.$AircraftVotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AircraftVotes.
     * @param {AircraftVoteDeleteManyArgs} args - Arguments to filter AircraftVotes to delete.
     * @example
     * // Delete a few AircraftVotes
     * const { count } = await prisma.aircraftVote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AircraftVoteDeleteManyArgs>(args?: SelectSubset<T, AircraftVoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AircraftVotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftVoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AircraftVotes
     * const aircraftVote = await prisma.aircraftVote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AircraftVoteUpdateManyArgs>(args: SelectSubset<T, AircraftVoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AircraftVotes and returns the data updated in the database.
     * @param {AircraftVoteUpdateManyAndReturnArgs} args - Arguments to update many AircraftVotes.
     * @example
     * // Update many AircraftVotes
     * const aircraftVote = await prisma.aircraftVote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AircraftVotes and only return the `id`
     * const aircraftVoteWithIdOnly = await prisma.aircraftVote.updateManyAndReturn({
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
    updateManyAndReturn<T extends AircraftVoteUpdateManyAndReturnArgs>(args: SelectSubset<T, AircraftVoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AircraftVotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AircraftVote.
     * @param {AircraftVoteUpsertArgs} args - Arguments to update or create a AircraftVote.
     * @example
     * // Update or create a AircraftVote
     * const aircraftVote = await prisma.aircraftVote.upsert({
     *   create: {
     *     // ... data to create a AircraftVote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AircraftVote we want to update
     *   }
     * })
     */
    upsert<T extends AircraftVoteUpsertArgs>(args: SelectSubset<T, AircraftVoteUpsertArgs<ExtArgs>>): Prisma__AircraftVoteClient<$Result.GetResult<Prisma.$AircraftVotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AircraftVotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftVoteCountArgs} args - Arguments to filter AircraftVotes to count.
     * @example
     * // Count the number of AircraftVotes
     * const count = await prisma.aircraftVote.count({
     *   where: {
     *     // ... the filter for the AircraftVotes we want to count
     *   }
     * })
    **/
    count<T extends AircraftVoteCountArgs>(
      args?: Subset<T, AircraftVoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AircraftVoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AircraftVote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftVoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AircraftVoteAggregateArgs>(args: Subset<T, AircraftVoteAggregateArgs>): Prisma.PrismaPromise<GetAircraftVoteAggregateType<T>>

    /**
     * Group by AircraftVote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AircraftVoteGroupByArgs} args - Group by arguments.
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
      T extends AircraftVoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AircraftVoteGroupByArgs['orderBy'] }
        : { orderBy?: AircraftVoteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AircraftVoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAircraftVoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AircraftVote model
   */
  readonly fields: AircraftVoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AircraftVote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AircraftVoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    report<T extends ReportDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ReportDefaultArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    aircraft<T extends AircraftDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AircraftDefaultArgs<ExtArgs>>): Prisma__AircraftClient<$Result.GetResult<Prisma.$AircraftPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AircraftVote model
   */
  interface AircraftVoteFieldRefs {
    readonly id: FieldRef<"AircraftVote", 'String'>
    readonly reportId: FieldRef<"AircraftVote", 'String'>
    readonly aircraftId: FieldRef<"AircraftVote", 'String'>
    readonly votes: FieldRef<"AircraftVote", 'Int'>
    readonly daysOnList: FieldRef<"AircraftVote", 'Int'>
    readonly weeksInChart: FieldRef<"AircraftVote", 'Int'>
    readonly positionChange: FieldRef<"AircraftVote", 'Int'>
    readonly rank: FieldRef<"AircraftVote", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AircraftVote findUnique
   */
  export type AircraftVoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftVote
     */
    select?: AircraftVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AircraftVote
     */
    omit?: AircraftVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftVoteInclude<ExtArgs> | null
    /**
     * Filter, which AircraftVote to fetch.
     */
    where: AircraftVoteWhereUniqueInput
  }

  /**
   * AircraftVote findUniqueOrThrow
   */
  export type AircraftVoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftVote
     */
    select?: AircraftVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AircraftVote
     */
    omit?: AircraftVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftVoteInclude<ExtArgs> | null
    /**
     * Filter, which AircraftVote to fetch.
     */
    where: AircraftVoteWhereUniqueInput
  }

  /**
   * AircraftVote findFirst
   */
  export type AircraftVoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftVote
     */
    select?: AircraftVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AircraftVote
     */
    omit?: AircraftVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftVoteInclude<ExtArgs> | null
    /**
     * Filter, which AircraftVote to fetch.
     */
    where?: AircraftVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AircraftVotes to fetch.
     */
    orderBy?: AircraftVoteOrderByWithRelationInput | AircraftVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AircraftVotes.
     */
    cursor?: AircraftVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AircraftVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AircraftVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AircraftVotes.
     */
    distinct?: AircraftVoteScalarFieldEnum | AircraftVoteScalarFieldEnum[]
  }

  /**
   * AircraftVote findFirstOrThrow
   */
  export type AircraftVoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftVote
     */
    select?: AircraftVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AircraftVote
     */
    omit?: AircraftVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftVoteInclude<ExtArgs> | null
    /**
     * Filter, which AircraftVote to fetch.
     */
    where?: AircraftVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AircraftVotes to fetch.
     */
    orderBy?: AircraftVoteOrderByWithRelationInput | AircraftVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AircraftVotes.
     */
    cursor?: AircraftVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AircraftVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AircraftVotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AircraftVotes.
     */
    distinct?: AircraftVoteScalarFieldEnum | AircraftVoteScalarFieldEnum[]
  }

  /**
   * AircraftVote findMany
   */
  export type AircraftVoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftVote
     */
    select?: AircraftVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AircraftVote
     */
    omit?: AircraftVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftVoteInclude<ExtArgs> | null
    /**
     * Filter, which AircraftVotes to fetch.
     */
    where?: AircraftVoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AircraftVotes to fetch.
     */
    orderBy?: AircraftVoteOrderByWithRelationInput | AircraftVoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AircraftVotes.
     */
    cursor?: AircraftVoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AircraftVotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AircraftVotes.
     */
    skip?: number
    distinct?: AircraftVoteScalarFieldEnum | AircraftVoteScalarFieldEnum[]
  }

  /**
   * AircraftVote create
   */
  export type AircraftVoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftVote
     */
    select?: AircraftVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AircraftVote
     */
    omit?: AircraftVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftVoteInclude<ExtArgs> | null
    /**
     * The data needed to create a AircraftVote.
     */
    data: XOR<AircraftVoteCreateInput, AircraftVoteUncheckedCreateInput>
  }

  /**
   * AircraftVote createMany
   */
  export type AircraftVoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AircraftVotes.
     */
    data: AircraftVoteCreateManyInput | AircraftVoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AircraftVote createManyAndReturn
   */
  export type AircraftVoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftVote
     */
    select?: AircraftVoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AircraftVote
     */
    omit?: AircraftVoteOmit<ExtArgs> | null
    /**
     * The data used to create many AircraftVotes.
     */
    data: AircraftVoteCreateManyInput | AircraftVoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftVoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AircraftVote update
   */
  export type AircraftVoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftVote
     */
    select?: AircraftVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AircraftVote
     */
    omit?: AircraftVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftVoteInclude<ExtArgs> | null
    /**
     * The data needed to update a AircraftVote.
     */
    data: XOR<AircraftVoteUpdateInput, AircraftVoteUncheckedUpdateInput>
    /**
     * Choose, which AircraftVote to update.
     */
    where: AircraftVoteWhereUniqueInput
  }

  /**
   * AircraftVote updateMany
   */
  export type AircraftVoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AircraftVotes.
     */
    data: XOR<AircraftVoteUpdateManyMutationInput, AircraftVoteUncheckedUpdateManyInput>
    /**
     * Filter which AircraftVotes to update
     */
    where?: AircraftVoteWhereInput
    /**
     * Limit how many AircraftVotes to update.
     */
    limit?: number
  }

  /**
   * AircraftVote updateManyAndReturn
   */
  export type AircraftVoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftVote
     */
    select?: AircraftVoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AircraftVote
     */
    omit?: AircraftVoteOmit<ExtArgs> | null
    /**
     * The data used to update AircraftVotes.
     */
    data: XOR<AircraftVoteUpdateManyMutationInput, AircraftVoteUncheckedUpdateManyInput>
    /**
     * Filter which AircraftVotes to update
     */
    where?: AircraftVoteWhereInput
    /**
     * Limit how many AircraftVotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftVoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AircraftVote upsert
   */
  export type AircraftVoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftVote
     */
    select?: AircraftVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AircraftVote
     */
    omit?: AircraftVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftVoteInclude<ExtArgs> | null
    /**
     * The filter to search for the AircraftVote to update in case it exists.
     */
    where: AircraftVoteWhereUniqueInput
    /**
     * In case the AircraftVote found by the `where` argument doesn't exist, create a new AircraftVote with this data.
     */
    create: XOR<AircraftVoteCreateInput, AircraftVoteUncheckedCreateInput>
    /**
     * In case the AircraftVote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AircraftVoteUpdateInput, AircraftVoteUncheckedUpdateInput>
  }

  /**
   * AircraftVote delete
   */
  export type AircraftVoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftVote
     */
    select?: AircraftVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AircraftVote
     */
    omit?: AircraftVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftVoteInclude<ExtArgs> | null
    /**
     * Filter which AircraftVote to delete.
     */
    where: AircraftVoteWhereUniqueInput
  }

  /**
   * AircraftVote deleteMany
   */
  export type AircraftVoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AircraftVotes to delete
     */
    where?: AircraftVoteWhereInput
    /**
     * Limit how many AircraftVotes to delete.
     */
    limit?: number
  }

  /**
   * AircraftVote without action
   */
  export type AircraftVoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AircraftVote
     */
    select?: AircraftVoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AircraftVote
     */
    omit?: AircraftVoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AircraftVoteInclude<ExtArgs> | null
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


  export const AircraftScalarFieldEnum: {
    id: 'id',
    name: 'name',
    manufacturer: 'manufacturer',
    category: 'category',
    payware: 'payware',
    msrp: 'msrp',
    buyUrl: 'buyUrl',
    previewImageUrl: 'previewImageUrl',
    description: 'description',
    tags: 'tags',
    dateAdded: 'dateAdded',
    msfs2020Compatibility: 'msfs2020Compatibility',
    msfs2024Compatibility: 'msfs2024Compatibility'
  };

  export type AircraftScalarFieldEnum = (typeof AircraftScalarFieldEnum)[keyof typeof AircraftScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    type: 'type',
    year: 'year',
    month: 'month',
    title: 'title',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const AircraftVoteScalarFieldEnum: {
    id: 'id',
    reportId: 'reportId',
    aircraftId: 'aircraftId',
    votes: 'votes',
    daysOnList: 'daysOnList',
    weeksInChart: 'weeksInChart',
    positionChange: 'positionChange',
    rank: 'rank'
  };

  export type AircraftVoteScalarFieldEnum = (typeof AircraftVoteScalarFieldEnum)[keyof typeof AircraftVoteScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'CompatibilityStatus'
   */
  export type EnumCompatibilityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompatibilityStatus'>
    


  /**
   * Reference to a field of type 'CompatibilityStatus[]'
   */
  export type ListEnumCompatibilityStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CompatibilityStatus[]'>
    


  /**
   * Reference to a field of type 'ReportType'
   */
  export type EnumReportTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportType'>
    


  /**
   * Reference to a field of type 'ReportType[]'
   */
  export type ListEnumReportTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportType[]'>
    


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


  export type AircraftWhereInput = {
    AND?: AircraftWhereInput | AircraftWhereInput[]
    OR?: AircraftWhereInput[]
    NOT?: AircraftWhereInput | AircraftWhereInput[]
    id?: StringFilter<"Aircraft"> | string
    name?: StringFilter<"Aircraft"> | string
    manufacturer?: StringFilter<"Aircraft"> | string
    category?: StringFilter<"Aircraft"> | string
    payware?: StringFilter<"Aircraft"> | string
    msrp?: IntNullableFilter<"Aircraft"> | number | null
    buyUrl?: StringFilter<"Aircraft"> | string
    previewImageUrl?: StringNullableFilter<"Aircraft"> | string | null
    description?: StringNullableFilter<"Aircraft"> | string | null
    tags?: StringNullableListFilter<"Aircraft">
    dateAdded?: DateTimeNullableFilter<"Aircraft"> | Date | string | null
    msfs2020Compatibility?: EnumCompatibilityStatusNullableFilter<"Aircraft"> | $Enums.CompatibilityStatus | null
    msfs2024Compatibility?: EnumCompatibilityStatusNullableFilter<"Aircraft"> | $Enums.CompatibilityStatus | null
    votes?: AircraftVoteListRelationFilter
  }

  export type AircraftOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    manufacturer?: SortOrder
    category?: SortOrder
    payware?: SortOrder
    msrp?: SortOrderInput | SortOrder
    buyUrl?: SortOrder
    previewImageUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    tags?: SortOrder
    dateAdded?: SortOrderInput | SortOrder
    msfs2020Compatibility?: SortOrderInput | SortOrder
    msfs2024Compatibility?: SortOrderInput | SortOrder
    votes?: AircraftVoteOrderByRelationAggregateInput
  }

  export type AircraftWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AircraftWhereInput | AircraftWhereInput[]
    OR?: AircraftWhereInput[]
    NOT?: AircraftWhereInput | AircraftWhereInput[]
    name?: StringFilter<"Aircraft"> | string
    manufacturer?: StringFilter<"Aircraft"> | string
    category?: StringFilter<"Aircraft"> | string
    payware?: StringFilter<"Aircraft"> | string
    msrp?: IntNullableFilter<"Aircraft"> | number | null
    buyUrl?: StringFilter<"Aircraft"> | string
    previewImageUrl?: StringNullableFilter<"Aircraft"> | string | null
    description?: StringNullableFilter<"Aircraft"> | string | null
    tags?: StringNullableListFilter<"Aircraft">
    dateAdded?: DateTimeNullableFilter<"Aircraft"> | Date | string | null
    msfs2020Compatibility?: EnumCompatibilityStatusNullableFilter<"Aircraft"> | $Enums.CompatibilityStatus | null
    msfs2024Compatibility?: EnumCompatibilityStatusNullableFilter<"Aircraft"> | $Enums.CompatibilityStatus | null
    votes?: AircraftVoteListRelationFilter
  }, "id">

  export type AircraftOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    manufacturer?: SortOrder
    category?: SortOrder
    payware?: SortOrder
    msrp?: SortOrderInput | SortOrder
    buyUrl?: SortOrder
    previewImageUrl?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    tags?: SortOrder
    dateAdded?: SortOrderInput | SortOrder
    msfs2020Compatibility?: SortOrderInput | SortOrder
    msfs2024Compatibility?: SortOrderInput | SortOrder
    _count?: AircraftCountOrderByAggregateInput
    _avg?: AircraftAvgOrderByAggregateInput
    _max?: AircraftMaxOrderByAggregateInput
    _min?: AircraftMinOrderByAggregateInput
    _sum?: AircraftSumOrderByAggregateInput
  }

  export type AircraftScalarWhereWithAggregatesInput = {
    AND?: AircraftScalarWhereWithAggregatesInput | AircraftScalarWhereWithAggregatesInput[]
    OR?: AircraftScalarWhereWithAggregatesInput[]
    NOT?: AircraftScalarWhereWithAggregatesInput | AircraftScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Aircraft"> | string
    name?: StringWithAggregatesFilter<"Aircraft"> | string
    manufacturer?: StringWithAggregatesFilter<"Aircraft"> | string
    category?: StringWithAggregatesFilter<"Aircraft"> | string
    payware?: StringWithAggregatesFilter<"Aircraft"> | string
    msrp?: IntNullableWithAggregatesFilter<"Aircraft"> | number | null
    buyUrl?: StringWithAggregatesFilter<"Aircraft"> | string
    previewImageUrl?: StringNullableWithAggregatesFilter<"Aircraft"> | string | null
    description?: StringNullableWithAggregatesFilter<"Aircraft"> | string | null
    tags?: StringNullableListFilter<"Aircraft">
    dateAdded?: DateTimeNullableWithAggregatesFilter<"Aircraft"> | Date | string | null
    msfs2020Compatibility?: EnumCompatibilityStatusNullableWithAggregatesFilter<"Aircraft"> | $Enums.CompatibilityStatus | null
    msfs2024Compatibility?: EnumCompatibilityStatusNullableWithAggregatesFilter<"Aircraft"> | $Enums.CompatibilityStatus | null
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    id?: StringFilter<"Report"> | string
    type?: EnumReportTypeFilter<"Report"> | $Enums.ReportType
    year?: IntFilter<"Report"> | number
    month?: IntNullableFilter<"Report"> | number | null
    title?: StringFilter<"Report"> | string
    description?: StringNullableFilter<"Report"> | string | null
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
    votes?: AircraftVoteListRelationFilter
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    year?: SortOrder
    month?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    votes?: AircraftVoteOrderByRelationAggregateInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    type?: EnumReportTypeFilter<"Report"> | $Enums.ReportType
    year?: IntFilter<"Report"> | number
    month?: IntNullableFilter<"Report"> | number | null
    title?: StringFilter<"Report"> | string
    description?: StringNullableFilter<"Report"> | string | null
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
    votes?: AircraftVoteListRelationFilter
  }, "id">

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    year?: SortOrder
    month?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _avg?: ReportAvgOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
    _sum?: ReportSumOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Report"> | string
    type?: EnumReportTypeWithAggregatesFilter<"Report"> | $Enums.ReportType
    year?: IntWithAggregatesFilter<"Report"> | number
    month?: IntNullableWithAggregatesFilter<"Report"> | number | null
    title?: StringWithAggregatesFilter<"Report"> | string
    description?: StringNullableWithAggregatesFilter<"Report"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
  }

  export type AircraftVoteWhereInput = {
    AND?: AircraftVoteWhereInput | AircraftVoteWhereInput[]
    OR?: AircraftVoteWhereInput[]
    NOT?: AircraftVoteWhereInput | AircraftVoteWhereInput[]
    id?: StringFilter<"AircraftVote"> | string
    reportId?: StringFilter<"AircraftVote"> | string
    aircraftId?: StringFilter<"AircraftVote"> | string
    votes?: IntFilter<"AircraftVote"> | number
    daysOnList?: IntFilter<"AircraftVote"> | number
    weeksInChart?: IntFilter<"AircraftVote"> | number
    positionChange?: IntNullableFilter<"AircraftVote"> | number | null
    rank?: IntNullableFilter<"AircraftVote"> | number | null
    report?: XOR<ReportScalarRelationFilter, ReportWhereInput>
    aircraft?: XOR<AircraftScalarRelationFilter, AircraftWhereInput>
  }

  export type AircraftVoteOrderByWithRelationInput = {
    id?: SortOrder
    reportId?: SortOrder
    aircraftId?: SortOrder
    votes?: SortOrder
    daysOnList?: SortOrder
    weeksInChart?: SortOrder
    positionChange?: SortOrderInput | SortOrder
    rank?: SortOrderInput | SortOrder
    report?: ReportOrderByWithRelationInput
    aircraft?: AircraftOrderByWithRelationInput
  }

  export type AircraftVoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AircraftVoteWhereInput | AircraftVoteWhereInput[]
    OR?: AircraftVoteWhereInput[]
    NOT?: AircraftVoteWhereInput | AircraftVoteWhereInput[]
    reportId?: StringFilter<"AircraftVote"> | string
    aircraftId?: StringFilter<"AircraftVote"> | string
    votes?: IntFilter<"AircraftVote"> | number
    daysOnList?: IntFilter<"AircraftVote"> | number
    weeksInChart?: IntFilter<"AircraftVote"> | number
    positionChange?: IntNullableFilter<"AircraftVote"> | number | null
    rank?: IntNullableFilter<"AircraftVote"> | number | null
    report?: XOR<ReportScalarRelationFilter, ReportWhereInput>
    aircraft?: XOR<AircraftScalarRelationFilter, AircraftWhereInput>
  }, "id">

  export type AircraftVoteOrderByWithAggregationInput = {
    id?: SortOrder
    reportId?: SortOrder
    aircraftId?: SortOrder
    votes?: SortOrder
    daysOnList?: SortOrder
    weeksInChart?: SortOrder
    positionChange?: SortOrderInput | SortOrder
    rank?: SortOrderInput | SortOrder
    _count?: AircraftVoteCountOrderByAggregateInput
    _avg?: AircraftVoteAvgOrderByAggregateInput
    _max?: AircraftVoteMaxOrderByAggregateInput
    _min?: AircraftVoteMinOrderByAggregateInput
    _sum?: AircraftVoteSumOrderByAggregateInput
  }

  export type AircraftVoteScalarWhereWithAggregatesInput = {
    AND?: AircraftVoteScalarWhereWithAggregatesInput | AircraftVoteScalarWhereWithAggregatesInput[]
    OR?: AircraftVoteScalarWhereWithAggregatesInput[]
    NOT?: AircraftVoteScalarWhereWithAggregatesInput | AircraftVoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AircraftVote"> | string
    reportId?: StringWithAggregatesFilter<"AircraftVote"> | string
    aircraftId?: StringWithAggregatesFilter<"AircraftVote"> | string
    votes?: IntWithAggregatesFilter<"AircraftVote"> | number
    daysOnList?: IntWithAggregatesFilter<"AircraftVote"> | number
    weeksInChart?: IntWithAggregatesFilter<"AircraftVote"> | number
    positionChange?: IntNullableWithAggregatesFilter<"AircraftVote"> | number | null
    rank?: IntNullableWithAggregatesFilter<"AircraftVote"> | number | null
  }

  export type AircraftCreateInput = {
    id?: string
    name: string
    manufacturer: string
    category: string
    payware: string
    msrp?: number | null
    buyUrl: string
    previewImageUrl?: string | null
    description?: string | null
    tags?: AircraftCreatetagsInput | string[]
    dateAdded?: Date | string | null
    msfs2020Compatibility?: $Enums.CompatibilityStatus | null
    msfs2024Compatibility?: $Enums.CompatibilityStatus | null
    votes?: AircraftVoteCreateNestedManyWithoutAircraftInput
  }

  export type AircraftUncheckedCreateInput = {
    id?: string
    name: string
    manufacturer: string
    category: string
    payware: string
    msrp?: number | null
    buyUrl: string
    previewImageUrl?: string | null
    description?: string | null
    tags?: AircraftCreatetagsInput | string[]
    dateAdded?: Date | string | null
    msfs2020Compatibility?: $Enums.CompatibilityStatus | null
    msfs2024Compatibility?: $Enums.CompatibilityStatus | null
    votes?: AircraftVoteUncheckedCreateNestedManyWithoutAircraftInput
  }

  export type AircraftUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    payware?: StringFieldUpdateOperationsInput | string
    msrp?: NullableIntFieldUpdateOperationsInput | number | null
    buyUrl?: StringFieldUpdateOperationsInput | string
    previewImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: AircraftUpdatetagsInput | string[]
    dateAdded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    msfs2020Compatibility?: NullableEnumCompatibilityStatusFieldUpdateOperationsInput | $Enums.CompatibilityStatus | null
    msfs2024Compatibility?: NullableEnumCompatibilityStatusFieldUpdateOperationsInput | $Enums.CompatibilityStatus | null
    votes?: AircraftVoteUpdateManyWithoutAircraftNestedInput
  }

  export type AircraftUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    payware?: StringFieldUpdateOperationsInput | string
    msrp?: NullableIntFieldUpdateOperationsInput | number | null
    buyUrl?: StringFieldUpdateOperationsInput | string
    previewImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: AircraftUpdatetagsInput | string[]
    dateAdded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    msfs2020Compatibility?: NullableEnumCompatibilityStatusFieldUpdateOperationsInput | $Enums.CompatibilityStatus | null
    msfs2024Compatibility?: NullableEnumCompatibilityStatusFieldUpdateOperationsInput | $Enums.CompatibilityStatus | null
    votes?: AircraftVoteUncheckedUpdateManyWithoutAircraftNestedInput
  }

  export type AircraftCreateManyInput = {
    id?: string
    name: string
    manufacturer: string
    category: string
    payware: string
    msrp?: number | null
    buyUrl: string
    previewImageUrl?: string | null
    description?: string | null
    tags?: AircraftCreatetagsInput | string[]
    dateAdded?: Date | string | null
    msfs2020Compatibility?: $Enums.CompatibilityStatus | null
    msfs2024Compatibility?: $Enums.CompatibilityStatus | null
  }

  export type AircraftUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    payware?: StringFieldUpdateOperationsInput | string
    msrp?: NullableIntFieldUpdateOperationsInput | number | null
    buyUrl?: StringFieldUpdateOperationsInput | string
    previewImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: AircraftUpdatetagsInput | string[]
    dateAdded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    msfs2020Compatibility?: NullableEnumCompatibilityStatusFieldUpdateOperationsInput | $Enums.CompatibilityStatus | null
    msfs2024Compatibility?: NullableEnumCompatibilityStatusFieldUpdateOperationsInput | $Enums.CompatibilityStatus | null
  }

  export type AircraftUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    payware?: StringFieldUpdateOperationsInput | string
    msrp?: NullableIntFieldUpdateOperationsInput | number | null
    buyUrl?: StringFieldUpdateOperationsInput | string
    previewImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: AircraftUpdatetagsInput | string[]
    dateAdded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    msfs2020Compatibility?: NullableEnumCompatibilityStatusFieldUpdateOperationsInput | $Enums.CompatibilityStatus | null
    msfs2024Compatibility?: NullableEnumCompatibilityStatusFieldUpdateOperationsInput | $Enums.CompatibilityStatus | null
  }

  export type ReportCreateInput = {
    id?: string
    type: $Enums.ReportType
    year: number
    month?: number | null
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    votes?: AircraftVoteCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateInput = {
    id?: string
    type: $Enums.ReportType
    year: number
    month?: number | null
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    votes?: AircraftVoteUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumReportTypeFieldUpdateOperationsInput | $Enums.ReportType
    year?: IntFieldUpdateOperationsInput | number
    month?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: AircraftVoteUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumReportTypeFieldUpdateOperationsInput | $Enums.ReportType
    year?: IntFieldUpdateOperationsInput | number
    month?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    votes?: AircraftVoteUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportCreateManyInput = {
    id?: string
    type: $Enums.ReportType
    year: number
    month?: number | null
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumReportTypeFieldUpdateOperationsInput | $Enums.ReportType
    year?: IntFieldUpdateOperationsInput | number
    month?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumReportTypeFieldUpdateOperationsInput | $Enums.ReportType
    year?: IntFieldUpdateOperationsInput | number
    month?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AircraftVoteCreateInput = {
    id?: string
    votes: number
    daysOnList: number
    weeksInChart: number
    positionChange?: number | null
    rank?: number | null
    report: ReportCreateNestedOneWithoutVotesInput
    aircraft: AircraftCreateNestedOneWithoutVotesInput
  }

  export type AircraftVoteUncheckedCreateInput = {
    id?: string
    reportId: string
    aircraftId: string
    votes: number
    daysOnList: number
    weeksInChart: number
    positionChange?: number | null
    rank?: number | null
  }

  export type AircraftVoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    votes?: IntFieldUpdateOperationsInput | number
    daysOnList?: IntFieldUpdateOperationsInput | number
    weeksInChart?: IntFieldUpdateOperationsInput | number
    positionChange?: NullableIntFieldUpdateOperationsInput | number | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    report?: ReportUpdateOneRequiredWithoutVotesNestedInput
    aircraft?: AircraftUpdateOneRequiredWithoutVotesNestedInput
  }

  export type AircraftVoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    aircraftId?: StringFieldUpdateOperationsInput | string
    votes?: IntFieldUpdateOperationsInput | number
    daysOnList?: IntFieldUpdateOperationsInput | number
    weeksInChart?: IntFieldUpdateOperationsInput | number
    positionChange?: NullableIntFieldUpdateOperationsInput | number | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AircraftVoteCreateManyInput = {
    id?: string
    reportId: string
    aircraftId: string
    votes: number
    daysOnList: number
    weeksInChart: number
    positionChange?: number | null
    rank?: number | null
  }

  export type AircraftVoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    votes?: IntFieldUpdateOperationsInput | number
    daysOnList?: IntFieldUpdateOperationsInput | number
    weeksInChart?: IntFieldUpdateOperationsInput | number
    positionChange?: NullableIntFieldUpdateOperationsInput | number | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AircraftVoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    aircraftId?: StringFieldUpdateOperationsInput | string
    votes?: IntFieldUpdateOperationsInput | number
    daysOnList?: IntFieldUpdateOperationsInput | number
    weeksInChart?: IntFieldUpdateOperationsInput | number
    positionChange?: NullableIntFieldUpdateOperationsInput | number | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
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

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
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

  export type EnumCompatibilityStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CompatibilityStatus | EnumCompatibilityStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.CompatibilityStatus[] | ListEnumCompatibilityStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CompatibilityStatus[] | ListEnumCompatibilityStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCompatibilityStatusNullableFilter<$PrismaModel> | $Enums.CompatibilityStatus | null
  }

  export type AircraftVoteListRelationFilter = {
    every?: AircraftVoteWhereInput
    some?: AircraftVoteWhereInput
    none?: AircraftVoteWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AircraftVoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AircraftCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    manufacturer?: SortOrder
    category?: SortOrder
    payware?: SortOrder
    msrp?: SortOrder
    buyUrl?: SortOrder
    previewImageUrl?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    dateAdded?: SortOrder
    msfs2020Compatibility?: SortOrder
    msfs2024Compatibility?: SortOrder
  }

  export type AircraftAvgOrderByAggregateInput = {
    msrp?: SortOrder
  }

  export type AircraftMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    manufacturer?: SortOrder
    category?: SortOrder
    payware?: SortOrder
    msrp?: SortOrder
    buyUrl?: SortOrder
    previewImageUrl?: SortOrder
    description?: SortOrder
    dateAdded?: SortOrder
    msfs2020Compatibility?: SortOrder
    msfs2024Compatibility?: SortOrder
  }

  export type AircraftMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    manufacturer?: SortOrder
    category?: SortOrder
    payware?: SortOrder
    msrp?: SortOrder
    buyUrl?: SortOrder
    previewImageUrl?: SortOrder
    description?: SortOrder
    dateAdded?: SortOrder
    msfs2020Compatibility?: SortOrder
    msfs2024Compatibility?: SortOrder
  }

  export type AircraftSumOrderByAggregateInput = {
    msrp?: SortOrder
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

  export type EnumCompatibilityStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompatibilityStatus | EnumCompatibilityStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.CompatibilityStatus[] | ListEnumCompatibilityStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CompatibilityStatus[] | ListEnumCompatibilityStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCompatibilityStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.CompatibilityStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCompatibilityStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumCompatibilityStatusNullableFilter<$PrismaModel>
  }

  export type EnumReportTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportType | EnumReportTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ReportType[] | ListEnumReportTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportType[] | ListEnumReportTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumReportTypeFilter<$PrismaModel> | $Enums.ReportType
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

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    year?: SortOrder
    month?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportAvgOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    year?: SortOrder
    month?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    year?: SortOrder
    month?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportSumOrderByAggregateInput = {
    year?: SortOrder
    month?: SortOrder
  }

  export type EnumReportTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportType | EnumReportTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ReportType[] | ListEnumReportTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportType[] | ListEnumReportTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumReportTypeWithAggregatesFilter<$PrismaModel> | $Enums.ReportType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportTypeFilter<$PrismaModel>
    _max?: NestedEnumReportTypeFilter<$PrismaModel>
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

  export type ReportScalarRelationFilter = {
    is?: ReportWhereInput
    isNot?: ReportWhereInput
  }

  export type AircraftScalarRelationFilter = {
    is?: AircraftWhereInput
    isNot?: AircraftWhereInput
  }

  export type AircraftVoteCountOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    aircraftId?: SortOrder
    votes?: SortOrder
    daysOnList?: SortOrder
    weeksInChart?: SortOrder
    positionChange?: SortOrder
    rank?: SortOrder
  }

  export type AircraftVoteAvgOrderByAggregateInput = {
    votes?: SortOrder
    daysOnList?: SortOrder
    weeksInChart?: SortOrder
    positionChange?: SortOrder
    rank?: SortOrder
  }

  export type AircraftVoteMaxOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    aircraftId?: SortOrder
    votes?: SortOrder
    daysOnList?: SortOrder
    weeksInChart?: SortOrder
    positionChange?: SortOrder
    rank?: SortOrder
  }

  export type AircraftVoteMinOrderByAggregateInput = {
    id?: SortOrder
    reportId?: SortOrder
    aircraftId?: SortOrder
    votes?: SortOrder
    daysOnList?: SortOrder
    weeksInChart?: SortOrder
    positionChange?: SortOrder
    rank?: SortOrder
  }

  export type AircraftVoteSumOrderByAggregateInput = {
    votes?: SortOrder
    daysOnList?: SortOrder
    weeksInChart?: SortOrder
    positionChange?: SortOrder
    rank?: SortOrder
  }

  export type AircraftCreatetagsInput = {
    set: string[]
  }

  export type AircraftVoteCreateNestedManyWithoutAircraftInput = {
    create?: XOR<AircraftVoteCreateWithoutAircraftInput, AircraftVoteUncheckedCreateWithoutAircraftInput> | AircraftVoteCreateWithoutAircraftInput[] | AircraftVoteUncheckedCreateWithoutAircraftInput[]
    connectOrCreate?: AircraftVoteCreateOrConnectWithoutAircraftInput | AircraftVoteCreateOrConnectWithoutAircraftInput[]
    createMany?: AircraftVoteCreateManyAircraftInputEnvelope
    connect?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
  }

  export type AircraftVoteUncheckedCreateNestedManyWithoutAircraftInput = {
    create?: XOR<AircraftVoteCreateWithoutAircraftInput, AircraftVoteUncheckedCreateWithoutAircraftInput> | AircraftVoteCreateWithoutAircraftInput[] | AircraftVoteUncheckedCreateWithoutAircraftInput[]
    connectOrCreate?: AircraftVoteCreateOrConnectWithoutAircraftInput | AircraftVoteCreateOrConnectWithoutAircraftInput[]
    createMany?: AircraftVoteCreateManyAircraftInputEnvelope
    connect?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type AircraftUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableEnumCompatibilityStatusFieldUpdateOperationsInput = {
    set?: $Enums.CompatibilityStatus | null
  }

  export type AircraftVoteUpdateManyWithoutAircraftNestedInput = {
    create?: XOR<AircraftVoteCreateWithoutAircraftInput, AircraftVoteUncheckedCreateWithoutAircraftInput> | AircraftVoteCreateWithoutAircraftInput[] | AircraftVoteUncheckedCreateWithoutAircraftInput[]
    connectOrCreate?: AircraftVoteCreateOrConnectWithoutAircraftInput | AircraftVoteCreateOrConnectWithoutAircraftInput[]
    upsert?: AircraftVoteUpsertWithWhereUniqueWithoutAircraftInput | AircraftVoteUpsertWithWhereUniqueWithoutAircraftInput[]
    createMany?: AircraftVoteCreateManyAircraftInputEnvelope
    set?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
    disconnect?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
    delete?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
    connect?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
    update?: AircraftVoteUpdateWithWhereUniqueWithoutAircraftInput | AircraftVoteUpdateWithWhereUniqueWithoutAircraftInput[]
    updateMany?: AircraftVoteUpdateManyWithWhereWithoutAircraftInput | AircraftVoteUpdateManyWithWhereWithoutAircraftInput[]
    deleteMany?: AircraftVoteScalarWhereInput | AircraftVoteScalarWhereInput[]
  }

  export type AircraftVoteUncheckedUpdateManyWithoutAircraftNestedInput = {
    create?: XOR<AircraftVoteCreateWithoutAircraftInput, AircraftVoteUncheckedCreateWithoutAircraftInput> | AircraftVoteCreateWithoutAircraftInput[] | AircraftVoteUncheckedCreateWithoutAircraftInput[]
    connectOrCreate?: AircraftVoteCreateOrConnectWithoutAircraftInput | AircraftVoteCreateOrConnectWithoutAircraftInput[]
    upsert?: AircraftVoteUpsertWithWhereUniqueWithoutAircraftInput | AircraftVoteUpsertWithWhereUniqueWithoutAircraftInput[]
    createMany?: AircraftVoteCreateManyAircraftInputEnvelope
    set?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
    disconnect?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
    delete?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
    connect?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
    update?: AircraftVoteUpdateWithWhereUniqueWithoutAircraftInput | AircraftVoteUpdateWithWhereUniqueWithoutAircraftInput[]
    updateMany?: AircraftVoteUpdateManyWithWhereWithoutAircraftInput | AircraftVoteUpdateManyWithWhereWithoutAircraftInput[]
    deleteMany?: AircraftVoteScalarWhereInput | AircraftVoteScalarWhereInput[]
  }

  export type AircraftVoteCreateNestedManyWithoutReportInput = {
    create?: XOR<AircraftVoteCreateWithoutReportInput, AircraftVoteUncheckedCreateWithoutReportInput> | AircraftVoteCreateWithoutReportInput[] | AircraftVoteUncheckedCreateWithoutReportInput[]
    connectOrCreate?: AircraftVoteCreateOrConnectWithoutReportInput | AircraftVoteCreateOrConnectWithoutReportInput[]
    createMany?: AircraftVoteCreateManyReportInputEnvelope
    connect?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
  }

  export type AircraftVoteUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<AircraftVoteCreateWithoutReportInput, AircraftVoteUncheckedCreateWithoutReportInput> | AircraftVoteCreateWithoutReportInput[] | AircraftVoteUncheckedCreateWithoutReportInput[]
    connectOrCreate?: AircraftVoteCreateOrConnectWithoutReportInput | AircraftVoteCreateOrConnectWithoutReportInput[]
    createMany?: AircraftVoteCreateManyReportInputEnvelope
    connect?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
  }

  export type EnumReportTypeFieldUpdateOperationsInput = {
    set?: $Enums.ReportType
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AircraftVoteUpdateManyWithoutReportNestedInput = {
    create?: XOR<AircraftVoteCreateWithoutReportInput, AircraftVoteUncheckedCreateWithoutReportInput> | AircraftVoteCreateWithoutReportInput[] | AircraftVoteUncheckedCreateWithoutReportInput[]
    connectOrCreate?: AircraftVoteCreateOrConnectWithoutReportInput | AircraftVoteCreateOrConnectWithoutReportInput[]
    upsert?: AircraftVoteUpsertWithWhereUniqueWithoutReportInput | AircraftVoteUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: AircraftVoteCreateManyReportInputEnvelope
    set?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
    disconnect?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
    delete?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
    connect?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
    update?: AircraftVoteUpdateWithWhereUniqueWithoutReportInput | AircraftVoteUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: AircraftVoteUpdateManyWithWhereWithoutReportInput | AircraftVoteUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: AircraftVoteScalarWhereInput | AircraftVoteScalarWhereInput[]
  }

  export type AircraftVoteUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<AircraftVoteCreateWithoutReportInput, AircraftVoteUncheckedCreateWithoutReportInput> | AircraftVoteCreateWithoutReportInput[] | AircraftVoteUncheckedCreateWithoutReportInput[]
    connectOrCreate?: AircraftVoteCreateOrConnectWithoutReportInput | AircraftVoteCreateOrConnectWithoutReportInput[]
    upsert?: AircraftVoteUpsertWithWhereUniqueWithoutReportInput | AircraftVoteUpsertWithWhereUniqueWithoutReportInput[]
    createMany?: AircraftVoteCreateManyReportInputEnvelope
    set?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
    disconnect?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
    delete?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
    connect?: AircraftVoteWhereUniqueInput | AircraftVoteWhereUniqueInput[]
    update?: AircraftVoteUpdateWithWhereUniqueWithoutReportInput | AircraftVoteUpdateWithWhereUniqueWithoutReportInput[]
    updateMany?: AircraftVoteUpdateManyWithWhereWithoutReportInput | AircraftVoteUpdateManyWithWhereWithoutReportInput[]
    deleteMany?: AircraftVoteScalarWhereInput | AircraftVoteScalarWhereInput[]
  }

  export type ReportCreateNestedOneWithoutVotesInput = {
    create?: XOR<ReportCreateWithoutVotesInput, ReportUncheckedCreateWithoutVotesInput>
    connectOrCreate?: ReportCreateOrConnectWithoutVotesInput
    connect?: ReportWhereUniqueInput
  }

  export type AircraftCreateNestedOneWithoutVotesInput = {
    create?: XOR<AircraftCreateWithoutVotesInput, AircraftUncheckedCreateWithoutVotesInput>
    connectOrCreate?: AircraftCreateOrConnectWithoutVotesInput
    connect?: AircraftWhereUniqueInput
  }

  export type ReportUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<ReportCreateWithoutVotesInput, ReportUncheckedCreateWithoutVotesInput>
    connectOrCreate?: ReportCreateOrConnectWithoutVotesInput
    upsert?: ReportUpsertWithoutVotesInput
    connect?: ReportWhereUniqueInput
    update?: XOR<XOR<ReportUpdateToOneWithWhereWithoutVotesInput, ReportUpdateWithoutVotesInput>, ReportUncheckedUpdateWithoutVotesInput>
  }

  export type AircraftUpdateOneRequiredWithoutVotesNestedInput = {
    create?: XOR<AircraftCreateWithoutVotesInput, AircraftUncheckedCreateWithoutVotesInput>
    connectOrCreate?: AircraftCreateOrConnectWithoutVotesInput
    upsert?: AircraftUpsertWithoutVotesInput
    connect?: AircraftWhereUniqueInput
    update?: XOR<XOR<AircraftUpdateToOneWithWhereWithoutVotesInput, AircraftUpdateWithoutVotesInput>, AircraftUncheckedUpdateWithoutVotesInput>
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

  export type NestedEnumCompatibilityStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CompatibilityStatus | EnumCompatibilityStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.CompatibilityStatus[] | ListEnumCompatibilityStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CompatibilityStatus[] | ListEnumCompatibilityStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCompatibilityStatusNullableFilter<$PrismaModel> | $Enums.CompatibilityStatus | null
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

  export type NestedEnumCompatibilityStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CompatibilityStatus | EnumCompatibilityStatusFieldRefInput<$PrismaModel> | null
    in?: $Enums.CompatibilityStatus[] | ListEnumCompatibilityStatusFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CompatibilityStatus[] | ListEnumCompatibilityStatusFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCompatibilityStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.CompatibilityStatus | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCompatibilityStatusNullableFilter<$PrismaModel>
    _max?: NestedEnumCompatibilityStatusNullableFilter<$PrismaModel>
  }

  export type NestedEnumReportTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportType | EnumReportTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ReportType[] | ListEnumReportTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportType[] | ListEnumReportTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumReportTypeFilter<$PrismaModel> | $Enums.ReportType
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

  export type NestedEnumReportTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportType | EnumReportTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ReportType[] | ListEnumReportTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReportType[] | ListEnumReportTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumReportTypeWithAggregatesFilter<$PrismaModel> | $Enums.ReportType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportTypeFilter<$PrismaModel>
    _max?: NestedEnumReportTypeFilter<$PrismaModel>
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

  export type AircraftVoteCreateWithoutAircraftInput = {
    id?: string
    votes: number
    daysOnList: number
    weeksInChart: number
    positionChange?: number | null
    rank?: number | null
    report: ReportCreateNestedOneWithoutVotesInput
  }

  export type AircraftVoteUncheckedCreateWithoutAircraftInput = {
    id?: string
    reportId: string
    votes: number
    daysOnList: number
    weeksInChart: number
    positionChange?: number | null
    rank?: number | null
  }

  export type AircraftVoteCreateOrConnectWithoutAircraftInput = {
    where: AircraftVoteWhereUniqueInput
    create: XOR<AircraftVoteCreateWithoutAircraftInput, AircraftVoteUncheckedCreateWithoutAircraftInput>
  }

  export type AircraftVoteCreateManyAircraftInputEnvelope = {
    data: AircraftVoteCreateManyAircraftInput | AircraftVoteCreateManyAircraftInput[]
    skipDuplicates?: boolean
  }

  export type AircraftVoteUpsertWithWhereUniqueWithoutAircraftInput = {
    where: AircraftVoteWhereUniqueInput
    update: XOR<AircraftVoteUpdateWithoutAircraftInput, AircraftVoteUncheckedUpdateWithoutAircraftInput>
    create: XOR<AircraftVoteCreateWithoutAircraftInput, AircraftVoteUncheckedCreateWithoutAircraftInput>
  }

  export type AircraftVoteUpdateWithWhereUniqueWithoutAircraftInput = {
    where: AircraftVoteWhereUniqueInput
    data: XOR<AircraftVoteUpdateWithoutAircraftInput, AircraftVoteUncheckedUpdateWithoutAircraftInput>
  }

  export type AircraftVoteUpdateManyWithWhereWithoutAircraftInput = {
    where: AircraftVoteScalarWhereInput
    data: XOR<AircraftVoteUpdateManyMutationInput, AircraftVoteUncheckedUpdateManyWithoutAircraftInput>
  }

  export type AircraftVoteScalarWhereInput = {
    AND?: AircraftVoteScalarWhereInput | AircraftVoteScalarWhereInput[]
    OR?: AircraftVoteScalarWhereInput[]
    NOT?: AircraftVoteScalarWhereInput | AircraftVoteScalarWhereInput[]
    id?: StringFilter<"AircraftVote"> | string
    reportId?: StringFilter<"AircraftVote"> | string
    aircraftId?: StringFilter<"AircraftVote"> | string
    votes?: IntFilter<"AircraftVote"> | number
    daysOnList?: IntFilter<"AircraftVote"> | number
    weeksInChart?: IntFilter<"AircraftVote"> | number
    positionChange?: IntNullableFilter<"AircraftVote"> | number | null
    rank?: IntNullableFilter<"AircraftVote"> | number | null
  }

  export type AircraftVoteCreateWithoutReportInput = {
    id?: string
    votes: number
    daysOnList: number
    weeksInChart: number
    positionChange?: number | null
    rank?: number | null
    aircraft: AircraftCreateNestedOneWithoutVotesInput
  }

  export type AircraftVoteUncheckedCreateWithoutReportInput = {
    id?: string
    aircraftId: string
    votes: number
    daysOnList: number
    weeksInChart: number
    positionChange?: number | null
    rank?: number | null
  }

  export type AircraftVoteCreateOrConnectWithoutReportInput = {
    where: AircraftVoteWhereUniqueInput
    create: XOR<AircraftVoteCreateWithoutReportInput, AircraftVoteUncheckedCreateWithoutReportInput>
  }

  export type AircraftVoteCreateManyReportInputEnvelope = {
    data: AircraftVoteCreateManyReportInput | AircraftVoteCreateManyReportInput[]
    skipDuplicates?: boolean
  }

  export type AircraftVoteUpsertWithWhereUniqueWithoutReportInput = {
    where: AircraftVoteWhereUniqueInput
    update: XOR<AircraftVoteUpdateWithoutReportInput, AircraftVoteUncheckedUpdateWithoutReportInput>
    create: XOR<AircraftVoteCreateWithoutReportInput, AircraftVoteUncheckedCreateWithoutReportInput>
  }

  export type AircraftVoteUpdateWithWhereUniqueWithoutReportInput = {
    where: AircraftVoteWhereUniqueInput
    data: XOR<AircraftVoteUpdateWithoutReportInput, AircraftVoteUncheckedUpdateWithoutReportInput>
  }

  export type AircraftVoteUpdateManyWithWhereWithoutReportInput = {
    where: AircraftVoteScalarWhereInput
    data: XOR<AircraftVoteUpdateManyMutationInput, AircraftVoteUncheckedUpdateManyWithoutReportInput>
  }

  export type ReportCreateWithoutVotesInput = {
    id?: string
    type: $Enums.ReportType
    year: number
    month?: number | null
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUncheckedCreateWithoutVotesInput = {
    id?: string
    type: $Enums.ReportType
    year: number
    month?: number | null
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportCreateOrConnectWithoutVotesInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutVotesInput, ReportUncheckedCreateWithoutVotesInput>
  }

  export type AircraftCreateWithoutVotesInput = {
    id?: string
    name: string
    manufacturer: string
    category: string
    payware: string
    msrp?: number | null
    buyUrl: string
    previewImageUrl?: string | null
    description?: string | null
    tags?: AircraftCreatetagsInput | string[]
    dateAdded?: Date | string | null
    msfs2020Compatibility?: $Enums.CompatibilityStatus | null
    msfs2024Compatibility?: $Enums.CompatibilityStatus | null
  }

  export type AircraftUncheckedCreateWithoutVotesInput = {
    id?: string
    name: string
    manufacturer: string
    category: string
    payware: string
    msrp?: number | null
    buyUrl: string
    previewImageUrl?: string | null
    description?: string | null
    tags?: AircraftCreatetagsInput | string[]
    dateAdded?: Date | string | null
    msfs2020Compatibility?: $Enums.CompatibilityStatus | null
    msfs2024Compatibility?: $Enums.CompatibilityStatus | null
  }

  export type AircraftCreateOrConnectWithoutVotesInput = {
    where: AircraftWhereUniqueInput
    create: XOR<AircraftCreateWithoutVotesInput, AircraftUncheckedCreateWithoutVotesInput>
  }

  export type ReportUpsertWithoutVotesInput = {
    update: XOR<ReportUpdateWithoutVotesInput, ReportUncheckedUpdateWithoutVotesInput>
    create: XOR<ReportCreateWithoutVotesInput, ReportUncheckedCreateWithoutVotesInput>
    where?: ReportWhereInput
  }

  export type ReportUpdateToOneWithWhereWithoutVotesInput = {
    where?: ReportWhereInput
    data: XOR<ReportUpdateWithoutVotesInput, ReportUncheckedUpdateWithoutVotesInput>
  }

  export type ReportUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumReportTypeFieldUpdateOperationsInput | $Enums.ReportType
    year?: IntFieldUpdateOperationsInput | number
    month?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumReportTypeFieldUpdateOperationsInput | $Enums.ReportType
    year?: IntFieldUpdateOperationsInput | number
    month?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AircraftUpsertWithoutVotesInput = {
    update: XOR<AircraftUpdateWithoutVotesInput, AircraftUncheckedUpdateWithoutVotesInput>
    create: XOR<AircraftCreateWithoutVotesInput, AircraftUncheckedCreateWithoutVotesInput>
    where?: AircraftWhereInput
  }

  export type AircraftUpdateToOneWithWhereWithoutVotesInput = {
    where?: AircraftWhereInput
    data: XOR<AircraftUpdateWithoutVotesInput, AircraftUncheckedUpdateWithoutVotesInput>
  }

  export type AircraftUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    payware?: StringFieldUpdateOperationsInput | string
    msrp?: NullableIntFieldUpdateOperationsInput | number | null
    buyUrl?: StringFieldUpdateOperationsInput | string
    previewImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: AircraftUpdatetagsInput | string[]
    dateAdded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    msfs2020Compatibility?: NullableEnumCompatibilityStatusFieldUpdateOperationsInput | $Enums.CompatibilityStatus | null
    msfs2024Compatibility?: NullableEnumCompatibilityStatusFieldUpdateOperationsInput | $Enums.CompatibilityStatus | null
  }

  export type AircraftUncheckedUpdateWithoutVotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    manufacturer?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    payware?: StringFieldUpdateOperationsInput | string
    msrp?: NullableIntFieldUpdateOperationsInput | number | null
    buyUrl?: StringFieldUpdateOperationsInput | string
    previewImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: AircraftUpdatetagsInput | string[]
    dateAdded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    msfs2020Compatibility?: NullableEnumCompatibilityStatusFieldUpdateOperationsInput | $Enums.CompatibilityStatus | null
    msfs2024Compatibility?: NullableEnumCompatibilityStatusFieldUpdateOperationsInput | $Enums.CompatibilityStatus | null
  }

  export type AircraftVoteCreateManyAircraftInput = {
    id?: string
    reportId: string
    votes: number
    daysOnList: number
    weeksInChart: number
    positionChange?: number | null
    rank?: number | null
  }

  export type AircraftVoteUpdateWithoutAircraftInput = {
    id?: StringFieldUpdateOperationsInput | string
    votes?: IntFieldUpdateOperationsInput | number
    daysOnList?: IntFieldUpdateOperationsInput | number
    weeksInChart?: IntFieldUpdateOperationsInput | number
    positionChange?: NullableIntFieldUpdateOperationsInput | number | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    report?: ReportUpdateOneRequiredWithoutVotesNestedInput
  }

  export type AircraftVoteUncheckedUpdateWithoutAircraftInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    votes?: IntFieldUpdateOperationsInput | number
    daysOnList?: IntFieldUpdateOperationsInput | number
    weeksInChart?: IntFieldUpdateOperationsInput | number
    positionChange?: NullableIntFieldUpdateOperationsInput | number | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AircraftVoteUncheckedUpdateManyWithoutAircraftInput = {
    id?: StringFieldUpdateOperationsInput | string
    reportId?: StringFieldUpdateOperationsInput | string
    votes?: IntFieldUpdateOperationsInput | number
    daysOnList?: IntFieldUpdateOperationsInput | number
    weeksInChart?: IntFieldUpdateOperationsInput | number
    positionChange?: NullableIntFieldUpdateOperationsInput | number | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AircraftVoteCreateManyReportInput = {
    id?: string
    aircraftId: string
    votes: number
    daysOnList: number
    weeksInChart: number
    positionChange?: number | null
    rank?: number | null
  }

  export type AircraftVoteUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    votes?: IntFieldUpdateOperationsInput | number
    daysOnList?: IntFieldUpdateOperationsInput | number
    weeksInChart?: IntFieldUpdateOperationsInput | number
    positionChange?: NullableIntFieldUpdateOperationsInput | number | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
    aircraft?: AircraftUpdateOneRequiredWithoutVotesNestedInput
  }

  export type AircraftVoteUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    aircraftId?: StringFieldUpdateOperationsInput | string
    votes?: IntFieldUpdateOperationsInput | number
    daysOnList?: IntFieldUpdateOperationsInput | number
    weeksInChart?: IntFieldUpdateOperationsInput | number
    positionChange?: NullableIntFieldUpdateOperationsInput | number | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AircraftVoteUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    aircraftId?: StringFieldUpdateOperationsInput | string
    votes?: IntFieldUpdateOperationsInput | number
    daysOnList?: IntFieldUpdateOperationsInput | number
    weeksInChart?: IntFieldUpdateOperationsInput | number
    positionChange?: NullableIntFieldUpdateOperationsInput | number | null
    rank?: NullableIntFieldUpdateOperationsInput | number | null
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