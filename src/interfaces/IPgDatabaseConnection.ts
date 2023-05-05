import { QueryConfig, QueryResult, QueryResultRow } from "pg";

export interface IDatabaseConnection {
  query<T extends QueryResultRow>(queryConfig: QueryConfig | string, values?: any[]): Promise<QueryResult<T>>;
}
