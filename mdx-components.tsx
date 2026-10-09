import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";

function ResponsiveTable(props: ComponentProps<"table">) {
  return (
    <div
      className="article-table-scroll"
      role="region"
      aria-label="Wyoming and Delaware comparison / Comparativa de Wyoming y Delaware"
      tabIndex={0}
    >
      <table {...props} />
    </div>
  );
}

export const blogMdxComponents: MDXComponents = {
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
  table: ResponsiveTable,
};

export function useMDXComponents(): MDXComponents {
  return blogMdxComponents;
}
