import { FormHelperText } from "@mui/material";

type Props = { value?: string; className?: string };

function Message({ value, className }: Props) {
  if (!value) return undefined;
  return (
    <FormHelperText className={`!text-red-500 absolute -bottom-6 right-0 ${className}`}>
      {value}
    </FormHelperText>
  );
}

export default Message;
