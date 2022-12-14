export const enum MsgStatus {
  unknown = 0,
  sent = 1,
  delivered = 2,
  read = 3,
}

export type PayloadMsg<TPayload> = {
  msgId: string;
  timestamp: Date;
  status?: MsgStatus;
  payload: TPayload;
};
