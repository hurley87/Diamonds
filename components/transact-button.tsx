import { ResolvedRegister, type Config } from 'wagmi';
import {
  UseSendCallsParameters,
  UseSendCallsReturnType,
  useWriteContracts,
} from 'wagmi/experimental';
import { useMemo } from 'react';

export type TransactButtonProps<
  config extends Config = Config,
  context = unknown
> = UseSendCallsReturnType<config, context>['sendCalls']['arguments'] & {
  mutation?: UseSendCallsParameters<config, context>['mutation'];
} & { text: string };

export function TransactButton<
  config extends Config = ResolvedRegister['config'],
  context = unknown
>({ mutation, text, ...rest }: TransactButtonProps<config, context>) {
  const { writeContracts, status } = useWriteContracts({
    mutation: {
      ...mutation,
      onError: (e) => {
        console.log('error', e);
      },
      onSuccess: (id) => {
        mutation.onSuccess(id);
      },
    },
  });

  const displayText = useMemo(() => {
    if (status == 'pending') {
      return 'Confirm in popup';
    }
    return text;
  }, [status]);

  return (
    <>
      <button
        onClick={() => writeContracts(rest)}
        disabled={status == 'pending'}
      >
        {displayText}
      </button>
    </>
  );
}
