import Loading from "@/component/common/Loading";
import dynamic from "next/dynamic";
import { Component, useMemo } from "react";

class ModalContentRenderer extends Component {
  state: {
    componentPath: string;
  };
  constructor(props: { componentPath: string }) {
    super(props);

    this.state = {
      componentPath: props.componentPath,
    };
  }

  render() {
    const DynamicComponent = dynamic(
      () =>
        import(`@/component/common/modal/content/${this.state.componentPath}`),
      {
        ssr: false,
        loading: () => <Loading colorTheme='#2D3A8C' height={300} />,
      }
    );
    return DynamicComponent ? <DynamicComponent /> : null;
  }
}

export default ModalContentRenderer;
