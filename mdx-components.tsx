import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  a: (props) => {
    const external = props.href?.startsWith("http");
    return (
      <a
        {...props}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      />
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
