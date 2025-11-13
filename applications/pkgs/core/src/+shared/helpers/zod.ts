import type * as z from 'zod';
import { type ErrSourceType, ValidationError } from '../errors.js';

// パスパラメータやクエリパラメータの文字列をパースできるように敢えて string も許容している。
// bigint の許容理由は、 DB で BIGINT 型を使っている場合に Prisma で生成されるカラムの型が bigint になるため。
// export const zTolerantInt = z.union([
//   z.number(),
//   z.string().transform(Number),
//   z.bigint().transform(Number),
// ]);

// export const zUint = zTolerantInt.pipe(z.int().min(0).max(Number.MAX_SAFE_INTEGER));
// export const zNonZeroUint = zTolerantInt.pipe(z.int().min(1).max(Number.MAX_SAFE_INTEGER));

/**
 * ユーザ由来 / サーバ由来のパーサ関数を作成する。
 * @param schema - ZodType
 * @param source - パース対象のデータがユーザ由来かサーバ由来か
 * @throws ValidationError
 * @returns z.input<T> => z.output<T> のパーサ関数。zod の safeParse() は unknown を受け取るが、それは寛容すぎるので z.input<T> を受け取るようにする。
 */
const zodParser = <T extends z.ZodType>(schema: T, source: ErrSourceType) => {
  return (input: z.input<T>): z.output<T> => {
    const res = schema.safeParse(input);
    if (res.success) {
      return res.data;
    }
    throw new ValidationError(res.error, source);
  };
};

export const zodClientDataParser = <T extends z.ZodType>(schema: T) => zodParser(schema, 'CLIENT');

export const zodServerDataParser = <T extends z.ZodType>(schema: T) => zodParser(schema, 'SERVER');

// export const zodServerDataUnknownInputParser = <T extends z.ZodType>(schema: T) => {
//   type Input = { [K in keyof z.input<T>]: unknown };
//   return (input: Input): z.output<T> => {
//     const res = schema.safeParse(input);
//     if (res.success) {
//       return res.data;
//     }
//     throw new ValidationError(res.error, 'SERVER');
//   };
// };
