import type { ZodError } from 'zod';

export type ErrSourceType = 'CLIENT' | 'SERVER';

/**
 * すべてのドメインエラーの基底クラス
 *
 * DO NOT export this class.
 */
abstract class DomainBaseError extends Error {
  abstract readonly type: string;
  abstract readonly source: ErrSourceType;

  protected constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
    this.name = this.constructor.name;
  }
}

export const isDomainError = (err: unknown): err is DomainBaseError => {
  return err instanceof DomainBaseError;
};

export class UnknownServerError extends DomainBaseError {
  readonly type = 'UnknownServerError';
  readonly source = 'SERVER';
  override readonly cause: unknown;

  constructor(message: string, cause: unknown) {
    super(message, { cause });
    this.cause = cause;
  }
}

export class ValidationError extends DomainBaseError {
  readonly type = 'ValidationError';
  readonly source: ErrSourceType;
  override readonly cause: ZodError;

  constructor(cause: ZodError, source: ErrSourceType) {
    super('Validation failed', { cause });
    this.cause = cause;
    this.source = source;
  }
}

export class InvalidFileUriError extends DomainBaseError {
  readonly type = 'InvalidFileUriError';
  readonly source = 'SERVER';
  readonly uri: string;

  constructor(payload: { message: string; uri: string }) {
    super(`${payload.message}: ${payload.uri}`);
    this.uri = payload.uri;
  }
}

export class UnexpectedExternalApiError extends DomainBaseError {
  readonly type = 'UnexpectedExternalApiError';
  readonly source = 'SERVER';
  readonly request: unknown;
  readonly response: unknown;

  constructor(payload: { message: string; request: unknown; response: unknown; cause?: unknown }) {
    const { message, request, response, cause } = payload;
    super(message, { cause });
    this.request = request;
    this.response = response;
  }
}

// switch や if の網羅性チェックの失敗分岐で使うエラー。
// Python でいう assert_never のようなもの。
export class ExhaustivenessCheckError extends DomainBaseError {
  readonly type = 'ExhaustivenessCheckError';
  readonly source = 'SERVER';

  constructor(value: never, name: string) {
    super(`Exhaustiveness check failed: ${name}=${value}`);
  }
}

export class ForbiddenError extends DomainBaseError {
  readonly type = 'ForbiddenError';
  readonly source = 'CLIENT';

  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends DomainBaseError {
  readonly type = 'BadRequestError';
  readonly source = 'CLIENT';

  constructor(message: string) {
    super(message);
  }
}

export class Missing1to1RelationError extends DomainBaseError {
  readonly type = 'Missing1to1RelationError';
  readonly source = 'SERVER';
  readonly table: string;
  readonly id: string | number;

  constructor(payload: { table: string; id: string | number }) {
    const { id, table } = payload;
    super(`Missing 1-to-1 relation: ${table}#${id}`);
    this.table = table;
    this.id = id;
  }
}
