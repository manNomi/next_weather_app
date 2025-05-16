import { client } from "@/shared/lib/apolloClient";
import { DocumentNode } from "@apollo/client";

export async function fetchStatic<TData, TVariables = Record<string, any>>(
  query: DocumentNode,
  variables?: TVariables
): Promise<TData> {
  try {
    const { data } = await client.query<TData>({
      query,
      variables: variables as any,
      fetchPolicy: "network-only",
    });
    return data;
  } catch (error) {
    console.error("fetchStatic failed", error);
    throw error;
  }
}
