import type { ResultAsync } from 'neverthrow';
import type { AuthenticatedUser } from '../../user/entity.js';

// T が ResultAsync 型の場合はそのまま、それ以外は Promise で包む。
// Union Distribution を防ぐために T ではなく [T] でタプル型にしている
type AsyncOutput<T> = [T] extends [ResultAsync<infer OK, infer ERR>]
  ? ResultAsync<OK, ERR>
  : Promise<T>;

/**
 * 認証が必要なユースケースのコンストラクタを返す。
 * deps をクロージャとしてキャプチャして execute に束縛する関数を返す。
 *
 * execute をカリー化しているとも言える。
 *
 * @param execute ユースケースの実行関数
 * @returns (TDeps) => (AuthenticatedUser, I) => Promise<O>
 */
export const defineAuthedUsecase = <TDeps, I, O>(
  execute: (deps: TDeps, auth: AuthenticatedUser, input: I) => AsyncOutput<O>
) => {
  return (deps: TDeps) => async (auth: AuthenticatedUser, input: I) => {
    return await execute(deps, auth, input);
  };
};

/**
 * 認証が不要なユースケースのコンストラクタを返す。
 * 主に初期認証やパブリックAPIで使用。
 */
export const defineNoAuthUsecase = <TDeps, I, O>(
  execute: (deps: TDeps, input: I) => AsyncOutput<O>
) => {
  return (deps: TDeps) => async (input: I) => {
    return await execute(deps, input);
  };
};

// /**
//  * 管理者権限が必要なユースケースのコンストラクタを返す。
//  * 自動的に管理者権限をチェックし、権限がない場合はエラーを投げる。
//  */
// export const defineAdminUsecase = <TDeps, I, O>(
//   execute: (deps: TDeps, auth: AuthenticatedPrincipal, input: I) => AsyncOutput<O>
// ) => {
//   return (deps: TDeps) => async (auth: AuthenticatedPrincipal, input: I) => {
//     if (auth.role !== 'ADMIN') {
//       throw new ForbiddenError('Admin only');
//     }
//     return await execute(deps, auth, input);
//   };
// };
