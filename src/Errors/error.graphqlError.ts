import { GraphQLError } from "graphql";

interface ErrorProps {
  message: string;
  code: string;
  status: number;
}

export class BaseError extends GraphQLError {
  constructor(props: ErrorProps) {
    const { message, code, status } = props;
    super(message, {
      extensions: {
        code,
        http: { status },
      },
    });
  }
}
