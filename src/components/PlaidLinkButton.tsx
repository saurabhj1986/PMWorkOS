import { useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

interface PlaidLinkButtonProps {
  linkToken: string;
  onSuccess: (publicToken: string) => void | Promise<void>;
  disabled?: boolean;
}

export function PlaidLinkButton({
  linkToken,
  onSuccess,
  disabled,
}: PlaidLinkButtonProps) {
  const success = useCallback(
    (publicToken: string) => {
      void onSuccess(publicToken);
    },
    [onSuccess]
  );

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: success,
  });

  return (
    <button
      type="button"
      onClick={() => open()}
      disabled={disabled || !ready}
      className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium disabled:opacity-40"
    >
      Link account (Plaid)
    </button>
  );
}
