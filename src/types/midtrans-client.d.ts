/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "midtrans-client" {
  class CoreApi {
    constructor(config: { isProduction: boolean; serverKey: string; clientKey: string });
    charge(params: unknown): Promise<unknown>;
    transaction: {
      status(orderId: string): Promise<unknown>;
      refund(orderId: string, params?: unknown): Promise<unknown>;
      cancel(orderId: string): Promise<unknown>;
    };
  }

  const Midtrans: {
    CoreApi: typeof CoreApi;
  };

  export = Midtrans;
}
