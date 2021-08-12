import { Reducer } from 'react';

type ActionDispatch<
K extends string,
P extends {},
> = { type: K, payload: P };

type ActionType<
  T extends Record<string, any>,
> = { [key in keyof T]: key };

const act = <
K extends string,
P extends {},
>(type: K, payload: P): ActionDispatch<K, P> => ({ type, payload });

type ActorType<
K extends string,
T extends {},
R extends {},
> = (val: T) => ActionDispatch<K, R>;

const makeActor = <
K extends string,
T extends {},
R extends ReturnType<typeof act>,
P extends (val: T) => R,
>(key: K, process: P): ActorType<K, T, R> => (val: T) => act(key, process(val));

type ExtractDispatch<T extends Record<string, (param: any) => any>> =
  T extends Record<infer K, (param: any) => any>
    ? K extends string
      ? ActionDispatch<K, ReturnType<T[K]>>
      : never
    : never;

export const makeReducer = <
Actions extends Record<string, (param: any) => any>,
State extends unknown,
>(
    actionsRaw: Actions,
    initialValue: State,
  ) => <
    ActionTypes extends ActionType<typeof actionsRaw>,
    ActionsType extends ExtractDispatch<typeof actionsRaw>,
    ReducerType extends Reducer<State, ActionsType>,
  >(
      reducerFactory: (actionTypes: ActionTypes) => ReducerType,
    ) => {
    const actionTypes = Object.keys(actionsRaw)
      .reduce<ActionTypes>(
      (prev, key) => ({
        ...prev,
        [key]: key,
      }),
      {} as any,
    );

    const actions = Object.entries(actionsRaw)
      .reduce<{
      [key in keyof typeof actionsRaw]: ActorType<
      key & string,
      Parameters<typeof actionsRaw[key]>[0],
      ReturnType<typeof actionsRaw[key]>
      >
    }>(
      (prev, [key, value]) => ({
        ...prev,
        [key]: makeActor(key, value as any),
      }),
      {} as any,
    );

    const reducer = reducerFactory(actionTypes);
    const reducerParams = [
      reducer,
      initialValue,
    ] as const;

    return {
      actions,
      actionTypes,
      initialValue,
      reducer,
      reducerParams,
    };
  };
