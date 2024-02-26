declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "redux-persist/integration/react" {
  import { PersistGateProps } from "redux-persist/es/integration/react";

  export class PersistGate extends React.Component<PersistGateProps> {}
}
