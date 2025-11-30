import { errAsync, okAsync, type Result, ResultAsync } from 'neverthrow';

/**
 * Promise<Result<T, E>> を ResultAsync<T, E> に変換する。
 *
 * promise が reject した場合はそのまま上位へエラーを throw する。
 */
export const flattenPromiseResult = <T, E>(p: Promise<Result<T, E>>): ResultAsync<T, E> => {
  return ResultAsync.fromPromise(p, (e) => {
    throw e;
  }) // ResultAsync<Result<T, E>, never>
    .andThen((result) => result); // ResultAsync<T, E>
};

/**
 * Promise<T> を null チェックして ResultAsync<NonNullable<T>, 'NONE'> に変換する。
 * await p の結果が nullish の場合は errAsync('NONE') を返す。そうでなければ okAsync を返す。
 *
 * p 内部で例外が投げられた場合はそのまま上位に伝搬させる。
 */
export const checkNullAsync = <T>(p: Promise<T>): ResultAsync<NonNullable<T>, 'NONE'> => {
  return ResultAsync.fromPromise(p, (e) => {
    throw e;
  }).andThen((result) => {
    if (result == null) {
      return errAsync('NONE' as const);
    }
    return okAsync(result);
  });
};
