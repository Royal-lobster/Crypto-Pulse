export type ResponseData = {
  id: string;
  message: string;
  created: number;
  apiVersion: string;
  modelOutputs: Array<
    Array<{
      summary_text: string;
    }>
  >;
};
