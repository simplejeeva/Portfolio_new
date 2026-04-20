"use client";

import { motion, type Variants } from "framer-motion";
import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  type ReactNode,
} from "react";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.025, delayChildren: 0.05 },
  },
};

const piece: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 180, damping: 22 },
  },
};

function splitText(text: string): ReactNode {
  return Array.from(text).map((ch, i) => (
    <motion.span
      key={`c${i}`}
      variants={piece}
      className="inline-block"
      style={{ willChange: "transform, filter, opacity" }}
    >
      {ch === " " ? "\u00A0" : ch}
    </motion.span>
  ));
}

function processNode(node: ReactNode, keyPrefix: string): ReactNode {
  if (node === null || node === undefined || node === false || node === true) {
    return null;
  }
  if (typeof node === "string" || typeof node === "number") {
    return splitText(String(node));
  }
  if (Array.isArray(node)) {
    return Children.map(node, (child, i) => (
      <Fragment key={`${keyPrefix}-${i}`}>
        {processNode(child, `${keyPrefix}-${i}`)}
      </Fragment>
    ));
  }
  if (isValidElement(node)) {
    const props = (node.props ?? {}) as {
      className?: string;
      children?: ReactNode;
    };
    const hasGradient =
      typeof props.className === "string" &&
      props.className.includes("gradient-text");

    // Keep gradient spans atomic so the gradient renders correctly;
    // animate them as a single unit.
    if (hasGradient) {
      return (
        <motion.span
          variants={piece}
          className="inline-block"
          style={{ willChange: "transform, filter, opacity" }}
        >
          {node}
        </motion.span>
      );
    }

    return cloneElement(
      node,
      {},
      processNode(props.children, `${keyPrefix}-el`),
    );
  }
  return node;
}

type Props = {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
};

export default function AnimatedHeading({
  children,
  ariaLabel,
  className = "",
}: Props) {
  return (
    <motion.h2
      aria-label={ariaLabel}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={className}
    >
      <span aria-hidden="true">{processNode(children, "h")}</span>
    </motion.h2>
  );
}
