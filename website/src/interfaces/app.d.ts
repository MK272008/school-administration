import type { AppProps as DefaultAppProps } from "next/app";
import type { ReactNode, ReactElement } from "react";

type Page<P> = (props: P) => React.ReactElement;

export interface NextPage<P = {}> extends Page<P> {
  getLayout?: (page: ReactElement) => ReactNode
}

export interface AppProps extends DefaultAppProps {
  Component: NextPage
}
