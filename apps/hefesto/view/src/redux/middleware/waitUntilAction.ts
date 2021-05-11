import { AnyAction, Dispatch, Middleware, MiddlewareAPI } from "redux";
import { RootState } from "..";

export const WAIT_UNTIL_ACTION = "WAIT_UNTIL_ACTION";

export interface WaitActionArgs {
  predicate: (action: AnyAction) => boolean;
  run: (
    dispatch: Dispatch,
    getState: () => RootState,
    action: AnyAction
  ) => void;
}

interface WaitAction extends WaitActionArgs {
  type: typeof WAIT_UNTIL_ACTION;
}

// eslint-disable-next-line func-style
export const waitUntilAction: Middleware<{}, RootState, Dispatch> = ({
  dispatch,
  getState,
}: MiddlewareAPI<Dispatch, RootState>) => {
  let pending: WaitAction[] = [];

  function checkPending(action: AnyAction): void {
    const readyRequests = [];
    const stillPending = [];

    // Find the pending requests whose predicates are satisfied with
    // this action. Wait to run the requests until after we update the
    // pending queue because the request handler may synchronously
    // dispatch again and run this service (that use case is
    // completely valid).
    for (const request of pending) {
      if (request.predicate(action)) {
        readyRequests.push(request);
      } else {
        stillPending.push(request);
      }
    }

    pending = stillPending;
    for (const request of readyRequests) {
      request.run(dispatch, getState, action);
    }
  }

  return (next: Dispatch<AnyAction>) => (
    action: AnyAction
  ): null | AnyAction => {
    if (action.type === WAIT_UNTIL_ACTION) {
      pending.push(action as WaitAction);
      return null;
    }
    const result = next(action);
    checkPending(action);
    return result;
  };
};
