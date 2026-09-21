import type { SVGProps } from "react";

export function TrashIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round" className={className} {...props}>
  <path d="M3 6h18" />
  <path d="M8 6V4h8v2" />
  <path d="M19 6l-1 14H6L5 6" />
  <path d="M10 11v5M14 11v5" />
</svg>
  );
}
