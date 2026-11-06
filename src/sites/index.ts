import type { ComponentType } from "react";
import type { Programmer } from "@/data/programmers";
import SiteA from "./SiteA";
import SiteB from "./SiteB";
import SiteC from "./SiteC";

/** Liga cada programador (pelo id) ao seu site. */
export const sites: Record<Programmer["id"], ComponentType> = {
  a: SiteA,
  b: SiteB,
  c: SiteC,
};
